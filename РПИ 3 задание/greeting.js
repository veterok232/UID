const greeting = document.querySelector('.greeting'),
      name = document.querySelector('.name');

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 6) {
    images_path = "assets/images/night/";
    greeting.textContent = 'Good Night, ';
  }  
  else if (hour < 12) {
    images_path = "assets/images/morning/";
    greeting.textContent = 'Good Morning, ';
  } 
  else if (hour < 18) {
    images_path = "assets/images/day/";
    greeting.textContent = 'Good Afternoon, ';
  } 
  else {
    images_path = "assets/images/evening/";
    greeting.textContent = 'Good Evening, ';
  }
}

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
      name.textContent = '[Enter Name]';
    } else {
      name.textContent = localStorage.getItem('name');
    }
  }
  
// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText !== "") {
        localStorage.setItem('name', e.target.innerText);
      } 
      else {
        e.target.textContent = localStorage.getItem('name');
      }
    
    name.blur();
    }
  } 
  else {
    if (e.target.innerText !== "") {
      localStorage.setItem('name', e.target.innerText);
    } 
    else {
      e.target.textContent = localStorage.getItem('name');
    }
  }
}

function clickName(e) {
  if (e.which === 1) {
    localStorage.setItem('name', e.target.innerText);
    e.target.innerText = "";
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', clickName);

setBgGreet();
getName();