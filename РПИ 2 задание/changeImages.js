const body = document.querySelector('body'),
      btn = document.querySelector('.btn_bgImage');

let images_path = "";
let image_number = 0;

const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg',
                '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg',
                '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genImageIndex()
{
  image_number = getRandomInRange(1, 20);
}

function defBGCategory() {
  let today = new Date(),
  hour = today.getHours();

  let path = "";

  if (hour < 6) {
    path = "assets/images/night/";
  }  
  else if (hour < 12) {
    path = "assets/images/morning/";
  } 
  else if (hour < 18) {
    path = "assets/images/day/";
  }
  else {
    path = "assets/images/evening/";
  }

  return path;
}

function viewBgImage(src) {
    const img = new Image();
    img.src = src;
    img.onload = () => {      
      body.style.backgroundImage = `url('${src}')`;
    }; 
  }
  
  function getImage() {
    images_path = defBGCategory();
    const index = image_number % images.length;
    const imageSrc = images_path + images[index];
    viewBgImage(imageSrc);
    image_number++;
    setTimeout(getImage, 3600000);
    btn.disabled = true;
    setTimeout(function() { btn.disabled = false }, 1000);
  }

  btn.addEventListener('click', getImage);

  genImageIndex();
  getImage();