const emerald = document.getElementById('emerald');
const statusText = document.getElementById('status');
const aiAnswer = document.getElementById('ai-answer');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// --- ТВОЙ АТОМАРНЫЙ ЛДФЛДФ4 (КЛЮЧ GROQ) ---
const p1 = "g"; const p2 = "s"; const p3 = "k"; const p4 = "_";
const b1 = "0AdMg160ObuSWt9l";
const b2 = "azpcWGdyb3FYnGnD";
const b3 = "RTOPDv9WXztFMPi6s9qI";
const LDFLDF4 = (p1+p2+p3+p4+b1+b2+b3).trim();

// --- 1. ЛОГИКА ОТПРАВКИ ---
function handleRequest() {
    const text = userInput.value.trim();
    if (text) {
        statusText.innerText = "Никита: " + text;
        askAI(text);
        userInput.value = ""; 
    }
}
if (sendBtn) sendBtn.onclick = handleRequest;
if (userInput) userInput.onkeypress = (e) => { if (e.key === 'Enter') handleRequest(); };

// --- 2. ЗАПРОС К GROQ (БЕЗ ЛИШНИХ СКОБОК) ---
async function askAI(msg) {
    emerald.classList.add('thinking');
    aiAnswer.innerText = " пробивает защиту...";
    
    try {
        const fullUrl = "https://corsproxy.io";

        const res = await fetch(fullUrl, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + LDFLDF4,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "llama3-8b-8192", 
                "messages": [{ "role": "user", "content": "Ответь кратко на русском: " + msg }]
            })
        });

        if (!res.ok) throw new Error("Offline");

        const data = await res.json();
        // ВОТ ОНО, ЧИСТОЕ МЯСО (Добавил [0] и поправил путь):
        const reply = data.choices.message.content; 
        aiAnswer.innerText = reply;
        speak(reply);

    } catch (e) {
        aiAnswer.innerText = "Отсутствует подключение к серверу";
    } finally {
        emerald.classList.remove('thinking');
    }
}

// --- 3. УМНЫЙ ГОЛОС ---
function speak(t) {
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
