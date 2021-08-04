// ==UserScript==
// @name         Play Hosted Videos in Potplayer
// @namespace    http://tampermonkey.net/
// @updateURL    https://openuserjs.org/meta/grenzionky/Play_Masterani_in_Potplayer.meta.js
// @downloadURL  https://openuserjs.org/src/scripts/grenzionky/Play_Masterani_in_Potplayer.user.js
// @version      1.3
// @license      MIT
// @description  Will automatically play videos in potplayer that are hosted on video hosting sites (if a site is missing request it, or pull the link)
// @author       Abraham Gross
// @include      *mp4upload.com*
// @include      *streamango.com*
// @include      *rapidvideo.com*
// @include      *openload.co*
// @include      *stream.moe*
// @include      *vidstreaming.io*
// @include      *masterani.me*
// @include      *msembed.net*
// @include      https://www.watchcartoononline.com/*
// @grant        GM_openInTab
// @grant        GM_xmlhttpRequest
// ==/UserScript==

/*
!!!IMPORTANT!!!
You must first set up potplayer for this to work:

add this to regedit (source: https://stackoverflow.com/a/31206594/5287133):

[HKEY_CLASSES_ROOT\potplayer\shell\open\command]
@="cmd /k ( set \"var=%1\" & call set var=%%var:potplayer://=%% & call C:\\PotPlayer\\PotPlayer.exe %%var%%)"

Or if you're not sure how to, here's a .reg file that will do it for you:
https://drive.google.com/file/d/1FcXvFzT1FDaN4AQBNKb4Qe9Dd0_WuD1g/view?usp=sharing

*/

(function() {
    window.addEventListener("load", function(event) {
        console.log(window.location.href);

        if(window.location.href.includes("stream.moe")) {
            var text = document.querySelector('#moe-framer').innerText;
            var enc = text.substring(text.indexOf("atob('"));
            openVideo(new DOMParser().parseFromString(atob(enc.substring(6, enc.indexOf("');"))), "text/html"));
        } else if(window.location.href.includes("openload.co")) {
            document.querySelector("#videooverlay").onclick = function(){openVideo(document);}
        } else {
            openVideo(document);
        }
    });
})();

function openVideo(document) {
    var video = document.getElementsByTagName('video')[0];

    try {
        video = video.firstElementChild.src;
    } catch(error) {
        video = "potplayer://"+video.src;
    }

    console.log(video);
    GM_openInTab(video, {loadInBackground: true}).close();
}
