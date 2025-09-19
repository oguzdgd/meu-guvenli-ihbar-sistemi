# Secure Incident Reporting System

Modern, secure, and user-friendly web-based incident reporting system.

Users can report incidents and attach files. Recipients automatically receive the report and attached files via email.

---

**For Turkish, scroll down / Türkçe için aşağıya bakınız**

---

## 🚀 Features

* ✅ Mobile-friendly design
* ✅ Multiple file upload (PDF)
* ✅ Drag-and-drop file upload
* ✅ Automatic PDF report generation
* ✅ Merge uploaded PDFs into a single PDF
* ✅ Automatic report delivery via email
* ✅ Form validation

---

## 📁 File Structure

```
ihbar-sistemi/
├── fonts/                  # Custom font for pdf-lib (download and use your own, change code in script.js)
├── index.html              # Main page
├── style.css               # Stylesheet
├── script.js               # JS logic
├── incident_types.js       # Incident types
├── send_report.php         # Email and PDF operations
├── composer.json           # Composer definition
├── vendor/                 # Dependencies
└── README.md
```

## 📋 Requirements

* Composer
* PHP built-in server or Apache/Nginx
* Gmail account (for email)

## 🛠️ Installation

### Using PHP Built-in Server

1. Install Composer: [https://getcomposer.org/download/](https://getcomposer.org/download/)
2. Open the project folder, launch a terminal, and install dependencies:

   ```bash
   composer require phpmailer/phpmailer
   php -S localhost:8000
   ```
3. Access the app at: [http://localhost:8000](http://localhost:8000)

---

  ### 📝Note: You can also run it using XAMPP.

---

## 📦 JavaScript Libraries Used

| Library             | Description                                      | Version  | CDN Link |
|---------------------|--------------------------------------------------|----------|----------|
| pdf-lib             | Used for creating PDF files in the browser        | 1.17.1   | https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js |
| @pdf-lib/fontkit    | pdf-lib plugin for custom fonts in PDFs           | 0.0.4    | https://unpkg.com/@pdf-lib/fontkit@0.0.4/dist/fontkit.umd.min.js     |

pdf-lib link: https://www.npmjs.com/package/pdf-lib

## 📦 PHP Libraries Used

| Library     | Description                                   | Version | Install Command                          |
|-------------|-----------------------------------------------|---------|------------------------------------------|
| PHPMailer   | Used for sending emails via SMTP              | 6.8.x   | composer require phpmailer/phpmailer     |

---

## 📧 Email Configuration

### Getting a Gmail App Password

1. Create a 16-digit app password at [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Update the following in the `send_report.php` file:

   ```php
   $mail->Username = 'youremail@gmail.com';
   $mail->Password = 'abcd efgh ijkl mnop'; 
   $mail->addAddress('youremail@gmail.com');
   ```

### Alternative SMTP Servers

* Outlook:

  ```php
  $mail->Host = 'smtp.live.com';
  $mail->Port = 587;
  ```
* Yahoo:

  ```php
  $mail->Host = 'smtp.mail.yahoo.com';
  $mail->Port = 587;
  ```

---

## 🔧 Configuration Settings

* In `script.js`:

  ```js
  const maxFiles = 3;                    // Maximum number of files
  const maxSize = 10 * 1024 * 1024;      // Maximum file size: 10MB
  ```

---

## Video

https://github.com/user-attachments/assets/17750b47-4421-433d-a7ea-cc9d1fffe513


## 📝 Usage

1. Select the date
2. Check the incident types
3. Write a description (at least 50 characters)
4. Attach a file (optional)
5. Pass the security verification
6. Click the **Submit** button

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/NewFeature`
3. Commit your changes: `git commit -m 'Add NewFeature'`
4. Push: `git push origin feature/NewFeature`
5. Open a Pull Request

---

## 📄 License

Licensed under the MIT License.

---

## 📢 Support

* Open an **issue** for problems
* Check the documentation
* Or contact via email (oguzhn.dgd@gmail.com)

**Note:** If used in a production environment, thorough security testing is highly recommended.

---

---

# Güvenli İhbar Sistemi

Modern, güvenli ve kullanıcı dostu bir web tabanlı ihbar sistemi.

Kullanıcılar olayları raporlayabilir, dosya ekleyebilir. Alıcı ise otomatik olarak eklenen dosyaları ve raporu e-posta ile alabilir.

---

## 🚀 Özellikler

* ✅ Mobil uyumlu tasarım
* ✅ Çoklu dosya yükleme (PDF)
* ✅ Sürükle-bırak dosya yükleme
* ✅ Otomatik PDF rapor oluşturma,
* ✅ Yüklenen PDFleri tek PDF halinde birleştirme
* ✅ E-posta ile otomatik rapor gönderimi
* ✅ Form validasyonu

---

## 📁 Dosya Yapısı

```
ihbar-sistemi/
├── fonts/                  # pdf-lib için özel font (kendi fontunuzu indirip kullanabilirsiniz, script.js içinde kodu değiştireceksiniz)    
├── index.html              # Ana sayfa
├── style.css               # Stil dosyası
├── script.js               # JS mantığı
├── incident_types.js       # Olay türleri
├── send_report.php         # E-posta ve PDF işlemleri
├── composer.json           # Composer tanımı
├── vendor/                 # Bağımlıklar
└── README.md
```

## 📋 Gereksinimler

* Composer
* PHP built-in server ya da Apache/Nginx 
* Gmail hesabı (e-posta için)

## 🛠️ Kurulum

### PHP Built-in Server

1. Composer'ı kurun: [https://getcomposer.org/download/](https://getcomposer.org/download/)
2. Proje klasörünü açın, yeni bir terminal açın ve bağımlılıkları yükleyin:

   ```bash
   composer require phpmailer/phpmailer
   php -S localhost:8000
   ```
3. Uygulamaya erişin: [http://localhost:8000](http://localhost:8000)

---

  ### 📝Not : XAMPP indirip kurarak da çalıştırabilirsiniz.

---

## 📦 Kullanılan JS Kütüphaneleri

| Kütüphane            | Açıklama                                               | Versiyon  | CDN Linki |
|----------------------|--------------------------------------------------------|-----------|-----------|
| pdf-lib              | Tarayıcıda PDF oluşturmak için kullanılır             | 1.17.1    | https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js |
| @pdf-lib/fontkit     | PDF'lerde özel font kullanımı için pdf-lib eklentisi  | 0.0.4     | https://unpkg.com/@pdf-lib/fontkit@0.0.4/dist/fontkit.umd.min.js     |

pdf-lib linki : https://www.npmjs.com/package/pdf-lib

## 📦 Kullanılan PHP Kütüphaneleri

| Kütüphane   | Açıklama                                      | Versiyon | Kurulum Komutu                         |
|-------------|-----------------------------------------------|----------|----------------------------------------|
| PHPMailer   | SMTP ile e-posta göndermek için kullanılır    | 6.8.x    | composer require phpmailer/phpmailer   |

---

## 📧 E-posta Yapılandırması

### Gmail App Password Alma

1. [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) adresinden 16 haneli şifre oluşturun
2. `send_report.php` dosyasındaki aşağıyı güncelleyin:

   ```php
   $mail->Username = 'sizingmail@gmail.com';
   $mail->Password = 'abcd efgh ijkl mnop'; 
   $mail->addAddress('sizingmail@gmail.com');
   ```

### Alternatif SMTP Sunucuları

* Outlook:

  ```php
  $mail->Host = 'smtp.live.com';
  $mail->Port = 587;
  ```
* Yahoo:

  ```php
  $mail->Host = 'smtp.mail.yahoo.com';
  $mail->Port = 587;
  ```

---

## 🔧 Yapılandırma Ayarları

* `script.js` dosyasında:

  ```js
  const maxFiles = 3;                    // En fazla dosya sayısı
  const maxSize = 10 * 1024 * 1024;     // Maksimum boyut: 10MB
  ```

---

## 📝 Kullanım

1. Tarih seçin
2. Olay türlerini işaretleyin
3. En az 50 karakterlik açıklama yazın
4. Dosya ekleyin (isteğe bağlı)
5. Güvenlik doğrulamasını geçin
6. **Gönder** butonuna tıklayın

---

## 🤝 Katkıda Bulunma

1. Forklayın
2. Yeni bir branch oluşturun: `git checkout -b feature/NewFeature`
3. Commit: `git commit -m 'Add NewFeature'`
4. Push edin: `git push origin feature/NewFeature`
5. Pull Request oluşturun

---

## 📄 Lisans

MIT Lisansı ile lisanslanmıştır.

---

## 📢 Destek

* Sorunlar için **issue** oluşturun
* Belgelere göz atın
* ya da e-posta ile iletişime geçin (oguzhn.dgd@gmail.com)

**Not:** Gerçek ortamda kullanılacaksa detaylı güvenlik testleri yapılması önerilir.
