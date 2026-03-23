const emerald = document.getElementById('emerald');
const statusText = document.getElementById('status');
const aiAnswer = document.getElementById('ai-answer');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// --- 1. ЛОГИКА ОТПРАВКИ (ТВОЁ УПРАВЛЕНИЕ) ---
function handleRequest() {
    const text = userInput.value.trim();
    if (text) {
        statusText.style.opacity = "1"; 
        statusText.style.color = ""; 
        statusText.innerText = "Никита: " + text;
        askAI(text);
        userInput.value = ""; 
    }
}
if (sendBtn) sendBtn.onclick = handleRequest;
if (userInput) userInput.onkeypress = (e) => { if (e.key === 'Enter') handleRequest(); };

// --- 2. ЗАПРОС К ОБЛАЧНОМУ МОЗГУ (HUGGING FACE) ---
async function askAI(msg) {
    emerald.classList.add('thinking');
    aiAnswer.innerText = "Связь с Облачным Штабом...";
    
    try {
        // ТВОЯ НОВАЯ ОБЛАЧНАЯ ССЫЛКА (Прямое попадание!)
        const res = await fetch("https://emeraldcreator-emerald-plus-api.hf.space", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg }) 
        });

        if (!res.ok) throw new Error("Offline");

        const data = await res.json();
        
        // Достаем чистое мясо (Reply) из ответа твоего сервера
        const reply = data.choices[0].message.content; 
        
        aiAnswer.innerText = reply;
        
        // Перед речью чистим старые звуки
        window.speechSynthesis.cancel();
        speak(reply);

    } catch (e) {
        aiAnswer.innerText = "Облачный Штаб перегружен (проверь статус Running)";
    } finally {
        emerald.classList.remove('thinking');
    }
}

// --- 3. УМНЫЙ ГОЛОС + ТИХИЙ РЕЖИМ (22:00 - 05:00) ---
function speak(t) {
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 5) {
        statusText.style.color = "DarkGreen"; 
        statusText.style.opacity = "1";
        statusText.innerText = "🌙 Режим ниндзя: ответ только текстом.";
        return; 
    }
    statusText.style.opacity = "0"; 
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = 'ru-RU';
    const voices = window.speechSynthesis.getVoices();
    const russianVoice = voices.find(v => v.lang.startsWith('ru'));
    if (russianVoice) u.voice = russianVoice;
    u.pitch = 1.1; 
    u.rate = 1.0;  
    window.speechSynthesis.speak(u);
}
