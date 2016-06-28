
var transferGlobals={issuerWordingLabel:'',recipientWordingLabel:'',labelIdsAndContent:{},issuerInputId:'sIssuer',recipientInputId:'sRecipient',wordingInputId:'wording',wordingReferenceInputId:'reference',amountInputId:'amountInteger',submitBtnId:'transferSubmitBtn'};function isEmpty(value){var isDef=typeof value!='undefined';var notBlank=value!="";return!(isDef&&notBlank);}
function getIssuerInput(){return document.getElementById(transferGlobals.issuerInputId);}
function getRecipientInput(){return document.getElementById(transferGlobals.recipientInputId);}
function hideShowAccounts(element){hideSubmitBtn();var textLabel=transferGlobals.labelIdsAndContent[element.parentElement.getAttribute('id')];if(typeof textLabel!='undefined'){element.innerHTML=textLabel;}
var section=element.getAttribute('data-section-to-display');Bk.initContext();Bk.toggle({id:section,transition:'unfold'});Bk.releaseContext();clearInputValue(section);};function clearInputValue(section){var inputToClean=null;if(section.search('issuer')>=0){inputToClean=document.getElementById(transferGlobals.issuerInputId);}else if(section.search('recipient'>=0)){inputToClean=document.getElementById(transferGlobals.recipientInputId);}
else{return;}
inputToClean.value="";}
function selectAccount(element,doNotToggle){if(!element){return false;}
var inputName=null;var accountId=null;var labelId=null;inputName=element.getAttribute('data-related-to');accountId=element.getAttribute('data-account-id');labelId=element.getAttribute('data-label-id');if(!doNotToggle){Bk.initContext();Bk.toggle({id:element.parentElement.getAttribute('id'),transition:'unfold'});Bk.releaseContext();}
var input=document.getElementById(inputName);input.value=accountId;displaySubmitBtn();}
function getSubmitBtn(){return document.getElementById(transferGlobals.submitBtnId);}
function hideSubmitBtn(){getSubmitBtn().style.display="none";}
function getWordingReferenceInput(){return document.getElementById(transferGlobals.wordingReferenceInputId);}
function getWordingInput(){return document.getElementById(transferGlobals.wordingInputId);}
function getAmountInput(){return document.getElementById(transferGlobals.amountInputId);}
function showSubmitBtn(){getSubmitBtn().style.display="";}
function displaySubmitBtn(){var issuerVal=getIssuerInput().value;var recipientVal=getRecipientInput().value;if(!isEmpty(issuerVal)){if(!isEmpty(recipientVal)){showSubmitBtn();return;}}
hideSubmitBtn();}
function labelClickedBindedFunction(event,element){hideShowAccounts(this);return false;}
function bindingFunction(event,element){selectAccount(this);return false;}
function bindClickableLabel(){var transferLabelLinkArray=document.querySelectorAll("a.transfer_label_link");for(var i=0;i<transferLabelLinkArray.length;i++){transferLabelLinkArray[i].removeEventListener('click',labelClickedBindedFunction,false);transferLabelLinkArray[i].addEventListener('click',labelClickedBindedFunction,false);}};function bindClickableAccountItem(){var transferItemArray=document.querySelectorAll("div.transfer_items_container a.transfer_item");for(var i=0;i<transferItemArray.length;i++){transferItemArray[i].removeEventListener('click',bindingFunction,false);transferItemArray[i].addEventListener('click',bindingFunction,false);}}
function initSelectedValue(){var issuer=getIssuerInput();if(!issuer){return false;}
var issuerVal=issuer.value;if(!isEmpty(issuerVal)){selectAccount(document.getElementById(issuerVal),true);}
var recipient=getRecipientInput();var recipientVal=recipient.value;if(!isEmpty(recipientVal)){selectAccount(document.getElementById(recipientVal),true);}}
function initWordingAndAmount(){var wordingReferenceInput=getWordingReferenceInput();if(!wordingReferenceInput){return false;}
wordingReferenceInput.setAttribute('placeholder','Référence opération');var wordingInput=getWordingInput();wordingInput.setAttribute('placeholder','Infos complémentaires');var amountInteger=getAmountInput();if(amountInteger.value=='0'){amountInteger.value=='';}
if(isAndroidBrowser()){amountInteger.onfocus=function(){this.setAttribute('type','number');};amountInteger.onblur=function(){this.setAttribute('type','text');};}
amountInteger.setAttribute('type','text');amountInteger.setAttribute('placeholder','Montant');}
var isAndroidBrowser=function(){var nua=navigator.userAgent;var is_android=((nua.indexOf('Mozilla/5.0')>-1&&nua.indexOf('Android ')>-1&&nua.indexOf('AppleWebKit')>-1)&&!(nua.indexOf('Chrome')>-1));return is_android;};document.addEventListener("bkPageLoaded",function(event,element){bindingDone=true;bindClickableAccountItem();initWordingAndAmount();initSelectedValue();});