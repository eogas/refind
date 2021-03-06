
/* global chrome */

document.addEventListener('DOMContentLoaded', function() {
    var searchBox = document.getElementById('refind-input');
    var searchButton = document.getElementById('refind-submit');
    var clearButton = document.getElementById('refind-clear');
    
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
        
        // TODO Try to eliminate jquery dependency
        chrome.tabs.executeScript(currentTab.id, {
            file: 'jquery-2.1.4.min.js'
        });
            
        chrome.tabs.executeScript(currentTab.id, {
            file: 'inject.js'
        });
        
        chrome.tabs.insertCSS(currentTab.id, {
            file: 'inject.css'
        });
        
        $(searchBox).keypress(function (e) {
            if (e.which === 13) {
                searchButton.click();
            }
        });
        
        searchButton.onclick = function(ev) {
            if (searchBox.value.trim() === '') {
                return;
            }
            
            // need to escape backslashes for eval
            var searchPattern = $(searchBox).val().replace(/\\/g, '\\\\');
            
            chrome.tabs.executeScript(currentTab.id, {
                code: "refindPerformSearch('" + searchPattern + "');"
            });
        };
        
        clearButton.onclick = function(ef) {
            searchBox.value = '';
            
            chrome.tabs.executeScript(currentTab.id, {
                code: 'refindClearHighlightedMatches();'
            });
        };
    });
});
