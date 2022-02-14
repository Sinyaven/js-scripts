// ==UserScript==
// @name             KanjiDamage mnemonics for WaniKani
// @version          1.8
// @description      Displays additional mnemonics for the given kanji.
// @namespace        https://github.com/grenzionky/KanjiDamage-mnemonics-for-WaniKani/blob/master/KanjiDamage%20mnemonics%20for%20WaniKani.user.js
// @supportURL       https://community.wanikani.com/t/userscript-kanjidamage-mnemonics-for-wanikani/18845
// @match            https://www.wanikani.com/kanji/*
// @match            https://www.wanikani.com/review/session
// @match            https://www.wanikani.com/lesson/session
// @match            https://preview.wanikani.com/kanji/*
// @match            https://preview.wanikani.com/review/session
// @match            https://preview.wanikani.com/lesson/session
// @author           Abraham Gross
// @license          MIT License Copyright (c) 2017 Abraham Gross
// @require          https://greasyfork.org/scripts/430565-wanikani-item-info-injector/code/WaniKani%20Item%20Info%20Injector.user.js?version=1013941
// @require          https://cdn.jsdelivr.net/gh/Sinyaven/js-scripts@7da0355390bf0cb8b8ef9ae4357b97155d22e746/KanjiDamage_kanjiToPage.js
// @downloadURL      https://greasyfork.org/scripts/440047-wanikani-kanjidamage-mnemonics-2/code/WaniKani%20KanjiDamage%20Mnemonics%202.user.js
// @grant            none
// ==/UserScript==

//First and foremost, I would like to give a MASSIVE thanks to KanjiDamage.com for having made an amazing index of great mnemonics!!!

(function () {
	/* global wkItemInfo */
	/* eslint no-multi-spaces: off */

	/*
	 * Global Variables/Objects/Classes
	 */
	const KD_CLASS_TO_TYPE = {onyomi: "reading", translation: "kanji", component: "radical"};
//	const HTML_TAG_PARSER = /<([^\/> ]+)(?:[^>]*(?:class|href|src)="([^>]*)")?[^>]*>(?:(                                                     [^]*?)<\/\1>)?/; // assumption: nested tags are always of different types, e.g. NOT: <p><p>...</p></p>
	const HTML_TAG_PARSER = /<([^\/> ]+)(?:[^>]*(?:class|href|src)="([^>]*)")?[^>]*>(?:((?:(?!<\/)[^](?!<\/\1))*?<\1\b[^>]*>[^]*?<\/\1>[^]*?|[^]*?)<\/\1>)?/; // assumption: each tag contains at most one other of its own type, e.g. NOT: <p><p><p>...</p></p></p> or <p><p>...</p><p>...</p></p>
	let meaningCache = {};
	let readingCache = {};

	/* MAIN */
	wkItemInfo.forType("kanji").under("meaning").appendSubsection(meaningHeading, appendMeaningMnemonic);
	wkItemInfo.forType("kanji").under("reading").appendSubsection(readingHeading, appendReadingMnemonic);

	function meaningHeading(injectorState) {
		let kdLink = kanjiDamageLink(injectorState.characters);
		if (!kdLink) return null;
		return [kdLink, " Meaning Mnemonic"];
	}

	function readingHeading(injectorState) {
		let kdLink = kanjiDamageLink(injectorState.characters);
		if (!kdLink) return null;
		return [kdLink, " Onyomi Mnemonic"];
	}

	async function appendMeaningMnemonic(injectorState) {
		let meaningMnemonic = await getMeaningMnemonic(injectorState.characters);
		if (!meaningMnemonic) return null;
		let nodes = mnemonicHtmlToNodeList(meaningMnemonic);
		let textLength = [...nodes].map(n => n.textContent).join("").length;
		if (textLength < 1) nodes.push("This Kanji has no meaning mnemonic");
		return nodes;
	}

	async function appendReadingMnemonic(injectorState) {
		let readingMnemonic = await getReadingMnemonic(injectorState.characters);
		if (!readingMnemonic) return null;
		let nodes = mnemonicHtmlToNodeList(readingMnemonic);
		let textLength = [...nodes].map(n => n.textContent).join("").length;
		if (textLength < 20) nodes.push("This Kanji has no special reading mnemonic (the meaning mnemonic usually includes the reading mnemonic in it).");
		return nodes;
	}

	function kanjiDamageLink(kanji) {
		let page = getKDPage(kanji);
		if (!page) return null;
		let link = document.createElement("A");
		link.textContent = "KanjiDamage";
		link.href = "https://" + page.substring(29);
		link.target = "_blank";
		return link;
	}

	function getKDPage (input = wkItemInfo.currentState.characters) {
		if (input in KANJI_TO_PAGE) return "https://grenzionky.github.io/www.kanjidamage.com/kanji/" + KANJI_TO_PAGE[input];
		return undefined;
	}

	function getMeaningMnemonic(kanji) {
		if (!(kanji in meaningCache)) updateCacheFor(kanji);
		return meaningCache[kanji];
	}

	function getReadingMnemonic(kanji) {
		if (!(kanji in readingCache)) updateCacheFor(kanji);
		return readingCache[kanji];
	}

	async function updateCacheFor(kanji) {
		let page = getKDPage(kanji);
		if (!page) return;
		let meaningResolve = null;
		let readingResolve = null;
		let meaningReject = null;
		let readingReject = null;
		meaningCache[kanji] = new Promise((resolve, reject) => { meaningResolve = resolve; meaningReject = reject; });
		readingCache[kanji] = new Promise((resolve, reject) => { readingResolve = resolve; readingReject = reject; });
		let response = await fetch(page);
		if (!response.ok) {
			delete meaningCache[kanji];
			delete readingCache[kanji];
			meaningReject();
			readingReject();
			return;
		}
		let html = new DOMParser().parseFromString(await response.text(), "text/html");
		let doc = html.getElementsByClassName("definition");
		meaningResolve(doc[doc.length > 4 ? 2 : 1].innerHTML.slice(27, -21));
		readingResolve(doc[doc.length > 4 ? 1 : 0].innerHTML);
	}

	function mnemonicHtmlToNodeList(text) {
		let parts = text.split(HTML_TAG_PARSER);
		parts = parts.   map((p, i) => i % 4 !== 1 ? p : [p, parts[i + 1], parts[i + 2]]);
		parts = parts.filter((p, i) => i % 4 < 2);
		let nodes = parts.flatMap((p, i) => {
			if (i % 2 === 0) return document.createTextNode(p);

			let [tag, attributeValue, textContent] = p;
			let element = null;
			switch (tag) {
				case "p"     : element = document.createElement("P"     ); break;
				case "div"   : element = document.createElement("DIV"   ); break;
				case "em"    : element = document.createElement("EM"    ); break;
				case "i"     : element = document.createElement("I"     ); break;
				case "b"     : element = document.createElement("B"     ); break;
				case "strong": element = document.createElement("STRONG"); break;
				case "a"     : element = document.createElement("A"     ); element.href = attributeValue.replace(/[\t\n\r]/g, "").replace(/javascript:/gi, ""); break;
				case "span"  : element = document.createElement("SPAN"  ); element.classList.add(`${KD_CLASS_TO_TYPE[attributeValue]}-highlight`, `highlight-${KD_CLASS_TO_TYPE[attributeValue]}`); element.originalTitle = KD_CLASS_TO_TYPE[attributeValue]; break;
				case "img"   : element = document.createElement("IMG"   ); element.src = `https://grenzionky.github.io/www.kanjidamage.com/${attributeValue.substring(3)}`; return element;
				case "br"    : element = document.createElement("BR"    ); return element;
				default: return mnemonicHtmlToNodeList(textContent || ""); // ignore unexpected tags
			}
			element.append(...mnemonicHtmlToNodeList(textContent));
			return element;
		});
		return nodes;
	}
})();
