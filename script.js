// --- 💎 ИЗУМРУДНЫЙ КЛИКЕР 10.1 (БЕЗОПАСНАЯ ВЕРСИЯ) ---
const emerald = document.getElementById('emerald');
const statusText = document.getElementById('status');

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
    syncWithServer();
});

function updateUI() {
    statusText.innerText = "Пользователь " + izumrudiki + " (Сила: x" + clickPower + ")";
    statusText.style.opacity = "1";
}

// --- 🖱️ ЛОГИКА ГИПЕР-КЛИКА ---
if (emerald) {
    emerald.onclick = async () => {
        // 1. Прибавляем изумруды
        izumrudiki += clickPower;
        updateUI();

                // 🟢 2. ПЛАВНОЕ СВЕЧЕНИЕ (Затухает медленно)
        emerald.style.transition = "filter 0.1s"; // Вспышка быстрая
        emerald.style.filter = "drop-shadow(0 0 50px #00ff00)";

        setTimeout(() => {
            emerald.style.transition = "filter 1.5s ease-out"; // Затухание 1.5 сек!
            emerald.style.filter = "drop-shadow(0 0 20px #00ff00)";
        }, 100);


        // 3. Тряска
        emerald.style.transform = "scale(0.95)";
        setTimeout(() => emerald.style.transform = "scale(1)", 50);

        // 4. МАГАЗИН: Авто x2 за 200
        if (izumrudiki >= 200 && clickPower === 1) {
            izumrudiki -= 200;
            clickPower = 2;
            updateUI();
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
