var urlsArray = JSON.parse(localStorage.getItem("urlsFormatted"));

for (var i = 0; i < urlsArray.length; i++){
    chrome.webRequest.onBeforeRequest.addListener(
        function(details) { return {cancel: true}; },
        {urls: [urlsArray[i]]},
        ["blocking"]);
}