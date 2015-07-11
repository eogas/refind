# refind

### what?
refind is a simple Chrome extension that adds in the ability to find text on a page using regular expressions.

### why?
Sometimes when searching a page, a simple text match can be inconvenient.  For example, if I want to search for the
abbreviation for the state I live in ("WI"), I'll end up with tons of matches against words like "with".  I can add a space
after my search term ("WI "), but this will exclude instances of WI that precede punctuation.

With refind, I can simply do a search for "WI\W".

### attribution

* refind depends on [jQuery](https://jquery.com/)
* Search icon created by [Yannick Lung](https://www.iconfinder.com/yanlu)
