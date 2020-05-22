// /////////////////////////////////////
// // functionality for index page //
var hour, minute, second, btn;

window.onload = toggle;

// each of the time input field
hour = document.getElementById("hour");
minute = document.getElementById("minute");
second = document.getElementById("second");

// blur: when out of focus
hour.addEventListener("blur", storeTime);
minute.addEventListener("blur", storeTime);
second.addEventListener("blur", storeTime);

displayTime();

// button toggle
function toggle() {
    var btn = document.getElementById("mybtn");
    if (btn.value === "on") {
        btn.innerHTML = "stop";
        btn.value = "off";
        btn.addEventListener("click", toggle);
        addReadOnly();
    }
    else {
        btn.innerHTML = "start";
        btn.value = "on";
        btn.addEventListener("click", toggle);
        removeReadOnly();
    }
}

// display selected time from localStorage
function displayTime() {
    hour.value = localStorage.getItem('hr');
    minute.value = localStorage.getItem('min');
    second.value = localStorage.getItem('sec');
}

// store selected time in localStorage
function storeTime() {
    // dont know why this is there 
    localStorage.removeItem('hour');
    localStorage.removeItem('minute');
    localStorage.removeItem('second');

    // storing time
    localStorage.setItem('hr', hour.value);
    localStorage.setItem('min', minute.value);
    localStorage.setItem('sec', second.value);
}

// read-only functionality for time input
function addReadOnly() {
    // apply read-only for time input
    hour.readOnly = true;
    minute.readOnly = true;
    second.readOnly = true;
}

function removeReadOnly() {
    // remove read-only for time input
    hour.readOnly = false;
    minute.readOnly = false;
    second.readOnly = false;
}

