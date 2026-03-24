// --- ТВОЙ АЛМАЗНЫЙ СКРИПТ (EMERALD PLUS) ---
const emerald = document.getElementById('emerald');
const statusText = document.getElementById('status');
const aiAnswer = document.getElementById('ai-answer');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function handleRequest() {
    const text = userInput.value.trim();
    if (text) {
        statusText.style.opacity = "1"; 
        statusText.innerText = "Никита: " + text;
        askAI(text);
        userInput.value = ""; 
    }
}
if (sendBtn) sendBtn.onclick = handleRequest;
if (userInput) userInput.onkeypress = (e) => { if (e.key === 'Enter') handleRequest(); };

async function askAI(msg) {
    if (!navigator.onLine) {
        aiAnswer.innerText = "❌ Извините, но...КАЖЕТСЯ ИНТЕРНЕТА НЕТУ";
        speak("Отсуствует подключение к интернету");
        return;
    }
    emerald.classList.add('thinking');
    aiAnswer.innerText = "Связь с Облачным Штабом...";
    try {
        const res = await fetch("https://emeraldcreator-emerald-plus-api.hf.space", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg }) 
        });
        const data = await res.json();
        const reply = data.choices[0].message.content; // Достаем мясо!
        aiAnswer.innerText = reply;
        window.speechSynthesis.cancel();
        speak(reply);
    } catch (e) {
        aiAnswer.innerText = "Сервер перегружен(подождите 10 минут)";
    } finally {
        emerald.classList.remove('thinking');
    }
}

function speak(t) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = 'ru-RU';
    const voices = window.speechSynthesis.getVoices();
    const pavel = voices.find(v => v.name.includes('Pavel'));
    u.voice = pavel || voices.find(v => v.lang.startsWith('ru'));
    window.speechSynthesis.speak(u);
}
// --- 🎙️ СУПЕР-АКТИВАТОР ГОЛОСА EMERALD PLUS (Приказ №178) ---

// 1. РАЗБЛОКИРОВКА ПАВЛА (Жмем на экран — голос просыпается)
document.body.addEventListener('click', () => {
    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
    }
    // Тестовый «писк» системы, чтобы Хром понял: мы серьезно!
    const msg = new SpeechSynthesisUtterance("");
    window.speechSynthesis.speak(msg);
}, { once: true });

// 2. ОЖИВЛЯЕМ КНОПКУ-КРУГ (ИЗУМРУД)
const emeraldCircle = document.getElementById('emerald');
if (emeraldCircle) {
    emeraldCircle.onclick = () => {
        // Когда жмешь на круг — фокус идет в поле ввода и срабатывает логика
        const inputField = document.getElementById('user-input');
        if (inputField) inputField.focus();
        
        // Если в поле что-то есть — отправляем, если нет — просто будим Изумрудика
        if (typeof handleRequest === 'function') {
            handleRequest();
        }
    };
}

// 3. ФУНКЦИЯ ГОВОРИТЬ (Чтобы Павел точно нашел свой голос)
function speak(text) {
    window.speechSynthesis.cancel(); // Гасим старые звуки
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    
    // Ищем Павла в системе
    const voices = window.speechSynthesis.getVoices();
    const pavel = voices.find(v => v.name.includes('Pavel') || v.name.includes('Kirill'));
    
    if (pavel) utterance.voice = pavel;
    utterance.rate = 1.0; // Скорость CEO
    utterance.pitch = 1.0; // Тон Самурая
    
    window.speechSynthesis.speak(utterance);
}
