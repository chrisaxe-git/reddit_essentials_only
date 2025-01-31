// const reo_is_active = true;
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     reo_is_active = (request.action === "toggle_reo") ? !reo_is_active : reo_is_active; // 
// });

// if (reo_is_active) {


function waitForEle(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    });
}


chrome.runtime.sendMessage({ action: "getTabUrl" }, function (response) {
    const url = response.url;

    if (!url.includes("old.") && !url.includes("/comments/")) { //subreddit pages
        const selectors_to_remove = [`[id="left-sidebar-container"]`, `[id="right-sidebar-container"]`, `[class="flex w-100 xs:w-auto mt-xs xs\\:mt-0"]`, "community-highlight-carousel", ".masthead", ".promotedlink", `div[slot="post-media-container"]`, "nav", `div[class="@container"]`, `[sort-event="layout-view-change"]`]; // 3 = publier un post, last = bannière

        for (i of selectors_to_remove) { for (j of document.querySelectorAll(i)) { j.remove() } };
        window.scrollTo({ top: 0, left: 0 });
        // document.body.style.overflow = "hidden";


        setTimeout(() => { // Délai pour chargement posts
            for (i of [`div[slot="post-media-container"]`, ".promotedlink"]) { for (i of document.querySelectorAll(i)) { i.remove() } };
            for (item of document.querySelectorAll(`shreddit-feed :nth-child(n+9)`)) { item.remove() }; // Tous les posts sauf les 6 premiers
        }, 3000);

    } else if (!url.includes("old.") && url.includes("/comments/")) { // comment pages
        const selectors_to_remove = [
            "nav",
            "#right-sidebar-container",
            "#left-sidebar-container",
            "pdp-back-button",
            "award-button",
            ".py-xs", // archived message
            "comment-body-header",
            `[bundlename="shreddit_post_overflow_menu"]`, // post menu
            ".promotedlink",
            "shreddit-comment-tree-ad",
            "shreddit-comments-page-ad",
            "shreddit-loading",
            ".mx-md[loading='action']", // more comments button
        ];
        
        // Remove elements when they are loaded
        for (const selector of selectors_to_remove) {
            waitForEle(selector).then(ele => { ele.remove(); });
        }
        
        // When comment tree loaded
        waitForEle('#comment-tree').then(ele => {
            // Ads were found and removed but reappear when comments load
            for (const selector of selectors_to_remove) {
                if (document.querySelector(selector)) document.querySelector(selector).remove();
            }
            
            // Remove unwanted comments
            const selector_unwanted_comments = `#comment-tree > [depth="0"]:nth-child(n+6)` // Tous les messages suivants sauf les 3 premiers. Le premier commentaire commence à n+2, donc là ça fait 3
            document.querySelectorAll(selector_unwanted_comments).forEach(comment => comment.remove());
            
            waitForEle('shreddit-loading').then(ele => { ele.remove(); }); // remove spinner when loading new comments
            
            // When new comments load, remove them + button
            const commentTree = document.querySelector('#comment-tree');
            const observer = new MutationObserver((mutationsList) => {
                document.querySelectorAll(selector_unwanted_comments).forEach(comment => comment.remove());
                document.querySelector(".mx-md[loading='action']").remove(); // more comments button
            });
            observer.observe(commentTree, { childList: true });
        });
    } else if (url.includes("old.") && !url.includes("/comments/")) { //old subreddit pages
        const selectors_to_remove = [`section`, "#header-bottom-left", ".side", "#header", ".infobar-toaster-container", ".promotedlink", ".nav-buttons", ".footer-parent", ".debuginfo"];

        for (i of selectors_to_remove) { for (j of document.querySelectorAll(i)) { j.remove() } };
        document.body.setAttribute("style", "max-width: 1500px; margin: auto; background-color: #F7FAFE; box-shadow: 0 0 195px -13px rgba(0,0,0,0.5);");
        if (!url.includes("/r/all")) { document.querySelector(".menuarea").setAttribute("style", "border-bottom: none") }
        document.body.style.overflow = "hidden";
        setTimeout(() => {
            window.scrollTo({ top: 0, left: 0 });
        }, 200);

    } else if (url.includes("old.") && url.includes("/comments/")) { //old comment pages
        const selectors_to_remove = [`section`, "#header-bottom-left", ".side", "#header", ".infobar-toaster-container", ".title-button", ".promotedlink", ".morechildren", ".debuginfo", ".footer-parent", `div[class="sitetable nestedlisting"] > .thing.comment:nth-child(n+10)`];

        for (i of selectors_to_remove) { for (j of document.querySelectorAll(i)) { j.remove() } };
        window.scrollTo({ top: 0, left: 0 });
        document.body.setAttribute("style", "max-width: 1500px; margin: auto; background-color: #F7FAFE; box-shadow: 0 0 195px -13px rgba(0,0,0,0.5)");
        document.querySelector(".panestack-title").setAttribute("style", "border-bottom: none")
    };
});