/////////////////////////////////////
// functionality for index page //

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



///////////////////////////////////
// functionality for lists page //
var blockButton = document.getElementById("blockButton").addEventListener("click", function() {handlers.addUrl()});

if (localStorage.getItem("urls") === "null") {
    localStorage.setItem("urls", JSON.stringify([]));
}

if (localStorage.getItem("undefined") === "null") {
    localStorage.setItem("urlsFormatted", JSON.stringify([]));
}

var urlList = {
    urls: JSON.parse(localStorage.getItem("urls")),

    addUrl: function(urlText) {
        //if (verification.isUrl(urlText))
        //{
            this.urls.push(urlText);
            localStorage.setItem("urls", JSON.stringify(this.urls));
            localStorage.setItem("urlsFormatted", JSON.stringify(format.formatToUrl(this.urls)));
            chrome.runtime.reload()
        //}
        // else {
        //     console.log(verification.isUrl(urlText));    
        //     window.alert("invalid url");  
        // }
    },

    deleteUrl: function(position) {
        this.urls.splice(position, 1);
        localStorage.setItem("urls", JSON.stringify(this.urls));
        localStorage.setItem("urlsFormatted", JSON.stringify(format.formatToUrl(this.urls)));
        chrome.runtime.reload()
    }
};

localStorage.setItem("urls", JSON.stringify(urlList.urls));

var handlers = {
    addUrl: function() {
        var addUrlTextInput = document.getElementById("urlTextInput");
        urlList.addUrl(addUrlTextInput.value);
        addUrlTextInput.value = "";
        view.displayUrls();
    },

    deleteUrl: function(position) {
        urlList.deleteUrl(position);
        view.displayUrls();
    }
};

var view = {
    displayUrls: function() {
        var urlUl = document.getElementById("urlList");
        urlUl.innerHTML = "";

        for (var i = 0; i < urlList.urls.length; i++) {
            var urlLi = document.createElement("li");
            var url = urlList.urls[i];

            var urlSpan = document.createElement("span");
            urlSpan.classList = "url";
            urlSpan.textContent = url;

            var spacing = document.createElement("div");
            spacing.style = "clear: both";

            urlLi.id = i;
            urlLi.appendChild(this.createDeleteButton());
            urlLi.appendChild(urlSpan);
            urlLi.appendChild(spacing);
            urlUl.appendChild(urlLi);
        }
    },
    
    displayLocalStorage: function() {
        var urlUl = document.getElementById("urlList");
        urlUl.innerHTML = "";
        var urls = JSON.parse(localStorage.getItem("urls"));
        
        for (var i = 0; i < urls.length; i++) {
            var urlLi = document.createElement("li");
            var url = urls[i];

            var urlSpan = document.createElement("span");
            urlSpan.classList = "url";
            urlSpan.textContent = url;

            var spacing = document.createElement("div");
            spacing.style = "clear: both";

            urlLi.id = i;
            urlLi.appendChild(this.createDeleteButton());
            urlLi.appendChild(urlSpan);
            urlLi.appendChild(spacing);
            urlUl.appendChild(urlLi);
        };
    },

    createDeleteButton: function() {
        var rmvButton = document.createElement("button");

        var icon = document.createElement("i");
        icon.classList = "fa fa-minus-circle";
        icon.id = "minusCircle";

        rmvButton.appendChild(icon);
        rmvButton.className = "rmvButton";
        return rmvButton;
    },

    setUpEventListener: function() {
        var urlUl = document.querySelector("ul");
        var enterKey = document.getElementById("urlTextInput");

        urlUl.addEventListener("click", function(event) {
            var elementClicked = event.target;
            if (elementClicked.className === "fa fa-minus-circle") {
                handlers.deleteUrl(parseInt(elementClicked.parentNode.parentNode.id));
            }
        });

        enterKey.addEventListener("keyup", function(event){
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("blockButton").click();
            }
        });
    }
};

// var verification = {
//     isUrl: function(str) 
//     {
//         regexp =  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
//         if (regexp.test(str))
//         {
//           return true;
//         }
//         else
//         {
//           return false;
//         }
//     }
// }

var format = {
    initFormat: function(string) {
        return "https://*.".concat(string).concat(".com/*");
    }, 

    formatToUrl: function(array) {
        var copyarray = array.map((x) => x);;
        for (var i = 0; i < array.length; i++) {
            copyarray[i] = this.initFormat(copyarray[i]);
        }
        return copyarray;
    }
};

view.setUpEventListener();

if (localStorage.getItem("urls") === "null") {
    localStorage.setItem("urls", JSON.stringify([]));
}

if (localStorage.getItem("undefined") === "null") {
    localStorage.setItem("urlsFormatted", JSON.stringify([]));
}


view.displayLocalStorage();