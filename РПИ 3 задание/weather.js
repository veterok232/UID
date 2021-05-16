const weatherIcon = document.querySelector('#today_icon'),
    temperature = document.querySelector('#today_temperature'),
    humidity = document.querySelector('#today_info_humidity'),
    feels_like = document.querySelector('#today_info_feels'),
    wind = document.querySelector('#today_info_wind'),
    city_form = document.getElementById('weather_city_form'),
    city = document.querySelector('#city'),
    first_temperature = document.querySelector('#first_day_temperature'),
    first_icon = document.querySelector('#first_day_icon'),
    second_temperature = document.querySelector('#second_day_temperature'),
    second_icon = document.querySelector('#second_day_icon'),
    third_temperature = document.querySelector('#third_day_temperature'),
    third_icon = document.querySelector('#third_day_icon'),
    header_city = document.querySelector('#current_location'),
    temperature_format_form = document.querySelector('.temperature_format'),
    temperature_format_btn = document.getElementsByName('temperature_format'),
    btn_celsium = document.getElementById('btn_celsium'),
    btn_fahrenheit = document.getElementById('btn_fahrenheit');

//Форматы температуры
const CELSIUM = 0,
      FAHRENHEIT = 1;

let city_name = "";
let format = CELSIUM;
let units = ['metric', 'imperial'];  

// Вывод прогноза погоды
async function changeWeatherInfo() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&lang=en&appid=1d787d982784cc402d387b4d048d56f9&units=${units[format]}`;
    const res = await fetch(url);
    if (!res.ok) {
        return;
    }

    const data = await res.json();
    //Обновление карты
    if ((localStorage.getItem('location') !== null) && (localStorage.getItem('formatChanged') === null)) {
        localStorage.setItem('location', `${data.city.coord.lat},${data.city.coord.lon}`);
        getMap(localStorage.getItem('location'));
    }
    else {
        localStorage.setItem('location', `${data.city.coord.lat},${data.city.coord.lon}`);
    }

    header_city.textContent = `${data.city.name}, ${data.city.country}`;

    while (weatherIcon.classList.length > 1) {
        weatherIcon.classList.remove(weatherIcon.classList.item(weatherIcon.classList.length - 1));
    }
    weatherIcon.classList.add(`owf-${data.list[0].weather[0].id}`);
    humidity.textContent = `HUMIDITY: ${data.list[0].main.humidity}%`;
    temperature.textContent = `${data.list[0].main.temp.toFixed(0)}°`;
    wind.textContent = `WIND: ${data.list[0].wind.speed} м/с`;
    feels_like.textContent = `FEELS LIKE: ${data.list[0].main.feels_like}°`;

    while (first_icon.classList.length > 1) {
        first_icon.classList.remove(first_icon.classList.item(first_icon.classList.length - 1));
    }
    first_icon.classList.add(`owf-${data.list[8].weather[0].id}`);
    first_temperature.textContent = `${data.list[8].main.temp.toFixed(0)}°`;

    while (second_icon.classList.length > 1) {
        second_icon.classList.remove(second_icon.classList.item(second_icon.classList.length - 1));
    }
    second_icon.classList.add(`owf-${data.list[16].weather[0].id}`);
    second_temperature.textContent = `${data.list[16].main.temp.toFixed(0)}°`;

    while (third_icon.classList.length > 1) {
        third_icon.classList.remove(third_icon.classList.item(third_icon.classList.length - 1));
    }
    third_icon.classList.add(`owf-${data.list[24].weather[0].id}`);
    third_temperature.textContent = `${data.list[24].main.temp.toFixed(0)}°`;
}

//Получить город
async function getCity(e) {
    e.preventDefault();
    city.blur();

    var oldFormat = format;

    //Установка формата температуры
    if (temperature_format_form.temperature_format.value == 1) {
        format = CELSIUM;
    }
    else {
        format = FAHRENHEIT;
    }

    //Проверка на изменение формата для оптимизации карты
    if (oldFormat !== format) {
        localStorage.setItem('formatChanged', true);
        localStorage.setItem('temperature_format', format);
    }
    else {
        localStorage.removeItem('formatChanged');
    }

    //Изменение погоды
    if (city.value !== "") {
        city_name = city.value;
        localStorage.setItem('city_name', city_name);
        changeWeatherInfo();
    } 
    else {
        await getGeolocation();
        city_name = geolocation.city;
        localStorage.setItem('city_name', city_name);
        changeWeatherInfo();
    }
}

//Получить город из текущей геолокации
async function getGeolocationCity() {
    if (city.value !== "") {
        city_name = city.value;
        localStorage.setItem('city_name', city_name);
        changeWeatherInfo();
    } 
    else {
        await getGeolocation();
        city_name = geolocation.city;
        localStorage.setItem('city_name', city_name);
        changeWeatherInfo();
    }
}

//Получить текущую геолокацию
async function getGeolocation() {
    const url = "https://ipinfo.io/json?token=f294cabe543ad1";
    const res = await fetch(url);
    geolocation = await res.json();
}

// Инициализация
function init() {
    localStorage.removeItem('location');

    //Установить начальное значение кнопки температуры
    if (localStorage.getItem('temperature_format') !== null) {
        format = localStorage.getItem('temperature_format');
        if (format == CELSIUM) {
            btn_celsium.checked = 'true';
        }
        else if (format == FAHRENHEIT) {
            btn_fahrenheit.checked = 'true';
        }
    }

    getGeolocationCity();
    changeWeatherInfo();
}

city_form.addEventListener('submit', getCity);
temperature_format_form.addEventListener('change', getCity);

init();