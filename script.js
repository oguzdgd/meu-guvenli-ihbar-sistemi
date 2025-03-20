document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ihbarForm');
    const olayAciklamasi = document.getElementById('olayAciklamasi');
    const karakterSayaci = document.getElementById('karakterSayaci');
    const submitBtn = document.getElementById('submitBtn');
    const olayTanimiError = document.getElementById('olayTanimiError');
    const olayAciklamasiError = document.getElementById('olayAciklamasiError');
    const captchaQuestion = document.getElementById('captchaQuestion');
    const captchaAnswer = document.getElementById('captchaAnswer');
    const captchaExpected = document.getElementById('captchaExpected');
    const captchaError = document.getElementById('captchaError');

    // Captcha oluştur
    function generateCaptcha() {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const expected = num1 + num2;
        captchaQuestion.textContent = `${num1} + ${num2} = ?`;
        captchaExpected.value = expected;
    }

    generateCaptcha();

    // Karakter sayacı
    olayAciklamasi.addEventListener('input', function() {
        const kalan = 30 - this.value.length;
        karakterSayaci.textContent = `Minimum 30 karakter gerekli (${this.value.length}/30)`;
        
        if (this.value.length < 30) {
            karakterSayaci.style.color = '#e74c3c';
            olayAciklamasiError.style.display = 'block';
            olayAciklamasiError.textContent = 'Lütfen en az 30 karakter giriniz.';
        } else {
            karakterSayaci.style.color = '#2ecc71';
            olayAciklamasiError.style.display = 'none';
        }
    });

    // Form gönderimi
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Olay tanımı kontrolü
        const olayTanimiCheckboxes = document.querySelectorAll('input[name="olayTanimi[]"]:checked');
        if (olayTanimiCheckboxes.length === 0) {
            olayTanimiError.style.display = 'block';
            olayTanimiError.textContent = 'Lütfen en az bir olay tipi seçiniz.';
            isValid = false;
        } else {
            olayTanimiError.style.display = 'none';
        }

        // Açıklama kontrolü
        if (olayAciklamasi.value.length < 30) {
            olayAciklamasiError.style.display = 'block';
            olayAciklamasiError.textContent = 'Lütfen en az 30 karakter giriniz.';
            isValid = false;
        }

        // Captcha kontrolü
        if (parseInt(captchaAnswer.value) !== parseInt(captchaExpected.value)) {
            captchaError.style.display = 'block';
            captchaError.textContent = 'Matematik işlemi yanlış çözüldü.';
            generateCaptcha();
            captchaAnswer.value = '';
            isValid = false;
        } else {
            captchaError.style.display = 'none';
        }

        if (isValid) {
            // Form geçerliyse gönder
            this.submit();
        }
    });
}); 