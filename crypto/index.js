let wsObj;
let wsUrl = 'wss://www.gasnow.org/ws';
let rapidObj = document.getElementById('rapid');
let fastObj = document.getElementById('fast');
let standardObj = document.getElementById('standard');
let slowObj = document.getElementById('slow');

let updatePageGasPriceData = (data) => {
  console.log(data.gasPrices);
  if (data && data.gasPrices) {
    rapidObj.innerHTML = data.gasPrices.rapid;
    fastObj.innerHTML = data.gasPrices.fast;
    standardObj.innerHTML = data.gasPrices.standard;
    slowObj.innerHTML = data.gasPrices.slow;
  }
};

wsObj = new WebSocket(wsUrl);
wsObj.onopen = (evt) => {
  console.log("Connection open ...");
};

wsObj.onmessage = (evt) => {
  const dataStr = evt.data;
  const data = JSON.parse(dataStr);

  if (data.type) {
    updatePageGasPriceData(data.data)
  }
};

wsObj.onclose = (evt) => {
  console.log("Connection closed.");
};

document.getElementById("about").value = "aboust"

var timeleft = 10;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
  }
  document.getElementById("timer").value = 10 - timeleft;
  timeleft -= 1;
}, 1000);
