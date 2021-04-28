  const focus_form = document.querySelector('#focus_form'),
        focus_input = document.querySelector('#focus_input'),
        focus_reset = document.querySelector('.focus_reset'),
        focus_msg = document.querySelector('.focus_msg1'),
        focus_box = document.querySelector('.focus_box');

  // Get Focus
  function getFocus() {
    if (localStorage.getItem('focus') === null) {
      focus_input.value = "";
      focus_input.style.marginLeft = 0;
      focus_reset.classList.add('hidden');
      focus_msg.textContent = "What Is Your Focus For Today?";
      focus_input.style.borderBottom = "solid 2px white";
      focus_input.removeAttribute('readonly');
      focus_input.style.width = 'fit-content';
    }
    else {
      focus_input.value = localStorage.getItem('focus');
      focus_input.style.marginLeft = '2.4vw';
      focus_reset.classList.remove('hidden');
      focus_msg.textContent = "Your Focus";
      focus_input.style.border = "none";
      focus_input.setAttribute('readonly', 'true');
      focus_input.style.width =  0;
      focus_input.style.width = focus_input.scrollWidth / 15 + "vw";
    }
  }
  
  // Set Focus
  function setFocus(e) {
    e.preventDefault();

    if (focus_input.value !== "") {
      localStorage.setItem('focus', focus_input.value);
      focus_input.style.marginLeft = '2.4vw';
      focus_reset.classList.remove('hidden');
      focus_msg.textContent = "Your Focus";
      focus_input.style.border = "none";
      focus_input.setAttribute('readonly', 'true');
      focus_input.style.width =  0;
      focus_input.style.width = focus_input.scrollWidth / 15 + "vw";
    } 
  
    focus_input.blur();
  }

  function clickFocusReset(e) {
    e.preventDefault();

    if (e.which === 1) {
      focus_input.value = "";
      focus_input.style.marginLeft = 0;
      focus_reset.classList.add('hidden');
      focus_msg.textContent = "What Is Your Focus For Today?";
      localStorage.removeItem('focus');
      focus_input.style.borderBottom = "solid 2px white";
      focus_input.removeAttribute('readonly');
      focus_input.style.width =  'fit-content';
    }
  }
  
  focus_form.addEventListener('submit', setFocus);
  focus_reset.addEventListener('click', clickFocusReset);

  getFocus();