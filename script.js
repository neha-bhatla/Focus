let FocusTitle = document.getElementById('Focus');
let BreakTitle = document.getElementById('Break');

let FocusTime = 25; 
let BreakTime = 5; 

let timer;
let isFocus = true;
let breakCount = 0;
let isPaused = true;
let remainingMinutes = FocusTime;
let remainingSeconds = 0;

window.onload = () => {
    document.getElementById('minutes').innerHTML = FocusTime;
    document.getElementById('seconds').innerHTML = '00';

    FocusTitle.classList.add('active');
}

function start() {
    if (isPaused) {
        isPaused = false;
        timer = setInterval(() => {
            if (remainingSeconds === 0 && remainingMinutes === 0) {
                clearInterval(timer);
                isFocus = !isFocus;
                breakCount++;

                if (isFocus) {
                    remainingMinutes = FocusTime;
                    FocusTitle.classList.add('active');
                    BreakTitle.classList.remove('active');
                } else {
                    remainingMinutes = BreakTime;
                    BreakTitle.classList.add('active');
                    FocusTitle.classList.remove('active');
                }
            } else if (remainingSeconds === 0) {
                remainingSeconds = 59;
                remainingMinutes--;
            } else {
                remainingSeconds--;
            }

            document.getElementById('minutes').innerHTML = remainingMinutes;
            
            let secondsStr = String(remainingSeconds);
            if (secondsStr.length === 1) {
                secondsStr = '0' + secondsStr;
            }

            document.getElementById('seconds').innerHTML = secondsStr;


        }, 1000);
    } else {
        clearInterval(timer);
        isPaused = true;
    }

}

function restart() {
    clearInterval(timer);
    isPaused = true;
    isFocus = true;
    breakCount = 0;
    remainingMinutes = FocusTime;
    remainingSeconds = 0;
    document.getElementById('minutes').innerHTML = FocusTime;
    document.getElementById('seconds').innerHTML = '00';
    FocusTitle.classList.add('active');
    BreakTitle.classList.remove('active');
}

let focusButton = document.getElementById('focusButton');
let breakButton = document.getElementById('breakButton');

document.getElementById('Focus').addEventListener('click', function() {
    if (isPaused) {
        switchToFocus();
    }
});

document.getElementById('Break').addEventListener('click', function() {
    if (isPaused) {
        switchToBreak();
    }
});
function switchToFocus() {
    isFocus = true;
    remainingMinutes = FocusTime;
    remainingSeconds = 0;
    clearInterval(timer);
    document.getElementById('minutes').innerHTML = FocusTime;
    document.getElementById('seconds').innerHTML = '00';
    FocusTitle.classList.add('active');
    BreakTitle.classList.remove('active');
}

function switchToBreak() {
    isFocus = false;
    BreakTime = 5;
    remainingMinutes = BreakTime;
    remainingSeconds = 0;
    clearInterval(timer);
    document.getElementById('minutes').innerHTML = BreakTime;
    document.getElementById('seconds').innerHTML = '00';
    FocusTitle.classList.remove('active');
    BreakTitle.classList.add('active');
}


const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!")
    }else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        saveData();
    }
    inputBox.value = "";
    

}

listContainer.addEventListener("click", function(e){
    if (e.target.tagName == "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }else if(e.target.tagName == "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

  
  




