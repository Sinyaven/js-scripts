// ==UserScript==
// @name         Wanikani show cursive
// @version      0.1
// @description  Adds a sidepanel with the word/kanji in cursive so that you can learn cursive while you're at it
// @author       grenzionky
// @match        https://www.wanikani.com/review/session
// @icon         https://www.google.com/s2/favicons?domain=wanikani.com
// @grant        none
// ==/UserScript==

(function() {
    //var span = document.createElement('span')
    //span.id = 'cursive'
    //span.style.fontFamily = 'KouzanBrushFontSousyoOTF'
    //document.getElementById('character').appendChild(span)
    var char = document.getElementById('character').firstElementChild
    //char.onchange = function() {
    //    span.innerText = char.innerText
    //}
    char.style.fontFamily = 'KouzanBrushFontSousyoOTF'
    char.onmouseenter = function() {
        char.style.fontFamily = 'sans-serif'
    }
    char.onmouseleave = function() {
        char.style.fontFamily = 'KouzanBrushFontSousyoOTF'
    }
})();
