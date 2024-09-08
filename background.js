console.log("Hello bg")
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getTabUrl") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const url = tabs[0].url;
            sendResponse({url: url});
        });
        // Return true to indicate that we will send a response asynchronously
        return true;
    }
    // if (request.action === "toggle_reo") {
    //     chrome.runtime.sendMessage({action: "toggle_script"});
    // }
});