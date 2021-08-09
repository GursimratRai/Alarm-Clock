//analog-clock
const analogClock = document.getElementById("analog-clock");
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");

//digital-clock
const digitalClock = document.getElementById("digital-clock");
const digital = document.getElementById("digital-time");

//alarm list container
const alarm = document.getElementById("alarmTime");
const alarmList = document.getElementById("alarm-list");
const list = document.getElementsByClassName('list');

//clock type 
// 0 -> analog 
// 1 -> digital
var flag = 0;

// function used for setting up an alarm
function setAlarm() {
  let time = alarm.value;
  if (time) {
    let [h, m, s] = time.split(":");

    // hh:mm:ss AM/PM
    let timeformat = (h % 12) + 12 * (h % 12 == 0) + ":" + m + ":" + s + (h >= 12 ? " PM" : " AM");

    //<li class="list" > HH:MM:SS AM/PM </li>
    let li = document.createElement("li");
    let textnode = document.createTextNode(timeformat);
    li.setAttribute("class","list");
    li.appendChild(textnode);

    //<button onClick="deleteAlarm()" id="xxxxxx" > Delete </button>
    let btn = document.createElement("button");
    btn.innerHTML = "X"
    btn.setAttribute("id", Math.random().toString(36).slice(2));
    btn.onclick = function () {
      deleteAlarm(this.id);
    };

     //<li class="list" >  HH:MM:SS AM/PM <button onClick="deleteAlarm()" id="xxxxxx" > Delete </button> </li>
    li.appendChild(btn);
    alarmList.appendChild(li);
  }
  alarm.value="";
}

// function used for deleting the selected alarm
function deleteAlarm(id) {
  var child = document.getElementById(id).parentNode;
  alarmList.removeChild(child);
}

//function to change the clock type
function change() {
  if (flag == 0) {
    analogClock.style.display = "none";
    digitalClock.style.display = "block";
    flag = 1;
  } else {
    digitalClock.style.display = "none";
    analogClock.style.display = "block";
    flag = 0;
  }
}

// function which changes time on the clock after 1sec.
function showTime() {

  //one circle = 360 degree.
  //(360/60) = 6
  const deg = 6;
  
  let now = new Date();
  let currentTime = now.toLocaleTimeString();
  digital.textContent = currentTime;

  let hh = now.getHours() * 30;
  let mm = now.getMinutes() * deg;
  let ss = now.getSeconds() * deg;

  hour.style.transform = `rotateZ(${hh + mm / 12}deg`;
  minute.style.transform = `rotateZ(${mm}deg`;
  second.style.transform = `rotateZ(${ss}deg`;

  for (let listItem of list) {    
    let [time] = listItem.innerText.split("\n");
    if (time == currentTime) {
      alert("Get up , it's "+  time);
    }
  }

  setTimeout(showTime, 1000);
}

showTime();
