var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
if (localStorage.getItem('language') === '1')
  recognition.lang = 'en-US';
else if (localStorage.getItem('language') === '2')
  recognition.lang = 'ru';
recognition.interimResults = true;
recognition.maxAlternatives = 1;

const voice = document.getElementById('voice'),
  input = document.getElementById('city'),
  search = document.getElementById('submit_city');

// начало речи
voice.onclick = function() {
  recognition.start();
  voice.style.borderRadius = '5px';
  voice.style.backgroundColor = 'rgba(130, 255, 130, 0.5)';
  voice.disabled = true;
}

// результат речи
recognition.onresult = function(event) {
  var city = event.results[0][0].transcript;
  input.value = city;
  search.click();
}

// окончание речи
recognition.onspeechend = function() {
  recognition.stop();
  voice.style.borderRadius = '0';
  voice.style.backgroundColor = 'rgba(76, 82, 85, 0.4)';
  voice.disabled = false;
}
