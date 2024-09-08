console.log("(REO) Connexion");


// chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
//     const url = tabs[0].url;
// });

// if url includes "/comments/"
// console.log(url);
let to_remove = ["#right-sidebar-container", "#left-sidebar-container", "comment-body-header"];
let to_remove_all = ["nav", ".promotedlink", "#comment-tree > shreddit-comment:nth-child(n+6)"];

setTimeout(() => { // Délai le temps que les premiers messages se chargent
    window.scrollTo({top: 15000, left: 0, behavior: 'smooth'});

    for (i of to_remove) {document.querySelector(i).classList.add("reo-hide")};
    for (i of to_remove_all) {
        for (j of document.querySelectorAll(i)) {j.remove()}
    }
}, 500);

setTimeout(() => { // Délai le temps que les nouveaux messages se chargent
    window.scrollTo({top: 0, left: 0});
    for (item of document.querySelectorAll("#comment-tree > shreddit-comment:nth-child(n+6)")) {item.remove()}; // Tous les messages suivants sauf les 6 premiers
    document.querySelector(`faceplate-tracker[noun="load_more_comments"]`).remove(); // Boutton afficher plus de commentaires
}, 1500);

// else (if url doesnt includes "/comments/") :
0
// Add overflow hidden to body
// remove div class="@container"
// remove nav