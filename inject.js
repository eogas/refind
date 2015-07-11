
// TODO Before performing a search, remove any currently highlighted results
var refindPerformSearch = function(searchPattern) {
    // TODO Handle other types of elements (Headers, spans, etc)
    var pElems = document.getElementsByTagName('p');
    
    for (var i = 0; i < pElems.length; i++) {
        refindHighlightMatches(searchPattern, pElems[i]);
    };
}

var refindHighlightMatches = function(pattern, element) {
    var rawText = element.innerHTML;
    var re = new RegExp(pattern, 'g');
    
    var match;
    var newText = '';
    var curStartIndex = 0;
    while ((match = re.exec(rawText)) !== null) {
        console.log(rawText);
        // unmatched part of raw text
        newText += rawText.substr(curStartIndex, match.index - curStartIndex);
        
        // TODO Use custom style for highlighting
        // matched section
        newText += '<span class="refind-123evanisgreat456">';
        newText += match[0];
        newText += '</span>';
        
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
