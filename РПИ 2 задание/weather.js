const weatherIcon = document.querySelector('#weather-icon'),
    temperature = document.querySelector('.temperature'),
    humidity = document.querySelector('.humidity'),
    wind = document.querySelector('.wind'),
    weatherDescription = document.querySelector('.weather-description'),
    city = document.getElementById('city');

// Вывод прогноза погоды
async function changeWeatherInfo() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=1d787d982784cc402d387b4d048d56f9&units=metric`;
    const res = await fetch(url);
    if (!res.ok) {
        while (weatherIcon.classList.length > 1) {
            weatherIcon.classList.remove(weatherIcon.classList.item(weatherIcon.classList.length - 1));
        }
        city.textContent = 'City is wrong.';
        humidity.textContent = ``;
        temperature.textContent = ``;
        wind.textContent = ``;
        weatherDescription.textContent = ``;
        return;
    }
    localStorage.setItem('city_name', city.textContent);
    const data = await res.json();
    while (weatherIcon.classList.length > 1) {
        weatherIcon.classList.remove(weatherIcon.classList.item(weatherIcon.classList.length - 1));
    }
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    humidity.textContent = `RHA: ${data.main.humidity}%,`;
    temperature.textContent = `Temperature: ${data.main.temp}°C,`;
    wind.textContent = `Wind speed: ${data.wind.speed} м/с,`;
    weatherDescription.textContent = data.weather[0].description + `.`;
}

// Нажатие на ENTER
function maybeChangeWeatherInfo(event) {
    if (event.keyCode == 13) {
        if (city.textContent === '') {
            city.textContent = localStorage.getItem('city_name');
        }
        changeWeatherInfo();
        city.blur();
    }
}

// Перезапись названия города
function restoreCityName() {
    let stored_city = localStorage.getItem('city_name');
    if (stored_city === null || stored_city === '') {
        city.textContent = '[Input city]';
    } else {
        city.textContent = stored_city;
    }
}

// Потеря фокуса
function focusLost(event) {
    if (event.type = 'blur') {
        if (city.textContent != '') {
            localStorage.setItem('city_name', city.textContent);
        } else {
            restoreCityName();
        }
    }
}

// Инициализация
function init() {
    restoreCityName();
    changeWeatherInfo();
    city.addEventListener('keypress', maybeChangeWeatherInfo);
    city.addEventListener('blur', focusLost);
    city.addEventListener('click', () => {
        city.textContent = '';
    });
}

init();