// hardcode a pattern for now, all words ending in 'ing'
var searchPattern = '\\w+ing\\W';

// TODO Before performing a search, remove any currently highlighted results

var highlightMatches = function(pattern, element) {
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
    
    // TODO
    console.log(newText + '\n');
    element.innerHTML = newText;
};

var pElems = document.getElementsByTagName('p');
console.log('Found ' + pElems.length + ' <p> tags.');
for (var i = 0; i < pElems.length; i++) {
    highlightMatches(searchPattern, pElems[i]);
};
