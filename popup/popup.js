chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
    let activeTabURL = tabs[0].url;
    document.getElementById('url').textContent = activeTabURL;
});