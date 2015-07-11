
/* global chrome */

document.addEventListener('DOMContentLoaded', function() {
    console.log("popup onload");
    
    var searchBox = document.getElementById("refind-input");
    var searchButton = document.getElementById("refind-submit");
    
    searchButton.onclick = function(ev) {
        console.log("searchButton.onclick");
        
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            if (tabs.length < 1) {
                return;
            }
            
            var currentTab = tabs[0];
            console.log(currentTab);
        });
    };
});
