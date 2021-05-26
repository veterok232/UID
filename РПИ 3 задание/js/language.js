const language = document.getElementById('select_language'),
    en = document.getElementById('1'),
    ru = document.getElementById('2'),
    search1 = document.getElementById('city'),
    search2 = document.getElementById('submit_city');

// смена языка
function changeLanguage() {
    localStorage.setItem('language', language.value); 
    if (language.value === '1') {
        en.textContent = 'en';
        ru.textContent = 'ru';
        search1.placeholder = 'Enter city';
        search2.value = 'SEARCH';
        recognition.lang = 'en-US';
    }
    else if (language.value === '2') {
        en.textContent = 'анг';
        ru.textContent = 'рус';
        search1.placeholder = 'Введите город';
        search2.value = 'ПОИСК';
        recognition.lang = 'ru';
    }
    showTime();
    changeWeatherInfo();
    let loc = localStorage.getItem('location').split(',');
    const lat = loc[0];
    const lon = loc[1];
    updateLocationInfo(lat, lon);
}

// инициализация
function init() {
    if (localStorage.getItem('language') === null) {
        localStorage.setItem('language', 1);
    }
    language.value = localStorage.getItem('language');
    if (language.value === '1') {
        en.textContent = 'en';
        ru.textContent = 'ru';
        search1.placeholder = 'Enter city';
        search2.value = 'SEARCH';
    }
    else if (language.value === '2') {
        en.textContent = 'анг';
        ru.textContent = 'рус';
        search1.placeholder= 'Введите город';
        search2.value = 'ПОИСК';
    }
    language.addEventListener('click', changeLanguage);
}

init();