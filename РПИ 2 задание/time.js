// DOM Elements
const time = document.querySelector('.time');

//Names of days
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//Names of months
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "December"];

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
    day_name = today.getDay();
    day_number = today.getDate();
    month = today.getMonth();

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}
  <div class = "date">${days[day_name]}, ${day_number} of ${months[month]}</div>
  `;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Run
showTime();