<?php
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php';


// CSRF token oluşturma
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    $_SESSION['csrf_token_time'] = time(); 
}


setcookie('csrf_token', $_SESSION['csrf_token'], [
    'expires' => time() + 1200, // 1 saat 3600 idi
    'path' => '/',
    'domain' => '', // alan adı
    'secure' => true, // HTTPS kullanılıyorsa true yap
    'httponly' => true, // JavaScript'ten erişimi engeller
    'samesite' => 'Strict' // veya 'Lax'
]);


function validateCsrfToken($token) {
    $isValid = isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
    $isExpired = (time() - $_SESSION['csrf_token_time']) > 3600; // 1 saat süresi

    if ($isExpired) {

        unset($_SESSION['csrf_token']);
        unset($_SESSION['csrf_token_time']);
        return false;
    }

    return $isValid;
}


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    if (!validateCsrfToken($_POST['csrf_token'])) {
        sendResponse(false, 'Geçersiz CSRF token!');
    }
    http_response_code(405);
    sendResponse(false, 'Method Not Allowed');
}

function sendResponse($success, $message) {
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}


if (isset($_FILES['pdf'])) {
    $pdf = $_FILES['pdf'];
    $pdfTmpPath = $pdf['tmp_name'];
    $pdfName = $pdf['name'];
    $pdfSize = $pdf['size'];
    $pdfError = $pdf['error'];

    if ($pdfError !== UPLOAD_ERR_OK) {
        sendResponse(false, 'PDF dosyası yüklenirken hata oluştu');
    }
} else {
    sendResponse(false, 'PDF dosyası eksik!');
}


$data = json_decode($_POST['formData'], true);
$incidentDate = htmlspecialchars($data['incidentDate']);
$incidentTypes = array_map('htmlspecialchars', $data['incidentTypes']);
$incidentDescription = htmlspecialchars($data['incidentDescription']);


try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'oguzhn.dgd@gmail.com';
    $mail->Password = 'nsty nrln lpfa wzze'; 
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;


    $mail->setFrom('oguzhn.dgd@gmail.com', 'Guvenli Ihbar Sistemi');
    $mail->addAddress('oguzhn.dgd@gmail.com'); 
    $mail->addAttachment($pdfTmpPath, $pdfName);
    $mail->isHTML(true);

    $mail->Subject = 'Yeni Ihbar Raporu - ' . date('Y-m-d H:i:s');
    $mailBody = "
    <h2>📋 Yeni İhbar Raporu Detayları</h2>
    <hr>
    <p><strong>🗓️ Olay Tarihi:</strong> {$incidentDate}</p>
    <p><strong>🏷️ Olay Türleri:</strong> " . implode(', ', $incidentTypes) . "</p>
    <p><strong>📝 Olay Açıklaması:</strong> {$incidentDescription}</p>
    <p><strong>⏰ Rapor Tarihi:</strong> " . date('Y-m-d H:i:s') . "</p>
    ";

    $mail->Body = $mailBody;

    if ($mail->send()) {
        sendResponse(true, 'Rapor başarıyla gönderildi');
    } else {
        sendResponse(false, 'E-posta gönderme hatası: ' . $mail->ErrorInfo);
    }
} catch (Exception $e) {
    sendResponse(false, 'Hata: ' . $e->getMessage());
}
?>
