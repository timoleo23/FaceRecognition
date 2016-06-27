
var AUTHENTIFICATION_UTILS=(function(){"use strict";var myGlobals=[];var _PASSWORD_MAX_LENGTH=6;var passwordInput;var passwordHiddenInput;function _authentificationGridNumberListener(gridNumber,passwordInput,passwordHiddenInput){if(passwordInput.value.length<_PASSWORD_MAX_LENGTH){if(gridNumber.id!=''){passwordHiddenInput.value+=gridNumber.id+":";passwordInput.value+="*";}}}
function _correctPasswordInput(passwordInput,passwordHiddenInput){var passwordHiddenValue=passwordHiddenInput.value,passwordInputValue=passwordInput.value;if(passwordHiddenValue!=""&&passwordInputValue!=""){passwordHiddenInput.value=passwordHiddenValue.substr(0,passwordHiddenValue.length-3);passwordInput.value=passwordInputValue.substr(0,passwordInputValue.length-1);}}
var handleClick=function(event){passwordInput=document.getElementById("fakeuserPassword");passwordHiddenInput=document.getElementById("userPassword");event.preventDefault();event.stopPropagation();_authentificationGridNumberListener(event.target,passwordInput,passwordHiddenInput);};function _init(gridNumbersId,passwordInputId,passwordHiddenInputId,correctButtonId){var authentGridNumbers=document.getElementById(gridNumbersId);passwordInput=document.getElementById(passwordInputId);passwordHiddenInput=document.getElementById(passwordHiddenInputId);if(!(authentGridNumbers&&passwordInput&&passwordHiddenInput)){return false;}
authentGridNumbers.addEventListener("click",handleClick);document.getElementById(correctButtonId).addEventListener("click",erasePassword,false);}
function erasePassword(){_correctPasswordInput(passwordInput,passwordHiddenInput);return false;}
function _triggerSubmitAjax(){var btnSubmit=$('#btnSubmit');if(btnSubmit){btnSubmit.attr('disabled',"disabled");}
Bk.initContext();Bk.submitPage({loader:{from:'bk-body',to:'bk-main-loader',transition:'none'},content:{from:'bk-main-loader',to:'bk-body',form:'loginForm',transition:'fade'}});Bk.releaseContext();return false;}
function _initPasswordChange(gridNumbersId){var authentGridNumbers=document.getElementById(gridNumbersId);myGlobals.password1Element=$('#passwordBlocCurrent');myGlobals.password2Element=$('#passwordBlocNew');myGlobals.password3Element=$('#passwordBlocConfirm');if(!(authentGridNumbers&&$('#passwordBlocCurrent').length&&$('#passwordBlocNew').length&&$('#passwordBlocConfirm').length)){return false;}
_resetPasswordChangeGrid();authentGridNumbers.addEventListener("click",triggerUpdatePasswordFields);}
function triggerUpdatePasswordFields(event){event.preventDefault();event.stopPropagation();updatePasswordFields(event.target.id+":");}
function toggleFocuscolor(oldElement,newElement){if(newElement){$(newElement).addClass("onfocus").removeClass("onblur");}
if(oldElement){$(oldElement).removeClass("onfocus").addClass("onblur");}}
function getNextElementToFocusForPwdChange(){var newIndex=parseInt(myGlobals._index_focus_on)+1;if(newIndex>=6){return null;}
var el=$('#'+myGlobals._focus_on+'_item'+newIndex);if(el){return el;}
else{return null;}}
function getElementFocusedForPwdChange(){var el=$('#'+myGlobals._focus_on+'_item'+myGlobals._index_focus_on);if(el){return el;}
else{return null;}}
function setFirstFocusOnElementForPwdChange(){var oldFocusedElem=getElementFocusedForPwdChange();myGlobals._focus_on='passwordBlocCurrent';myGlobals._index_focus_on='0';var firstFocusedElement=getElementFocusedForPwdChange();firstFocusedElement.trigger('focus');toggleFocuscolor(oldFocusedElem,firstFocusedElement);}
function getNextPasswordBlockId(){if(myGlobals._focus_on==myGlobals.password1Element.attr('id')){return myGlobals.password2Element.attr('id');}
if(myGlobals._focus_on==myGlobals.password2Element.attr('id')){return myGlobals.password3Element.attr('id');}
return null;}
function isNotLastElementForPwdChange(){return!(myGlobals._focus_on==myGlobals.password3Element.attr('id')&&myGlobals._index_focus_on>=6);}
function setFocusOfNextElementForPwdChange(){var oldElemFocused=getElementFocusedForPwdChange();var nextEl=getNextElementToFocusForPwdChange();if(!nextEl){var nextPassordBlockId=getNextPasswordBlockId();if(!nextPassordBlockId){myGlobals._index_focus_on=(parseInt(myGlobals._index_focus_on)+1).toString();return false;}
else{myGlobals._focus_on=nextPassordBlockId;myGlobals._index_focus_on='0';}}
else{var newIndex=parseInt(myGlobals._index_focus_on)+1;myGlobals._index_focus_on=newIndex.toString();}
var newElementToFocus=getElementFocusedForPwdChange();if(newElementToFocus){newElementToFocus.trigger('focus');toggleFocuscolor(oldElemFocused,newElementToFocus);}
else{console.log("could not focus element. block = "+myGlobals._focus_on+", index : "+myGlobals._index_focus_on);return false;}
return true;}
function updatePasswordFields(val){if(myGlobals._focus_on==''){_initPasswordChange();}
var focusElement=getElementFocusedForPwdChange();if(focusElement){var inputHiddenId="";if(!(typeof focusElement.dataset=="undefined")){inputHiddenId=focusElement.dataset.inputHiddenId;}else{inputHiddenId=focusElement.attr('data-input-hidden-id');}
if(val!=':'){if(isNotLastElementForPwdChange()){$('#'+inputHiddenId).val($('#'+inputHiddenId).val()+val);focusElement.val("*");}
setFocusOfNextElementForPwdChange();}}}
function _resetPasswordChangeGrid(){$('.block_pwdchange input').removeClass('onfocus').addClass('onblur');setFirstFocusOnElementForPwdChange();$('.hidden_input').val("");}
function _submitPwdchangeAjax(){Bk.initContext();Bk.submitPage({loader:{from:'bk-body',to:'bk-main-loader',transition:'none'},content:{from:'bk-main-loader',to:'bk-body',form:'changePwdForm',transition:'fade'}});Bk.releaseContext();return false;}
return{init:_init,triggerSubmitAjax:_triggerSubmitAjax,submitPwdchangeAjax:_submitPwdchangeAjax,initPasswordChange:_initPasswordChange,resetPasswordChange:_resetPasswordChangeGrid};}());document.addEventListener("bkPageLoaded",initAuthent,false);function initAuthent(){AUTHENTIFICATION_UTILS.init("authentification-grid-numbers","fakeuserPassword","userPassword","btnErase");}
document.addEventListener("bkPageLoaded",initChangePassword,false);function initChangePassword(){AUTHENTIFICATION_UTILS.initPasswordChange("authentification-grid-numbers");}