// ==UserScript==
// @name             KanjiDamage mnemonics for WaniKani
// @version          1.2.1
// @description      Displays additional mnemonics for the given kanji.
// @namespace        https://github.com/grenzionky/KanjiDamage-mnemonics-for-WaniKani/blob/master/KanjiDamage%20mnemonics%20for%20WaniKani.user.js
// @match            *://www.wanikani.com/kanji*
// @match            *://www.wanikani.com/review/session*
// @match            *://www.wanikani.com/*/kanji*
// @match            *://www.wanikani.com/lesson/session*
// @author           Abraham Gross
// @license          MIT License Copyright (c) 2017 Abraham Gross
// ==/UserScript==

//First and foremost, I would like to give a MASSIVE thanks to KanjiDamage.com for having made an amazing index of great mnemonics!!!

//Also, huge thanks to looki's WaniKani Stroke Order script for a lot of the review & lesson page code:
//      The enum system to get the current page, getKanji(), and the idea to use MutationObserver.


//snippet from looki's WaniKani Stroke Order script starts here
/*
 * Global Variables/Objects/Classes
 */
var PageEnum = Object.freeze({ unknown:0, kanji:1, reviews:2, lessons:3 });
var curPage = PageEnum.unknown;


/* MAIN */
(function () {
    // Determine page type
    if (/\/kanji\/./.test(document.URL)) {
        curPage = PageEnum.kanji;
    } else if (/\/review\/./.test(document.URL)) {
        curPage = PageEnum.reviews;
    } else if (/\/lesson/.test(document.URL)) {
        curPage = PageEnum.lessons;
    }
    //ends here



    //where it gets displayed
    var mgetElement, mlocation, msection, mp, mheading, mhTxt, mp2, mp3, ms, mmnemonic, mee, d1, table, list, observer;
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    switch (curPage) {
        case PageEnum.kanji:
            if (getKDPage() !== undefined) console.log("The KanjiDamage page is:   " + getKDPage().substring(29));

            //meaning
            mgetElement = document.getElementsByClassName("span12")[1];
            mlocation = mgetElement.childNodes[mgetElement.childNodes.length-7];
            msection = document.createElement("SECTION");
            mp = document.createElement("P");
            msection.appendChild(mp);
            mheading = document.createElement("H2");
            mhTxt = document.createTextNode("KanjiDamage Meaning Mnemonic");
            mheading.appendChild(mhTxt);
            msection.appendChild(mheading);
            mp2 = document.createElement("p");
            mp2.setAttribute("id", "meaning");
            msection.appendChild(mp2);
            mgetElement.insertBefore(msection, mlocation);
            //mmnemonic = document.createTextNode(getMeaning());
            document.getElementById("meaning").innerHTML = getMeaning();
            if (document.getElementById("meaning").innerHTML === "" ) document.getElementById("meaning").innerHTML = "This Kanji has no meaning mnemonic";

            //reading
            //console.log(getKDPage());
            mlocation = mgetElement.childNodes[mgetElement.childNodes.length-5];
            msection = document.createElement("SECTION");
            mp = document.createElement("P");
            msection.appendChild(mp);
            mheading = document.createElement("H2");
            mhTxt = document.createTextNode("KanjiDamage Onyomi Mnemonic");
            mheading.appendChild(mhTxt);
            msection.appendChild(mheading);
            mp2 = document.createElement("table");
            mp2.setAttribute("id", "readingO");
            msection.appendChild(mp2);
            mgetElement.insertBefore(msection, mlocation);
            //console.log(getOnyomi());
            mee = getOnyomi();
            d1 = document.getElementById('readingO');
            d1.insertAdjacentHTML('beforeend', mee);
            table = document.getElementById("readingO");
            if (table.innerText.length < 10) {
                table.rows[0].cells[0].setAttribute("id", "rowS");
                document.getElementById("rowS").insertAdjacentHTML('afterend', '<td id="cell" style="width:90%"><p><p> This Kanji has no special reading mnemonic (the meaning mnemonic usually includes the reading mnemonic in it) .</p></p></td>');
            } else {
                table.rows[0].cells[0].setAttribute("id", "rowB");
                document.getElementById("rowB").insertAdjacentHTML('afterend', '<td id="cell" style="width:8%"></td>');
            }

            break;

        case PageEnum.reviews:
            //console.log('im alive');
            observer = new MutationObserver(function(mutations) {
                //console.log('mutation');
                mutations.forEach(function(mutation) {
                    //console.log('+++mutation');
                    //console.log('y u no work');

                    //the setTimeout is copied from   -->   https://stackoverflow.com/a/32572626/5287133
                    $(document).ready(function() { //When document has loaded
                        setTimeout(function() { //Code to run After timeout elapses
                            reviewMn();
                            reviewOn();
                        }, 50); //100ms will elapse and Code will execute.
                    });

                    console.log(mutation.type);
                    // The last one always has 2 mutations
                    if (mutations.length != 2) { return; }   //this line is copied from looki's WaniKani Stroke Order script

                });
            });
            observer.observe(document.querySelector('#information'), { attributes: true });

            break;

        case PageEnum.lessons:
            //lessons:

            //meaning
            mlocation = document.getElementsByClassName("pure-u-3-4 col2")[0];
            mp = document.createElement('p');
            ms = document.createElement('section');
            ms.setAttribute('id', 'kdmeaning');
            mlocation.insertBefore(mp, mlocation.children[3]);
            mlocation.insertBefore(ms, mlocation.children[4]);
            mheading = document.createElement("H2");
            mhTxt = document.createTextNode("KanjiDamage Meaning Mnemonic");
            mheading.appendChild(mhTxt);
            mlocation.insertBefore(mheading, mlocation.children[4]);
            //reading
            mlocation = document.getElementsByClassName("pure-u-3-4 col2")[1];
            mp = document.createElement('p');
            ms = document.createElement('section');
            ms.setAttribute('id', 'kdreading');
            mlocation.insertBefore(mp, mlocation.children[3]);
            mlocation.insertBefore(ms, mlocation.children[4]);
            mheading = document.createElement("H2");
            mhTxt = document.createTextNode("KanjiDamage Onyomi Mnemonic");
            mheading.appendChild(mhTxt);
            mlocation.insertBefore(mheading, mlocation.children[4]);
            mp2 = document.createElement("table");
            mp2.setAttribute("id", "kdrtable");
            ms.appendChild(mp2);

            //console.log(getOnyomi());



            observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    //console.log(mutation.type);
                    document.getElementById("kdmeaning").innerHTML = getMeaning();
                    if (document.getElementById("kdmeaning").innerHTML === "" ) document.getElementById("kdmeaning").innerHTML = "This Kanji has no meaning mnemonic";


                    document.getElementById("kdrtable").innerHTML = getOnyomi();
                    table = document.getElementById("kdrtable");
                    //console.log(table.innerText);
                    //console.log(table.innerText.length);
                    if (table.innerText.length < 16) {
                        //console.log('true');
                        if (document.getElementById('rowS'))
                            document.getElementById("rowS").innerHTML = '<td id="cell" style="width:75%">This Kanji has no reading mnemonic </td>';
                        else {
                            table.rows[0].cells[0].setAttribute("id", "rowS");
                            document.getElementById("rowS").insertAdjacentHTML('afterend', '<td id="cell" style="width:90%"> This Kanji has no special reading mnemonic (the meaning mnemonic usually includes the reading mnemonic in it) .</td>');
                        }
                    } else {
                        //console.log('else');
                        if (document.getElementById('rowB'))
                            document.getElementById("rowB").innerHTML = '<td id="cell" style="width:8%"></td>';
                        else {
                            table.rows[0].cells[0].setAttribute("id", "rowB");
                            document.getElementById("rowB").insertAdjacentHTML('afterend', '<td id="cell" style="width:8%"></td>');
                        }
                    }
                    if (getKDPage() !== undefined) console.log("The KanjiDamage page is:   " + getKDPage().substring(29));
                    reviewMn();
                    reviewOn();
                });
            });
            observer.observe(document.querySelector('#information'), { attributes: true });
            observer.observe(document.querySelector('#supplement-kan-meaning'), { attributes: true });

            break;
    }
})();



// FUNCTIONS

function reviewMn () {
    if("kan" in $.jStorage.get("currentItem") || $("#character").parent()[0].className === 'kanji' /*$("#character").hasClass("kanji")*/) {
        if (!$('#rmmeaning').length) {
            sc = document.createElement('span');
            ms = document.createElement('section');
            if (curPage === PageEnum.reviews) {       ///////////////////////////CHECK HERE (THIS 'IF' (THE ID'S)) FOR NOT SHOWING UP BUG IN THE FUTURE
                //console.log('this is a review page');
                ms.setAttribute('id', 'rmmeaning');
                sc.setAttribute('id', 'rsc');
            } else {
                //console.log('this is a lesson page');
                ms.setAttribute('id', 'lmmeaning');
                sc.setAttribute('id', 'lsc');
            }
            //console.log(ms);
            mheading = document.createElement("H2");
            mhTxt = document.createTextNode("KanjiDamage Meaning Mnemonic");
            mheading.appendChild(mhTxt);
            //console.log(mheading);
            ms.insertAdjacentElement('afterbegin', mheading);
            //console.log(ms);
            mlocation = document.getElementById('note-meaning');
            //console.log(mlocation);
            mlocation.insertAdjacentElement('beforebegin', ms);

            if (mlocation.getAttribute('style') === 'display: none;')
                ms.setAttribute('style', 'display: none;');
            else ms.setAttribute('style', 'display: block;');

            sc.innerHTML = getMeaning();
            ms.insertAdjacentElement('beforeend', sc);

            if (sc.innerText === "" ) sc.innerText = "This Kanji has no meaning mnemonic";

            if (getKDPage() !== undefined) console.log("The KanjiDamage page is:   " + getKDPage().substring(29));
        }
    }
    else
        return null;
}

function reviewOn () {
    if("kan" in $.jStorage.get("currentItem") || $("#character").parent()[0].className === 'kanji' /*$("#character").hasClass("kanji")*/) {
        if (!$('#rrreading').length) {
            // creates the area to place the reading mnemonic
            mlocation = document.getElementById("note-reading");
            ms = document.createElement('section');
            mp2 = document.createElement("table");
            if (curPage === PageEnum.reviews) {
                ms.setAttribute('id', 'rrreading');
                mp2.setAttribute("id", "rrrtable");
            } else {
                ms.setAttribute('id', 'lrreading');
                mp2.setAttribute("id", "lrrtable");
            }
            //mlocation.insertAdjacentElement('beforebegin', mp);
            mheading = document.createElement("H2");
            mhTxt = document.createTextNode("KanjiDamage Onyomi Mnemonic");
            mheading.appendChild(mhTxt);
            ms.insertAdjacentElement('afterbegin', mheading);
            mlocation.insertAdjacentElement('beforebegin', ms);

            if (mlocation.getAttribute('style') === 'display: none;')
                ms.setAttribute('style', 'display: none;');
            else ms.setAttribute('style', 'display: block;');

            table = mp2;
            ms.appendChild(mp2);
            //console.log(ms.innerHTML);
            //console.log(getOnyomi());
            table.insertAdjacentHTML('afterbegin', getOnyomi());
            //console.log(ms.innerHTML);
            //console.log(table);
            ms.appendChild(table);
            //console.log(table.innerHTML);
            //console.log(table.innerText.length);
            if (table.innerText.length < 16) {
                //console.log('true');
                table.rows[0].cells[0].setAttribute("id", "rrowS");
                table.rows[0].insertCell().setAttribute('id', 'newcell');
                cell = document.getElementById('newcell');
                cell.setAttribute('style', 'width:85%');
                cell.insertAdjacentHTML('afterbegin', '<td id="cell" style="width:85%"> This Kanji has no special reading mnemonic (the meaning mnemonic usually includes the reading mnemonic in it) .</td>');
            } else {
                //console.log('else');
                table.rows[0].cells[0].setAttribute("id", "rrowB");
                document.getElementById("rrowB").insertAdjacentHTML('afterend', '<td id="cell" style="width:8%"></td>');
                //console.log(ms);
            }
        }
    }
    else
        return null;
}

function getMeaning () {
    var doc = getHTML(getKDPage()).getElementsByClassName("definition");
    var definition;
    //console.log(doc);
    if (doc.length > 4) definition = doc[2];
    else definition = doc[1];
    //console.log(getHTML(getKDPage()));
    //console.log('definition');
    //console.log(definition);
    if (curPage === PageEnum.kanji) {
        //console.log("am in kanji enum nowO");
        return editMHTML(definition);
    } else {
        //console.log('am in lesson/review now');
        //console.log(editLessonMHTML(definition));
        return editLessonMHTML(definition);
    }
}

function getOnyomi () {
    var doc = getHTML(getKDPage()).getElementsByClassName("definition");
    var definition;
    if (doc.length > 4) definition = doc[1];
    else definition = doc[0];
    //console.log(definition.innerHTML.length);
    //console.log(definition);
    //console.log(definition.rows[0].cells[0]);
    //console.log(definition);
    if (curPage === PageEnum.kanji) {
        //console.log("am in kanji enum nowO");
        return editRHTML(definition);
    } else {
        //console.log('am in lesson/review now');
        //console.log('editlessonrHTML(definiton)');
        //console.log(editLessonRHTML(definition));
        return editLessonRHTML(definition);
    }
}


function getHTML (url) {
    var remote = $.ajax({
        type: "GET",
        url: url,
        async: false
    }).responseText;
    var parser = new DOMParser ();
    var html   = parser.parseFromString (remote, "text/html");
    return html;
}

/*
 * Returns the current kanji    ||   credit for getKanji() from looki's WaniKani Stroke Order script
 */
function getKanji() {
    switch(curPage) {
        case PageEnum.kanji:
            return document.title[document.title.length - 1];

        case PageEnum.reviews:
            //console.log(curPage);
            var curItem = $.jStorage.get("currentItem");
            if("kan" in curItem) {
                //console.log( curItem.kan.trim());
                return curItem.kan.trim(); }
            else
                return null;
            break;

        case PageEnum.lessons:
            var kanjiNode = $("#character");

            if(kanjiNode === undefined || kanjiNode === null)
                return null;
            //console.log(kanjiNode.text().trim());
            return kanjiNode.text().trim();
    }

    return null;
}

function getKDPage (input = getKanji()) {
    var doc, mtable, tr, td, i, href, kanji;
    mtable = getHTML("https://grenzionky.github.io/www.kanjidamage.com/kanji.html").getElementsByClassName ("table")[0];
    tr = mtable.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");

        for (var j = 0; j<td.length; ++j) {
            if (td[j].innerHTML.indexOf(input) > -1) {
                kanji = td[j].innerHTML.toString();
                href = "https://grenzionky.github.io/www.kanjidamage.com/" + kanji.match(/href="([^"]*)/)[1];
                return href;
            }
        }
    }
}




function editMHTML (htmlToEdit) {
    //console.log(htmlToEdit);
    if (htmlToEdit !== undefined) {
        var html = htmlToEdit.innerHTML;
        html = html.slice(27, -21);
        var kanji = "class=\"kanji-highlight\" title=\"\" rel=\"tooltip\" data-original-title=\"Kanji\"";
        var reading = "class=\"reading-highlight\" title=\"\" rel=\"tooltip\" data-original-title=\"Reading\"";
        var radical = "class=\"radical-highlight\" title=\"\" rel=\"tooltip\" data-original-title=\"Radical\"";
        //console.log(html);
        html = html.replace("src=\"..\/", "src=\"https://grenzionky.github.io/www.kanjidamage.com/");
        //console.log(html);
        html = html.replace(/class="onyomi"/g, reading);
        html = html.replace(/class="translation/g, kanji);
        html = html.replace(/class="component"/g, radical);
        html = html.toString();
        //console.log(html);
        return html;
    } else return 'Sorry, KanjiDamage doesn\'t have a mnemonic for this kanji';
}

function editRHTML (htmlToEdit) {
    //console.log(htmlToEdit);
    if (htmlToEdit !== undefined) {
        var html = htmlToEdit.innerHTML;
        var kanji = "class=\"kanji-highlight\" title=\"\" rel=\"tooltip\" data-original-title=\"Kanji\"";
        var reading = "class=\"reading-highlight\" title=\"\" rel=\"tooltip\" data-original-title=\"Reading\"";
        var radical = "class=\"radical-highlight\" title=\"\" rel=\"tooltip\" data-original-title=\"Radical\"";
        //console.log(html);
        html = html.replace("src=\"..\/", "src=\"https://grenzionky.github.io/www.kanjidamage.com/");
        //console.log(html);
        html = html.replace(/class="onyomi"/g, reading);
        html = html.replace(/class="translation/g, kanji);
        html = html.replace(/class="component"/g, radical);
        html = html.toString();
        //console.log(html);
        return html;
    } else return 'Sorry, KanjiDamage doesn\'t have a mnemonic for this kanji';
}


function editLessonMHTML (htmlToEdit) {
    //console.log(htmlToEdit);
    if (htmlToEdit !== undefined) {
        var html = htmlToEdit.innerHTML;
        html = html.slice(27, -21);
        var kanji = 'class="highlight-kanji"';
        var reading = 'class="highlight-reading"';
        var radical = 'class="highlight-radical"';
        //console.log(html);
        html = html.replace("src=\"..\/", "src=\"https://grenzionky.github.io/www.kanjidamage.com/");
        //console.log(html);
        html = html.replace(/class="onyomi"/g, reading);
        html = html.replace(/class="translation/g, kanji);
        html = html.replace(/class="component"/g, radical);
        html = html.toString();
        //console.log(html);
        return html;
    } else return 'Sorry, KanjiDamage doesn\'t have a mnemonic for this kanji';
}

function editLessonRHTML (htmlToEdit) {
    //console.log(htmlToEdit);
    if (htmlToEdit !== undefined) {
        var html = htmlToEdit.innerHTML;
        var kanji = 'class="highlight-kanji"';
        var reading = 'class="highlight-reading"';
        var radical = 'class="highlight-radical"';
        //console.log(html);
        html = html.replace("src=\"..\/", "src=\"https://grenzionky.github.io/www.kanjidamage.com/");
        //console.log(html);
        html = html.replace(/class="onyomi"/g, reading);
        html = html.replace(/class="translation/g, kanji);
        html = html.replace(/class="component"/g, radical);
        html = html.toString();
        //console.log(html);
        return html;
    } else return 'Sorry, KanjiDamage doesn\'t have a mnemonic for this kanji';
}
