// ==UserScript==
// @name         Auto autofocus
// @version      2.1
// @description  Auto focuses the cursor in websites to the main search field
// @author       Abraham Gross
// @include      http*
// @exclude      *usps.com*
// @grant        none
// @license      MIT
// @run-at       document-idle
// @updateURL    https://openuserjs.org/meta/grenzionky/Auto_autofocus.meta.js
// @downloadURL  https://openuserjs.org/src/scripts/grenzionky/Auto_autofocus.user.js
// ==/UserScript==

(function() {
    //get the current scroll position so that the script doesn't change it by mistake
    var scrollPos = window.scrollY;
    //run it right when the page loads
    autofocus();
    //if an element at the bottom of the page gets selected it would be annoying to have to scroll back up
    window.scrollTo(0, scrollPos);

    //run it when user presses meta(windows)+shift
    document.addEventListener('keydown', function(event){
        if(event.metaKey && event.shiftKey)
            autofocus();
    });
})();

function autofocus() {
    //get all of the inputs in the document
    var allInputs = document.getElementsByTagName('input');
    //will be used as a flag if no inputs are found
    var gotFocused = false;
    //will be used to reiterate over the possible matches to find a more accurate result
    var betterInputs = [];

    if(allInputs.length > 0) {
        //first check if the website defined any search fields themselves
        for(var i=allInputs.length-1; i>=0; --i) {
            if(allInputs[i].type.toLowerCase().startsWith("search")||allInputs[i].type.toLowerCase().startsWith("検索")) {
                allInputs[i].focus();
                gotFocused = true;
            }
        }

        //if the website didn't do that, then we have to figure out ourself which field is the search field
        if(!gotFocused) {
            //basic algorithm to just isolate text input fields
            for(var j=allInputs.length-1; j>=0; --j) {
                if(allInputs[j].type === "text") {
                    allInputs[j].focus();
                    betterInputs.push(allInputs[j]);
                    gotFocused = true;
                }
            }

            //reiterate over all the text inputs to isolate the best match
            for(var k = betterInputs.length - 1; k >= 0; --k) {
                if(betterInputs[k].classList.toString().toLowerCase().includes("search") || betterInputs[k].placeholder.toLowerCase().includes("search") || betterInputs[k].classList.toString().toLowerCase().includes("検索") || betterInputs[k].placeholder.toLowerCase().includes("検索")) {
                    betterInputs[k].focus();
                }
            }

            //if no text input was found, default to the first input field.
            if (!gotFocused) allInputs[0].focus();
        }

        document.activeElement.select();
    }
}
