
chrome.webRequest.onBeforeRequest.addListener(
    function(info) {
      console.log("Blocking: " + info.url);
      return {cancel: true};
    },
    // filters
    {
      urls: JSON.parse(localStorage.getItem("urlsFormatted"))
    },
    // extraInfoSpec
    ["blocking"]);