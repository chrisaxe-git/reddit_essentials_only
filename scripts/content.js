console.log("(REO) Connexion");

const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = chrome.runtime.getURL('styles/content.css');
document.head.appendChild(link);

let removable = [
    document.querySelector("pdp-right-rail div:first-of-type"),
    document.querySelector("#right-sidebar-container > div.px-md.xs\\:px-0.pt-lg"),
    document.querySelector("#left-sidebar-container"),
    document.querySelector(`div[data-testid="related-klps-sidebar"]`),
]
let removable_lot1 = document.querySelector("#comment-tree shreddit-comment:nth-child(n+4)");

//ajoute classe reo-hide
for (item of removable) {
    item.classList.add("reo-hide");
}
removable_lot1.forEach(removable_lot1 => {
    removable_lot1.classList.add("reo-hide");
});