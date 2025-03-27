document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('report-form');
    const incidentDate = document.getElementById('incident-date');
    const incidentDescription = document.getElementById('incident-description');
    const charCounter = document.getElementById('char-counter');
    const submitButton = document.getElementById('submit-button');
    const captchaQuestion = document.getElementById('captcha-question');
    const captchaAnswer = document.getElementById('captcha-answer');
    const captchaError = document.getElementById('captcha-error');
    const successModal = document.getElementById('success-modal');
    const incidentTypesContainer = document.getElementById('incident-types-container');
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');
    const modalButton = document.getElementById('modal-button')
    const loadingOverlay = document.getElementById('loading-overlay');
    let eventDateInput = document.getElementById("incident-date");

    let captchaExpectedValue;


    let today = new Date().toISOString().split("T")[0];
    eventDateInput.setAttribute("max", today);

    eventDateInput.addEventListener("change", function () {
        let selectedDate = new Date(this.value);
        let todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        if (selectedDate > todayDate) {
            alert("Gelecek tarihler seçilemez! Lütfen bugünün tarihine kadar bir tarih girin.");
            this.value = "";
        }
    });


    dropZone.addEventListener("click", function () {
        fileInput.click();
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
    fileInput.addEventListener("change", function () {
        handleFileSelection(fileInput.files);
    });

    modalButton.addEventListener("click", function () {
        window.location.reload();
    })


    let selectedFiles = [];


    function handleFileSelection(files) {
        const maxFiles = 3;
        const maxSize = 10 * 1024 * 1024;
        const validFiles = [...selectedFiles];

        if (validFiles.length + files.length > maxFiles) {
            alert(`En fazla ${maxFiles} dosya seçebilirsiniz.`);
            return;
        }

        for (const file of files) {
            if (file.size > maxSize) {
                alert(`Yüklenen dosya boyutu 10 MB'dan büyük olamaz.`);
                continue;
            }


            if (!validFiles.some(existingFile => existingFile.name === file.name)) {
                validFiles.push(file);
            }
        }

        selectedFiles = validFiles;
        updateFileListDisplay();
    }


    function updateFileListDisplay() {

        fileList.innerHTML = '';

        if (selectedFiles && selectedFiles.length > 0) {
            selectedFiles.forEach((file, index) => {
                const fileDiv = document.createElement('div');
                fileDiv.className = 'file-item';
                fileDiv.style.display = 'flex';
                fileDiv.style.alignItems = 'center';
                fileDiv.style.justifyContent = 'space-between';
                fileDiv.style.marginBottom = '5px';

                const fileNameSpan = document.createElement('span');
                fileNameSpan.textContent = file.name;

                const removeBtn = document.createElement('button');
                removeBtn.textContent = '✖';
                removeBtn.style.width = '20px';
                removeBtn.style.height = '20px';
                removeBtn.style.padding = '0';
                removeBtn.style.fontSize = '12px';
                removeBtn.style.cursor = 'pointer';
                removeBtn.addEventListener('click', function () {
                    removeFile(index);
                });

                fileDiv.appendChild(fileNameSpan);
                fileDiv.appendChild(removeBtn);
                fileList.appendChild(fileDiv);


                if (index < selectedFiles.length - 1) {
                    const br = document.createElement('br');
                    fileList.appendChild(br);
                }
            });
        } else {
            fileList.textContent = 'Seçilen dosya: Yok';
        }
    }

    function removeFile(index) {
        selectedFiles.splice(index, 1);
        updateFileListDisplay();
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
        if (errorDiv) errorDiv.remove();
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
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        captchaExpectedValue = num1 + num2;
        captchaQuestion.textContent = `${num1} + ${num2} = ?`;
        captchaAnswer.value = "";
        if (captchaError) {
            captchaError.style.display = "none";
        }
    }

    function validateForm() {
        clearAllErrors();
        let isValid = true;
        if (!incidentDate.value) {
            showError(incidentDate, 'Lütfen olay tarihini giriniz.');
            isValid = false;
        }
        const incidentTypeCheckboxes = document.querySelectorAll('input[name="incident-type[]"]:checked');
        if (incidentTypeCheckboxes.length === 0) {
            const firstCheckbox = incidentTypesContainer.querySelector('input[type="checkbox"]');
            showError(firstCheckbox, 'Lütfen en az bir ihbar türü seçiniz');
            isValid = false;
        }
        if (!incidentDescription.value || incidentDescription.value.length < 30) {
            showError(incidentDescription, 'Lütfen en az 50 karakter giriniz.');
            isValid = false;
        }
        if (!captchaAnswer.value || parseInt(captchaAnswer.value) !== captchaExpectedValue) {
            showError(captchaAnswer, 'Yanlış cevap! Lütfen tekrar deneyin.');
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


    async function createPDF(formData, files) {
        const { PDFDocument, rgb } = PDFLib;
        const fontkit = window.fontkit;
        const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontkit);
        const page = pdfDoc.addPage([600, 400]);
        const { width, height } = page.getSize();


        const fontBytes = await fetch('fonts/Roboto_Condensed-Regular.ttf').then(res => res.arrayBuffer());
        const customFont = await pdfDoc.embedFont(fontBytes);

        page.drawText(`Olay Tarihi: ${formData.incidentDate}`, { x: 50, y: height - 50, size: 12, font: customFont, color: rgb(0, 0, 0) });
        page.drawText(`Olay Türleri: ${formData.incidentTypes.join(', ')}`, { x: 50, y: height - 70, size: 12, font: customFont, color: rgb(0, 0, 0) });
        page.drawText(`Olay Açıklaması: ${formData.incidentDescription}`, {
            x: 50,
            y: height - 90,
            size: 12,
            font: customFont,
            color: rgb(0, 0, 0),
            maxWidth: 500,
            lineHeight: 14
        });


        if (files && files.length > 0) {
            for (const file of files) {
                if (file.type === "application/pdf") {
                    const fileBytes = await file.arrayBuffer();
                    const extPdf = await PDFDocument.load(fileBytes);
                    const copiedPages = await pdfDoc.copyPages(extPdf, extPdf.getPageIndices());
                    copiedPages.forEach(p => pdfDoc.addPage(p));
                } else if (file.type.startsWith("image/")) {
                    const imgBytes = await file.arrayBuffer();
                    let image;
                    if (file.type === "image/jpeg") {
                        image = await pdfDoc.embedJpg(imgBytes);
                    } else if (file.type === "image/png") {
                        image = await pdfDoc.embedPng(imgBytes);
                    } else {
                        alert(`${file.name} formatı desteklenmiyor.`);
                        continue;
                    }

                    const imgPage = pdfDoc.addPage();
                    const { width: imgPageWidth, height: imgPageHeight } = imgPage.getSize();
                    const imgDims = image.scale(0.5);
                    const x = (imgPageWidth - imgDims.width) / 2;
                    const y = (imgPageHeight - imgDims.height) / 2;
                    imgPage.drawImage(image, { x, y, width: imgDims.width, height: imgDims.height });
                } else {
                    alert(`${file.name} dosya tipi desteklenmiyor.`);
                }
            }
        }

        const mergedPdfBytes = await pdfDoc.save();
        return mergedPdfBytes;
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        loadingOverlay.style.display = 'flex';

        if (!validateForm()) {

            loadingOverlay.style.display = 'none';
            generateCaptcha()

            return;
        }

        const csrfToken = document.querySelector('input[name="csrf_token"]').value;

        const incidentTypeCheckboxes = document.querySelectorAll('input[name="incident-type[]"]:checked');
        const formData = {
            timestamp: new Date().toISOString(),
            incidentDate: incidentDate.value,
            incidentTypes: Array.from(incidentTypeCheckboxes).map(cb => cb.value),
            incidentDescription: incidentDescription.value
        };


        const pdfBytes = await createPDF(formData, selectedFiles);
        console.log(selectedFiles);

        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });


        const formDataToSend = new FormData();
        formDataToSend.append('csrf_token', csrfToken);
        formDataToSend.append('pdf', pdfBlob, 'ihbar_raporu.pdf');
        formDataToSend.append('formData', JSON.stringify(formData));


        try {
            const response = await fetch('send_report.php', {
                method: 'POST',
                body: formDataToSend
            });

            const result = await response.json();
            if (result.success) {
                successModal.style.display = 'block';
            } else {
                alert('Rapor gönderme sırasında bir hata oluştu.');
            }
        } catch (error) {
            console.error('Hata Detayı:', error);
            alert('Rapor gönderme sırasında bir hata oluştu: ' + error.message);
        }
        finally {
            loadingOverlay.style.display = 'none';
        }
    });

    loadIncidentTypes();
    generateCaptcha();
});
