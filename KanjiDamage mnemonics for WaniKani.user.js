// ==UserScript==
// @name             KanjiDamage mnemonics for WaniKani
// @version          1.3
// @description      Displays additional mnemonics for the given kanji.
// @namespace        https://github.com/grenzionky/KanjiDamage-mnemonics-for-WaniKani/blob/master/KanjiDamage%20mnemonics%20for%20WaniKani.user.js
// @supportURL       https://community.wanikani.com/t/userscript-kanjidamage-mnemonics-for-wanikani/18845
// @match            *://www.wanikani.com/kanji*
// @match            *://www.wanikani.com/review/session*
// @match            *://www.wanikani.com/*/kanji*
// @match            *://www.wanikani.com/lesson/session*
// @author           Abraham Gross
// @license          MIT
// ==/UserScript==

//First and foremost, I would like to give a MASSIVE thanks to KanjiDamage.com for having made an amazing index of great mnemonics!!!

//Also, huge thanks to looki's WaniKani Stroke Order script for a lot of the review & lesson page code:
//      The enum system to get the current page, getKanji(), and the idea to use MutationObserver.


//snippet from looki's WaniKani Stroke Order script starts here
/*
 * Global Variables/Objects/Classes
 */

var kanjiToPage = {"一":"/kanji/1-one-line-radical-%E4%B8%80","二":"/kanji/2-two-%E4%BA%8C","三":"/kanji/3-three-%E4%B8%89","了":"/kanji/4-total-%E4%BA%86","子":"/kanji/5-child-%E5%AD%90","女":"/kanji/6-woman-%E5%A5%B3","好":"/kanji/7-like-%E5%A5%BD","姦":"/kanji/8-rape-%E5%A7%A6","口":"/kanji/9-mouth-small-box-radical-%E5%8F%A3","品":"/kanji/10-products-%E5%93%81","言":"/kanji/11-say-%E8%A8%80","下":"/kanji/12-below-%E4%B8%8B","不":"/kanji/13-un-%E4%B8%8D","否":"/kanji/14-no-%E5%90%A6","十":"/kanji/15-ten-%E5%8D%81","古":"/kanji/16-old-%E5%8F%A4","叶":"/kanji/17-dream-come-true-%E5%8F%B6","計":"/kanji/18-measure-%E8%A8%88","":"/kanji/1725-fffffoolio","七":"/kanji/20-seven-%E4%B8%83","比":"/kanji/21-compare-%E6%AF%94","叱":"/kanji/22-scold-%E5%8F%B1","日":"/kanji/23-sun-day-%E6%97%A5","旨":"/kanji/24-the-gist-%E6%97%A8","昆":"/kanji/25-insect-%E6%98%86","唱":"/kanji/26-chant-%E5%94%B1","晶":"/kanji/27-crystal-%E6%99%B6","旧":"/kanji/28-former-%E6%97%A7","早":"/kanji/29-early-%E6%97%A9","旦":"/kanji/30-danna-husband-%E6%97%A6","白":"/kanji/31-white-%E7%99%BD","皆":"/kanji/32-everyone-%E7%9A%86","水":"/kanji/33-water-%E6%B0%B4","泉":"/kanji/34-spring-%E6%B3%89","氷":"/kanji/35-ice-%E6%B0%B7","永":"/kanji/36-forever-%E6%B0%B8","泳":"/kanji/37-swim-%E6%B3%B3","泊":"/kanji/38-stay-for-the-night-%E6%B3%8A","汁":"/kanji/39-juice-soup-%E6%B1%81","混":"/kanji/40-mix-%E6%B7%B7","月":"/kanji/41-moon-organ-%E6%9C%88","湖":"/kanji/42-big-lake-%E6%B9%96","明":"/kanji/43-bright-%E6%98%8E","脂":"/kanji/44-animal-fat-%E8%84%82","胆":"/kanji/45-gall-bladder-daring-%E8%83%86","朝":"/kanji/46-morning-%E6%9C%9D","火":"/kanji/47-fire-%E7%81%AB","炎":"/kanji/48-flame-%E7%82%8E","淡":"/kanji/49-faint-%E6%B7%A1","談":"/kanji/50-consult-%E8%AB%87","丁":"/kanji/51-nail-%E4%B8%81","灯":"/kanji/52-streetlight-%E7%81%AF","可":"/kanji/55-possible-%E5%8F%AF","河":"/kanji/53-stream-%E6%B2%B3","訂":"/kanji/54-revise-%E8%A8%82","田":"/kanji/56-rice-field-%E7%94%B0","町":"/kanji/57-neighborhood-small-town-%E7%94%BA","畑":"/kanji/58-cultivated-field-%E7%95%91","胃":"/kanji/59-stomach-%E8%83%83","入":"/kanji/60-putgo-in-%E5%85%A5","人":"/kanji/61-person-%E4%BA%BA","何":"/kanji/62-what-%E4%BD%95","信":"/kanji/63-believe-%E4%BF%A1","化":"/kanji/64-transform-%E5%8C%96","花":"/kanji/65-flower-%E8%8A%B1","苦":"/kanji/66-suffer-%E8%8B%A6","草":"/kanji/67-grass-%E8%8D%89","荷":"/kanji/68-luggage-%E8%8D%B7","内":"/kanji/70-the-inside-%E5%86%85","肉":"/kanji/71-meat-%E8%82%89","円":"/kanji/72-yencircle-%E5%86%86","市":"/kanji/73-small-city-dagger-radical-%E5%B8%82","肺":"/kanji/74-lung-%E8%82%BA","姉":"/kanji/75-older-sister-%E5%A7%89","目":"/kanji/76-eye-%E7%9B%AE","冒":"/kanji/79-dare-%E5%86%92","帽":"/kanji/77-hat-%E5%B8%BD","自":"/kanji/78-my-own-%E8%87%AA","亭":"/kanji/81-restaurant-%E4%BA%AD","停":"/kanji/82-bring-to-a-halt-%E5%81%9C","卒":"/kanji/83-graduate-%E5%8D%92","方":"/kanji/84-direction-method-person-%E6%96%B9","万":"/kanji/85-10000-%E4%B8%87","訪":"/kanji/86-formal-visit-%E8%A8%AA","妨":"/kanji/87-prevent-%E5%A6%A8","肪":"/kanji/88-fatty-food-%E8%82%AA","又":"/kanji/89-again-crotch-radical-%E5%8F%88","双":"/kanji/90-pair-%E5%8F%8C","奴":"/kanji/91-servant-dood-%E5%A5%B4","文":"/kanji/92-culture-sentence-%E6%96%87","斉":"/kanji/93-unison-%E6%96%89","済":"/kanji/94-economy-to-be-over-%E6%B8%88","収":"/kanji/96-get-%E5%8F%8E","叫":"/kanji/97-shout-%E5%8F%AB","心":"/kanji/98-heart-%E5%BF%83","必":"/kanji/99-surely-%E5%BF%85","怒":"/kanji/100-get-mad-%E6%80%92","息":"/kanji/101-son-breath-%E6%81%AF","思":"/kanji/102-think-%E6%80%9D","L":"/kanji/103-loser-l","亡":"/kanji/104-dying-%E4%BA%A1","忙":"/kanji/105-busy-%E5%BF%99","忘":"/kanji/106-forget-%E5%BF%98","盲":"/kanji/107-blind-ignorant-%E7%9B%B2","妄":"/kanji/108-without-reason-or-permission-%E5%A6%84","慢":"/kanji/110-neglect-egotistic-%E6%85%A2","漫":"/kanji/111-manga-%E6%BC%AB","亜":"/kanji/112-sub-%E4%BA%9C","悪":"/kanji/113-bad-%E6%82%AA","夕":"/kanji/114-evening-%E5%A4%95","多":"/kanji/115-many-%E5%A4%9A","夢":"/kanji/116-dream-%E5%A4%A2","夜":"/kanji/117-late-night-%E5%A4%9C","液":"/kanji/118-liquid-%E6%B6%B2","名":"/kanji/119-name-famous-%E5%90%8D","死":"/kanji/120-death-%E6%AD%BB","外":"/kanji/122-outside-%E5%A4%96","上":"/kanji/123-above-%E4%B8%8A","卓":"/kanji/124-dinner-table-%E5%8D%93","占":"/kanji/125-fortune-teller-occupy-%E5%8D%A0","点":"/kanji/126-point-%E7%82%B9","宅":"/kanji/127-residence-%E5%AE%85","安":"/kanji/128-cheap-safe-%E5%AE%89","字":"/kanji/129-letter-%E5%AD%97","宣":"/kanji/130-announce-%E5%AE%A3","喧":"/kanji/131-fight-or-quarrel-%E5%96%A7","八":"/kanji/132-eight-%E5%85%AB","穴":"/kanji/133-hole-%E7%A9%B4","六":"/kanji/134-six-%E5%85%AD","沿":"/kanji/135-run-parallel-to-%E6%B2%BF","ム":"/kanji/136-moocow-%E3%83%A0","公":"/kanji/137-public-%E5%85%AC","訟":"/kanji/138-lawsuit-%E8%A8%9F","台":"/kanji/139-big-thing-counter-%E5%8F%B0","治":"/kanji/140-cure-%E6%B2%BB","始":"/kanji/141-begin-%E5%A7%8B","怠":"/kanji/142-lazy-%E6%80%A0","能":"/kanji/143-talent-%E8%83%BD","熊":"/kanji/144-bear-%E7%86%8A","態":"/kanji/145-looks-like-%E6%85%8B","仏":"/kanji/146-buddha-%E4%BB%8F","立":"/kanji/148-stand-up-%E7%AB%8B","辛":"/kanji/149-spicy-painful-%E8%BE%9B","幸":"/kanji/150-luck-happiness-%E5%B9%B8","宰":"/kanji/151-manager-%E5%AE%B0","泣":"/kanji/152-cry-%E6%B3%A3","位":"/kanji/153-rank-%E4%BD%8D","音":"/kanji/156-sound-%E9%9F%B3","章":"/kanji/154-emblem-chapter-%E7%AB%A0","暗":"/kanji/155-dark-%E6%9A%97","意":"/kanji/157-meaning-%E6%84%8F","億":"/kanji/158-a-hundred-million-%E5%84%84","憶":"/kanji/159-recollect-%E6%86%B6","門":"/kanji/160-gate-%E9%96%80","闇":"/kanji/161-pitch-black-darkness-%E9%97%87","間":"/kanji/162-a-period-of-time-%E9%96%93","問":"/kanji/163-question-problem-%E5%95%8F","刀":"/kanji/164-sword-%E5%88%80","前":"/kanji/865-before-%E5%89%8D","切":"/kanji/165-cut-important-%E5%88%87","召":"/kanji/166-summon-%E5%8F%AC","昭":"/kanji/167-shining-showa-era-%E6%98%AD","照":"/kanji/168-contrast-%E7%85%A7","分":"/kanji/169-understand-divide-minute-%E5%88%86","剤":"/kanji/170-type-of-medicine-%E5%89%A4","罰":"/kanji/171-punishment-%E7%BD%B0","刃":"/kanji/172-blade-%E5%88%83","忍":"/kanji/173-hide-endure-%E5%BF%8D","認":"/kanji/174-admit-%E8%AA%8D","力":"/kanji/175-strong-%E5%8A%9B","加":"/kanji/176-add-%E5%8A%A0","協":"/kanji/177-cooperate-%E5%8D%94","脅":"/kanji/178-threaten-%E8%84%85","努":"/kanji/179-make-an-effort-%E5%8A%AA","男":"/kanji/180-man-%E7%94%B7","九":"/kanji/181-the-number-9-%E4%B9%9D","究":"/kanji/182-research-%E7%A9%B6","丸":"/kanji/183-round-%E4%B8%B8","熟":"/kanji/184-get-good-at-%E7%86%9F","執":"/kanji/185-to-hella-do-%E5%9F%B7","小":"/kanji/192-small-size-%E5%B0%8F","少":"/kanji/193-a-little-amount-%E5%B0%91","劣":"/kanji/194-inferiority-%E5%8A%A3","妙":"/kanji/195-odd-%E5%A6%99","省":"/kanji/196-ministry-cut-down-on-%E7%9C%81","京":"/kanji/197-capital-%E4%BA%AC","涼":"/kanji/198-cool-place-%E6%B6%BC","景":"/kanji/199-scene-%E6%99%AF","示":"/kanji/200-show-altar-radical-%E7%A4%BA","宗":"/kanji/201-religion-%E5%AE%97","寂":"/kanji/202-lonely-%E5%AF%82","督":"/kanji/203-supervisor-%E7%9D%A3","幼":"/kanji/205-childhood-%E5%B9%BC","玄":"/kanji/206-deep-profound-%E7%8E%84","畜":"/kanji/207-raising-of-domestic-animals-%E7%95%9C","蓄":"/kanji/208-store-or-put-aside-%E8%93%84","糸":"/kanji/209-string-%E7%B3%B8","紹":"/kanji/210-acquaint-%E7%B4%B9","線":"/kanji/211-line-%E7%B7%9A","綿":"/kanji/212-cotton-%E7%B6%BF","細":"/kanji/213-slender-%E7%B4%B0","総":"/kanji/214-general-total-%E7%B7%8F","索":"/kanji/215-look-up-%E7%B4%A2","納":"/kanji/216-to-supply-%E7%B4%8D","紛":"/kanji/217-ambiguous-%E7%B4%9B","絹":"/kanji/218-silk-%E7%B5%B9","系":"/kanji/219-group-tribe-%E7%B3%BB","孫":"/kanji/220-grandchild-%E5%AD%AB","係":"/kanji/221-be-involved-with-%E4%BF%82","干":"/kanji/222-dry-out-%E5%B9%B2","刊":"/kanji/223-edition-%E5%88%8A","用":"/kanji/224-utilize-%E7%94%A8","肝":"/kanji/225-liver-%E8%82%9D","芋":"/kanji/226-potato-%E8%8A%8B","汗":"/kanji/227-sweat-%E6%B1%97","宇":"/kanji/228-cosmos-%E5%AE%87","千":"/kanji/229-thousand-%E5%8D%83","舌":"/kanji/230-tongue-%E8%88%8C","話":"/kanji/231-conversation-%E8%A9%B1","活":"/kanji/232-vivid-lively-%E6%B4%BB","辞":"/kanji/233-quit-%E8%BE%9E","憩":"/kanji/234-break-at-work-%E6%86%A9","半":"/kanji/186-half-%E5%8D%8A","判":"/kanji/188-judgement-%E5%88%A4","伴":"/kanji/190-accompany-%E4%BC%B4","平":"/kanji/187-equal-level-%E5%B9%B3","評":"/kanji/189-art-or-literary-criticism-%E8%A9%95","呼":"/kanji/191-call-to-someone-%E5%91%BC","土":"/kanji/235-earth-%E5%9C%9F","里":"/kanji/236-village-%E9%87%8C","量":"/kanji/237-quantity-%E9%87%8F","黒":"/kanji/238-black-%E9%BB%92","童":"/kanji/239-kid-%E7%AB%A5","憧":"/kanji/240-yearn-for-%E6%86%A7","埋":"/kanji/241-bury-%E5%9F%8B","坊":"/kanji/242-boy-monk-%E5%9D%8A","吐":"/kanji/243-puke-%E5%90%90","塾":"/kanji/244-cram-school-%E5%A1%BE","士":"/kanji/245-samurai-radical-%E5%A3%AB","仕":"/kanji/246-work-%E4%BB%95","志":"/kanji/247-intention-volition-%E5%BF%97","吉":"/kanji/248-good-omen-%E5%90%89","詰":"/kanji/249-cram-in-%E8%A9%B0","結":"/kanji/250-bind-%E7%B5%90","誌":"/kanji/251-magazine-%E8%AA%8C","老":"/kanji/253-get-old-%E8%80%81","孝":"/kanji/254-filial-piety-%E5%AD%9D","者":"/kanji/255-professional-%E8%80%85","著":"/kanji/256-author-%E8%91%97","緒":"/kanji/257-together-%E7%B7%92","諸":"/kanji/258-various-%E8%AB%B8","署":"/kanji/259-government-office-%E7%BD%B2","暑":"/kanji/260-hot-place-%E6%9A%91","煮":"/kanji/261-simmerstew-%E7%85%AE","焦":"/kanji/263-char-scorch-%E7%84%A6","無":"/kanji/264-without-%E7%84%A1","維":"/kanji/265-upkeep-%E7%B6%AD","唯":"/kanji/266-sole-or-only-%E5%94%AF","誰":"/kanji/267-who-%E8%AA%B0","準":"/kanji/268-prepare-criteria-%E6%BA%96","護":"/kanji/269-defend-%E8%AD%B7","馬":"/kanji/270-horse-%E9%A6%AC","止":"/kanji/271-stop-%E6%AD%A2","雌":"/kanji/272-your-moms-%E9%9B%8C","肯":"/kanji/273-consent-%E8%82%AF","歩":"/kanji/274-walk-%E6%AD%A9","渉":"/kanji/275-interfere-%E6%B8%89","紫":"/kanji/276-purple-%E7%B4%AB","足":"/kanji/277-foot-be-enough-%E8%B6%B3","促":"/kanji/278-peer-pressure-%E4%BF%83","踏":"/kanji/279-tread-on-%E8%B8%8F","正":"/kanji/280-correct-%E6%AD%A3","是":"/kanji/281-fer-shure-%E6%98%AF","定":"/kanji/282-plan-%E5%AE%9A","証":"/kanji/284-proof-%E8%A8%BC","歪":"/kanji/285-distort-%E6%AD%AA","走":"/kanji/286-run-%E8%B5%B0","超":"/kanji/287-exceed-go-over-%E8%B6%85","尺":"/kanji/288-r-for-rock-%E5%B0%BA","駅":"/kanji/289-train-station-%E9%A7%85","昼":"/kanji/290-noon-%E6%98%BC","訳":"/kanji/291-reason-translation-%E8%A8%B3","沢":"/kanji/292-swamp-bling-%E6%B2%A2","手":"/kanji/293-hand-%E6%89%8B","択":"/kanji/294-select-%E6%8A%9E","推":"/kanji/295-infer-%E6%8E%A8","描":"/kanji/296-depict-%E6%8F%8F","提":"/kanji/283-submit-a-proposal-%E6%8F%90","払":"/kanji/297-pay-%E6%89%95","批":"/kanji/298-call-bullshit-on-%E6%89%B9","指":"/kanji/299-finger-point-at-%E6%8C%87","打":"/kanji/300-pound-%E6%89%93","招":"/kanji/302-beckon-%E6%8B%9B","拐":"/kanji/303-kidnap-%E6%8B%90","担":"/kanji/304-carry-on-your-back-%E6%8B%85","接":"/kanji/305-directly-contact-%E6%8E%A5","拍":"/kanji/306-clap-%E6%8B%8D","挿":"/kanji/307-insert-%E6%8C%BF","看":"/kanji/308-observeguard-%E7%9C%8B","耳":"/kanji/309-ear-%E8%80%B3","取":"/kanji/310-take-%E5%8F%96","最":"/kanji/311-most-%E6%9C%80","撮":"/kanji/312-photo-shoot-%E6%92%AE","趣":"/kanji/313-hobby-%E8%B6%A3","恥":"/kanji/314-disgrace-%E6%81%A5","聞":"/kanji/1748-listen-ask-%E8%81%9E","斤":"/kanji/315-axe-%E6%96%A4","折":"/kanji/316-fold-%E6%8A%98","丘":"/kanji/317-hill-%E4%B8%98","哲":"/kanji/318-philosophy-%E5%93%B2","誓":"/kanji/319-vow-%E8%AA%93","訴":"/kanji/320-accuse-%E8%A8%B4","竹":"/kanji/321-bamboo-%E7%AB%B9","筋":"/kanji/322-muscle-%E7%AD%8B","簡":"/kanji/323-simplicity-%E7%B0%A1","作":"/kanji/325-make-%E4%BD%9C","昨":"/kanji/326-yesterday-%E6%98%A8","近":"/kanji/328-near-%E8%BF%91","辺":"/kanji/329-around-herearound-that-time-%E8%BE%BA","迫":"/kanji/330-press-upon-%E8%BF%AB","込":"/kanji/331-get-crowded-%E8%BE%BC","達":"/kanji/332-pluraldelivery-%E9%81%94","進":"/kanji/333-progress-%E9%80%B2","述":"/kanji/334-refer-to-%E8%BF%B0","木":"/kanji/335-tree-%E6%9C%A8","林":"/kanji/336-grove-%E6%9E%97","森":"/kanji/337-forest-%E6%A3%AE","本":"/kanji/338-book-the-real-%E6%9C%AC","体":"/kanji/339-body-%E4%BD%93","休":"/kanji/340-rest-%E4%BC%91","枠":"/kanji/341-boundary-limit-%E6%9E%A0","析":"/kanji/342-analyze-%E6%9E%90","策":"/kanji/343-take-measures-%E7%AD%96","刺":"/kanji/344-stab-buisness-card-%E5%88%BA","新":"/kanji/345-new-%E6%96%B0","集":"/kanji/346-collect-%E9%9B%86","棚":"/kanji/347-shelf-%E6%A3%9A","松":"/kanji/348-pine-%E6%9D%BE","枯":"/kanji/349-wither-%E6%9E%AF","相":"/kanji/350-partner-%E7%9B%B8","箱":"/kanji/351-box-%E7%AE%B1","想":"/kanji/352-ideaimagination-%E6%83%B3","禁":"/kanji/353-prohibition-%E7%A6%81","果":"/kanji/354-fruit-result-%E6%9E%9C","課":"/kanji/355-section-or-lesson-%E8%AA%B2","菓":"/kanji/356-sweetspastry-%E8%8F%93","東":"/kanji/357-east-%E6%9D%B1","練":"/kanji/358-practice-%E7%B7%B4","案":"/kanji/359-guideproposal-%E6%A1%88","杯":"/kanji/360-one-cup-of-liquid-%E6%9D%AF","膝":"/kanji/361-knee-or-lap-%E8%86%9D","保":"/kanji/362-guaranteemaintain-%E4%BF%9D","繰":"/kanji/363-spin-%E7%B9%B0","操":"/kanji/364-manipulate-chastity-%E6%93%8D","染":"/kanji/365-dye-%E6%9F%93","雑":"/kanji/366-miscellaneous-random-%E9%9B%91","稚":"/kanji/368-childish-%E7%A8%9A","和":"/kanji/369-peace-japan-%E5%92%8C","秘":"/kanji/370-secret-%E7%A7%98","私":"/kanji/371-me-private-%E7%A7%81","秒":"/kanji/372-one-second-%E7%A7%92","移":"/kanji/373-transfer-%E7%A7%BB","利":"/kanji/374-handy-%E5%88%A9","季":"/kanji/375-season-%E5%AD%A3","委":"/kanji/376-member-%E5%A7%94","香":"/kanji/377-good-smell-%E9%A6%99","秋":"/kanji/378-fall-%E7%A7%8B","愁":"/kanji/379-sorrow-%E6%84%81","末":"/kanji/380-the-tip-%E6%9C%AB","未":"/kanji/381-not-yet-%E6%9C%AA","妹":"/kanji/382-little-sister-%E5%A6%B9","味":"/kanji/383-flavor-%E5%91%B3","米":"/kanji/384-rice-america-%E7%B1%B3","迷":"/kanji/385-perplexed-%E8%BF%B7","謎":"/kanji/386-mystery-%E8%AC%8E","断":"/kanji/387-decisionjudgementrefuse-%E6%96%AD","継":"/kanji/388-succeed-inherit-%E7%B6%99","粘":"/kanji/389-be-sticky-%E7%B2%98","粋":"/kanji/391-essence-%E7%B2%8B","粒":"/kanji/392-grain-%E7%B2%92","粉":"/kanji/393-powder-%E7%B2%89","来":"/kanji/394-comefuture-%E6%9D%A5","番":"/kanji/395-number-%E7%95%AA","審":"/kanji/396-judge-%E5%AF%A9","大":"/kanji/397-big-%E5%A4%A7","奥":"/kanji/398-waaay-in-the-back-%E5%A5%A5","奇":"/kanji/399-strange-%E5%A5%87","寄":"/kanji/400-get-close-%E5%AF%84","臭":"/kanji/401-stinky-odor-%E8%87%AD","奮":"/kanji/402-get-worked-up-%E5%A5%AE","器":"/kanji/403-instrument-%E5%99%A8","突":"/kanji/404-thrust-%E7%AA%81","央":"/kanji/405-central-%E5%A4%AE","映":"/kanji/406-project-reflect-%E6%98%A0","英":"/kanji/407-heroic-%E8%8B%B1","犬":"/kanji/408-dog-%E7%8A%AC","伏":"/kanji/409-lay-face-down-%E4%BC%8F","黙":"/kanji/410-shut-up-%E9%BB%99","然":"/kanji/411-nature-%E7%84%B6","燃":"/kanji/412-burn-%E7%87%83","太":"/kanji/413-fat-%E5%A4%AA","駄":"/kanji/414-bad-quality-%E9%A7%84","漢":"/kanji/421-chinese-%E6%BC%A2","難":"/kanji/422-difficult-%E9%9B%A3","勤":"/kanji/423-be-employed-at-%E5%8B%A4","嘆":"/kanji/424-lament-sigh-%E5%98%86","模":"/kanji/425-model-%E6%A8%A1","墓":"/kanji/426-grave-%E5%A2%93","暮":"/kanji/427-make-a-living-%E6%9A%AE","募":"/kanji/428-recruit-%E5%8B%9F","幕":"/kanji/429-curtain-%E5%B9%95","漠":"/kanji/430-desert-%E6%BC%A0","因":"/kanji/432-origin-%E5%9B%A0","恩":"/kanji/433-kindness-%E6%81%A9","菌":"/kanji/434-bacteria-%E8%8F%8C","困":"/kanji/435-trouble-%E5%9B%B0","囚":"/kanji/436-prisoner-%E5%9B%9A","回":"/kanji/437-rotate-times-%E5%9B%9E","固":"/kanji/439-hard-%E5%9B%BA","個":"/kanji/440-individual-%E5%80%8B","井":"/kanji/441-well-%E4%BA%95","囲":"/kanji/442-surround-%E5%9B%B2","丼":"/kanji/443-beef-bowl-%E4%B8%BC","王":"/kanji/444-king-%E7%8E%8B","玉":"/kanji/452-ball-%E7%8E%89","国":"/kanji/438-country-%E5%9B%BD","宝":"/kanji/453-treasure-%E5%AE%9D","理":"/kanji/445-reason-%E7%90%86","任":"/kanji/446-have-responsibility-for-%E4%BB%BB","妊":"/kanji/447-pregnant-%E5%A6%8A","皇":"/kanji/448-emperor-%E7%9A%87","望":"/kanji/449-desire-%E6%9C%9B","聖":"/kanji/450-holy-%E8%81%96","程":"/kanji/451-extent-%E7%A8%8B","主":"/kanji/454-mastermainly-%E4%B8%BB","契":"/kanji/455-contract-%E5%A5%91","喫":"/kanji/456-enjoy-a-drink-and-a-smoke-%E5%96%AB","潔":"/kanji/457-honorable-%E6%BD%94","注":"/kanji/458-pour-be-careful-%E6%B3%A8","柱":"/kanji/459-pillar-%E6%9F%B1","住":"/kanji/460-dwell-%E4%BD%8F","駐":"/kanji/461-stop-at-%E9%A7%90","害":"/kanji/462-damage-%E5%AE%B3","割":"/kanji/463-divide-%E5%89%B2","素":"/kanji/464-element-%E7%B4%A0","憲":"/kanji/465-constitution-%E6%86%B2","青":"/kanji/466-blue-%E9%9D%92","請":"/kanji/467-request-%E8%AB%8B","清":"/kanji/468-pure-%E6%B8%85","精":"/kanji/469-spirit-%E7%B2%BE","晴":"/kanji/470-weather-get-good-now-%E6%99%B4","情":"/kanji/471-emotion-%E6%83%85","生":"/kanji/473-life-birth-%E7%94%9F","星":"/kanji/474-star-%E6%98%9F","性":"/kanji/475-sex-essential-nature-%E6%80%A7","姓":"/kanji/476-family-name-%E5%A7%93","朱":"/kanji/477-vermilion-%E6%9C%B1","株":"/kanji/478-share-stock-%E6%A0%AA","遊":"/kanji/1753-play-around-%E9%81%8A","称":"/kanji/479-symmetry-%E7%A7%B0","乙":"/kanji/480-second-rank-girl-%E4%B9%99","乾":"/kanji/481-dessicate-%E4%B9%BE","母":"/kanji/482-your-moms-%E6%AF%8D","毒":"/kanji/483-poison-addict-%E6%AF%92","毎":"/kanji/484-every-%E6%AF%8E","梅":"/kanji/485-plum-%E6%A2%85","海":"/kanji/486-ocean-%E6%B5%B7","悔":"/kanji/487-regret-%E6%82%94","侮":"/kanji/488-despise-%E4%BE%AE","中":"/kanji/489-middle-%E4%B8%AD","忠":"/kanji/490-loyalty-%E5%BF%A0","患":"/kanji/491-medical-patient-%E6%82%A3","仲":"/kanji/492-friendship-%E4%BB%B2","虫":"/kanji/493-insizzect-%E8%99%AB","蛇":"/kanji/494-snake-%E8%9B%87","蚊":"/kanji/495-mosquito-%E8%9A%8A","騒":"/kanji/496-make-noise-%E9%A8%92","属":"/kanji/498-genusaffiliation-%E5%B1%9E","居":"/kanji/499-live-%E5%B1%85","尼":"/kanji/500-nun-%E5%B0%BC","泥":"/kanji/501-mud-%E6%B3%A5","尿":"/kanji/502-urine-%E5%B0%BF","尻":"/kanji/503-butt-%E5%B0%BB","刷":"/kanji/504-print-%E5%88%B7","戸":"/kanji/505-door-%E6%88%B8","所":"/kanji/506-area-attribute-%E6%89%80","肩":"/kanji/507-shoulder-%E8%82%A9","雇":"/kanji/508-hire-%E9%9B%87","房":"/kanji/509-wifecluster-%E6%88%BF","戻":"/kanji/510-return-%E6%88%BB","涙":"/kanji/511-teardrop-%E6%B6%99","毛":"/kanji/512-fur-%E6%AF%9B","尾":"/kanji/513-tail-%E5%B0%BE","革":"/kanji/514-leatherrevolution-%E9%9D%A9","靴":"/kanji/515-shoe-%E9%9D%B4","甘":"/kanji/516-sweet-%E7%94%98","某":"/kanji/517-a-certain-%E6%9F%90","謀":"/kanji/518-plot-%E8%AC%80","見":"/kanji/520-look-%E8%A6%8B","寛":"/kanji/521-leniency-%E5%AF%9B","焼":"/kanji/522-roast-grill-%E7%84%BC","境":"/kanji/523-border-%E5%A2%83","現":"/kanji/524-present-time-%E7%8F%BE","親":"/kanji/525-parentskindness-%E8%A6%AA","兄":"/kanji/526-older-brother-%E5%85%84","克":"/kanji/527-overcome-%E5%85%8B","況":"/kanji/528-condition-%E6%B3%81","競":"/kanji/529-contest-%E7%AB%B6","児":"/kanji/530-baby-%E5%85%90","貝":"/kanji/532-shellfish-money-%E8%B2%9D","買":"/kanji/533-buy-%E8%B2%B7","憤":"/kanji/534-get-indignant-%E6%86%A4","噴":"/kanji/535-spew-%E5%99%B4","貨":"/kanji/536-cargo-%E8%B2%A8","貧":"/kanji/537-poverty-%E8%B2%A7","貯":"/kanji/538-save-up-%E8%B2%AF","賭":"/kanji/539-bet-or-stake-%E8%B3%AD","質":"/kanji/540-quality-%E8%B3%AA","賃":"/kanji/541-rent-money-%E8%B3%83","貞":"/kanji/542-chastity-%E8%B2%9E","偵":"/kanji/543-detective-%E5%81%B5","員":"/kanji/544-clerk-%E5%93%A1","損":"/kanji/545-harm-%E6%90%8D","則":"/kanji/546-rule-%E5%89%87","側":"/kanji/547-side-of-something-%E5%81%B4","測":"/kanji/548-scientific-measurment-%E6%B8%AC","貫":"/kanji/549-pierce-%E8%B2%AB","慣":"/kanji/550-adapt-%E6%85%A3","責":"/kanji/551-condemn-%E8%B2%AC","績":"/kanji/552-achievements-%E7%B8%BE","積":"/kanji/553-pile-up-%E7%A9%8D","貴":"/kanji/554-exalted-%E8%B2%B4","遺":"/kanji/555-bequeath-%E9%81%BA","兵":"/kanji/556-soldier-%E5%85%B5","浜":"/kanji/557-beach-%E6%B5%9C","負":"/kanji/559-lose-%E8%B2%A0","魚":"/kanji/560-fish-%E9%AD%9A","角":"/kanji/561-horncorner-%E8%A7%92","触":"/kanji/562-touch-%E8%A7%A6","売":"/kanji/564-sell-%E5%A3%B2","続":"/kanji/565-continue-%E7%B6%9A","読":"/kanji/566-read-%E8%AA%AD","窓":"/kanji/567-window-%E7%AA%93","探":"/kanji/568-look-for-%E6%8E%A2","深":"/kanji/569-deep-%E6%B7%B1","具":"/kanji/570-tool-%E5%85%B7","元":"/kanji/571-original-%E5%85%83","完":"/kanji/572-complete-%E5%AE%8C","西":"/kanji/574-west-%E8%A5%BF","票":"/kanji/575-ballot-%E7%A5%A8","標":"/kanji/576-sign-mark-%E6%A8%99","漂":"/kanji/577-drift-%E6%BC%82","酒":"/kanji/578-liquor-%E9%85%92","酔":"/kanji/579-drunk-%E9%85%94","価":"/kanji/580-value-%E4%BE%A1","要":"/kanji/581-important-%E8%A6%81","腰":"/kanji/582-waist-%E8%85%B0","煙":"/kanji/583-smoky-%E7%85%99","才":"/kanji/1744-skill-age-%E6%89%8D","財":"/kanji/585-loot-%E8%B2%A1","材":"/kanji/586-raw-materials-%E6%9D%90","閉":"/kanji/587-close-store-%E9%96%89","夫":"/kanji/588-husband-%E5%A4%AB","賛":"/kanji/589-agree-%E8%B3%9B","替":"/kanji/590-substitute-%E6%9B%BF","潜":"/kanji/591-lurk-%E6%BD%9C","規":"/kanji/592-criteria-%E8%A6%8F","挟":"/kanji/593-pinch-%E6%8C%9F","巣":"/kanji/595-habitat-%E5%B7%A3","光":"/kanji/573-shining-%E5%85%89","単":"/kanji/596-merely-%E5%8D%98","桜":"/kanji/597-sakura-%E6%A1%9C","肖":"/kanji/599-carrot-%E8%82%96","削":"/kanji/600-whittle-down-%E5%89%8A","消":"/kanji/601-erase-%E6%B6%88","菜":"/kanji/390-vegetable-%E8%8F%9C","浮":"/kanji/603-float-%E6%B5%AE","受":"/kanji/604-receive-%E5%8F%97","妥":"/kanji/605-compromise-%E5%A6%A5","授":"/kanji/606-instruct-%E6%8E%88","採":"/kanji/607-gather-%E6%8E%A1","久":"/kanji/608-been-a-long-time-%E4%B9%85","各":"/kanji/609-each-%E5%90%84","愛":"/kanji/610-love-%E6%84%9B","客":"/kanji/611-customer-%E5%AE%A2","落":"/kanji/612-falldrop-%E8%90%BD","格":"/kanji/613-character-aspect-%E6%A0%BC","絡":"/kanji/614-get-entangled-%E7%B5%A1","略":"/kanji/615-abbreviation-%E7%95%A5","路":"/kanji/616-road-%E8%B7%AF","条":"/kanji/617-clause-%E6%9D%A1","麦":"/kanji/618-barley-%E9%BA%A6","酸":"/kanji/619-sour-%E9%85%B8","秀":"/kanji/621-excel-%E7%A7%80","誘":"/kanji/622-invite-entice-%E8%AA%98","透":"/kanji/623-transparent-%E9%80%8F","携":"/kanji/624-carry-in-hand-%E6%90%BA","及":"/kanji/625-reach-amount-to-%E5%8F%8A","吸":"/kanji/626-suck-%E5%90%B8","級":"/kanji/627-level-%E7%B4%9A","扱":"/kanji/628-treatment-%E6%89%B1","穏":"/kanji/629-tranquil-%E7%A9%8F","侵":"/kanji/630-perpetrate-%E4%BE%B5","浸":"/kanji/631-immerse-%E6%B5%B8","緑":"/kanji/632-green-%E7%B7%91","急":"/kanji/633-urgent-%E6%80%A5","当":"/kanji/634-hit-the-target-%E5%BD%93","婦":"/kanji/636-housewife-lady-%E5%A9%A6","掃":"/kanji/637-sweep-%E6%8E%83","帰":"/kanji/638-go-back-home-%E5%B8%B0","帝":"/kanji/639-foreign-emperor-%E5%B8%9D","締":"/kanji/640-tighten-%E7%B7%A0","躍":"/kanji/642-jump-%E8%BA%8D","濯":"/kanji/643-rinse-%E6%BF%AF","曜":"/kanji/644-day-of-the-week-%E6%9B%9C","工":"/kanji/645-craft-or-industry-%E5%B7%A5","空":"/kanji/646-air-%E7%A9%BA","控":"/kanji/301-abstain-%E6%8E%A7","紅":"/kanji/647-dark-lipstick-red-color-%E7%B4%85","功":"/kanji/648-success-%E5%8A%9F","巧":"/kanji/650-adroit-%E5%B7%A7","与":"/kanji/651-bestow-%E4%B8%8E","写":"/kanji/652-copy-%E5%86%99","汚":"/kanji/653-dirty-%E6%B1%9A","極":"/kanji/654-extreme-%E6%A5%B5","誇":"/kanji/655-be-proud-of-%E8%AA%87","号":"/kanji/656-id-number-%E5%8F%B7","考":"/kanji/657-consider-%E8%80%83","拷":"/kanji/658-torture-%E6%8B%B7","式":"/kanji/659-ritual-%E5%BC%8F","拭":"/kanji/660-wipe-%E6%8B%AD","試":"/kanji/661-attempt-to-do-%E8%A9%A6","武":"/kanji/662-military-%E6%AD%A6","代":"/kanji/663-generation-instead-of-%E4%BB%A3","貸":"/kanji/664-lend-%E8%B2%B8","閥":"/kanji/667-clique-%E9%96%A5","惑":"/kanji/668-be-misguided-or-tempted-%E6%83%91","我":"/kanji/669-we-%E6%88%91","賊":"/kanji/670-bandit-%E8%B3%8A","域":"/kanji/671-region-%E5%9F%9F","戦":"/kanji/672-fight-%E6%88%A6","栽":"/kanji/673-cultivate-%E6%A0%BD","幾":"/kanji/674-how-much-%E5%B9%BE","機":"/kanji/675-machine-%E6%A9%9F","職":"/kanji/677-employment-%E8%81%B7","織":"/kanji/678-organization-weave-%E7%B9%94","識":"/kanji/679-be-conscious-%E8%AD%98","区":"/kanji/680-ward-%E5%8C%BA","駆":"/kanji/681-gallop-%E9%A7%86","巨":"/kanji/682-giant-super-huge-%E5%B7%A8","拒":"/kanji/683-repel-%E6%8B%92","距":"/kanji/684-distance-%E8%B7%9D","臣":"/kanji/685-vassal-%E8%87%A3","堅":"/kanji/686-solid-steadfast-%E5%A0%85","緊":"/kanji/687-tense-%E7%B7%8A","賢":"/kanji/688-clever-%E8%B3%A2","覧":"/kanji/689-view-%E8%A6%A7","臨":"/kanji/690-to-confront-%E8%87%A8","姫":"/kanji/691-princess-%E5%A7%AB","匹":"/kanji/693-small-animal-%E5%8C%B9","匠":"/kanji/692-artisan-%E5%8C%A0","四":"/kanji/694-the-numeral-4-%E5%9B%9B","喚":"/kanji/695-exclaim-%E5%96%9A","換":"/kanji/696-exchange-%E6%8F%9B","欠":"/kanji/697-lack-%E6%AC%A0","欧":"/kanji/699-europe-%E6%AC%A7","歌":"/kanji/700-sing-%E6%AD%8C","吹":"/kanji/701-blow-%E5%90%B9","炊":"/kanji/702-cook-rice-%E7%82%8A","数":"/kanji/703-integer-to-count-%E6%95%B0","枚":"/kanji/704-counter-for-flat-objects-%E6%9E%9A","敏":"/kanji/705-agile-sensitive-%E6%95%8F","敗":"/kanji/706-be-defeated-%E6%95%97","故":"/kanji/707-breakdown-accident-%E6%95%85","政":"/kanji/708-politics-%E6%94%BF","放":"/kanji/709-release-%E6%94%BE","教":"/kanji/710-teach-%E6%95%99","激":"/kanji/711-intense-%E6%BF%80","繁":"/kanji/712-multiple-many-%E7%B9%81","攻":"/kanji/713-attack-%E6%94%BB","敵":"/kanji/715-enemy-%E6%95%B5","適":"/kanji/716-suitable-%E9%81%A9","滴":"/kanji/717-drip-%E6%BB%B4","摘":"/kanji/718-pluck-%E6%91%98","己":"/kanji/719-myself-%E5%B7%B1","改":"/kanji/720-renew-improve-%E6%94%B9","起":"/kanji/721-wake-up-occur-%E8%B5%B7","紀":"/kanji/722-century-%E7%B4%80","記":"/kanji/723-diary-%E8%A8%98","配":"/kanji/724-distribute-%E9%85%8D","求":"/kanji/725-demandask-%E6%B1%82","救":"/kanji/726-rescue-%E6%95%91","球":"/kanji/727-sphere-%E7%90%83","厳":"/kanji/729-strict-%E5%8E%B3","励":"/kanji/730-diligence-%E5%8A%B1","歴":"/kanji/731-chronicle-%E6%AD%B4","厚":"/kanji/732-thick-%E5%8E%9A","圧":"/kanji/733-pressure-%E5%9C%A7","粧":"/kanji/1125-makeup-%E7%B2%A7","備":"/kanji/734-furnish-%E5%82%99","灰":"/kanji/735-ash-gray-%E7%81%B0","産":"/kanji/736-childbirth-production-of-things-%E7%94%A3","原":"/kanji/737-original-high-plain-%E5%8E%9F","源":"/kanji/738-hot-spring-origin-%E6%BA%90","反":"/kanji/739-anti-%E5%8F%8D","返":"/kanji/740-return-or-respond-%E8%BF%94","坂":"/kanji/741-slope-%E5%9D%82","板":"/kanji/742-plank-%E6%9D%BF","仮":"/kanji/743-provisional-%E4%BB%AE","販":"/kanji/744-transaction-%E8%B2%A9","成":"/kanji/745-become-%E6%88%90","誠":"/kanji/746-sincerity-%E8%AA%A0","越":"/kanji/747-go-beyond-%E8%B6%8A","蔵":"/kanji/748-traditional-storehouse-%E8%94%B5","臓":"/kanji/749-internal-organ-%E8%87%93","歳":"/kanji/750-years-old-%E6%AD%B3","滅":"/kanji/751-annihilate-%E6%BB%85","威":"/kanji/752-terrible-majesty-%E5%A8%81","城":"/kanji/753-castle-%E5%9F%8E","幻":"/kanji/982-illusion-%E5%B9%BB","気":"/kanji/983-mood-%E6%B0%97","決":"/kanji/984-decide-%E6%B1%BA","快":"/kanji/985-pleasant-%E5%BF%AB","獣":"/kanji/598-beast-%E7%8D%A3","減":"/kanji/754-decrease-%E6%B8%9B","感":"/kanji/755-feeling-%E6%84%9F","憾":"/kanji/756-regrettable-%E6%86%BE","同":"/kanji/974-same-%E5%90%8C","筒":"/kanji/976-cylinder-pipe-%E7%AD%92","司":"/kanji/978-administer-%E5%8F%B8","伺":"/kanji/979-formal-visit-question-%E4%BC%BA","詞":"/kanji/980-part-of-speech-%E8%A9%9E","旅":"/kanji/758-trip-%E6%97%85","派":"/kanji/759-factionbling-%E6%B4%BE","脈":"/kanji/760-vein-%E8%84%88","遠":"/kanji/762-far-%E9%81%A0","園":"/kanji/763-public-park-%E5%9C%92","環":"/kanji/764-environment-%E7%92%B0","表":"/kanji/767-express-%E8%A1%A8","衣":"/kanji/766-cloth-%E8%A1%A3","依":"/kanji/768-depend-on-%E4%BE%9D","袋":"/kanji/769-sack-%E8%A2%8B","裁":"/kanji/770-trial-%E8%A3%81","褒":"/kanji/771-praise-%E8%A4%92","裏":"/kanji/772-backside-%E8%A3%8F","哀":"/kanji/773-pitiful-%E5%93%80","衰":"/kanji/774-declinewane-%E8%A1%B0","良":"/kanji/775-good-%E8%89%AF","娘":"/kanji/776-daughter-%E5%A8%98","退":"/kanji/777-retreat-%E9%80%80","浪":"/kanji/778-wavelike-%E6%B5%AA","眼":"/kanji/779-eyeball-%E7%9C%BC","恨":"/kanji/780-hold-a-grudge-%E6%81%A8","根":"/kanji/781-root-%E6%A0%B9","限":"/kanji/783-limit-%E9%99%90","郷":"/kanji/784-ones-hometown-%E9%83%B7","響":"/kanji/785-echo-%E9%9F%BF","階":"/kanji/786-story-of-a-building-%E9%9A%8E","障":"/kanji/787-impede-%E9%9A%9C","院":"/kanji/788-institution-%E9%99%A2","防":"/kanji/789-ward-off-%E9%98%B2","陥":"/kanji/790-entrapped-%E9%99%A5","都":"/kanji/791-major-city-%E9%83%BD","隠":"/kanji/793-hide-%E9%9A%A0","部":"/kanji/795-section-%E9%83%A8","剖":"/kanji/796-dissect-%E5%89%96","倍":"/kanji/797-double-%E5%80%8D","壮":"/kanji/799-epic-%E5%A3%AE","装":"/kanji/800-dress-up-%E8%A3%85","状":"/kanji/801-circumstance-%E7%8A%B6","寝":"/kanji/802-go-to-bed-%E5%AF%9D","北":"/kanji/803-north-%E5%8C%97","背":"/kanji/804-stature-back-of-the-body-%E8%83%8C","制":"/kanji/805-system-%E5%88%B6","製":"/kanji/806-mass-production-%E8%A3%BD","告":"/kanji/807-inform-%E5%91%8A","造":"/kanji/808-produce-%E9%80%A0","酷":"/kanji/809-horrendous-%E9%85%B7","先":"/kanji/810-earlier-the-tip-%E5%85%88","洗":"/kanji/811-wash-%E6%B4%97","面":"/kanji/813-front-surface-face-%E9%9D%A2","百":"/kanji/814-hundred-%E7%99%BE","憂":"/kanji/815-grieve-%E6%86%82","優":"/kanji/816-kindheartedexcel-%E5%84%AA","宿":"/kanji/817-lodge-at-%E5%AE%BF","縮":"/kanji/818-contract-shrink-%E7%B8%AE","石":"/kanji/819-rock-%E7%9F%B3","砂":"/kanji/820-sand-%E7%A0%82","砕":"/kanji/821-pulverize-%E7%A0%95","礎":"/kanji/822-foundation-%E7%A4%8E","山":"/kanji/823-mountain-%E5%B1%B1","岩":"/kanji/824-boulder-%E5%B2%A9","帯":"/kanji/825-belt-%E5%B8%AF","滞":"/kanji/826-delay-be-overdue-%E6%BB%9E","催":"/kanji/827-sponsor-%E5%82%AC","崩":"/kanji/828-collapse-%E5%B4%A9","密":"/kanji/829-hard-to-see-%E5%AF%86","幽":"/kanji/830-occult-%E5%B9%BD","岸":"/kanji/831-shore-%E5%B2%B8","炭":"/kanji/832-carbon-%E7%82%AD","岳":"/kanji/833-mount-%E5%B2%B3","鳥":"/kanji/834-bird-%E9%B3%A5","島":"/kanji/835-island-%E5%B3%B6","鳴":"/kanji/836-animal-cry-%E9%B3%B4","豆":"/kanji/837-bean-%E8%B1%86","喜":"/kanji/838-rejoice-%E5%96%9C","嬉":"/kanji/839-stoked-%E5%AC%89","頭":"/kanji/841-head-%E9%A0%AD","夏":"/kanji/842-summer-%E5%A4%8F","願":"/kanji/843-beseech-%E9%A1%98","頑":"/kanji/844-stubborn-%E9%A0%91","頃":"/kanji/845-around-that-time-%E9%A0%83","頂":"/kanji/846-summitclimax-%E9%A0%82","額":"/kanji/847-amount-of-money-forehead-%E9%A1%8D","類":"/kanji/848-categorytype-%E9%A1%9E","題":"/kanji/849-topic-%E9%A1%8C","顧":"/kanji/850-look-back-on-%E9%A1%A7","傾":"/kanji/851-lean-%E5%82%BE","項":"/kanji/852-itemparagraph-%E9%A0%85","川":"/kanji/853-river-%E5%B7%9D","順":"/kanji/854-sequence-%E9%A0%86","州":"/kanji/855-state-%E5%B7%9E","訓":"/kanji/856-kunyomi-%E8%A8%93","荒":"/kanji/857-go-wild-rough-%E8%8D%92","慌":"/kanji/858-be-in-a-rush-freaked-out-%E6%85%8C","首":"/kanji/860-neck-%E9%A6%96","道":"/kanji/861-street-%E9%81%93","税":"/kanji/862-tax-%E7%A8%8E","説":"/kanji/863-explain-%E8%AA%AC","脱":"/kanji/864-get-naked-%E8%84%B1","磁":"/kanji/866-magnet-%E7%A3%81","羊":"/kanji/867-sheep-%E7%BE%8A","￥":"/kanji/868-yen-%EF%BF%A5","南":"/kanji/869-south-%E5%8D%97","美":"/kanji/965-beauty-%E7%BE%8E","鮮":"/kanji/870-fresh-%E9%AE%AE","詳":"/kanji/871-expert-%E8%A9%B3","洋":"/kanji/872-pacific-ocean-the-west-%E6%B4%8B","遅":"/kanji/873-slow-late-%E9%81%85","着":"/kanji/875-wear-arrive-%E7%9D%80","養":"/kanji/876-cultivate-rear-%E9%A4%8A","義":"/kanji/877-righteousness-%E7%BE%A9","儀":"/kanji/878-politeness-%E5%84%80","議":"/kanji/1764-discussion-%E8%AD%B0","様":"/kanji/879-important-person-%E6%A7%98","天":"/kanji/880-heaven-%E5%A4%A9","添":"/kanji/881-append-%E6%B7%BB","笑":"/kanji/882-laugh-%E7%AC%91","呑":"/kanji/883-chug-%E5%91%91","送":"/kanji/885-send-%E9%80%81","咲":"/kanji/886-bloom-%E5%92%B2","関":"/kanji/887-connected-to-%E9%96%A2","巻":"/kanji/888-roll-up-%E5%B7%BB","圏":"/kanji/889-range-area-of-influence-%E5%9C%8F","券":"/kanji/890-certificate-cupon-%E5%88%B8","勝":"/kanji/891-win-%E5%8B%9D","弓":"/kanji/892-bow-%E5%BC%93","弟":"/kanji/893-younger-brother-%E5%BC%9F","第":"/kanji/894-rank-or-number-in-series-%E7%AC%AC","沸":"/kanji/895-boil-water-%E6%B2%B8","費":"/kanji/896-expenses-%E8%B2%BB","強":"/kanji/897-burly-%E5%BC%B7","引":"/kanji/898-pull-%E5%BC%95","弾":"/kanji/899-bullet-play-guitar-bounce-%E5%BC%BE","赤":"/kanji/900-red-%E8%B5%A4","湾":"/kanji/901-bay-%E6%B9%BE","跡":"/kanji/902-vestiges-%E8%B7%A1","恋":"/kanji/903-passion-%E6%81%8B","変":"/kanji/904-change-%E5%A4%89","長":"/kanji/905-long-boss-%E9%95%B7","張":"/kanji/906-stretch-%E5%BC%B5","帳":"/kanji/907-notebook-%E5%B8%B3","険":"/kanji/792-steep-risky-%E9%99%BA","検":"/kanji/416-investigate-%E6%A4%9C","倹":"/kanji/417-thrifty-%E5%80%B9","剣":"/kanji/418-saber-%E5%89%A3","験":"/kanji/419-test-%E9%A8%93","金":"/kanji/909-gold-%E9%87%91","鋭":"/kanji/910-sharp-%E9%8B%AD","錆":"/kanji/911-rust-%E9%8C%86","録":"/kanji/912-record-%E9%8C%B2","鏡":"/kanji/913-mirror-%E9%8F%A1","鎖":"/kanji/914-shutchain-%E9%8E%96","銀":"/kanji/915-silver-%E9%8A%80","針":"/kanji/916-needle-%E9%87%9D","銅":"/kanji/975-bronze-%E9%8A%85","茶":"/kanji/917-tea-%E8%8C%B6","傘":"/kanji/918-umbrella-%E5%82%98","全":"/kanji/919-all-%E5%85%A8","企":"/kanji/920-scheme-%E4%BC%81","食":"/kanji/921-eat-%E9%A3%9F","飲":"/kanji/922-drink-%E9%A3%B2","飾":"/kanji/923-decorate-%E9%A3%BE","飯":"/kanji/924-rice-meal-%E9%A3%AF","飼":"/kanji/981-keep-a-pet-%E9%A3%BC","幹":"/kanji/925-trunk-%E5%B9%B9","舎":"/kanji/926-stable-%E8%88%8E","捨":"/kanji/927-throw-away-%E6%8D%A8","余":"/kanji/928-excess-%E4%BD%99","塗":"/kanji/929-paint-%E5%A1%97","途":"/kanji/930-on-the-way-%E9%80%94","除":"/kanji/931-exclude-%E9%99%A4","倉":"/kanji/932-storage-%E5%80%89","創":"/kanji/933-originate-creative-%E5%89%B5","介":"/kanji/934-introduce-intervene-%E4%BB%8B","界":"/kanji/935-the-world-%E7%95%8C","合":"/kanji/936-to-suit-%E5%90%88","給":"/kanji/937-provide-%E7%B5%A6","塔":"/kanji/938-tower-%E5%A1%94","拾":"/kanji/939-pick-up-off-the-ground-%E6%8B%BE","搭":"/kanji/940-board-%E6%90%AD","答":"/kanji/941-answer-%E7%AD%94","ラ":"/kanji/1758-katakana-ra-%E3%83%A9","今":"/kanji/943-now-%E4%BB%8A","含":"/kanji/944-include-%E5%90%AB","念":"/kanji/945-concern-%E5%BF%B5","令":"/kanji/946-command-%E4%BB%A4","鈴":"/kanji/947-tiny-electric-bell-or-buzzer-%E9%88%B4","領":"/kanji/948-territory-%E9%A0%98","命":"/kanji/949-life-%E5%91%BD","冷":"/kanji/951-cold-thing-%E5%86%B7","凍":"/kanji/952-to-freeze-%E5%87%8D","尽":"/kanji/953-exhaust-use-up-%E5%B0%BD","冬":"/kanji/954-winter-%E5%86%AC","終":"/kanji/955-end-%E7%B5%82","次":"/kanji/956-next-%E6%AC%A1","姿":"/kanji/957-someones-shape-body-form-%E5%A7%BF","資":"/kanji/958-capital-as-in-%E8%B3%87","寒":"/kanji/960-cold-%E5%AF%92","奏":"/kanji/961-musical-performance-%E5%A5%8F","春":"/kanji/962-spring-sexy-%E6%98%A5","棒":"/kanji/963-pole-%E6%A3%92","実":"/kanji/964-truth-%E5%AE%9F","冊":"/kanji/966-counter-for-books-%E5%86%8A","扁":"/kanji/967-flat-flat-%E6%89%81","編":"/kanji/968-knit-%E7%B7%A8","騙":"/kanji/969-decieve-%E9%A8%99","偏":"/kanji/970-be-inclined-%E5%81%8F","論":"/kanji/972-make-a-case-for-%E8%AB%96","倫":"/kanji/973-principles-%E5%80%AB","寸":"/kanji/986-glue-glue-%E5%AF%B8","付":"/kanji/987-stick-to-%E4%BB%98","附":"/kanji/988-attachment-%E9%99%84","討":"/kanji/989-attackdiscuss-%E8%A8%8E","奪":"/kanji/990-steal-by-force-%E5%A5%AA","守":"/kanji/991-protect-%E5%AE%88","団":"/kanji/992-group-%E5%9B%A3","符":"/kanji/993-ticket-%E7%AC%A6","村":"/kanji/994-hicktown-%E6%9D%91","寿":"/kanji/995-lifespansushi-%E5%AF%BF","慰":"/kanji/996-console-%E6%85%B0","尋":"/kanji/997-ask-%E5%B0%8B","導":"/kanji/998-lead-%E5%B0%8E","闘":"/kanji/999-struggle-%E9%97%98","寺":"/kanji/1000-temple-%E5%AF%BA","詩":"/kanji/1001-poem-%E8%A9%A9","時":"/kanji/1002-time-%E6%99%82","持":"/kanji/1003-hold-%E6%8C%81","侍":"/kanji/1004-samurai-kanji-%E4%BE%8D","等":"/kanji/1005-equal-etcplural-%E7%AD%89","尊":"/kanji/1006-esteem-%E5%B0%8A","噂":"/kanji/1007-rumor-%E5%99%82","父":"/kanji/1008-dad-%E7%88%B6","交":"/kanji/1009-combine-%E4%BA%A4","対":"/kanji/1010-against-%E5%AF%BE","校":"/kanji/1011-school-%E6%A0%A1","郊":"/kanji/1012-suburb-%E9%83%8A","効":"/kanji/1013-effective-%E5%8A%B9","絞":"/kanji/1014-wring-out-strangle-%E7%B5%9E","専":"/kanji/1016-specialty-%E5%B0%82","博":"/kanji/1017-museum-extensive-%E5%8D%9A","縛":"/kanji/1018-tie-up-%E7%B8%9B","薄":"/kanji/1019-weak-or-thin-%E8%96%84","演":"/kanji/1020-performance-%E6%BC%94","恵":"/kanji/1021-do-a-favor-%E6%81%B5","敷":"/kanji/1022-lay-out-site-%E6%95%B7","画":"/kanji/1039-a-drawing-%E7%94%BB","両":"/kanji/1040-both-%E4%B8%A1","満":"/kanji/1041-full-%E6%BA%80","出":"/kanji/1024-pull-out-hand-over-%E5%87%BA","屈":"/kanji/1025-yield-get-out-of-the-way-%E5%B1%88","掘":"/kanji/1026-dig-%E6%8E%98","缶":"/kanji/1027-can-like-canned-beef-%E7%BC%B6","揺":"/kanji/1028-sway-joggle-%E6%8F%BA","世":"/kanji/1029-society-%E4%B8%96","葉":"/kanji/1030-leaf-%E8%91%89","喋":"/kanji/1031-speak-%E5%96%8B","歯":"/kanji/1032-tooth-%E6%AD%AF","噛":"/kanji/1033-chew-bite-%E5%99%9B","齢":"/kanji/1034-stage-of-life-%E9%BD%A2","凶":"/kanji/1035-terrible-%E5%87%B6","脳":"/kanji/1036-brain-%E8%84%B3","悩":"/kanji/1038-worry-%E6%82%A9","離":"/kanji/1042-divorce-physical-distance-between-things-%E9%9B%A2","矢":"/kanji/1043-arrow-%E7%9F%A2","疑":"/kanji/1044-doubt-%E7%96%91","擬":"/kanji/1045-sham-%E6%93%AC","短":"/kanji/1046-short-brief-%E7%9F%AD","医":"/kanji/1047-doctor-%E5%8C%BB","族":"/kanji/1048-family-%E6%97%8F","候":"/kanji/1049-climatecandidate-%E5%80%99","知":"/kanji/1050-know-%E7%9F%A5","失":"/kanji/1051-miss-out-on-%E5%A4%B1","鉄":"/kanji/1052-iron-%E9%89%84","観":"/kanji/1054-point-of-view-%E8%A6%B3","勧":"/kanji/1055-recommend-%E5%8B%A7","権":"/kanji/1056-rights-%E6%A8%A9","確":"/kanji/1057-make-certain-%E7%A2%BA","車":"/kanji/1058-car-%E8%BB%8A","重":"/kanji/1059-heavy-overlap-%E9%87%8D","垂":"/kanji/1060-drip-dangle-%E5%9E%82","乗":"/kanji/1061-ride-a-vehicle-%E4%B9%97","陣":"/kanji/1062-base-%E9%99%A3","輪":"/kanji/1063-ringtire-%E8%BC%AA","軒":"/kanji/1064-counter-for-shops-%E8%BB%92","較":"/kanji/1065-evaluate-%E8%BC%83","軟":"/kanji/1066-soft-%E8%BB%9F","載":"/kanji/1067-appear-in-print-%E8%BC%89","軍":"/kanji/1068-army-%E8%BB%8D","揮":"/kanji/1069-brandish-%E6%8F%AE","連":"/kanji/1070-take-with-inform-of-%E9%80%A3","運":"/kanji/1071-carry-luck-%E9%81%8B","輝":"/kanji/1072-dazzle-%E8%BC%9D","華":"/kanji/1073-flamboyant-%E8%8F%AF","睡":"/kanji/1074-sleep-%E7%9D%A1","郵":"/kanji/1075-mail-%E9%83%B5","剰":"/kanji/1076-excessive-%E5%89%B0","種":"/kanji/1077-seed-type-or-kind-%E7%A8%AE","動":"/kanji/1078-movement-%E5%8B%95","働":"/kanji/1079-to-do-your-job-%E5%83%8D","腫":"/kanji/1080-swell-%E8%85%AB","非":"/kanji/1081-injustice-mistake-%E9%9D%9E","輩":"/kanji/1082-older-or-younger-colleague-%E8%BC%A9","悲":"/kanji/1083-sad-%E6%82%B2","罪":"/kanji/1084-sin-%E7%BD%AA","俳":"/kanji/1085-actor-%E4%BF%B3","排":"/kanji/1086-eliminate-%E6%8E%92","軽":"/kanji/1088-lightweight-%E8%BB%BD","経":"/kanji/1089-experience-%E7%B5%8C","怪":"/kanji/1090-suspicious-%E6%80%AA","友":"/kanji/1105-friend-%E5%8F%8B","抜":"/kanji/1092-extract-%E6%8A%9C","雄":"/kanji/1093-male-animal-or-hero-%E9%9B%84","布":"/kanji/1094-fabric-%E5%B8%83","希":"/kanji/1095-request-uncommon-%E5%B8%8C","怖":"/kanji/1096-scary-%E6%80%96","右":"/kanji/1097-right-%E5%8F%B3","左":"/kanji/1098-left-%E5%B7%A6","若":"/kanji/1099-young-%E8%8B%A5","有":"/kanji/1100-exist-%E6%9C%89","堕":"/kanji/1101-corrupt-%E5%A0%95","賄":"/kanji/1102-bribe-provide-capital-to-%E8%B3%84","差":"/kanji/874-discriminate-%E5%B7%AE","在":"/kanji/1103-be-real-%E5%9C%A8","存":"/kanji/1104-be-aware-of-%E5%AD%98","片":"/kanji/1106-fragment-%E7%89%87","版":"/kanji/1107-printing-plate-%E7%89%88","暖":"/kanji/1109-warm-place-%E6%9A%96","援":"/kanji/1110-assist-%E6%8F%B4","緩":"/kanji/1111-become-loose-abate-%E7%B7%A9","髪":"/kanji/1113-hair-%E9%AB%AA","彩":"/kanji/1114-hue-%E5%BD%A9","影":"/kanji/1115-shadow-%E5%BD%B1","顔":"/kanji/1116-face-%E9%A1%94","参":"/kanji/1117-admit-defeat-visit-%E5%8F%82","修":"/kanji/1118-master-a-skill-%E4%BF%AE","惨":"/kanji/1119-wretched-%E6%83%A8","膨":"/kanji/840-bulge-%E8%86%A8","珍":"/kanji/1121-very-rare-%E7%8F%8D","診":"/kanji/1122-diagnose-%E8%A8%BA","廊":"/kanji/1124-corridor-%E5%BB%8A","磨":"/kanji/1126-to-brush-%E7%A3%A8","腐":"/kanji/1127-rot-%E8%85%90","応":"/kanji/1128-react-%E5%BF%9C","府":"/kanji/1129-government-%E5%BA%9C","庁":"/kanji/1130-metropolitan-government-%E5%BA%81","庫":"/kanji/1131-warehouse-%E5%BA%AB","店":"/kanji/1132-shop-%E5%BA%97","座":"/kanji/1133-sit-%E5%BA%A7","床":"/kanji/1134-floor-%E5%BA%8A","麻":"/kanji/1135-mah-jongg-ganja-%E9%BA%BB","摩":"/kanji/1136-friction-%E6%91%A9","広":"/kanji/1139-wide-%E5%BA%83","拡":"/kanji/1140-to-expand-%E6%8B%A1","庶":"/kanji/1142-populist-%E5%BA%B6","席":"/kanji/1143-seat-%E5%B8%AD","度":"/kanji/1144-times-%E5%BA%A6","渡":"/kanji/1145-pass-by-%E6%B8%A1","鬼":"/kanji/1147-demon-%E9%AC%BC","魔":"/kanji/1148-devil-%E9%AD%94","魅":"/kanji/1149-enchant-%E9%AD%85","醜":"/kanji/1151-ugly-%E9%86%9C","塊":"/kanji/1152-clump-%E5%A1%8A","卑":"/kanji/1153-despicable-%E5%8D%91","氏":"/kanji/1159-mr-speculum-radical-%E6%B0%8F","底":"/kanji/1160-bottom-%E5%BA%95","紙":"/kanji/1161-paper-%E7%B4%99","低":"/kanji/1162-low-%E4%BD%8E","婚":"/kanji/1163-marriage-%E5%A9%9A","抵":"/kanji/1164-resist-%E6%8A%B5","民":"/kanji/1165-folk-%E6%B0%91","眠":"/kanji/1166-sleepy-%E7%9C%A0","曲":"/kanji/1167-song-turn-or-bend-%E6%9B%B2","豊":"/kanji/1168-plentiful-%E8%B1%8A","典":"/kanji/1169-classic-%E5%85%B8","遭":"/kanji/1170-chance-meeting-usually-with-something-bad-%E9%81%AD","農":"/kanji/1172-farming-%E8%BE%B2","濃":"/kanji/1173-thick-dense-%E6%BF%83","辱":"/kanji/1174-humiliate-%E8%BE%B1","娠":"/kanji/1175-pregnancy-%E5%A8%A0","振":"/kanji/1176-brandish-pretend-%E6%8C%AF","唇":"/kanji/1177-lips-%E5%94%87","登":"/kanji/1179-climb-%E7%99%BB","祭":"/kanji/1180-festival-%E7%A5%AD","際":"/kanji/1181-edge-%E9%9A%9B","察":"/kanji/1182-police-%E5%AF%9F","擦":"/kanji/1183-chafe-%E6%93%A6","開":"/kanji/1185-open-%E9%96%8B","発":"/kanji/1186-launch-%E7%99%BA","廃":"/kanji/1187-wane-%E5%BB%83","形":"/kanji/1188-form-%E5%BD%A2","研":"/kanji/1189-polish-sharpen-%E7%A0%94","刑":"/kanji/1190-penalty-%E5%88%91","型":"/kanji/1191-type-proper-way-%E5%9E%8B","午":"/kanji/1192-noon-%E5%8D%88","許":"/kanji/1193-allow-%E8%A8%B1","牛":"/kanji/1194-cow-%E7%89%9B","件":"/kanji/1195-incident-%E4%BB%B6","特":"/kanji/1196-special-%E7%89%B9","牲":"/kanji/1197-sacrificial-victim-%E7%89%B2","犠":"/kanji/1198-sacrifice-%E7%8A%A0","解":"/kanji/1199-solve-untie-%E8%A7%A3","物":"/kanji/1201-animal-thing-%E7%89%A9","惚":"/kanji/1202-to-fall-in-love-with-%E6%83%9A","易":"/kanji/1203-easy-%E6%98%93","湯":"/kanji/1204-hot-water-%E6%B9%AF","揚":"/kanji/1205-hoist-deep-fat-fry-%E6%8F%9A","陽":"/kanji/1206-sun-%E9%99%BD","傷":"/kanji/1207-wound-%E5%82%B7","場":"/kanji/1208-place-%E5%A0%B4","色":"/kanji/1210-color-%E8%89%B2","免":"/kanji/1211-exemption-license-%E5%85%8D","逸":"/kanji/1212-more-or-less-than-normal-%E9%80%B8","晩":"/kanji/1213-night-%E6%99%A9","絶":"/kanji/1214-extinct-%E7%B5%B6","勉":"/kanji/1215-try-hard-%E5%8B%89","声":"/kanji/1217-voice-%E5%A3%B0","肥":"/kanji/1218-obese-manure-%E8%82%A5","豚":"/kanji/1219-pig-%E8%B1%9A","象":"/kanji/1220-elephant-phenomenon-%E8%B1%A1","像":"/kanji/1221-statue-image-%E5%83%8F","縁":"/kanji/1222-rim-omen-%E7%B8%81","家":"/kanji/1223-home-%E5%AE%B6","嫁":"/kanji/1224-bride-%E5%AB%81","稼":"/kanji/1225-bring-home-the-loot-%E7%A8%BC","遂":"/kanji/1227-attain-%E9%81%82","隊":"/kanji/1228-troop-%E9%9A%8A","行":"/kanji/1229-go-%E8%A1%8C","徐":"/kanji/1230-slowly-%E5%BE%90","徒":"/kanji/1232-pupil-follower-%E5%BE%92","径":"/kanji/1233-diameter-%E5%BE%84","後":"/kanji/1234-afterwards-behind-%E5%BE%8C","往":"/kanji/1235-depart-%E5%BE%80","待":"/kanji/1236-wait-%E5%BE%85","得":"/kanji/1237-bargain-obtain-%E5%BE%97","従":"/kanji/1238-obey-%E5%BE%93","縦":"/kanji/1239-vertical-%E7%B8%A6","術":"/kanji/1240-art-technique-%E8%A1%93","衝":"/kanji/1241-collision-%E8%A1%9D","微":"/kanji/1242-teeny-%E5%BE%AE","徴":"/kanji/1243-sign-indication-%E5%BE%B4","育":"/kanji/1247-grow-up-be-raised-%E8%82%B2","徹":"/kanji/1245-do-thoroughly-%E5%BE%B9","撤":"/kanji/1246-withdraw-%E6%92%A4","流":"/kanji/1248-flow-%E6%B5%81","陰":"/kanji/1249-shady-%E9%99%B0","充":"/kanji/1250-fill-up-%E5%85%85","銃":"/kanji/1251-gun-%E9%8A%83","統":"/kanji/1252-tradition-%E7%B5%B1","至":"/kanji/1253-until-%E8%87%B3","到":"/kanji/1254-arrive-%E5%88%B0","致":"/kanji/1255-polite-do-%E8%87%B4","倒":"/kanji/1256-knock-down-%E5%80%92","去":"/kanji/1257-past-tense-%E5%8E%BB","法":"/kanji/1258-law-%E6%B3%95","怯":"/kanji/1259-get-afeared-%E6%80%AF","屋":"/kanji/1260-store-%E5%B1%8B","室":"/kanji/1261-room-suffix-%E5%AE%A4","握":"/kanji/1262-grasp-%E6%8F%A1","貿":"/kanji/1263-international-trading-%E8%B2%BF","留":"/kanji/1264-absent-stopped-%E7%95%99","云":"/kanji/1265-twin-decapited-cows-%E4%BA%91","転":"/kanji/1266-roll-over-%E8%BB%A2","伝":"/kanji/1267-transmit-%E4%BC%9D","魂":"/kanji/1150-soul-%E9%AD%82","芸":"/kanji/1268-art-%E8%8A%B8","会":"/kanji/1269-big-meeting-%E4%BC%9A","絵":"/kanji/1270-picture-%E7%B5%B5","街":"/kanji/1272-shopping-district-%E8%A1%97","掛":"/kanji/1273-hang-halfway-done-%E6%8E%9B","涯":"/kanji/1274-lifetime-%E6%B6%AF","封":"/kanji/1275-seal-in-%E5%B0%81","陸":"/kanji/1277-continent-%E9%99%B8","勢":"/kanji/1278-power-%E5%8B%A2","熱":"/kanji/1279-hot-thing-fever-%E7%86%B1","冗":"/kanji/1281-joke-%E5%86%97","肌":"/kanji/1282-human-skin-%E8%82%8C","抗":"/kanji/1283-oppose-%E6%8A%97","机":"/kanji/1284-desk-%E6%9C%BA","風":"/kanji/1285-wind-the-flu-style-%E9%A2%A8","飢":"/kanji/1286-starve-%E9%A3%A2","処":"/kanji/1287-dispose-of-or-manage-%E5%87%A6","拠":"/kanji/1288-evidence-which-is-the-basis-for-a-judgment-%E6%8B%A0","凡":"/kanji/1289-mediocre-%E5%87%A1","築":"/kanji/1290-architect-%E7%AF%89","恐":"/kanji/1291-dread-%E6%81%90","投":"/kanji/1294-throw-%E6%8A%95","役":"/kanji/1293-role-%E5%BD%B9","設":"/kanji/1295-establish-%E8%A8%AD","没":"/kanji/1296-downfall-%E6%B2%A1","殺":"/kanji/1297-kill-%E6%AE%BA","殴":"/kanji/1298-punch-%E6%AE%B4","股":"/kanji/1299-grrrrrroin-%E8%82%A1","撃":"/kanji/1300-charge-%E6%92%83","盾":"/kanji/1303-shield-%E7%9B%BE","循":"/kanji/1302-circulate-%E5%BE%AA","真":"/kanji/1304-really-%E7%9C%9F","慎":"/kanji/1305-refrain-be-prudent-%E6%85%8E","県":"/kanji/1306-prefecture-%E7%9C%8C","懸":"/kanji/1307-suspend-gamble-%E6%87%B8","直":"/kanji/1308-correct-a-probem-direct-contact-%E7%9B%B4","置":"/kanji/1309-put-down-on-table-%E7%BD%AE","値":"/kanji/1310-price-or-ranking-%E5%80%A4","植":"/kanji/1311-plant-%E6%A4%8D","殖":"/kanji/1313-agricultural-breeding-reproduction-%E6%AE%96","別":"/kanji/1314-separate-%E5%88%A5","列":"/kanji/1315-row-%E5%88%97","裂":"/kanji/1316-tear-up-%E8%A3%82","烈":"/kanji/1317-violently-intense-%E7%83%88","例":"/kanji/1318-example-%E4%BE%8B","支":"/kanji/1319-support-%E6%94%AF","皮":"/kanji/1323-skin-%E7%9A%AE","彼":"/kanji/1326-him-%E5%BD%BC","枝":"/kanji/1320-branch-%E6%9E%9D","技":"/kanji/1321-technique-%E6%8A%80","鼓":"/kanji/1322-drum-%E9%BC%93","破":"/kanji/1324-rend-%E7%A0%B4","波":"/kanji/1325-wave-%E6%B3%A2","マ":"/kanji/1327-mama-%E3%83%9E","勇":"/kanji/1328-courage-%E5%8B%87","予":"/kanji/1329-beforehand-%E4%BA%88","序":"/kanji/1330-first-part-preface-%E5%BA%8F","預":"/kanji/1331-deposit-%E9%A0%90","野":"/kanji/1332-field-%E9%87%8E","矛":"/kanji/1333-halberd-%E7%9F%9B","柔":"/kanji/1334-flexible-%E6%9F%94","務":"/kanji/1335-perform-a-task-%E5%8B%99","束":"/kanji/1336-bundle-of-sticks-%E6%9D%9F","疎":"/kanji/1337-shun-%E7%96%8E","頼":"/kanji/1338-ask-a-favor-%E9%A0%BC","速":"/kanji/1339-fast-%E9%80%9F","整":"/kanji/1340-arrange-%E6%95%B4","通":"/kanji/1342-pass-%E9%80%9A","踊":"/kanji/1343-dance-%E8%B8%8A","丙":"/kanji/1344-t-bone-steak-%E4%B8%99","柄":"/kanji/1345-pattern-%E6%9F%84","病":"/kanji/1347-sick-kanji-%E7%97%85","痛":"/kanji/1348-hurts-%E7%97%9B","疲":"/kanji/1349-get-tired-from-hard-work-%E7%96%B2","痢":"/kanji/1350-diarrhea-%E7%97%A2","痴":"/kanji/1351-molester-%E7%97%B4","症":"/kanji/1352-symptom-%E7%97%87","痺":"/kanji/1353-go-numb-%E7%97%BA","癒":"/kanji/1355-cure-%E7%99%92","愉":"/kanji/1356-pleasure-%E6%84%89","諭":"/kanji/1357-chide-guide-%E8%AB%AD","輸":"/kanji/1358-transport-%E8%BC%B8","癖":"/kanji/1360-bad-habit-%E7%99%96","避":"/kanji/1361-avoid-dodge-%E9%81%BF","壁":"/kanji/1362-wall-%E5%A3%81","療":"/kanji/1364-medical-therapy-%E7%99%82","寮":"/kanji/1365-dormitory-%E5%AF%AE","僚":"/kanji/1366-coworker-%E5%83%9A","申":"/kanji/1367-humbly-say-god-radical-%E7%94%B3","痩":"/kanji/1368-lose-weight-%E3%83%BClose-%E7%97%A9","紳":"/kanji/1369-gentleman-%E7%B4%B3","捜":"/kanji/1370-search-%E6%8D%9C","伸":"/kanji/1371-stretch-%E4%BC%B8","甲":"/kanji/1372-turtle-shell-%E7%94%B2","押":"/kanji/1373-push-%E6%8A%BC","由":"/kanji/1374-freedom-reason-%E7%94%B1","抽":"/kanji/1375-abstract-%E6%8A%BD","宙":"/kanji/1376-space-%E5%AE%99","油":"/kanji/1377-oil-%E6%B2%B9","届":"/kanji/1378-extend-to-%E5%B1%8A","偶":"/kanji/1380-coincidence-%E5%81%B6","隅":"/kanji/1381-corner-of-room-%E9%9A%85","愚":"/kanji/1382-dum-diddy-dum-dum-%E6%84%9A","雨":"/kanji/1383-rain-%E9%9B%A8","霧":"/kanji/1384-fog-%E9%9C%A7","雲":"/kanji/1385-cloud-%E9%9B%B2","曇":"/kanji/1386-get-cloudy-%E6%9B%87","霜":"/kanji/1387-frost-%E9%9C%9C","雷":"/kanji/1388-lightning-%E9%9B%B7","震":"/kanji/1389-shake-tremble-%E9%9C%87","漏":"/kanji/1390-leak-%E6%BC%8F","雪":"/kanji/1391-snow-%E9%9B%AA","雰":"/kanji/1392-atmosphere-%E9%9B%B0","露":"/kanji/1393-outdoors-public-%E9%9C%B2","霊":"/kanji/1395-ghost-%E9%9C%8A","湿":"/kanji/1396-become-damp-moisten-%E6%B9%BF","業":"/kanji/1397-business-%E6%A5%AD","僕":"/kanji/1398-me-for-dudes-%E5%83%95","撲":"/kanji/1399-eradicate-%E6%92%B2","竜":"/kanji/1401-dragon-%E7%AB%9C","滝":"/kanji/1402-waterfall-%E6%BB%9D","電":"/kanji/1403-electricity-%E9%9B%BB","俺":"/kanji/1404-me-macho-version-%E4%BF%BA","亀":"/kanji/1405-turtle-%E4%BA%80","縄":"/kanji/1406-rope-%E7%B8%84","需":"/kanji/1408-demand-%E9%9C%80","耐":"/kanji/1409-withstand-%E8%80%90","端":"/kanji/1410-the-edge-%E7%AB%AF","包":"/kanji/1412-wrap-%E5%8C%85","胞":"/kanji/1413-cell-%E8%83%9E","泡":"/kanji/1414-bubble-%E6%B3%A1","砲":"/kanji/1415-cannon-%E7%A0%B2","飽":"/kanji/1416-get-sick-of-%E9%A3%BD","抱":"/kanji/1417-hug-%E6%8A%B1","胸":"/kanji/1037-chestbreast-%E8%83%B8","句":"/kanji/1418-verse-of-a-poem-%E5%8F%A5","敬":"/kanji/1419-respect-%E6%95%AC","警":"/kanji/1420-the-fuzz-%E8%AD%A6","驚":"/kanji/1421-astonish-%E9%A9%9A","局":"/kanji/1422-department-%E5%B1%80","拘":"/kanji/1423-put-in-custody-%E6%8B%98","旬":"/kanji/1424-in-season-time-of-month-%E6%97%AC","陶":"/kanji/1425-pottery-%E9%99%B6","匂":"/kanji/1426-scent-good-or-bad-%E5%8C%82","渇":"/kanji/1427-thirsty-%E6%B8%87","約":"/kanji/1429-promise-roughly-speaking-%E7%B4%84","的":"/kanji/1430-motivation-al-%E7%9A%84","釣":"/kanji/1431-fishin-%E9%87%A3","均":"/kanji/1432-average-%E5%9D%87","皿":"/kanji/1433-plate-%E7%9A%BF","盗":"/kanji/1434-steal-by-stealth-%E7%9B%97","温":"/kanji/1435-hot-or-warm-thing-%E6%B8%A9","盟":"/kanji/1436-oath-%E7%9B%9F","盛":"/kanji/1437-heaps-of-%E7%9B%9B","塩":"/kanji/1438-salt-%E5%A1%A9","監":"/kanji/1439-oversee-%E7%9B%A3","鑑":"/kanji/1440-expert-opinion-%E9%91%91","血":"/kanji/1441-blood-%E8%A1%80","衆":"/kanji/1442-populace-%E8%A1%86","益":"/kanji/1444-profit-%E7%9B%8A","溢":"/kanji/1445-overflow-%E6%BA%A2","誉":"/kanji/1446-honor-%E8%AA%89","挙":"/kanji/1447-raise-cite-mention-%E6%8C%99","舟":"/kanji/1448-boat-%E8%88%9F","船":"/kanji/1449-ship-%E8%88%B9","航":"/kanji/1450-navigation-%E8%88%AA","般":"/kanji/1451-general-overall-%E8%88%AC","盤":"/kanji/1452-tray-basis-%E7%9B%A4","猫":"/kanji/1453-cat-%E7%8C%AB","猛":"/kanji/1454-fierce-%E7%8C%9B","猥":"/kanji/1455-obscene-%E7%8C%A5","猿":"/kanji/1456-monkey-%E7%8C%BF","狩":"/kanji/1457-hunt-%E7%8B%A9","狂":"/kanji/1458-go-nuts-%E7%8B%82","独":"/kanji/1459-solitary-%E7%8B%AC","獄":"/kanji/1460-hell-%E7%8D%84","獲":"/kanji/1461-prey-on-get-%E7%8D%B2","狭":"/kanji/1462-narrow-%E7%8B%AD","犯":"/kanji/1464-commit-a-crime-%E7%8A%AF","印":"/kanji/1465-stamp-%E5%8D%B0","叩":"/kanji/1466-beat-smack-%E5%8F%A9","卵":"/kanji/1467-egg-%E5%8D%B5","却":"/kanji/1468-disregard-%E5%8D%B4","範":"/kanji/1469-standard-the-best-way-to-do-%E7%AF%84","御":"/kanji/1470-the-honorific-o-%E5%BE%A1","腕":"/kanji/1471-arm-skill-%E8%85%95","即":"/kanji/1472-immediately-%E5%8D%B3","節":"/kanji/1473-season-joint-%E7%AF%80","厄":"/kanji/1474-misfortune-%E5%8E%84","危":"/kanji/1475-dangerous-%E5%8D%B1","抑":"/kanji/1477-suppress-%E6%8A%91","迎":"/kanji/1478-go-to-pick-someone-up-%E8%BF%8E","仰":"/kanji/1479-pompous-look-up-to-%E4%BB%B0","服":"/kanji/1481-clothes-%E6%9C%8D","報":"/kanji/1482-data-%E5%A0%B1","狙":"/kanji/1484-aim-at-%E7%8B%99","組":"/kanji/1485-ones-team-%E7%B5%84","阻":"/kanji/1486-hamper-%E9%98%BB","粗":"/kanji/1487-rough-texture-bad-quality-%E7%B2%97","査":"/kanji/1488-inspect-%E6%9F%BB","畳":"/kanji/1489-tatami-mat-%E7%95%B3","助":"/kanji/1490-save-%E5%8A%A9","ネ":"/kanji/1491-necrophilia-%E3%83%8D","祖":"/kanji/1492-ancestor-%E7%A5%96","視":"/kanji/1493-peer-at-%E8%A6%96","祝":"/kanji/1494-celebrate-%E7%A5%9D","社":"/kanji/1495-company-%E7%A4%BE","祈":"/kanji/1496-pray-%E7%A5%88","祉":"/kanji/1497-welfare-%E7%A5%89","神":"/kanji/1498-god-kanji-%E7%A5%9E","福":"/kanji/1500-good-luck-%E7%A6%8F","副":"/kanji/1501-side-or-vice-%E5%89%AF","幅":"/kanji/1502-width-%E5%B9%85","富":"/kanji/1503-get-rich-%E5%AF%8C","礼":"/kanji/1504-polite-%E7%A4%BC","乱":"/kanji/1505-disorder-%E4%B9%B1","札":"/kanji/1506-card-label-bill-%E6%9C%AD","乳":"/kanji/1507-milk-%E4%B9%B3","初":"/kanji/1509-first-time-%E5%88%9D","裸":"/kanji/1510-naked-%E8%A3%B8","被":"/kanji/1511-get-injured-%E8%A2%AB","複":"/kanji/1513-complicated-or-compound-%E8%A4%87","腹":"/kanji/1514-entrails-%E8%85%B9","復":"/kanji/1515-return-or-re-do-%E5%BE%A9","履":"/kanji/1516-put-on-pants-or-shoes-%E5%B1%A5","谷":"/kanji/1517-valley-swamp-thing-radical-%E8%B0%B7","裕":"/kanji/1518-abundant-%E8%A3%95","欲":"/kanji/1519-want-%E6%AC%B2","俗":"/kanji/1520-uncouth-%E4%BF%97","容":"/kanji/1521-appearance-%E5%AE%B9","溶":"/kanji/1522-melt-%E6%BA%B6","浴":"/kanji/1523-bathe-%E6%B5%B4","鼻":"/kanji/1525-nose-%E9%BC%BB","葬":"/kanji/1526-mourn-%E8%91%AC","算":"/kanji/1527-calculate-%E7%AE%97","弁":"/kanji/1528-dialect-%E5%BC%81","昇":"/kanji/1529-ascend-%E6%98%87","戒":"/kanji/1530-admonish-commandment-%E6%88%92","械":"/kanji/1531-contraption-%E6%A2%B0","羽":"/kanji/1532-feathers-%E7%BE%BD","飛":"/kanji/1533-fly-%E9%A3%9B","翌":"/kanji/1534-the-next-the-following-%E7%BF%8C","習":"/kanji/1535-learn-%E7%BF%92","弱":"/kanji/1536-weak-%E5%BC%B1","扇":"/kanji/1537-traditional-fan-%E6%89%87","散":"/kanji/1540-scatter-%E6%95%A3","展":"/kanji/1541-exhibit-%E5%B1%95","譲":"/kanji/1542-concessions-%E8%AD%B2","昔":"/kanji/1543-long-ago-%E6%98%94","借":"/kanji/1539-borrow-%E5%80%9F","惜":"/kanji/1544-close-but-no-cigar-%E6%83%9C","籍":"/kanji/1545-family-register-%E7%B1%8D","黄":"/kanji/1546-yellow-%E9%BB%84","嬢":"/kanji/1673-young-lady-%E5%AC%A2","横":"/kanji/1547-side-arrogant-%E6%A8%AA","共":"/kanji/1548-with-%E5%85%B1","並":"/kanji/1549-line-up-ordinary-%E4%B8%A6","普":"/kanji/1550-normal-%E6%99%AE","供":"/kanji/1551-follower-%E4%BE%9B","選":"/kanji/1552-choose-%E9%81%B8","洪":"/kanji/1553-flood-%E6%B4%AA","巷":"/kanji/1554-tha-treetz-%E5%B7%B7","港":"/kanji/1555-harbor-%E6%B8%AF","異":"/kanji/1556-to-differ-%E7%95%B0","翼":"/kanji/1557-political-wing-%E7%BF%BC","暴":"/kanji/1558-rampage-%E6%9A%B4","爆":"/kanji/1559-explode-%E7%88%86","再":"/kanji/1560-again-once-more-%E5%86%8D","甫":"/kanji/1561-unicycle-%E7%94%AB","舗":"/kanji/1562-chain-store-%E8%88%97","補":"/kanji/1563-supplement-%E8%A3%9C","捕":"/kanji/1564-capture-%E6%8D%95","構":"/kanji/1566-set-up-care-about-%E6%A7%8B","講":"/kanji/1567-lecture-%E8%AC%9B","購":"/kanji/1568-subscribe-%E8%B3%BC","溝":"/kanji/1569-ditch-%E6%BA%9D","降":"/kanji/1571-descend-rainfall-get-out-of-vehicle-%E9%99%8D","年":"/kanji/1572-year-%E5%B9%B4","五":"/kanji/1573-five-%E4%BA%94","語":"/kanji/1574-language-%E8%AA%9E","悟":"/kanji/1575-enlightenment-%E6%82%9F","違":"/kanji/1577-different-and-therefore-wrong-%E9%81%95","偉":"/kanji/1578-high-powered-prestigious-%E5%81%89","衛":"/kanji/1579-defense-%E8%A1%9B","瞬":"/kanji/1581-twinkle-tiny-bit-of-time-%E7%9E%AC","舞":"/kanji/1582-dance-flutter-%E8%88%9E","隣":"/kanji/1583-neighbor-%E9%9A%A3","料":"/kanji/1585-ingredients-fees-%E6%96%99","科":"/kanji/1586-science-%E7%A7%91","図":"/kanji/1587-diagram-map-%E5%9B%B3","斜":"/kanji/1588-diagonal-%E6%96%9C","史":"/kanji/1590-history-%E5%8F%B2","更":"/kanji/1591-all-over-again-%E6%9B%B4","硬":"/kanji/1592-hard-like-a-rock-%E7%A1%AC","使":"/kanji/1593-use-%E4%BD%BF","便":"/kanji/1594-convenient-poop-%E4%BE%BF","身":"/kanji/1595-ones-own-flesh-%E8%BA%AB","射":"/kanji/1596-shoot-%E5%B0%84","謝":"/kanji/1597-apologize-%E8%AC%9D","窮":"/kanji/1598-to-be-in-trouble-%E7%AA%AE","地":"/kanji/1600-area-%E5%9C%B0","池":"/kanji/1601-pond-%E6%B1%A0","他":"/kanji/1602-other-%E4%BB%96","施":"/kanji/1603-put-into-practice-charity-%E6%96%BD","曽":"/kanji/1604-gain-%E6%9B%BD","増":"/kanji/1605-increase-%E5%A2%97","贈":"/kanji/1606-give-%E8%B4%88","憎":"/kanji/1607-detest-%E6%86%8E","僧":"/kanji/1608-buddhist-monk-%E5%83%A7","層":"/kanji/1609-layer-%E5%B1%A4","呂":"/kanji/1610-washtub-%E5%91%82","宮":"/kanji/1612-palace-%E5%AE%AE","官":"/kanji/1613-federal-%E5%AE%98","館":"/kanji/1614-big-hall-%E9%A4%A8","棺":"/kanji/1615-coffin-%E6%A3%BA","追":"/kanji/1616-follow-%E8%BF%BD","遣":"/kanji/1617-apply-%E9%81%A3","管":"/kanji/1618-tube-%E7%AE%A1","師":"/kanji/1619-master-teacher-%E5%B8%AB","営":"/kanji/1621-manage-a-business-%E5%96%B6","労":"/kanji/1622-labor-%E5%8A%B4","栄":"/kanji/1623-glory-%E6%A0%84","学":"/kanji/1624-knowledge-%E5%AD%A6","覚":"/kanji/1625-bear-in-mind-%E8%A6%9A","党":"/kanji/1626-political-party-%E5%85%9A","尚":"/kanji/1627-all-the-more-%E5%B0%9A","賞":"/kanji/1628-prize-%E8%B3%9E","償":"/kanji/1629-compensate-for-%E5%84%9F","常":"/kanji/1630-usual-%E5%B8%B8","堂":"/kanji/1631-assembly-hall-%E5%A0%82","善":"/kanji/1632-morally-good-%E5%96%84","繕":"/kanji/1633-mend-%E7%B9%95","周":"/kanji/1635-circumference-%E5%91%A8","調":"/kanji/1636-check-out-%E8%AA%BF","週":"/kanji/1637-week-%E9%80%B1","彫":"/kanji/1638-carve-%E5%BD%AB","高":"/kanji/1639-tall-%E9%AB%98","豪":"/kanji/1226-luxurious-%E8%B1%AA","向":"/kanji/1640-turn-to-face-%E5%90%91","商":"/kanji/1641-merchandise-%E5%95%86","橋":"/kanji/1642-bridge-%E6%A9%8B","過":"/kanji/1644-surpass-too-much-%E9%81%8E","骨":"/kanji/1645-bone-%E9%AA%A8","滑":"/kanji/1646-slippery-%E6%BB%91","率":"/kanji/1648-ratio-%E7%8E%87","渋":"/kanji/1649-bitter-flavor-%E6%B8%8B","楽":"/kanji/1650-enjoy-%E6%A5%BD","薬":"/kanji/1651-medicine-%E8%96%AC","兆":"/kanji/1652-omen-%E5%85%86","逃":"/kanji/1653-escape-%E9%80%83","跳":"/kanji/1654-leap-up-%E8%B7%B3","眺":"/kanji/1655-look-at-for-a-long-time-while-lost-in-thought-%E7%9C%BA","挑":"/kanji/1656-challenge-%E6%8C%91","桃":"/kanji/1657-peach-%E6%A1%83","書":"/kanji/1659-write-%E6%9B%B8","律":"/kanji/1231-regulation-%E5%BE%8B","事":"/kanji/1660-action-incident-%E4%BA%8B","筆":"/kanji/1661-paintbrush-%E7%AD%86","唐":"/kanji/1137-suddenly-%E5%94%90","糖":"/kanji/1138-sugar-%E7%B3%96","逮":"/kanji/1662-arrest-%E9%80%AE","康":"/kanji/1663-health-%E5%BA%B7","棄":"/kanji/1664-discard-%E6%A3%84","君":"/kanji/1665-buddy-%E5%90%9B","群":"/kanji/1666-flock-%E7%BE%A4","妻":"/kanji/1667-wife-%E5%A6%BB","凄":"/kanji/1668-deeyammn-hella-%E5%87%84","争":"/kanji/1669-battle-%E4%BA%89","静":"/kanji/1670-quiet-%E9%9D%99","兼":"/kanji/1671-double-duty-%E5%85%BC","嫌":"/kanji/1672-eww-%E5%AB%8C","謙":"/kanji/1674-modesty-%E8%AC%99","建":"/kanji/1154-build-%E5%BB%BA","健":"/kanji/1156-healthy-%E5%81%A5","延":"/kanji/1157-prolong-%E5%BB%B6","誕":"/kanji/1158-birthday-birth-%E8%AA%95","庭":"/kanji/1155-garden-%E5%BA%AD","銭":"/kanji/1676-coin-%E9%8A%AD","浅":"/kanji/1677-shallow-%E6%B5%85","残":"/kanji/1678-remain-behind-%E6%AE%8B","聴":"/kanji/1680-listen-to-%E8%81%B4","壊":"/kanji/1681-break-%E5%A3%8A","懐":"/kanji/1682-nostalgia-%E6%87%90","徳":"/kanji/1683-virtue-%E5%BE%B3","劇":"/kanji/1685-play-%E5%8A%87","慮":"/kanji/1686-consideration-%E6%85%AE","虚":"/kanji/1687-empty-%E8%99%9A","虐":"/kanji/1688-oppress-%E8%99%90","膚":"/kanji/1689-epidermis-%E8%86%9A","嘘":"/kanji/1690-lie-%E5%98%98","沈":"/kanji/1692-sink-%E6%B2%88","就":"/kanji/1693-get-a-job-you-bum-%E5%B0%B1","蹴":"/kanji/1694-kick-%E8%B9%B4","刻":"/kanji/1696-engrave-%E5%88%BB","核":"/kanji/1697-nucleus-%E6%A0%B8","該":"/kanji/1698-correspond-to-%E8%A9%B2","咳":"/kanji/1699-cough-%E5%92%B3","之":"/kanji/1700-this-%E4%B9%8B","乏":"/kanji/1701-shoddy-%E4%B9%8F","芝":"/kanji/1702-lawn-%E8%8A%9D","其":"/kanji/1703-that-%E5%85%B6","旗":"/kanji/1704-flag-%E6%97%97","基":"/kanji/1705-basis-%E5%9F%BA","期":"/kanji/1706-period-of-time-%E6%9C%9F","欺":"/kanji/1707-dupe-%E6%AC%BA","甚":"/kanji/1708-enormous-%E7%94%9A","勘":"/kanji/1709-perception-%E5%8B%98","堪":"/kanji/1710-tolerate-%E5%A0%AA","邪":"/kanji/1712-heresy-%E9%82%AA","既":"/kanji/1713-already-%E6%97%A2","雅":"/kanji/1714-elegant-%E9%9B%85","概":"/kanji/1715-general-concept-%E6%A6%82","慨":"/kanji/1716-deplore-%E6%85%A8","屯":"/kanji/1717-bent-dagger-%E5%B1%AF","純":"/kanji/1718-epitome-%E7%B4%94","鈍":"/kanji/1719-dull-%E9%88%8D","逆":"/kanji/1720-opposite-%E9%80%86","以":"/kanji/1721-compared-to-%E4%BB%A5","似":"/kanji/1722-resemble-%E4%BC%BC","承":"/kanji/1723-to-be-told-consent-%E6%89%BF","蒸":"/kanji/1724-humid-%E8%92%B8","段":"/kanji/1726-step-stairs-%E6%AE%B5","興":"/kanji/1727-interest-%E8%88%88","暇":"/kanji/1728-free-time-%E6%9A%87","龍":"/kanji/1729-ancient-chinese-dragon-%E9%BE%8D","襲":"/kanji/1730-onslaught-%E8%A5%B2","<<<":"/kanji/1731-ku-klux-klan","巡":"/kanji/1732-patrol-%E5%B7%A1","災":"/kanji/1733-disaster-%E7%81%BD","呉":"/kanji/1734-wu-dynasty-of-china-%E5%91%89","誤":"/kanji/1735-mistake-%E8%AA%A4","娯":"/kanji/1736-entertainment-%E5%A8%AF","瓜":"/kanji/1737-melon-%E7%93%9C","孤":"/kanji/1738-isolation-%E5%AD%A4","弧":"/kanji/1739-arc-%E5%BC%A7","為":"/kanji/1740-deed-%E7%82%BA","偽":"/kanji/1741-fake-%E5%81%BD","融":"/kanji/1742-fusion-%E8%9E%8D","隔":"/kanji/1743-segregate-%E9%9A%94","丈":"/kanji/1745-robust-%E4%B8%88","拝":"/kanji/1746-worship-%E6%8B%9D","互":"/kanji/1747-reciprocal-%E4%BA%92","麗":"/kanji/1768-gorgeous-%E9%BA%97","ク":"/kanji/1756-katakana-ku-%E3%82%AF","メ":"/kanji/1757-katakana-me-%E3%83%A1","ホ":"/kanji/1759-katakana-ho-%E3%83%9B","テ":"/kanji/1760-katakana-te-%E3%83%86","オ":"/kanji/1761-katakana-o-%E3%82%AA","ノ":"/kanji/1765-katakana-no-%E3%83%8E","???":"/kanji/1767","  丶":"/kanji/1769-dot-%E4%B8%B6","ユ":"/kanji/1770-katakana-yu-radical-%E3%83%A6"};

var PageEnum = Object.freeze({ unknown:0, kanji:1, reviews:2, lessons:3 });
var curPage = PageEnum.unknown;
var htmls = {};


/* MAIN */
(function () {
    $(document).ready(function() {
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
                mgetElement = document.getElementById("meaning");
                mlocation = document.getElementById("note-meaning");
                msection = document.createElement("SECTION");
                mp = document.createElement("P");
                msection.appendChild(mp);
                mheading = document.createElement("H3");
                mheading.innerHTML = "<a class='kanjidamage_a' target='_blank'>KanjiDamage</a> Meaning Mnemonic";
                msection.appendChild(mheading);
                mp2 = document.createElement("p");
                mp2.setAttribute("id", "kd_meaning");
                msection.appendChild(mp2);
                mgetElement.insertBefore(msection, mlocation);
                //mmnemonic = document.createTextNode(getMeaning());
                document.getElementById("kd_meaning").innerHTML = "Loading...";
                getMeaning(function(meaning) {
                    document.getElementById("kd_meaning").innerHTML = meaning;
                    if (document.getElementById("kd_meaning").innerHTML === "" ) document.getElementById("kd_meaning").innerHTML = "This Kanji has no meaning mnemonic";
                });

                //reading
                //console.log(getKDPage());
                mgetElement = document.getElementById("reading");
                mlocation = document.getElementById("note-reading");
                //console.log(mlocation.parent);
                msection = document.createElement("SECTION");
                mp = document.createElement("P");
                msection.appendChild(mp);
                mheading = document.createElement("H3");
                mheading.innerHTML = "<a class='kanjidamage_a' target='_blank'>KanjiDamage</a> Onyomi Mnemonic";
                msection.appendChild(mheading);
                mp2 = document.createElement("table");
                mp2.setAttribute("id", "kd_readingO");
                msection.appendChild(mp2);
                mgetElement.insertBefore(msection, mlocation);
                //console.log(getOnyomi());

                getOnyomi(function(onyomi) {
                    d1 = document.getElementById('kd_readingO');
                    d1.insertAdjacentHTML('beforeend', onyomi);
                    table = document.getElementById("kd_readingO");
                    if (table.innerText.length < 10) {
                        table.rows[0].cells[0].setAttribute("id", "rowS");
                        document.getElementById("rowS").insertAdjacentHTML('afterend', '<td id="cell" style="width:90%"><p><p> This Kanji has no special reading mnemonic (the meaning mnemonic usually includes the reading mnemonic in it) .</p></p></td>');
                    } else {
                        table.rows[0].cells[0].setAttribute("id", "rowB");
                        document.getElementById("rowB").insertAdjacentHTML('afterend', '<td id="cell" style="width:8%"></td>');
                    }
                });

                updateLinks();
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
                            var interval = setInterval(function() { //Code to run After timeout elapses
                                if (reviewMn()) // run until the page has fully loaded (reviewMn returns false if mlocation is null)
                                {
                                    reviewOn();
                                    updateLinks();
                                    clearInterval(interval);
                                }
                            }, 100); //100ms will elapse and Code will execute.
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
                mheading.innerHTML = "<a class='kanjidamage_a' target='_blank'>KanjiDamage</a> Meaning Mnemonic";
                mlocation.insertBefore(mheading, mlocation.children[4]);
                //reading
                mlocation = document.getElementsByClassName("pure-u-3-4 col2")[1];
                mp = document.createElement('p');
                ms = document.createElement('section');
                ms.setAttribute('id', 'kdreading');
                mlocation.insertBefore(mp, mlocation.children[3]);
                mlocation.insertBefore(ms, mlocation.children[4]);
                mheading = document.createElement("H2");
                mheading.innerHTML = "<a class='kanjidamage_a' target='_blank'>KanjiDamage</a> Onyomi Mnemonic";
                mlocation.insertBefore(mheading, mlocation.children[4]);
                mp2 = document.createElement("table");
                mp2.setAttribute("id", "kdrtable");
                ms.appendChild(mp2);

                var updateThings = function() {
                    document.getElementById("kdmeaning").innerHTML = "Loading...";
                    getMeaning(function(meaning) {
                        document.getElementById("kdmeaning").innerHTML = meaning;
                        if (document.getElementById("kdmeaning").innerHTML === "" ) document.getElementById("kdmeaning").innerHTML = "This Kanji has no meaning mnemonic";
                    });


                    getOnyomi(function(onyomi) {
                        document.getElementById("kdrtable").innerHTML = onyomi;
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
                                if (table.rows[0] != null) {
                                    table.rows[0].cells[0].setAttribute("id", "rowB");
                                    document.getElementById("rowB").insertAdjacentHTML('afterend', '<td id="cell" style="width:8%"></td>');
                                }
                            }
                        }
                    });
                    if (getKDPage() !== undefined) console.log("The KanjiDamage page is:   " + getKDPage().substring(29));
                    reviewMn();
                    reviewOn();
                    updateLinks();
                };

                observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        //console.log(mutation.type);
                        updateThings();
                    });
                });
                observer.observe(document.querySelector('#information'), { attributes: true });
                observer.observe(document.querySelector('#supplement-kan'), { attributes: true });

                updateThings();
                break;
        }
    });
})();



// FUNCTIONS

function updateLinks() {
    var page = getKDPage();
    if (page != null) {
        $(".kanjidamage_a").attr("href", "http://" + page.substring(29));
    }
}

function reviewMn () {
    if("kan" in $.jStorage.get("currentItem") || $("#character").parent()[0].className === 'kanji' /*$("#character").hasClass("kanji")*/) {
        if (!$('#rmmeaning').length) {
            var mlocation = document.getElementById('note-meaning');
            if (mlocation == null) {
                console.log("mlocation is null");
                return false;
            }

            var sc = document.createElement('span');
            var ms = document.createElement('section');
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
            var mheading = document.createElement("H2");
            mheading.innerHTML = "<a class='kanjidamage_a' target='_blank'>KanjiDamage</a> Meaning Mnemonic";
            //console.log(mheading);
            ms.insertAdjacentElement('afterbegin', mheading);
            //console.log(ms);
            mlocation.insertAdjacentElement('beforebegin', ms);

            if (mlocation.getAttribute('style') === 'display: none;')
                ms.setAttribute('style', 'display: none;');
            else ms.setAttribute('style', 'display: block;');

            sc.innerHTML = "Loading...";
            getMeaning(function(meaning) {
                sc.innerHTML = meaning;
                if (sc.innerHTML === "" ) sc.innerHTML = "This Kanji has no meaning mnemonic";
            });

            ms.insertAdjacentElement('beforeend', sc);

            if (getKDPage() !== undefined) console.log("The KanjiDamage page is:   " + getKDPage().substring(29));
            return true;
        }
    }
    else
        return false;
}

function reviewOn () {
    if("kan" in $.jStorage.get("currentItem") || $("#character").parent()[0].className === 'kanji' /*$("#character").hasClass("kanji")*/) {
        if (!$('#rrreading').length) {
            // creates the area to place the reading mnemonic
            mlocation = document.getElementById("note-reading");
            if (mlocation == null) return false;

            ms = document.createElement('section');
            mp2 = document.createElement("table");
            if (curPage === PageEnum.reviews) {
                ms.setAttribute('id', 'rrreading');
                mp2.setAttribute("id", "rrrtable");
            } else {
                ms.setAttribute('id', 'lrreading');
                mp2.setAttribute("id", "lrrtable");
            }
            mheading = document.createElement("H2");
            mheading.innerHTML = "<a class='kanjidamage_a' target='_blank'>KanjiDamage</a> Onyomi Mnemonic";
            ms.insertAdjacentElement('afterbegin', mheading);
            mlocation.insertAdjacentElement('beforebegin', ms);

            if (mlocation.getAttribute('style') === 'display: none;')
                ms.setAttribute('style', 'display: none;');
            else ms.setAttribute('style', 'display: block;');

            table = mp2;
            ms.appendChild(mp2);
            //console.log(ms.innerHTML);
            getOnyomi(function(onyomi) {
                table.insertAdjacentHTML('afterbegin', onyomi);
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
            });

            ms.appendChild(table);
            return true;
        }
    }
    else
        return false;
}

function getMeaning (onSuccess) {
    getHTML(getKDPage(), function(html) {
        var doc = html.getElementsByClassName("definition");
        var definition;
        //console.log(doc);
        if (doc.length > 4) definition = doc[2];
        else definition = doc[1];
        //console.log(getHTML(getKDPage()));
        //console.log('definition');
        //console.log(definition);
        if (curPage === PageEnum.kanji) {
            //console.log("am in kanji enum nowO");
            onSuccess(editMHTML(definition));
        } else {
            //console.log('am in lesson/review now');
            //console.log(editLessonMHTML(definition));
            onSuccess(editLessonMHTML(definition));
        }
    });
}

function getOnyomi (onSuccess) {
    //getHTML(get
    getHTML(getKDPage(), function(html) {
        var doc = html.getElementsByClassName("definition");
        var definition;
        if (doc.length > 4) definition = doc[1];
        else definition = doc[0];
        //console.log(definition.innerHTML.length);
        //console.log(definition);
        //console.log(definition.rows[0].cells[0]);
        //console.log(definition);
        if (curPage === PageEnum.kanji) {
            //console.log("am in kanji enum nowO");
            onSuccess(editRHTML(definition));
        } else {
            //console.log('am in lesson/review now');
            //console.log('editlessonrHTML(definiton)');
            //console.log(editLessonRHTML(definition));
            onSuccess(editLessonRHTML(definition));
        }
    });
}


function getHTML (url, onSuccess) {
    if (url in htmls) onSuccess(htmls[url]);
    //var remote =
    $.ajax({
        type: "GET",
        url: url,
        //async: false
    }).success(function(remote) {//.responseText;
        var parser = new DOMParser ();
        var html   = parser.parseFromString (remote, "text/html");
        htmls[url] = html;
        onSuccess(html);
    });
    //var parser = new DOMParser ();
    //var html   = parser.parseFromString (remote, "text/html");
    //htmls[url] = html;
    //return html;
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
    if (input in kanjiToPage) return "https://grenzionky.github.io/www.kanjidamage.com" + kanjiToPage[input];
    return undefined;
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
