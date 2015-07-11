
/* global chrome */

document.addEventListener('DOMContentLoaded', function() {
    var searchBox = document.getElementById("refind-input");
    var searchButton = document.getElementById("refind-submit");
    
    searchButton.onclick = function(ev) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            if (tabs.length < 1) {
                // No active tab, fail!
                return;
            }
            
            // We should only ever get one tab back
            var currentTab = tabs[0];
            
            chrome.tabs.executeScript(currentTab.id, {
                file: "inject.js"
            });
        });
    };
});
