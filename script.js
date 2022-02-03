const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const quoteDisplay = document.getElementById('quoteDisplay')
const quoteInput = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const WPMElement= document.getElementById('wpm')
const btn = document.getElementById("btn")
var runProgram = false
quoteInput.disabled = true;
let toFive = 0
let dataArray = []
let isFive = 0;
createHighChart()

function createHighChart(){
  $(function () {
    $('#notContainer').highcharts({
      plotOptions: {
        series: {
            animation: false
        }
    },
      title:{
        text: "WPM"
      },
      yAxis: {
        title: {
          text: 'Seconds'
        }
      },
      series: [{ name: "wpm", data: dataArray}],
      xAxis: {
        name: "WPM",
        max: 12,
        categories: ['5', '10', '15', '20', '25', '30', "35", "40", "45", "50", "55", "60"]
      },
    });
  });
}
 
btn.addEventListener("click", updateBtn);

quoteInput.addEventListener('input', () => {
  //get everysingle character in quote
  const arrayQuote = quoteDisplay.querySelectorAll('span')
  //get every single input value
  const arrayValue = quoteInput.value.split('')
  toFive++
  WPMElement.innerHTML = "&nbspWPM: " + parseInt((toFive/5.7)/(getTimerTime()+1)*60)
  console.log(dataArray)
  let correct = true 
  //color each character
  createHighChart()

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
  //if everything is correct, stop game
  if (correct) {
    disableInput()
  }
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL) //fetch API
    .then(response => response.json()) //.then returns a promise which we want in json
    .then(data => data.content) 
}

async function renderNewQuote() {
  const quote = await getRandomQuote()
  quoteDisplay.innerHTML = ''
  quoteInput.value = null
  toFive = 0 
  isFive = 0 
  createHighChart()
  //want to create seperate characters in the text quote
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplay.appendChild(characterSpan)
  })
  //nothing in the textbox when starting out
  
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
    return;
  }    
    //create parent grid element for timer time and wpm and accuracy
    timerElement.innerText = "Time Left: " + (60 - getTimerTime())
    if(timerElement.innerText === "Time Left: 0"){
      
      timerElement.innerText = "Time Left: 60"//   WPM: 0"
      disableInput()
    }
    isFive += .5
    if(isFive == 5)
    {
      dataArray.push(parseInt((toFive/5.7)/(getTimerTime()+1)*60))
      isFive = 0
    }

  }, 500)
}

//get time in seconds
function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}


function updateBtn() {
  if(btn.innerHTML === "Start"){
    enableInput()
  }
  else{
    disableInput()
  }
}

  function disableInput() {
    quoteInput.disabled = true;
    runProgram = false
    btn.innerHTML = "Start"
  }

  function enableInput() {
    quoteInput.disabled = false;
    quoteInput.focus()
    runProgram = true
    renderNewQuote()
    btn.innerHTML = "End"
  }






  
