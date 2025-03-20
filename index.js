const secenekler = [
    "Dart Programlama",
    "Flutter UI Tasarımı",
    "Firebase Kullanımı",
    "PHP Backend",
    "SQL Veritabanı",
    "React.js Frontend",
    "Node.js Backend",
    "HTML & CSS",
    "JavaScript ES6+",
    "Python ve AI",
    "Linux Komutları",
    "Docker ve Kubernetes",
    "Machine Learning",
    "Cyber Security",
    "Mobil Oyun Geliştirme",
    "Blockchain",
    "Arduino ile IoT",
    "Robotik Kodlama",
    "Yapay Zeka Uygulamaları",
    "Cloud Computing",
    "Kotlin ile Android",
    "Swift ile iOS",
    "Game Development",
    "VR ve AR Teknolojileri",
    "Full Stack Development",
    "DevOps Temelleri",
    "Agile & Scrum",
    "C# ve ASP.NET",
    "Golang Backend",
    "Big Data & Analytics",

];

const checkboxGroup = document.getElementById("checkbox-group")


document.addEventListener("DOMContentLoaded", function () {

    secenekler.forEach((secenek) => {
        const div = document.createElement("div")
        div.className = "checkbox-item"
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.name = "options[]";
        checkbox.value = secenek;

        const label = document.createElement("label")
        label.textContent = secenek;

        div.appendChild(checkbox)
        div.appendChild(label)
        checkboxGroup.appendChild(div)
    })

})