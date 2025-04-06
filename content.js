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
        const selectors_to_remove = ["shreddit-ad-post", `div[slot="post-media-container"]`, ".promotedlink"];

        for (i of selectors_to_remove) { for (j of document.querySelectorAll(i)) { j.remove() } };

        setTimeout(() => { // Délai pour chargement posts
            for (i of selectors_to_remove) { for (i of document.querySelectorAll(i)) { i.remove() } };
        }, 1500);

    // } else if (!url.includes("old.") && url.includes("/comments/")) { // comment pages
    //     const selectors_to_remove = [
    //         ".promotedlink",
    //         "shreddit-comment-tree-ad",
    //         "shreddit-comments-page-ad",
    //         "shreddit-loading",
    //         ".mx-md[loading='action']", // more comments button
    //         "chat-channel-recommendations-wrapper",
    //     ];
        
    //     // Remove elements when they are loaded
    //     for (const selector of selectors_to_remove) {
    //         waitForEle(selector).then(ele => { ele.remove(); });
    //     }
        
    //     // When comment tree loaded
    //     waitForEle('#comment-tree').then(ele => {
    //         // Ads were found and removed but reappear when comments load
    //         for (const selector of selectors_to_remove) {
    //             if (document.querySelector(selector)) document.querySelector(selector).remove();
    //         }
            
    //         // Remove unwanted comments
    //         const selector_unwanted_comments = `#comment-tree > [depth="0"]:nth-child(n+6)` // Tous les messages suivants sauf les 3 premiers. Le premier commentaire commence à n+2, donc là ça fait 3
    //         document.querySelectorAll(selector_unwanted_comments).forEach(comment => comment.remove());
            
    //         waitForEle('shreddit-loading').then(ele => { ele.remove(); }); // remove spinner when loading new comments
            
    //         // When new comments load, remove them + button
    //         const commentTree = document.querySelector('#comment-tree');
    //         const observer = new MutationObserver((mutationsList) => {
    //             document.querySelectorAll(selector_unwanted_comments).forEach(comment => comment.remove());
    //             document.querySelector(".mx-md[loading='action']").remove(); // more comments button
    //         });
    //         observer.observe(commentTree, { childList: true });
    //     });
    // } else if (url.includes("old.") && !url.includes("/comments/")) { //old subreddit pages
    //     const selectors_to_remove = [`section`, "#header-bottom-left", ".side", "#header", ".infobar-toaster-container", ".promotedlink", ".nav-buttons", ".footer-parent", ".debuginfo"];

    //     for (i of selectors_to_remove) { for (j of document.querySelectorAll(i)) { j.remove() } };
    //     document.body.setAttribute("style", "max-width: 1500px; margin: auto; background-color: #F7FAFE; box-shadow: 0 0 195px -13px rgba(0,0,0,0.5);");
    //     if (!url.includes("/r/all")) { document.querySelector(".menuarea").setAttribute("style", "border-bottom: none") }
    //     document.body.style.overflow = "hidden";
    //     setTimeout(() => {
    //         window.scrollTo({ top: 0, left: 0 });
    //     }, 200);

    // } else if (url.includes("old.") && url.includes("/comments/")) { //old comment pages
    //     const selectors_to_remove = [`section`, "#header-bottom-left", ".side", "#header", ".infobar-toaster-container", ".title-button", ".promotedlink", ".morechildren", ".debuginfo", ".footer-parent", `div[class="sitetable nestedlisting"] > .thing.comment:nth-child(n+10)`];

    //     for (i of selectors_to_remove) { for (j of document.querySelectorAll(i)) { j.remove() } };
    //     window.scrollTo({ top: 0, left: 0 });
    //     document.body.setAttribute("style", "max-width: 1500px; margin: auto; background-color: #F7FAFE; box-shadow: 0 0 195px -13px rgba(0,0,0,0.5)");
    //     document.querySelector(".panestack-title").setAttribute("style", "border-bottom: none")
    };
});