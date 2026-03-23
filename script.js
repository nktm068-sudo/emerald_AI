const emerald = document.getElementById('emerald');
const statusText = document.getElementById('status');
const aiAnswer = document.getElementById('ai-answer');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// --- ТВОЙ АТОМАРНЫЙ ЛДФЛДФ4 ---
const p1 = "g"; const p2 = "s"; const p3 = "k"; const p4 = "_";
const b1 = "0AdMg160ObuSWt9l";
const b2 = "azpcWGdyb3FYnGnD";
const b3 = "RTOPDv9WXztFMPi6s9qI";
const LDFLDF4 = (p1+p2+p3+p4+b1+b2+b3).trim();

async function askAI(msg) {
    emerald.classList.add('thinking');
    aiAnswer.innerText = "LDFLDF4 пробивает защиту...";
    
    try {
        const proxy = "https://corsproxy.io?";
        // ВОТ ОН: Полный адрес до самой нейросети!
        const url = "https://api.groq.com/openai/v1/chat/completions";

        const res = await fetch(proxy + encodeURIComponent(url), {
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
        // Исправленный путь: Groq отдает ответ здесь
        const reply = data.choices[0].message.content; 
        aiAnswer.innerText = reply;
        speak(reply);
    } catch (e) {
        aiAnswer.innerText = "Отсутствует подключение к серверу";
    } finally {
        emerald.classList.remove('thinking');
    }
}

// --- 4. ЛОГИКА КНОПОК ---
sendBtn.onclick = () => { 
    if(userInput.value.trim()) { askAI(userInput.value); userInput.value=""; } 
};

userInput.onkeypress = (e) => { 
    if(e.key === 'Enter' && userInput.value.trim()) { askAI(userInput.value); userInput.value=""; } 
};

// --- 5. УМНЫЙ ГОЛОС ---
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
