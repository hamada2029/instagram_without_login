// ==UserScript==
// @name         instagram without login
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.instagram.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if(! document.querySelector('[href*="/accounts/login"]')){
        console.log('logged in');
        return;
    }

    // Your code here...
    function setOverFlow(){
        if(document.body.style.overflow == 'hidden'){
            document.body.style.overflow = '';
            console.log('remove overflow=hidden');
        }

        //const links = document.querySelectorAll('a[href^="/p/"]');
        const links = document.querySelectorAll('a');

        links.forEach(
            function(e){
                if(e._flag){return;}
                e.onclick = function(){
                    open(e.href);
                };
                e._flag = true;
            }
        );




    }

    document.body.onmouseover = setOverFlow;

    const _style = document.createElement('style');
    _style.innerHTML = 'div[role="presentation"]{display:none}';
    document.head.appendChild(_style);


})();

