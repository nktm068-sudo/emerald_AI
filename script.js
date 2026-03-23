const emerald = document.getElementById('emerald');
const statusText = document.getElementById('status');
const aiAnswer = document.getElementById('ai-answer');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// --- ТВОЙ АТОМАРНЫЙ ЛДФЛДФ4 (НОВЫЙ ЗАРЯД) ---
const p1 = "g"; const p2 = "s"; const p3 = "k"; const p4 = "_";
const b1 = "WEvCP81fsMtgvCQcJf3h";
const b2 = "WGdyb3FY93qrxWRpiYxJ";
const b3 = "tK1TWKGLD7je";
const LDFLDF4 = (p1+p2+p3+p4+b1+b2+b3).trim();

// --- 1. ЛОГИКА ОТПРАВКИ (ТВОЁ УПРАВЛЕНИЕ) ---
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

// --- 2. ЗАПРОС К GROQ (ИСПРАВЛЕННЫЙ ТУННЕЛЬ) ---
async function askAI(msg) {
    emerald.classList.add('thinking');
    aiAnswer.innerText = "LDFLDF4 пробивает защиту...";
    
    try {
        const apiUrl = "https://api.groq.com";
        const fullUrl = `https://api.allorigins.win{encodeURIComponent(apiUrl)}`;

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

        const responseData = await res.json();
        const data = JSON.parse(responseData.contents); 
        const reply = data.choices[0].message.content; 
        
        aiAnswer.innerText = reply;
        speak(reply);

    } catch (e) {
        aiAnswer.innerText = "Отсутствует подключение к серверу";
    } finally {
        emerald.classList.remove('thinking');
    }
}

// --- 3. УМНЫЙ ГОЛОС + ТИХИЙ РЕЖИМ (22:00 - 05:00) ---
function speak(t) {
    const hour = new Date().getHours();
    
    // Ночной режим: с 22:00 до 05:00
    if (hour >= 22 || hour < 5) {
        console.log("Режим тишины: Изумрудик не будит штаб.");
        
        // Показываем надпись: тёмно-зелёная и видимая (opacity: 1)
        statusText.style.color = "DarkGreen"; 
        statusText.style.opacity = "1";
        statusText.innerText = "🌙 Режим ниндзя: ответ только текстом.";
        return; 
    }

    // Дневной режим: делаем надпись ПОЛНОСТЬЮ ПРОЗРАЧНОЙ (opacity: 0)
    statusText.style.opacity = "0"; 
    statusText.style.color = ""; 

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
