document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('report-form');
    const incidentDate = document.getElementById('incident-date');
    const incidentDescription = document.getElementById('incident-description');
    const charCounter = document.getElementById('char-counter');
    const submitButton = document.getElementById('submit-button');
    const captchaQuestion = document.getElementById('captcha-question');
    const captchaAnswer = document.getElementById('captcha-answer');
    const captchaExpected = document.getElementById('captcha-expected');
    const successModal = document.getElementById('success-modal');
    const incidentTypesContainer = document.getElementById('incident-types-container');



    const dropZone = document.getElementById("drop-zone");
    const fileInput = document.getElementById("file-input");
    const fileNameDisplay = document.getElementById("file-name");


    dropZone.addEventListener("click", function () {
        fileInput.click();
    });


    fileInput.addEventListener("change", function () {
        handleFileSelection(fileInput.files);
    });


    dropZone.addEventListener("dragover", function (e) {
        e.preventDefault();
        dropZone.classList.add("dragover");
    });

    dropZone.addEventListener("dragleave", function () {
        dropZone.classList.remove("dragover");
    });

    dropZone.addEventListener("drop", function (e) {
        e.preventDefault();
        dropZone.classList.remove("dragover");

        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            handleFileSelection(e.dataTransfer.files);
        }
    });

    function handleFileSelection(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type === "application/pdf") {
                fileNameDisplay.textContent = `Seçilen dosya: ${file.name}`;

            } else {
                fileNameDisplay.textContent = "Seçilen dosya: Yok";
                alert("Hata! Lütfen yalnızca PDF dosyası seçin.");
            }
        } else {
            fileNameDisplay.textContent = "Seçilen dosya: Yok";
        }
    }


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


    function removeError(element) {
        const formGroup = element.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }


    function clearAllErrors() {
        document.querySelectorAll('.error-message').forEach(error => error.remove());
    }


    function loadIncidentTypes() {
        incidentTypesContainer.innerHTML = '';
        incidentTypes.incidents.forEach(incident => {
            const checkboxItem = document.createElement('div');
            checkboxItem.className = 'checkbox-item';

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = incident.id;
            input.name = 'incident-type[]';
            input.value = incident.value;

            const label = document.createElement('label');
            label.htmlFor = incident.id;
            label.textContent = incident.label;

            checkboxItem.appendChild(input);
            checkboxItem.appendChild(label);
            incidentTypesContainer.appendChild(checkboxItem);
        });
    }


    function generateCaptcha() {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const expected = num1 + num2;
        captchaQuestion.textContent = `${num1} + ${num2} = ?`;
        captchaExpected.value = expected;
    }


    function validateForm() {
        clearAllErrors();
        let isValid = true;


        if (!incidentDate.value) {
            showError(incidentDate, 'Please select the incident date.');
            isValid = false;
        }


        const incidentTypeCheckboxes = document.querySelectorAll('input[name="incident-type[]"]:checked');
        if (incidentTypeCheckboxes.length === 0) {
            const firstCheckbox = incidentTypesContainer.querySelector('input[type="checkbox"]');
            showError(firstCheckbox, 'Please select at least one incident type.');
            isValid = false;
        }


        if (!incidentDescription.value || incidentDescription.value.length < 30) {
            showError(incidentDescription, 'Please enter at least 30 characters.');
            isValid = false;
        }


        if (!captchaAnswer.value || parseInt(captchaAnswer.value) !== parseInt(captchaExpected.value)) {
            showError(captchaAnswer, 'Incorrect answer to the math question.');
            generateCaptcha();
            captchaAnswer.value = '';
            isValid = false;
        }

        return isValid;
    }


    incidentDescription.addEventListener('input', function () {
        const length = this.value.length;
        if (length >= 50) {
            charCounter.textContent = `${length}/50 ✅`;
            charCounter.style.color = '#2ecc71';
            removeError(this);
        } else {
            charCounter.textContent = ` ${length}/50`;
            charCounter.style.color = '#e74c3c';
        }
    });


    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }


        const incidentTypeCheckboxes = document.querySelectorAll('input[name="incident-type[]"]:checked');
        const formData = {
            timestamp: new Date().toISOString(),
            incidentDate: incidentDate.value,
            incidentTypes: Array.from(incidentTypeCheckboxes).map(cb => cb.value),
            incidentDescription: incidentDescription.value
        };


        const reports = JSON.parse(localStorage.getItem('reports') || '[]');
        reports.push(formData);
        localStorage.setItem('reports', JSON.stringify(reports));


        successModal.style.display = 'block';
    });


    loadIncidentTypes();
    generateCaptcha();
});
