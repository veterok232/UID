const body = document.querySelector('body'),
      btn = document.querySelector('#btn_reset'),
      reset = document.querySelector("#reset");

// получение параметра поиска картинки
function defBGCategory() {
  let today = new Date(),
  hour = today.getHours();

  let time = "";

  if (hour < 6) {
    time = "night";
  }  
  else if (hour < 12) {
    time = "morning";
  } 
  else if (hour < 18) {
    time = "day";
  }
  else {
    time = "evening";
  }

  return time;
}

// отображение картинки
function viewBgImage(src) {
    const img = new Image();
    img.src = src;
    img.onload = () => {      
      body.style.backgroundImage = `url('${src}')`;
    }; 
  }

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
  
// получение картинки
async function getImage() {
    let time = defBGCategory();
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${time}&client_id=1sglvfJfpDp9O2bgAeq9onCoiGf11E0dqWrp9rMJv1A`;
    const res = await fetch(url);
    const data = await res.json();

    const imageSrc = data.urls.regular;
    console.log(time);
    viewBgImage(imageSrc);
    setTimeout(getImage, 3600000);
    btn.disabled = true;
    setTimeout(function() { btn.disabled = false; }, 1000);
  }

// вращение картинки
function resetImage() {
  reset.classList.add('reset_img');
  getImage();
}

btn.addEventListener('click', resetImage);
getImage();