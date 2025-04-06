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

function mutationObservers(selectors) {
    const mutationObserverCallback = () => {
        removeEles(selectors);
    };

    const observer = new MutationObserver(mutationObserverCallback);
    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
        observer.disconnect();
    }, 9000);
}

function removeEles(selectors) {
    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(ele => {
            ele.style.display = "none";
        });
    });
}

function handleNewSubredditPages() {
    const selectorsToRemove = [
        `[id="left-sidebar-container"]`,
        `[id="right-sidebar-container"]`,
        `[class="flex w-100 xs:w-auto mt-xs xs\\:mt-0"]`,
        `reddit-header-large`,
        `community-highlight-carousel`,
        `.masthead`,
        `.promotedlink`,
        `shreddit-dynamic-ad-link`,
        `shreddit-ad-post`,
        `nav`,
        `div[class="@container"]`,
        `[sort-event="layout-view-change"]`,
        `[bundlename="shreddit_sort_dropdown"]`,
        `shreddit-feed-page-loading`,
        `shreddit-feed :nth-child(n+8)`,
        `[slot="post-media-container"]`,
    ];

    // Observer les changements pour supprimer les éléments qui apparaissent après le chargement
    mutationObservers(selectorsToRemove);
}
function handleNewCommentPages() {
    const selectorsToRemove = [
        `nav`,
        `#right-sidebar-container`,
        `#left-sidebar-container`,
        `pdp-back-button`,
        `award-button`,
        `.py-xs`,
        `comment-body-header`,
        `[bundlename="shreddit_post_overflow_menu"]`,
        `[bundlename="comment_body_header"]`,
        `.promotedlink`,
        `.promoted-name-container`,
        `shreddit-comment-tree-ad`,
        `shreddit-comments-page-ad`,
        `shreddit-loading`,
        `.mx-md[loading='action']`,
        `chat-channel-recommendations-wrapper`,
        `#comment-tree > [depth="0"]:nth-child(n+8)`
    ];
    
    mutationObservers(selectorsToRemove);
}
function handleOldSubredditPages() {
    const selectorsToRemove = [
        `section`,
        `#header-bottom-left`,
        `.side`,
        `#header`,
        `.infobar-toaster-container`,
        `.promotedlink`,
        `.nav-buttons`,
        `.footer-parent`,
        `.debuginfo`,
        `[data-url]:nth-child(n+8)`,
    ];
    
    mutationObservers(selectorsToRemove);

    document.body.style.maxWidth = "1500px";
    document.body.style.margin = "auto";
    document.body.style.backgroundColor = "#F7FAFE";
    document.body.style.boxShadow = "0 0 195px -13px rgba(0,0,0,0.5)";
    document.body.style.overflow = "hidden";
}
function handleOldCommentPages() {
    const selectorsToRemove = [
        `section`,
        `#header-bottom-left`,
        `.side`,
        `#header`,
        `.infobar-toaster-container`,
        `.title-button`,
        `.promotedlink`,
        `.morechildren`,
        `.debuginfo`,
        `.footer-parent`,
        `div[class="sitetable nestedlisting"] > .thing.comment:nth-child(n+8)`,
    ];

    mutationObservers(selectorsToRemove);

    window.scrollTo({ top: 0, left: 0 });
    document.body.style.maxWidth = "1500px";
    document.body.style.margin = "auto";
    document.body.style.backgroundColor = "#F7FAFE";
    document.body.style.boxShadow = "0 0 195px -13px rgba(0,0,0,0.5)";
}


chrome.runtime.sendMessage({ action: "getTabUrl" }, function (response) {
    const url = response.url;

    if (!url.includes("old.") && !url.includes("/comments/")) {
        handleNewSubredditPages(url);
    } else if (!url.includes("old.") && url.includes("/comments/")) {
        handleNewCommentPages(url);
    } else if (url.includes("old.") && !url.includes("/comments/")) {
        handleOldSubredditPages(url);
    } else if (url.includes("old.") && url.includes("/comments/")) {
        handleOldCommentPages(url);
    }
});