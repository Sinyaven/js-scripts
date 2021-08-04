// ==UserScript==
// @name        Netflix - Toggle Subtitle Keyboard Shortcut
// @description When pressing 'a', the preselected subtitle will automatically be toggled.
// @license     MIT
// @version     2.1
// @include     https://www.netflix.com/*
// @grant       none
// @updateURL   https://openuserjs.org/meta/grenzionky/Netflix_-_Toggle_Subtitle_Keyboard_Shortcut.meta.js
// ==/UserScript==

//To get the name of your specific subtitle language open the console and select it. It will show up as "Selected Subtitle: Language"
var SUBTITLE = "English";

(function(){
    document.addEventListener('keydown', function(event){
        if(event.code==='KeyA') {
            setTimeout(function(){
                let subsMenu = document.querySelector("#appMountPoint > div > div > div > div > div > div.nfp.AkiraPlayer.classic-ui > div > div.controls.legacy-controls-styles.PlayerControls--with-dim-background.active > div > div.PlayerControls--main-controls > div.PlayerControls--bottom-controls.nfp-control-row.bottom-controls > div.PlayerControls--button-control-row > div:nth-child(7) > button");
                if(subsMenu) {
                    subsMenu.click();
                    toggle(subsMenu);
                    setTimeout(function(){
                        document.querySelector('#appMountPoint > div > div > div > div > div > div.nfp.AkiraPlayer.classic-ui > div > div.controls.legacy-controls-styles.PlayerControls--with-dim-background.active > div > div.controls-full-hit-zone > div > div').click();
                    }, 1000);
                }
            }, 300);

        }
    });
})();

function toggle(subsMenu) {
    var subsoff = false;
    var iteration = 0;
    document.querySelector("div > ul.track-list.structural.track-list-subtitles").childNodes.forEach(function(lang) {
        if(lang.getAttribute('class')==='list-header') return;
        var currentSub = lang.getAttribute('data-uia').match(/\w+$/)[0];
        var isSelected = lang.getAttribute('class').includes("selected");
        if(isSelected) console.log("Selected Subtitle: "+currentSub);
        if(iteration === 0) {
            if(currentSub === "Off") {
                //if subtitles are turned off
                if(isSelected) subsoff = true;
                else lang.click();
            } else if (currentSub === SUBTITLE) {
                if(isSelected) subsoff = false;
                else lang.click();
            }
        } else if ((currentSub === SUBTITLE && subsoff) || (currentSub === "Off" && !subsoff)) {
            lang.click();
            subsoff = !subsoff;
        }
    });
    iteration = 0;
}
