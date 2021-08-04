// ==UserScript==
// @name         Kitsu Human Score
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  Puts words next to the rating while rating an anime for a more accurate way to select how you thought an anime was.
// @author       Abraham Gross
// @match        https://kitsu.io/users/*
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @updateURL    https://openuserjs.org/meta/grenzionky/Kitsu_Human_Score.meta.js
// @downloadURL  https://openuserjs.org/install/grenzionky/Kitsu_Human_Score.user.js
// @license      MIT

// ==/UserScript==

(function() {
    document.body.onclick = function(){
        if(document.querySelector(".noUi-tooltip")){
            addWord();
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    addWord();
                });
            });
            observer.observe(document.querySelector('div.noUi-tooltip'), { childList: true });
        }
    };
})();

function addWord() {
    var score = document.querySelector('div.noUi-tooltip');
    switch(score.textContent) {
        case "10": score.textContent = score.textContent + " (Masterpiece)";
            break;
        case "9.5":
        case "9": score.textContent = score.textContent + " (Amazing)";
            break;
        case "8.5":
        case "8": score.textContent = score.textContent + " (Great)";
            break;
        case "7.5":
        case "7": score.textContent = score.textContent + " (Fine)";
            break;
        case "6.5":
        case "6": score.textContent = score.textContent + " (Average)";
            break;
        case "5.5":
        case "5": score.textContent = score.textContent + " (Boring)";
            break;
        case "4.5":
        case "4": score.textContent = score.textContent + " (Bad)";
            break;
        case "3.5":
        case "3": score.textContent = score.textContent + " (Very Bad)";
            break;
        case "2.5":
        case "2": score.textContent = score.textContent + " (Horrible)";
            break;
        case "1.5":
        case "1": score.textContent = score.textContent + " (Appaling)";
            break;
    }
}
