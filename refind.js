
/* global chrome */

document.addEventListener('DOMContentLoaded', function() {
    var searchBox = document.getElementById("refind-input");
    var searchButton = document.getElementById("refind-submit");
    var clearButton = document.getElementById("refind-clear");
    
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
        
        chrome.tabs.insertCSS(currentTab.id, {
            file: "inject.css"
        });
        
        searchButton.onclick = function(ev) {
            if (searchBox.value.trim() === '') {
                return;
            }
            
            chrome.tabs.executeScript(currentTab.id, {
                code: "refindPerformSearch('" + searchBox.value + "');"
            });
        };
        
        clearButton.onclick = function(ef) {
            chrome.tabs.executeScript(currentTab.id, {
                code: "refindClearHighlightedMatches();"
            });
        };
    });
});
