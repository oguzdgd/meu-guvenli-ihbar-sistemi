document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('ihbarForm');
    const olayTarihi = document.getElementById('olayTarihi');
    const olayAciklamasi = document.getElementById('olayAciklamasi');
    const karakterSayaci = document.getElementById('karakterSayaci');
    const submitBtn = document.getElementById('submitBtn');
    const captchaQuestion = document.getElementById('captchaQuestion');
    const captchaAnswer = document.getElementById('captchaAnswer');
    const captchaExpected = document.getElementById('captchaExpected');
    const successModal = document.getElementById('successModal');
    const olayTanimlariContainer = document.getElementById('olayTanimlariContainer');

    // Hata mesajı göster
    function showError(element, message) {
        const formGroup = element.closest('.form-group');
        let errorDiv = formGroup.querySelector('.error-message');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            formGroup.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        element.focus();
    }

    // Hata mesajını kaldır
    function removeError(element) {
        const formGroup = element.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    // Tüm hata mesajlarını temizle
    function clearAllErrors() {
        document.querySelectorAll('.error-message').forEach(error => error.remove());
    }

    // Olay tanımlarını yükle
    function loadOlayTanimlari() {
        olayTanimlariContainer.innerHTML = '';
        olayTanimlari.olaylar.forEach(olay => {
            const checkboxItem = document.createElement('div');
            checkboxItem.className = 'checkbox-item';

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = olay.id;
            input.name = 'olayTanimi[]';
            input.value = olay.value;

            const label = document.createElement('label');
            label.htmlFor = olay.id;
            label.textContent = olay.label;

            checkboxItem.appendChild(input);
            checkboxItem.appendChild(label);
            olayTanimlariContainer.appendChild(checkboxItem);
        });
    }

    // Captcha oluştur
    function generateCaptcha() {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const expected = num1 + num2;
        captchaQuestion.textContent = `${num1} + ${num2} = ?`;
        captchaExpected.value = expected;
    }

    // Form doğrulama
    function validateForm() {
        clearAllErrors();
        let isValid = true;

        // 1. Olay Tarihi kontrolü
        if (!olayTarihi.value) {
            showError(olayTarihi, 'Lütfen olay tarihini seçiniz.');
            isValid = false;
        }

        // 2. Olay Tanımı kontrolü
        const olayTanimiCheckboxes = document.querySelectorAll('input[name="olayTanimi[]"]:checked');
        if (olayTanimiCheckboxes.length === 0) {
            const firstCheckbox = olayTanimlariContainer.querySelector('input[type="checkbox"]');
            showError(firstCheckbox, 'Lütfen en az bir olay tipi seçiniz.');
            isValid = false;
        }

        // 3. Olay Açıklaması kontrolü
        if (!olayAciklamasi.value || olayAciklamasi.value.length < 30) {
            showError(olayAciklamasi, 'Lütfen en az 30 karakter giriniz.');
            isValid = false;
        }

        // 4. Captcha kontrolü
        if (!captchaAnswer.value || parseInt(captchaAnswer.value) !== parseInt(captchaExpected.value)) {
            showError(captchaAnswer, 'Matematik işlemi yanlış çözüldü.');
            generateCaptcha();
            captchaAnswer.value = '';
            isValid = false;
        }

        return isValid;
    }

    // Karakter sayacını güncelle
    olayAciklamasi.addEventListener('input', function() {
        const length = this.value.length;
        karakterSayaci.textContent = `Minimum 30 karakter gerekli (${length}/30)`;
        karakterSayaci.style.color = length >= 30 ? '#2ecc71' : '#e74c3c';
        
        // Eğer varsa hata mesajını kaldır
        if (length >= 30) {
            removeError(this);
        }
    });

    // Form gönderimi
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Form geçerliyse verileri topla
        const olayTanimiCheckboxes = document.querySelectorAll('input[name="olayTanimi[]"]:checked');
        const formData = {
            timestamp: new Date().toISOString(),
            olayTarihi: olayTarihi.value,
            olayTanimlari: Array.from(olayTanimiCheckboxes).map(cb => cb.value),
            olayAciklamasi: olayAciklamasi.value
        };

        // Verileri localStorage'a kaydet
        const ihbarlar = JSON.parse(localStorage.getItem('ihbarlar') || '[]');
        ihbarlar.push(formData);
        localStorage.setItem('ihbarlar', JSON.stringify(ihbarlar));

        // Başarı modalını göster
        successModal.style.display = 'block';
    });

    // Sayfa yüklendiğinde
    loadOlayTanimlari();
    generateCaptcha();
}); 