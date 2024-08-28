// script.js
document.getElementById("startButton").addEventListener("click", function() {
    const progressBar = document.getElementById("progressBar");
    const progressContainer = document.getElementById("progressContainer");
    const progressText = progressContainer.querySelector("p");
    const container = document.querySelector(".container");
    const errorContainer = document.getElementById("errorContainer");
    const errorMessages = document.getElementById("errorMessages");
    const errorImage = document.getElementById("errorImage");
    const shareLink = document.getElementById("shareLink");

    // Función para generar un ID aleatorio (ej: 8 dígitos)
    function generateRandomID() {
        return Math.floor(10000000 + Math.random() * 90000000);
    }

    // Función para generar una IP aleatoria
    function generateRandomIP() {
        return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    }

    // Array con los diferentes textos que se mostrarán durante la extracción
    const extractionMessages = [
        "Extrayendo archivos del sistema...",
        `Extrayendo ID de usuario: ${generateRandomID()}...`,
        `Extrayendo IP: ${generateRandomIP()}...`,
        "Extrayendo datos de la nube...",
        "Extrayendo credenciales...",
        "Finalizando extracción..."
    ];

    let width = 0;
    let messageIndex = 0;
    const totalSteps = extractionMessages.length;  // Número total de etapas

    // Mostrar la barra de progreso
    progressContainer.classList.remove("hidden");

    const interval = setInterval(function() {
        if (width >= 100) {
            clearInterval(interval);

            // Cambiar el texto a "Gracias..." y desaparecer el contenido después de un tiempo
            progressText.textContent = "Gracias...";
            
            setTimeout(function() {
                progressContainer.style.display = "none";
                container.style.display = "none";
                errorImage.classList.remove("hidden");

                // Esperar un momento antes de mostrar los mensajes de error
                setTimeout(function() {
                    errorImage.classList.add("hidden");

                    // Construir el mensaje de error para WhatsApp
                    const errorMessage = "ERROR: Sistema no encontrado\n".repeat(10); // Repetir el mensaje 10 veces
                    
                    const encodedMessage = encodeURIComponent(errorMessage.trim());
                    const whatsappLink = `https://wa.me/?text=${encodedMessage}`; // Enlace para compartir mensaje

                    // Mostrar el mensaje en el contenedor de errores
                    errorMessages.innerHTML = `Puedes ver el mensaje completo en este enlace: <a href="${whatsappLink}" target="_blank">Abrir WhatsApp</a>`;
                    shareLink.href = whatsappLink;
                    shareLink.classList.remove("hidden");
                }, 2000); // Espera 2 segundos después de mostrar la imagen
            }, 2000); // Espera 2 segundos antes de empezar a mostrar mensajes de error
        } else {
            width++;
            progressBar.style.width = width + "%";

            // Cambiar el mensaje cuando el progreso alcanza cada etapa
            if (width >= (messageIndex + 1) * (100 / totalSteps)) {
                progressText.textContent = extractionMessages[messageIndex];
                messageIndex++;
            }
        }
    }, 100); // Simula el progreso en 10 segundos (100 ms por incremento)
});
