chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
    let activeTabURL = tabs[0].url;
    document.getElementById('url').textContent = activeTabURL;
});


// function toggle_reo() {
//     chrome.runtime.sendMessage({action: "toggle_reo"})
//     document.querySelector("button").textContent = "Réactiver REO"
// }