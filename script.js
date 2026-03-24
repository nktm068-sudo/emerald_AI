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
        aiAnswer.innerText = Сервер перегружен(подождите 10 минут)";
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
