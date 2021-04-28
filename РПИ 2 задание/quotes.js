const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const quote = document.querySelector('.quote');

async function getQuote() {  
    const url = `https://api.chucknorris.io/jokes/random`;
    const res = await fetch(url);
    const data = await res.json(); 
    //blockquote.textContent = '"' + data.slip.advice + '"';
    blockquote.textContent = '"' + data.value + '"'
  }

  document.addEventListener('DOMContentLoaded', getQuote);
  quote.addEventListener('click', getQuote);