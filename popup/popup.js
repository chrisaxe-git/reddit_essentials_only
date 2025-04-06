window.addEventListener("load", function() {
    this.document.getElementById("disable-css-btn").addEventListener("click", function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: () => {
                    function make_post_selector(number_of_posts) {
                        let activeURL = window.location.href;
                        let post_selector = "";
                        
                        if (!activeURL.includes("old.") && !activeURL.includes("/comments/")) { // subs new
                            post_selector = `shreddit-feed :nth-child(-n+${15 + number_of_posts})`;
                        } else if (!activeURL.includes("old.") && activeURL.includes("/comments/")) { // comments new
                            post_selector = `#comment-tree > [depth="0"]:nth-child(-n+${9 + number_of_posts})`;
                        } else if (activeURL.includes("old.") && !activeURL.includes("/comments/")) { // subsold
                            post_selector = `[data-url]:nth-child(-n+${22 + number_of_posts})`;
                        } else if (activeURL.includes("old.") && activeURL.includes("/comments/")) { // comments old
                            post_selector = `div[class="sitetable nestedlisting"] > .thing.comment:nth-child(-n+${6 + number_of_posts})`;
                        }
                        
                        return post_selector;
                    }
                    
                    // Create shared div
                    if (!document.querySelector("#REO_shared_div")) {
                        const div = document.createElement("div");
                        div.id = "REO_shared_div"; div.style.display = "none"; div.innerHTML = "0";
                        document.body.appendChild(div);
                    }
                    
                    // increment shared div
                    countup = parseInt(document.querySelector("#REO_shared_div").innerHTML);
                    document.querySelector("#REO_shared_div").innerHTML = countup + 1;
                    
                    
                    count = parseInt(document.querySelector("#REO_shared_div").innerHTML);
                    if (count === 1) {
                        document.querySelectorAll(make_post_selector(3)).forEach(comment => comment.style.display = "block");
                        alert("🧙‍♂️ En voilà un ou deux, mais ne sois pas trop gourmand !");
                    } else if (count === 2) {
                        alert("🧙‍♂️ C'est bien parce que je suis gentil, mais ma patience a des limites.");
                        document.querySelectorAll(make_post_selector(3)).forEach(comment => comment.style.display = "block");
                    } else if (count === 3) {
                        alert("🧙‍♂️ Je te préviens...");
                        document.querySelectorAll(make_post_selector(3)).forEach(comment => comment.style.display = "block");
                    } else if (count === 4) {
                        alert("🧙‍♂️ Tu l'auras voulu, je ne réponds plus, tant pis pour ta pomme.");
                    } else if (count === 6) {
                        alert("... Hey !");
                    } else if (count > 4 && count <= 7) {
                        alert("...");
                    }
                }
            });
        });
    });
});