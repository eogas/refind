/// <reference path="typings/jquery/jquery.d.ts"/>

// globals, yo
var REFIND_SPANSTYLE = 'refind-match-highlight';
var REFIND_HIDDEN_STYLE = 'refind-temp-hidden';
var REFIND_MATCHED_ELEM_STYLE = 'refind-matched-elem';
var REFIND_SPANSTART = '<span class="' + REFIND_SPANSTYLE + '">';
var REFIND_SPANEND = '</span>';

var refindHighlightMatchesForTagName = function(searchPattern, tagname) {
    var elems = document.getElementsByTagName(tagname);
    var frozenElems = [];
    
    // We add more matching elements in the highlight function, so we save a "frozen"
    // list here.  TODO Find a better solution for this.
    for (var i = 0; i < elems.length; i++) {
        frozenElems.push(elems[i]);
    };
    
    for (var i = 0; i < frozenElems.length; i++) {
        refindHighlightMatches(searchPattern, frozenElems[i], tagname);
    };
};

var refindPerformSearch = function(searchPattern) {
    // Before performing a search, remove any currently highlighted results
    refindClearHighlightedMatches();
    
    refindHighlightMatchesForTagName(searchPattern, 'p');
    refindHighlightMatchesForTagName(searchPattern, 'h1');
    refindHighlightMatchesForTagName(searchPattern, 'h2');
    refindHighlightMatchesForTagName(searchPattern, 'h3');
    refindHighlightMatchesForTagName(searchPattern, 'h4');
    refindHighlightMatchesForTagName(searchPattern, 'h5');
    refindHighlightMatchesForTagName(searchPattern, 'code');
    
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
    while (hiddenElems.length > 0) {
        $(hiddenElems[0]).removeClass(REFIND_HIDDEN_STYLE);
    }
};

var refindHighlightMatches = function(pattern, element, elemType) {
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
    
    // append last unmatched portion of the text
    newText += rawText.substr(curStartIndex);
    
    // add highlighted version of element after the original copy
    //var highlightedElem = $(element).after('<' + elemType + '> ' + newText + '</' + elemType + '>');
    var highlightedElem = document.createElement(elemType);
    highlightedElem.innerHTML = newText;
    
    $(element).after(highlightedElem);
    $(highlightedElem).addClass(REFIND_MATCHED_ELEM_STYLE);
    
    var classes = element.className.split(/\s+/);
    classes.forEach(function(cls) {
        $(highlightedElem).addClass(cls);
    })
    
    // hide the original element
    $(element).addClass(REFIND_HIDDEN_STYLE);
};
