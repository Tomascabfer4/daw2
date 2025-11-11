const chatMessages = document.getElementById("chat-messages");
const typingIndicator = document.getElementById("typing-indicator");

const user1Input = document.getElementById("user1-input");
const user2Input = document.getElementById("user2-input");
const user1Send = document.getElementById("user1-send");
const user2Send = document.getElementById("user2-send");

let typingTimeout;

// Simula el efecto de "escribiendo..."
function showTypingIndicator() {
    typingIndicator.style.visibility = "visible";
}

function hideTypingIndicator() {
    typingIndicator.style.visibility = "hidden";
}

// Función para agregar mensajes al chat
function addMessage(user, text) {
    const message = document.createElement("div");
    message.classList.add("message", user);
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Simula que el usuario está escribiendo
function simulateTyping(userInput) {
    showTypingIndicator();
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        hideTypingIndicator();
    }, 1000);
}

// Enviar mensaje para el usuario 1
user1Send.addEventListener("click", () => {
    const text = user1Input.value.trim();
    if (text) {
        addMessage("user1", `Usuario 1: ${text}`);
        user1Input.value = "";
    }
    hideTypingIndicator();
});

// Enviar mensaje para el usuario 2
user2Send.addEventListener("click", () => {
    const text = user2Input.value.trim();
    if (text) {
        addMessage("user2", `Usuario 2: ${text}`);
        user2Input.value = "";
    }
    hideTypingIndicator();
});

// Detectar escritura para mostrar indicador
user1Input.addEventListener("input", () => simulateTyping(user1Input));
user2Input.addEventListener("input", () => simulateTyping(user2Input));
