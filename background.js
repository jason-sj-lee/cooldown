function block(details) { return {cancel: true}; }

function run() {
    var urlsArray = JSON.parse(localStorage.getItem("urlsFormatted"));

    for (var i = 0; i < urlsArray.length; i++){
        chrome.webRequest.onBeforeRequest.addListener(
            block,
            {urls: [urlsArray[i]]},
            ["blocking"]);
    }    
}

function stop() {
        chrome.webRequest.onBeforeRequest.removeListener( block );
}