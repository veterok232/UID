// DOM Elements
const time = document.querySelector('#time'),
      _date = document.querySelector('#date'),
      first_day = document.querySelector('#first_day'),
      second_day = document.querySelector('#second_day'),
      third_day = document.querySelector('#third_day'),
      city_name_ = document.querySelector('#city');

//Names of days
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//Names of months
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "December"];
let timezone;


async function getTimeZone() {
  //const city_name_time = localStorage.getItem('city_name'); 


  console.log(city_name_time);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name_time}&lang=en&appid=1d787d982784cc402d387b4d048d56f9&units=metric`;
  const res = await fetch(url);
  if (!res.ok) {
      return;
  }

  const data = await res.json();
  timezone = Number(data.timezone) * 1000;
  console.log(timezone);
}

// Show Time
function showTime() {
  let tmp_date = new Date();
  let today = new Date(tmp_date.getTime() + timezone),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    day_name = today.getDay(),
    day_number = today.getDate(),
    month = today.getMonth();

  console.log(tmp_date.getTime());
  // Output Time
  time.textContent = `${hour}:${addZero(min)}`;
  _date.textContent = `${days[day_name]}, ${day_number} of ${months[month]}`;

  first_day.textContent = `${days[(day_name + 1) % 7]}`;
  second_day.textContent = `${days[(day_name + 2) % 7]}`;
  third_day.textContent = `${days[(day_name + 3) % 7]}`;

  first_day.textContent = first_day.textContent.toUpperCase();
  second_day.textContent = second_day.textContent.toUpperCase();
  third_day.textContent = third_day.textContent.toUpperCase();

  setTimeout(showTime, 60 * 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

async function showDateTime() {
  await getTimeZone();
  showTime();
}

showDateTime();