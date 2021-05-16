const body = document.querySelector('body'),
      btn = document.querySelector('#btn_reset');


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
  
async function getImage() {
    const url = "https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=6Pw5PSFXUACCcKhyy_disMi22_096Z0SJNg_jvZesDk";
    const res = await fetch(url);
    const data = await res.json();
    //console.log(data);
    const imageSrc = data['urls']['regular'];

    viewBgImage(imageSrc);
    setTimeout(getImage, 3600000);
    btn.disabled = true;
    setTimeout(function() { btn.disabled = false }, 1000);
  }

  btn.addEventListener('click', getImage);

  getImage();