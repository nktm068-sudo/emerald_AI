// --- 💎 ИЗУМРУДНЫЙ СКРИПТ (БЕСКОНЕЧНЫЙ РЕЖИМ 5.5) ---
const emerald = document.getElementById('emerald');
const statusText = document.getElementById('status');
const aiAnswer = document.getElementById('ai-answer');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function handleRequest() {
    const text = userInput.value.trim();
    if (text) {
        statusText.style.opacity = "1"; 
        statusText.innerText = " " + text;
        askAI(text);
        userInput.value = ""; 
    }
}

async function askAI(msg) {
    emerald.classList.add('thinking');
    aiAnswer.innerText = "Связь с Облачным Штабом...";
    try {
        const res = await fetch("https://emeraldcreator-emerald-plus-api.hf.space", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg }) 
        });
        const data = await res.json();
        const reply = data.choices.message.content; 
        aiAnswer.innerText = reply;
        speak(reply);
    } catch (e) {
        aiAnswer.innerText = "Ошибка связи (попробуйте через 1 минуту)";
    } finally {
        emerald.classList.remove('thinking');
    }
}

function speak(t) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = 'ru-RU';
    const voices = window.speechSynthesis.getVoices();
    const pavel = voices.find(v => v.name.includes('Pavel') || v.name.includes('Kirill'));
    u.voice = pavel || voices.find(v => v.lang.startsWith('ru'));
    window.speechSynthesis.speak(u);
}

if (sendBtn) sendBtn.onclick = handleRequest;
if (userInput) userInput.onkeypress = (e) => { if (e.key === 'Enter') handleRequest(); };

if (emerald) {
    emerald.onclick = () => {
        userInput.focus();
        handleRequest();
    };
}

document.body.addEventListener('click', () => {
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
}, { once: true });
