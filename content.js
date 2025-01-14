console.log("(REO) Connexion");

// const reo_is_active = true;
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     reo_is_active = (request.action === "toggle_reo") ? !reo_is_active : reo_is_active; // 
// });

// if (reo_is_active) {
chrome.runtime.sendMessage({ action: "getTabUrl" }, function (response) {
    const url = response.url;

    if (!url.includes("old.") && !url.includes("/comments/")) { //subreddit pages
        const to_remove = [`[id="left-sidebar-container"]`, `[id="right-sidebar-container"]`, `[class="flex w-100 xs:w-auto mt-xs xs\\:mt-0"]`, "community-highlight-carousel", ".masthead", ".promotedlink", `div[slot="post-media-container"]`, "nav", `div[class="@container"]`, `[sort-event="layout-view-change"]`]; // 3 = publier un post, last = bannière

        for (i of to_remove) { for (j of document.querySelectorAll(i)) { j.remove() } };
        window.scrollTo({ top: 0, left: 0 });
        // document.body.style.overflow = "hidden";


        setTimeout(() => { // Délai pour chargement posts
            for (i of [`div[slot="post-media-container"]`, ".promotedlink"]) { for (i of document.querySelectorAll(i)) { i.remove() } };
            for (item of document.querySelectorAll(`shreddit-feed :nth-child(n+9)`)) { item.remove() }; // Tous les posts sauf les 6 premiers
        }, 3000);

    } else if (!url.includes("old.") && url.includes("/comments/")) { // comment pages
        let to_remove = ["#right-sidebar-container", "#left-sidebar-container", "comment-body-header", "nav", "pdp-back-button", `[bundlename="shreddit_post_overflow_menu"]`, ".promotedlink", "shreddit-comment-tree-ad", `#comment-tree > [depth="0"]:nth-child(n+6)`]; // #comment-tree > [depth="0"]:nth-child(n+6) le premier commentaire comment à n+2, donc là ça fait 4

        setTimeout(() => { // Délai le temps que les premiers messages se chargent
            window.scrollTo({ top: 15000, left: 0, behavior: 'smooth' });
            for (i of to_remove) { for (j of document.querySelectorAll(i)) { j.remove() } };
        }, 500);

        setTimeout(() => {
            window.scrollTo({ top: 0, left: 0 });
        }, 1500);

        setTimeout(() => {
            window.scrollTo({ top: 0, left: 0 });
            document.querySelector(".pb-xl").style.paddingBottom = "20rem";
            for (item of document.querySelectorAll(`#comment-tree > [depth="0"]:nth-child(n+6)`)) { item.remove() }; // Tous les messages suivants sauf les 6 premiers
            for (i of document.querySelectorAll(".promotedlink")) { i.remove() }
            for (i of document.querySelectorAll("shreddit-comment-tree-ad")) { i.remove() }
            document.querySelector(`faceplate-tracker[noun="load_more_comments"]`).remove(); // Boutton afficher plus de commentaires
        }, 2500);

    } else if (url.includes("old.") && !url.includes("/comments/")) { //old subreddit pages
        const to_remove = [`section`, "#header-bottom-left", ".side", "#header", ".infobar-toaster-container", ".promotedlink", ".nav-buttons", ".footer-parent", ".debuginfo"];

        for (i of to_remove) { for (j of document.querySelectorAll(i)) { j.remove() } };
        document.body.setAttribute("style", "max-width: 1500px; margin: auto; background-color: #F7FAFE; box-shadow: 0 0 195px -13px rgba(0,0,0,0.5);");
        if (!url.includes("/r/all")) { document.querySelector(".menuarea").setAttribute("style", "border-bottom: none") }
        document.body.style.overflow = "hidden";
        setTimeout(() => {
            window.scrollTo({ top: 0, left: 0 });
        }, 200);

    } else if (url.includes("old.") && url.includes("/comments/")) { //old comment pages
        const to_remove = [`section`, "#header-bottom-left", ".side", "#header", ".infobar-toaster-container", ".title-button", ".promotedlink", ".morechildren", ".debuginfo", ".footer-parent", `div[class="sitetable nestedlisting"] > .thing.comment:nth-child(n+10)`];

        for (i of to_remove) { for (j of document.querySelectorAll(i)) { j.remove() } };
        window.scrollTo({ top: 0, left: 0 });
        document.body.setAttribute("style", "max-width: 1500px; margin: auto; background-color: #F7FAFE; box-shadow: 0 0 195px -13px rgba(0,0,0,0.5)");
        document.querySelector(".panestack-title").setAttribute("style", "border-bottom: none")
    };
});