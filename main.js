///////////////////////////////////
// functionality for index page //

// assigning global variable to HTML elements

const btn = document.getElementById("mybtn");
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
var cd;



// run toggle() on page load
window.addEventListener("load", setState());

function setState() {
    chrome.storage.local.get(['running'], function (result) {
        if (result.running === "true") {
            countDown(true);
            localStorage.setItem("status", "off");
            btn.innerHTML = "stop";
            hour.value = localStorage.getItem('hr');
            minute.value = localStorage.getItem('min');
            second.value = localStorage.getItem('sec');
            btn.addEventListener("click", toggle);
        }
        else if (result.running === "false") {
            localStorage.setItem("status", "on");
            btn.innerHTML = "start";
            btn.addEventListener("click", toggle);

        }
        else {
            btn.innerHTML = "start";
            chrome.storage.local.set({ "running": "false" });
            localStorage.setItem("status", "on");
            btn.innerHTML = "start";
            btn.addEventListener("click", toggle);
        }
    });
}

function toggle() {
    var status = localStorage.getItem('status');
    console.log("im here")
    if (status === "on") {
        chrome.storage.local.set({ "running": "true" });
        localStorage.setItem("status", "off");
        btn.innerHTML = "stop";
        start();
        btn.addEventListener("click", toggle);
    }
    else if (status === "off") {
        chrome.storage.local.set({ "running": "false" });
        localStorage.setItem("status", "on");
        btn.innerHTML = "start";
        stop();
        btn.addEventListener("click", toggle);
    }
}

// start function
function start() {
    addReadOnly();
    storeTime();
    countDown(true);
    hr = localStorage.getItem('hr');
    min = localStorage.getItem('min');
    sec = localStorage.getItem('sec');

    var d1 = new Date();
    console.log(d1);
    d1.setHours(d1.getHours() + parseInt(hr));
    d1.setMinutes(d1.getMinutes() + parseInt(min));
    d1.setSeconds(d1.getSeconds() + parseInt(sec));
    console.log(d1);
    localStorage.setItem("cdDate", d1.getTime());

    countDown();
}

function countDown(state) {
    if (state === true) {
        cd = setInterval(function () {
            cdDate = localStorage.getItem('cdDate')
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = cdDate - now;
    
            // Time calculations for days, hours, minutes and seconds
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
            // Output the result in an element with id="demo"
            document.getElementById("demo").innerHTML = hours + "h "
                + minutes + "m " + seconds + "s ";
            
            if (distance < 0 ) {
                localStorage.setItem("status", "off");
                toggle();
            }
        }, 1000);
    }
    else if (state === false) {
        clearInterval(cd);
    }

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
    countDown(false);
    document.getElementById("demo").innerHTML = "";
    removeReadOnly();

}

function removeReadOnly() {
    // remove read-only for time input
    hour.readOnly = false;
    minute.readOnly = false;
    second.readOnly = false;
}