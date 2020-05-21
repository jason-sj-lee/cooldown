/////////////////////////////////////
// functionality for settings page //

// class
class CountDown{
    constructor(hour, minute, second) {
        this.hr = new String(hour);
        this.min = new String(minute);
        this.sec = new String(second);
    }
    store(){
        localStorage.setItem('hour', this.hr);
        localStorage.setItem('minute', this.min);
        localStorage.setItem('second', this.sec);
    }
    display(){
        return localStorage.getItem('hour') + ":" + localStorage.getItem('minute') + ":" + localStorage.getItem('second')
    }
}
document.getElementById("countdown-number").innerHTML = localStorage.getItem('minute');
// variable declaration
var hour, minute, second;
console.log(document.getElementById("hour"));
// retrieving input time value 
hour = document.getElementById("hour").value;
minute = document.getElementById("minute").value;
second = document.getElementById("second").value;

// creating countdown object
cooldown = new CountDown(hour, minute, second);

cooldown.store();
console.log
// display countdown time on main page




///////////////////////////////////
// functionality for lists page //
var blockButton = document.getElementById("blockButton").addEventListener("click", function() {handlers.addUrl()});

if (localStorage.getItem("urls") === "null") {
    localStorage.setItem("urls", JSON.stringify([]));
}

var urlList = {
    urls: JSON.parse(localStorage.getItem("urls")),

    addUrl: function(urlText) {
        if (verification.isUrl(urlText))
        {
            this.urls.push(urlText);
            localStorage.setItem("urls", JSON.stringify(this.urls));
        }
        else {
            console.log(verification.isUrl(urlText));    
            window.alert("invalid url");  
        }
    },

    deleteUrl: function(position) {
        this.urls.splice(position, 1);
        localStorage.setItem("urls", JSON.stringify(this.urls));
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

var verification = {
    isUrl: function(str) 
    {
        regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
        {
          return true;
        }
        else
        {
          return false;
        }
    }
}

view.setUpEventListener();

if (localStorage.getItem("urls") === "null") {
    localStorage.setItem("urls", JSON.stringify([]));
}
view.displayLocalStorage();