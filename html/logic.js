window.addEventListener('pywebviewready', function() {});

var seconds = 0;
var minutes = 0;
var timer;
var running = false;
var flowCounter = 7;
var body = document.body;
var timeElement = document.getElementById("time");
var playPauseElement = document.getElementById("play-pause");
var skipElement = document.getElementById("skip");

function startTimer() {
  running = true;
  timer = setInterval(function() {
    if (seconds == 0 && minutes == 0) {
      goNext();
    } else if (seconds == 0 && minutes > 0) {
      seconds = 59;
      minutes--;
    } else {
      seconds--;
    }
    displayTimer();
  }, 1000);
}

function goNext() {
  stopTimer();
  flowCounter--;
  transition();
}

function goPrevious() {
  stopTimer();
  flowCounter++;
  transition();
}

function transition() {
    if (flowCounter == 0){
        minutes = 30;
        seconds = 0;
        flowCounter = 8;
        body.style.backgroundColor = "#457da3";
        timeElement.style.color = "white";
        playPauseElement.style.color = "white";
        skipElement.style.color = "white";
        pywebview.api.flow_done();
      } else if (flowCounter % 2 == 0){
        minutes = 5;
        seconds = 0;
        body.style.backgroundColor = "#3bb85e";
        timeElement.style.color = "white";
        playPauseElement.style.color = "white";
        skipElement.style.color = "white";
        pywebview.api.flow_done();
      } else {
        minutes = 25;
        seconds = 0;
        body.style.backgroundColor = "white";
        timeElement.style.color = "black";
        playPauseElement.style.color = "#55a669";
        skipElement.style.color = "#8f8f8f";
        pywebview.api.break_done();
      }

      state_index = 5 - (parseInt(flowCounter / 2) + 1)
      if (flowCounter == 8){
        for (var i = 1; i < 5; i++){
            document.getElementById("s" + i).style.color = "#ffffff"
        }
      } else if (flowCounter % 2 == 0 && flowCounter != 0){
        for (var i = 1; i <= state_index; i++){
            document.getElementById("s" + i).style.color = "#ffffff"
        }
        for (var i = state_index + 1; i < 5; i++){
            document.getElementById("s" + i).style.color = "#7fd798"
        }
      } else {
        for (var i = 1; i <= state_index; i++){
            document.getElementById("s" + i).style.color = "#8f8f8f"
        }
        for (var i = state_index + 1; i < 5; i++){
            document.getElementById("s" + i).style.color = "#cfcfcf"
        }
      }

      displayTimer();
}

function s1 (){
  flowCounter = 7;
  transition();
}
function s2 (){
  flowCounter = 5;
  transition();
}
function s3 (){
  flowCounter = 3;
  transition();
}
function s4 (){
  flowCounter = 1;
  transition();
}

function stopTimer() {
  clearInterval(timer);
  running = false;
}

function displayTimer() {
  var displaySeconds = seconds < 10 ? "0" + seconds : seconds;
  var displayMinutes = minutes < 10 ? "0" + minutes : minutes;
  var displayTime = displayMinutes + ":" + displaySeconds;
  timeElement.innerHTML = displayTime;
}

function playPause() {
    if (!running) {
        startTimer();
    } else {
        stopTimer();
    }
}

transition();