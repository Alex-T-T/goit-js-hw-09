const e=document.querySelector("body"),t=document.querySelectorAll("button"),n=t[0],o=t[1];let l;n.addEventListener("click",(function(){l=setInterval((()=>{const t=`#${Math.floor(16777215*Math.random()).toString(16)}`;e.style.backgroundColor=t,n.disabled=!0}),1e3)})),o.addEventListener("click",(function(){clearInterval(l),n.disabled=!1}));
//# sourceMappingURL=01-color-switcher.efaf4be2.js.map
