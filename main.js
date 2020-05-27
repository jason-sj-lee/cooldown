///////////////////////////////////
// functionality for index page //

// assigning global variable to HTML elements

const btn = document.getElementById("mybtn");
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");


// run toggle() on page load
window.addEventListener("load", toggle());

function toggle() {
    if (btn.value === "on") {
        btn.innerHTML = "stop";
        btn.value = "off";
        start();
        btn.addEventListener("click", toggle);
    }
    else {
        btn.innerHTML = "start";
        btn.value = "on";
        stop();
        btn.addEventListener("click", toggle);
    }
}

// start function
function start() {
    addReadOnly();
    storeTime();

    hr = localStorage.getItem('hr');
    min = localStorage.getItem('min');
    sec = localStorage.getItem('sec');

    var d1 = new Date();
    console.log(d1);
    d1.setHours(d1.getHours() + parseInt(hr));
    d1.setMinutes(d1.getMinutes() + parseInt(min));
    d1.setSeconds(d1.getSeconds() + parseInt(sec));
    console.log(d1);
    var cdDate = d1.getTime();

    setInterval(function () {
        var now = new Date().getTime();
        console.log(now);
        // Find the distance between now and the count down date
        var distance = cdDate - now;

        // Time calculations for days, hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById("demo").innerHTML = hours + "h "
        + minutes + "m " + seconds + "s ";
    }, 1000);
}

function addReadOnly() {
    // apply read-only for time input
    hour.readOnly = true;
    minute.readOnly = true;
    second.readOnly = true;
}

function storeTime() {
    // remove stored values
    localStorage.removeItem('hr');
    localStorage.removeItem('min');
    localStorage.removeItem('sec');

    // store new values
    localStorage.setItem('hr', hour.value);
    localStorage.setItem('min', minute.value);
    localStorage.setItem('sec', second.value);
}

// stop function
function stop() {
    removeReadOnly();
}

function removeReadOnly() {
    // remove read-only for time input
    hour.readOnly = false;
    minute.readOnly = false;
    second.readOnly = false;
}