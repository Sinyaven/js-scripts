// ==UserScript==
// @name         Better Learner's Dictionary audio
// @namespace    http://tampermonkey.net/
// @version      7.11.2018
// @description  Play the word's audio onclick right away without the popup
// @match        *.learnersdictionary.com/*
// @author       Abraham Gross
// @license      MIT
// ==/UserScript==

(function() {
    var soundButton = document.querySelectorAll('[data-file]');

    soundButton.forEach(function(sound){
	sound.classList.remove("play_pron");
    sound.onclick = function() {
        var dir = sound.getAttribute('data-dir');
        var file = sound.getAttribute('data-file');
        new Audio("https://media.merriam-webster.com/audio/prons/en/us/mp3/" + dir + "/" + file + ".mp3").play();
    }})
})();
