/// <reference path="typings/jquery/jquery.d.ts"/>

// globals, yo
var REFIND_SPANSTYLE = 'refind-match-highlight';
var REFIND_HIDDEN_STYLE = 'refind-temp-hidden';
var REFIND_MATCHED_ELEM_STYLE = 'refind-matched-elem';
var REFIND_SPANSTART = '<span class="' + REFIND_SPANSTYLE + '">';
var REFIND_SPANEND = '</span>';

var refindPerformSearch = function(searchPattern) {
    // Before performing a search, remove any currently highlighted results
    //refindClearHighlightedMatches();
    
    // TODO Handle other types of elements (Headers, spans, etc)
    var pElems = document.getElementsByTagName('p');
    var frozenPElems = [];
    
    // We add more <p> elements in the highlight function, so we save a "frozen"
    // list here.  TODO Find a better solution for this.
    for (var i = 0; i < pElems.length; i++) {
        frozenPElems.push(pElems[i]);
    };
    
    for (var i = 0; i < frozenPElems.length; i++) {
        refindHighlightMatches(searchPattern, frozenPElems[i]);
    };
    
    var matchSpans = document.getElementsByClassName(REFIND_SPANSTYLE);
    if (matchSpans.length > 0) {
        $('html, body').animate({
            scrollTop: $(matchSpans[0]).offset().top
        }, 300);
    }
}

var refindClearHighlightedMatches = function() {
    var matchedElems = document.getElementsByClassName(REFIND_MATCHED_ELEM_STYLE);
    
    while (matchedElems.length > 0) {
        $(matchedElems[0]).remove();
    }
    
    var hiddenElems = document.getElementsByClassName(REFIND_HIDDEN_STYLE);
    for (var i = 0; i < hiddenElems.length; i++) {
        $(hiddenElems[i]).removeClass(REFIND_HIDDEN_STYLE);
    }
};

var refindHighlightMatches = function(pattern, element) {
    var rawText = element.textContent;
    var re = new RegExp(pattern, 'ig');
    
    var match;
    var newText = '';
    var curStartIndex = 0;
    while ((match = re.exec(rawText)) !== null) {
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
    
    // hide the original element
    $(element).addClass(REFIND_HIDDEN_STYLE);
    
    // append last unmatched portion of the text
    newText += rawText.substr(curStartIndex);
    
    // add highlighted version of element after the original copy
    $(element).after('<p class="' + REFIND_MATCHED_ELEM_STYLE + '"> ' + newText + '</p>')
};
