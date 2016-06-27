
var triggerEventOnElement=function(elt,event){if(document.createEvent){evt=document.createEvent("MouseEvents");evt.initMouseEvent(event,true,true,window,0,0,0,0,0,false,false,false,false,0,null);elt.dispatchEvent(evt);}}
var getAsideStatus=function(){var asideMenu=document.getElementById("asidemenu");if(asideMenu){if(window.innerWidth>=1024){var status="asidemenudefaultopened";return status;}
else if(parseInt(asideMenu.getBoundingClientRect().left)==0){var status="asidemenuopened";return status;}
else{var status="asidemenuclosed";return status;}}
else{return"absent";}}
var putCoverOnHeader=function(){var asideHeaderCover=document.getElementById("aside_header_cover");if(asideHeaderCover){asideHeaderCover.setAttribute("class","aside_header_cover");setTimeout(function(){asideHeaderCover.style.opacity=0.9;},1);}}
var putCoverOnAsideContent=function(){var asideContentCover=document.getElementById("aside_content_cover");if(asideContentCover){asideContentCover.setAttribute("class","aside_cover");setTimeout(function(){asideContentCover.style.opacity=0.9;},1);}}
var removeCoverOnHeader=function(){var asideHeaderCover=document.getElementById("aside_header_cover");if(asideHeaderCover){asideHeaderCover.style.opacity=0;setTimeout(function(){asideHeaderCover.setAttribute("class","");},310);}}
var removeCoverOnAsideContent=function(){var asideContentCover=document.getElementById("aside_content_cover");if(asideContentCover){asideContentCover.style.opacity=0;setTimeout(function(){asideContentCover.setAttribute("class","");},310);}}
var resetCoverOnHeader=function(){var asideHeaderCover=document.getElementById("aside_header_cover");if(asideHeaderCover){asideHeaderCover.setAttribute("class","");}}
var resetCoverOnAsideContent=function(){var asideContentCover=document.getElementById("aside_content_cover");if(asideContentCover){asideContentCover.setAttribute("class","");}}
var addListenerOnHeaderCover=function(){var asideHeaderCover=document.getElementById("aside_header_cover");if(asideHeaderCover){asideHeaderCover.addEventListener("click",simulateAsideBehaviour,false);}}
var addListenerOnAsideContentCover=function(){var asideContentCover=document.getElementById("aside_content_cover");if(asideContentCover){asideContentCover.addEventListener("click",simulateAsideBehaviour,false);}}
var simulateAsideBehaviour=function(){var asideMenuTrigger=document.getElementById("menu_trigger");if(asideMenuTrigger){triggerEventOnElement(asideMenuTrigger,"click");}}
var addListenerOnMenuTrigger=function(){var asideMenuTrigger=document.getElementById("menu_trigger");if(asideMenuTrigger){asideMenuTrigger.addEventListener("click",handleAllCoverBehaviour,false);}}
var handleAllCoverBehaviour=function(){var status=getAsideStatus();if(status=="asidemenuopened"){removeCoverOnAsideContent();removeCoverOnHeader();}
else if(status=="asidemenuclosed"){putCoverOnAsideContent();putCoverOnHeader();}
else if(status=="asidemenudefaultopened"){resetCoverOnAsideContent();resetCoverOnHeader();}}
var handleAllCoverOnResize=function(){var status=getAsideStatus();if(status=="asidemenuclosed"){resetCoverOnAsideContent();resetCoverOnHeader();}}
Bk.onPageLoaded(addListenerOnMenuTrigger);Bk.onPageLoaded(addListenerOnAsideContentCover);Bk.onPageLoaded(addListenerOnHeaderCover);window.addEventListener("resize",handleAllCoverOnResize,false);