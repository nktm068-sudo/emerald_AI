// --- ФУНКЦИИ ПАМЯТИ (КУКИ НА 10 ЛЕТ) ---
function setCookie(name, value, days) {
    let date = new Date();
    // 3650 дней — это 10 лет! Практически навсегда.
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// --- ПЕРЕМЕННЫЕ ИГРЫ ---
// Пытаемся достать старый счёт из "вечных" куки
let score = parseInt(getCookie('eternal_emeralds')) || 0;
let strength = parseInt(getCookie('emerald_strength')) || 1;

const item = document.getElementById('main-item');
const scoreText = document.getElementById('score-display');

// Показываем счёт сразу
scoreText.innerText = score;

// --- ЛОГИКА КЛИКА ---
item.onclick = function() {
    score += strength;
    scoreText.innerText = score;
    
    // Сохраняем результат на 3650 дней (10 лет)
    setCookie('eternal_emeralds', score, 3650);
};
