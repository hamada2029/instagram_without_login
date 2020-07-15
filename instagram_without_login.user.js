// ==UserScript==
// @name         instagram without login
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  try to take over the world!
// @author       You
// @match        https://www.instagram.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    // Your code here...
    function setOverFlow(){
        if(! document.querySelector('[href*="/accounts/login"]')){
            console.log('can not found login link');
            return;
        }

        if(document.URL.indexOf('/p/') > -1){
            console.log('post page');
            return;
        }

        if(document.body.style.overflow == 'hidden'){
            document.body.style.overflow = '';
            console.log('remove overflow=hidden');
        }

        //const links = document.querySelectorAll('a[href^="/p/"]');
        const links = document.querySelectorAll('a');

        links.forEach(
            function(e){
                if(e._flag){return;}
                if(e.href.indexOf('/p/') > -1){
                    e.onclick = function(){
                        open(e.href);
                    };
                }else{
                    e.onclick = function(){
                        location.href = e.href;
                    };
                }
                e._flag = true;
            }
        );




    }


    const _style = document.createElement('style');
    _style.innerHTML = 'body > div[role="presentation"]{display:none}';
    document.head.appendChild(_style);

    const target = document.querySelector('body');

    // オブザーバインスタンスを作成
    const observer = new MutationObserver(
        function(mutations){
            mutations.forEach(setOverFlow);
        }
    );

    // オブザーバの設定
    const config = {
        childList: true,
        subtree: true
    };

    // 対象ノードとオブザーバの設定を渡す
    observer.observe(target, config);

    setOverFlow(); // 1回実行しとく


})();



