const time = document.querySelector('#time'),
      _date = document.querySelector('#date'),
      first_day = document.querySelector('#first_day'),
      second_day = document.querySelector('#second_day'),
      third_day = document.querySelector('#third_day');

const daysEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "December"];

const daysRu = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const monthsRu = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Декабрь"];

// отображение времени и даты
function showTime() {
  let curr_language = localStorage.getItem('language');
  let tmp = new Date(),
    offset1 = tmp.getTimezoneOffset() * 60 * 1000,
    offset2 = localStorage.getItem('timezone'),
    need_time = tmp.getTime() + Number(offset1) + Number(offset2);
  let today = new Date(need_time),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    day_name = today.getDay(),
    day_number = today.getDate(),
    month = today.getMonth();
  
  if (curr_language === '1')
  {
    time.textContent = `${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
    _date.textContent = `${daysEn[day_name]} ${day_number}, ${monthsEn[month]}`;
  
    first_day.textContent = `${daysEn[(day_name + 1) % 7]}`;
    second_day.textContent = `${daysEn[(day_name + 2) % 7]}`;
    third_day.textContent = `${daysEn[(day_name + 3) % 7]}`;
  }
  else if (curr_language === '2')
  {
    time.textContent = `${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
    _date.textContent = `${daysRu[day_name]} ${day_number}, ${monthsRu[month]}`;
  
    first_day.textContent = `${daysRu[(day_name + 1) % 7]}`;
    second_day.textContent = `${daysRu[(day_name + 2) % 7]}`;
    third_day.textContent = `${daysRu[(day_name + 3) % 7]}`;
  }
  

  first_day.textContent = first_day.textContent.toUpperCase();
  second_day.textContent = second_day.textContent.toUpperCase();
  third_day.textContent = third_day.textContent.toUpperCase();

  setTimeout(showTime, 1000);
}

// добавление нулей
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

showTime();
