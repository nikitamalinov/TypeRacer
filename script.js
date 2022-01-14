const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
//set our elements that we want to manipulate
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const btn = document.getElementById("btn")
var runProgram = false


btn.addEventListener("click", updateBtn);

quoteInputElement.addEventListener('input', () => {
  //get everysingle character in quote
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  //get every single input value
  const arrayValue = quoteInputElement.value.split('')

  let correct = true
  //color each character
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })
  //if everything is correct, start new quote
  if (correct) renderNewQuote()
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL) //fetch API
    .then(response => response.json()) //.then returns a promise which we want in json
    .then(data => data.content) 
}

async function renderNewQuote() {
  const quote = await getRandomQuote()
  quoteDisplayElement.innerHTML = '' 
  //want to create seperate characters in the text quote
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  //nothing in the textbox when starting out
  quoteInputElement.value = null
  startTimer()
}

//gets date when we start our timer
let startTime
function startTimer() {
  //current time
  startTime = new Date() 
  //call it every 1 second
  setInterval(() => {
    //set text to time we got
  if(runProgram == false){
    timerElement.innerText = "Time Left: 60"
    return;
  }    

    timer.innerText = "Time Left: " + (60 - getTimerTime())
    if(timer.innerText === "Time Left: 0"){
      timerElement.innerText = "Time Left: 60"
      renderNewQuote()
    }

  }, 1000)
}

//get time in seconds
function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}


function updateBtn() {
  if(btn.innerHTML === "Start"){
    runProgram = true
    renderNewQuote()
    btn.innerHTML = "End"
  }
  else{
    runProgram = false
    btn.innerHTML = "Start"
  }


}


