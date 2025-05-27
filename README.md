# Güvenli İhbar Sistemi

Modern, güvenli ve kullanıcı dostu bir web tabanlı ihbar sistemi.

Kullanıcılar olayları raporlayabilir, dosya ekleyebilir. A
Alıcı ise otomatik olarak eklenen dosyaları ve raporu e-posta ile alabilir.

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

  ### 📝Not : XAMPP indirip kurarakta çalıştırabilirsiniz. 


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



https://github.com/user-attachments/assets/050fec5f-5f0a-401e-83e6-38fbd02347f7



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
