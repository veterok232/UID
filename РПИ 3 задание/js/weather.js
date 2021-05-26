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
    btn_fahrenheit = document.getElementById('btn_fahrenheit'),
    today_info_overcast = document.getElementById('today_info_overcast');

const CELSIUM = 0,
      FAHRENHEIT = 1;

let city_name = "";
let format = CELSIUM;
let units = ['metric', 'imperial'];  

// вывод прогноза погоды
async function changeWeatherInfo() {
    let curr_language = localStorage.getItem('language');
    let lang = "";
    if (curr_language === '1')
        lang = "en";
    else if (curr_language === '2')
        lang = "ru";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&lang=${lang}&appid=1d787d982784cc402d387b4d048d56f9&units=${units[format]}`;
    const res = await fetch(url);
    if (!res.ok) {
        return;
    }

    const data = await res.json();

    if ((localStorage.getItem('location') !== null) && (localStorage.getItem('formatChanged') === null)) {
        localStorage.setItem('location', `${data.city.coord.lat},${data.city.coord.lon}`);
        getMap(localStorage.getItem('location'));
    }
    else {
        localStorage.setItem('location', `${data.city.coord.lat},${data.city.coord.lon}`);      
    }

    localStorage.setItem('timezone', Number(data.city.timezone) * 1000);
    header_city.textContent = `${data.city.name}, ${data.city.country}`;

    while (weatherIcon.classList.length > 1) {
        weatherIcon.classList.remove(weatherIcon.classList.item(weatherIcon.classList.length - 1));
    }
    weatherIcon.classList.add(`owf-${data.list[0].weather[0].id}`);

    if (curr_language === '1')
    {
        today_info_overcast.textContent = `WEATHER: ${data.list[0].weather[0].description}`;
        humidity.textContent = `HUMIDITY: ${data.list[0].main.humidity}%`;
        temperature.textContent = `${data.list[0].main.temp.toFixed(0)}°`;
        wind.textContent = `WIND: ${data.list[0].wind.speed} m/s`;
        feels_like.textContent = `FEELS LIKE: ${data.list[0].main.feels_like}°`;
    }
    else if (curr_language === '2') {
        today_info_overcast.textContent = `ПОГОДА: ${data.list[0].weather[0].description}`;
        humidity.textContent = `О.В.В: ${data.list[0].main.humidity}%`;
        temperature.textContent = `${data.list[0].main.temp.toFixed(0)}°`;
        wind.textContent = `ВЕТЕР: ${data.list[0].wind.speed} м/с`;
        feels_like.textContent = `ОЩУЩАЕТСЯ КАК: ${data.list[0].main.feels_like}°`;
    }

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

// получение города
async function getCity(e) {
    e.preventDefault();
    city.blur();

    var oldFormat = format;

    if (temperature_format_form.temperature_format.value == 1) {
        format = CELSIUM;
    }
    else {
        format = FAHRENHEIT;
    }

    if (oldFormat != format) {
        localStorage.setItem('formatChanged', true);
        localStorage.setItem('temperature_format', format);
    }
    else {
        localStorage.removeItem('formatChanged');
    }

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

// получение города из текущей геолокации
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

// получение текущей геолокации
async function getGeolocation() {
    const url = "https://ipinfo.io/json?token=f294cabe543ad1";
    const res = await fetch(url);
    geolocation = await res.json();
}

// инициализация
function init() {
    localStorage.removeItem('location');

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