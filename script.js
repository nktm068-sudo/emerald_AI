// --- 💎 ИЗУМРУДНЫЙ КЛИКЕР 9.4 (SILENT CLOUD) ---
const emerald = document.getElementById('emerald');
const statusText = document.getElementById('status');
const aiAnswer = document.getElementById('ai-answer');

// 🔢 ПЕРЕМЕННЫЕ
let izumrudiki = 0;
let clickPower = 1;

// --- ☁️ СИНХРОНИЗАЦИЯ С ОБЛАКОМ ---
async function syncWithServer() {
    try {
        const res = await fetch("https://nktm068-sudo-serverjs-emeraldcr.hf.space");
        const data = await res.json();
        izumrudiki = data.score || 0;
        clickPower = data.power || 1;
        updateUI();
    } catch (e) {
        console.log("Cloud connection error");
    }
}

// --- 👋 ЗАПУСК ПРИ ЗАГРУЗКЕ ---
window.addEventListener('load', () => {
    syncWithServer(); // Сразу лезем в облако
    aiAnswer.innerText = "Система Активна."; // Кратко и по делу
});

function updateUI() {
    // Твой фирменный стиль "Пользователь + число"
    statusText.innerText = "Пользователь " + izumrudiki + " (Сила: x" + clickPower + ")";
    statusText.style.opacity = "1";
}

// --- 🖱️ ЛОГИКА ГИПЕР-КЛИКА ---
if (emerald) {
    emerald.onclick = async () => {
        // 1. Прибавляем изумруды
        izumrudiki += clickPower;
        updateUI();

        // 2. Вспышка экрана (Зеленая)
        document.body.style.backgroundColor = (clickPower > 1) ? "#94ff94" : "#ccffcc"; 
        setTimeout(() => document.body.style.backgroundColor = "#000000", 60);

        // 3. Эффект нажатия
        emerald.style.transform = "scale(0.95)";
        setTimeout(() => emerald.style.transform = "scale(1)", 50);

        // 4. МАГАЗИН: Авто-покупка X2 за 200 изумрудов
        if (izumrudiki >= 200 && clickPower === 1) {
            izumrudiki -= 200;
            clickPower = 2;
            aiAnswer.innerText = "Upgrade: x2 Active";
        }

        // 5. СОХРАНЕНИЕ В ОБЛАКО
        try {
            await fetch("https://nktm068-sudo-serverjs-emeraldcr.hf.space", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ score: izumrudiki, power: clickPower })
            });
        } catch (e) {
            console.log("Save error");
        }
    };
}
