// functionality for lists page
var blockButton = document.getElementById("blockButton").addEventListener("click", function() {handlers.addUrl()});

if (localStorage.getItem("urls") === "null") {
    localStorage.setItem("urls", JSON.stringify([]));
}

var urlList = {
    urls: JSON.parse(localStorage.getItem("urls")),

    addUrl: function(urlText) {
        this.urls.push(urlText);
        localStorage.setItem("urls", JSON.stringify(this.urls));
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

        urlUl.addEventListener("click", function(event) {
            var elementClicked = event.target;
            if (elementClicked.className === "fa fa-minus-circle") {
                handlers.deleteUrl(parseInt(elementClicked.parentNode.parentNode.id));
            }
        });
    }
};
view.setUpEventListener();

if (localStorage.getItem("urls") === "null") {
    localStorage.setItem("urls", JSON.stringify([]));
}
view.displayLocalStorage();