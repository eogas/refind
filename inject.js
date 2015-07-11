/// <reference path="typings/jquery/jquery.d.ts"/>

// globals, yo
var REFIND_SPANSTYLE = 'refind-123evanisgreat456';
var REFIND_SPANSTART = '<span class="' + REFIND_SPANSTYLE + '">';
var REFIND_SPANEND = '</span>';

var refindPerformSearch = function(searchPattern) {
    // Before performing a search, remove any currently highlighted results
    refindClearHighlightedMatches();
    
    // TODO Handle other types of elements (Headers, spans, etc)
    var pElems = document.getElementsByTagName('p');
    
    for (var i = 0; i < pElems.length; i++) {
        refindHighlightMatches(searchPattern, pElems[i]);
    };
    
    var matchSpans = document.getElementsByClassName(REFIND_SPANSTYLE);
    if (matchSpans.length > 0) {
        $('html, body').animate({
            scrollTop: $(matchSpans[0]).offset().top
        }, 300);
    }
}

var refindClearHighlightedMatches = function() {
    var matchSpans = document.getElementsByClassName(REFIND_SPANSTYLE);  
    
    while (matchSpans.length > 0) {
        var matchSpan = matchSpans[0];
        var matchHTML = matchSpan.outerHTML;
        var matchText = matchSpan.innerHTML;
        var parentNode = matchSpan.parentNode;
        var fullText = parentNode.innerHTML;
        var rawText = "";
        
        var matchIndex = fullText.indexOf(matchHTML);
        rawText += fullText.substr(0, matchIndex);
        rawText += matchText;
        
        var spanEndIndex = matchIndex + matchHTML.length;
        rawText += fullText.substr(spanEndIndex);
        
        // This line removes the match span from the DOM, which also
        // removes it from the matchSpans result set on the fly
        parentNode.innerHTML = rawText;
    }
};

var refindHighlightMatches = function(pattern, element) {
    var rawText = element.innerHTML;
    var re = new RegExp(pattern, 'ig');
    
    var match;
    var newText = '';
    var curStartIndex = 0;
    while ((match = re.exec(rawText)) !== null) {
        console.log(rawText);
        // unmatched part of raw text
        newText += rawText.substr(curStartIndex, match.index - curStartIndex);
        
        // TODO Use custom style for highlighting
        // matched section
        newText += REFIND_SPANSTART;
        newText += match[0];
        newText += REFIND_SPANEND;
        
        curStartIndex = re.lastIndex;
    }
    
    // no changes
    if (newText === '') {
        return;
    }
    
    // append last unmatched portion of the text
    newText += rawText.substr(curStartIndex);
    element.innerHTML = newText;
};
