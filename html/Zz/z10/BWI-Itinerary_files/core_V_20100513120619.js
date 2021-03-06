/** begin /delta/shared_content/edgecache/js/core/util.js **/
/* Generic Base Object */
function GenObj() {}
GenObj.prototype.setProp = function(prop,value) { this[prop] = value; }
GenObj.prototype.getProp = function(prop) { return this[prop]; }

function get(id) { return document.getElementById(id); }
function getByTagName(tag) { return document.getElementsByTagName(tag); }
function getByClassName(clsName) {
    var retVal = new Array();
    var elements = document.getElementsByTagName("*");
    for(var i = 0;i < elements.length;i++){
        if(elements[i].className.indexOf(" ") >= 0){
            var classes = elements[i].className.split(" ");
            for(var j = 0;j < classes.length;j++){
                if(classes[j] == clsName)
                    retVal.push(elements[i]);
            }
        }
        else if(elements[i].className == clsName)
            retVal.push(elements[i]);
    }
    return retVal;
}
function exists(o) { 
	try {
		if((typeof(o) !== "undefined")&&(o!=undefined)&&(o!=null)&&(o!="null")) { return true; } else { return false; } 
	} catch(error){ return false; }
}
function getInnerHTML(id) { return document.getElementById(id).innerHTML; }
function setInnerHTML(id, d) { var e = get(id); if (e != null) { e.innerHTML = d; } }
function getClassName(id) { return document.getElementById(id).className; }
function setClassName(id, c) {  var e = get(id);if (e != null) { e.className = c; } }
function getStyleAttr(id,p) { var e = get(id);if(e != null) { return e.style[p]; } }
function setStyleAttr(id,p,v) { var e = get(id);if(e != null) { e.style[p] = v; } }
function changeCLS(id,cls) { setClassName(id,cls); }
function formatURL(url){ var formattedURL = unescape(url);window.location = formattedURL;}

function show(id) {
	var display = (arguments.length > 1) ? arguments[1] : "block";
	if (typeof(id) === "string" ) {
		var e = get(id);
		if (e != null) {
			setStyleAttr(id,"display",display);
		}
	} else {
		for (var i=0, j=id.length; i<j; i++) {
			var e = get(id[i]);
			if (e != null) {
				setStyleAttr(e.id,"display",display);
			}
		}
	}
}
function hide(id) {
	var display = (arguments.length > 1) ? arguments[1] : "none";
	if (typeof(id) === "string" ) {
		var e = get(id);
		if (e != null) {
			setStyleAttr(id,"display",display);
		}
	} else {
		for (var i=0, j=id.length; i<j; i++) {
			var e = get(id[i]);
			if (e != null) {
				setStyleAttr(e.id,"display",display);
			}
		}
	}
}

function showInline(id) { show(id,"inline"); }
function hideInline(id) { hide(id,"hidden"); }
function displayInline(id) { show(id,"inline"); }
function hideInline(id) { hide(id,"hidden"); }
function toggle(id) {
	if(get(id)!=null)
	{
		switch(getStyleAttr(id,"display"))
		{
			case "block":
				hide(id);
				break;
			case "inline":
				hideInline(id);
				break;
			case "none":
				show(id);
				break;
			case "hidden":
				displayInline(id);
				break;
			default:
				show(id);
				hide(id);
				break;
		}
	}
}
function showDiv(id) { show(id); }
function hideDiv(id) { hide(id); }
function elementHide(id) { document.getElementById(id).style.visibility='hidden'; }
function elementShow(id) { document.getElementById(id).style.visibility='visible'; }

function getContextPath() {
	var URIBegin = window.location.href.lastIndexOf('.delta.com') + 10;
	var URIEnd = (window.location.href.lastIndexOf('?') > URIBegin) ? window.location.href.lastIndexOf('?') : window.location.href.length;
	var URI = window.location.href.substring(URIBegin, URIEnd);
	var pageArray = URI.split("/");
	if(pageArray.length > 1 && pageArray[1] != "index.jsp") {
		return pageArray[1];
	} else {
		return "home";
	}
}

function getPosition(e) {
	e = e || window.event;
	var cursor = {x:0, y:0};
	if (e.pageX || e.pageY) {
		cursor.x = e.pageX;
		cursor.y = e.pageY + 15;
		//Minus 115 to offset size of header in global.jsp file
	} else {
		cursor.x = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
		cursor.y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop + 15;
		//Minus 115 to offset size of header in global.jsp file
	}
	return cursor;
 }
function getElementXAndYPos(element) {
	var curLeft = 0, curTop = 0;
	if(element.offsetParent) {
		while (element.offsetParent) {
			curLeft += element.offsetLeft
			curTop += element.offsetTop
			element = element.offsetParent;
		}
	} else if(element.x) {
		curLeft = element.x;
		curTop = element.y;
	} else {}
	return {x:curLeft, y:curTop};
}

var BrowserLanguageSettings = {
	languageSettings : null, languageCollection : [], languageCollectionCount : 0,
	acceptedLanguageDelimiter : ",", acceptedLanguageQualityIndicator : ";", localeLanguageDelimiter : "-",
	defaults : { browserAccept : "en-us", locale : "us", language : "en" },
	findPreferencesStruct : { browserAccept : 0, language : 1, locale : 2 },
	getLocaleByLanguage : function(languageCode) {
		for (var i=0, j=LanguageOptions.length; i<j; i++) {
			if (LanguageOptions[i].getProp("language_code").toLowerCase() === trimString(languageCode).toLowerCase()) {
				return LanguageOptions[i].getProp("default_country");
			}
		}
		return languageCode;
	},
	parseAcceptedLanguage : function(languagePreference) {
		var splitPreference = languagePreference.split(this.acceptedLanguageQualityIndicator);
		var preferredLanguage = splitPreference.length > 0 ? splitPreference[0] : null;
		if (exists(preferredLanguage)) {
			var preferredLanguageSplit = preferredLanguage.split(this.localeLanguageDelimiter);
			var localeCode = null, languageCode = null;
			switch (preferredLanguageSplit.length) {
				case 2:
					localeCode = preferredLanguageSplit[1];
				case 1:
					languageCode = preferredLanguageSplit[0];
					localeCode = exists(localeCode) ? localeCode : this.getLocaleByLanguage(languageCode);
					break;
			}
			return { browserAccept : languageCode + this.localeLanguageDelimiter + localeCode, language : languageCode, locale : localeCode };
		}
		return null;
	},
	isLanguageSupported : function(languageCode) {
		for (var i=0, j=LanguageOptions.length; i<j; i++) {
			if (trimString(LanguageOptions[i].getProp("language_code")).toLowerCase() === trimString(languageCode).toLowerCase()) {
				return true;
			}
		}
		return false;
	},
	getSupportedPreferenceFromCollection : function() {
		for (var i=0; i<this.languageCollectionCount; i++) {
			var currentPreference = this.parseAcceptedLanguage(this.languageCollection[i]);
			if (exists(currentPreference)) {
				if (this.isLanguageSupported(currentPreference.language)) {
					return currentPreference;
				}
			}
		}
		return this.defaults;
	},
	getPreferenceItem : function(structChoice) {
		switch (structChoice) {
			case this.findPreferencesStruct.browserAccept:
				return this.getSupportedPreferenceFromCollection().browserAccept;
			case this.findPreferencesStruct.language:
				return this.getSupportedPreferenceFromCollection().language;
			case this.findPreferencesStruct.locale:
				return this.getSupportedPreferenceFromCollection().locale;
			default:
				return null;
		}
	},
	init : function(browserAcceptLanguage) {
		this.languageSettings = browserAcceptLanguage;
		this.languageCollection = this.languageSettings.split(this.acceptedLanguageDelimiter);
		this.languageCollectionCount = this.languageCollection.length;
	}
};

/* moved from preferences.js for use with fpe engine */
function getPrefs(){
	var pref=getCookie("pref");
	if ( !exists(pref) && typeof(BrowserLanguageSettings) === "object" && typeof(BrowserLanguageSettings.getPreferenceItem) === "function") { 
		pref = BrowserLanguageSettings.getPreferenceItem(BrowserLanguageSettings.findPreferencesStruct.browserAccept);
	}
	if (!exists(pref)) { 
		pref = getDefault(window.location.toString().match("//[^.]*").toString().split("//")[1]); 
	}
	if (arguments.length==1) { return pref.split("-")[1]; }
	else if(arguments.length==2)
	{
		var rtnString = "lang=" + pref.split("-")[0] + ";";
		rtnString += "loc=" + pref.split("-")[1] + ";";
		return rtnString;
	}
	else { return pref; }
}
function getLang() { return getPrefs().split("-")[0]; }
function getLoc() { return getPrefs().split("-")[1]; }
function showHoverContent(event,w,h,elm,source,scrolling,offX,offY,iFrameId,ignoreXAxis) {
	if(hoverNumber == 0){
		var cursor = getPosition(event);
		var element = get(elm);
		iFrameId = arguments[8] ? iFrameId : "pwm_iframe";	
		//iFrame constructor		
		ifrm = document.createElement("IFRAME");
		ifrm.setAttribute("src", source);
		ifrm.setAttribute("id", iFrameId);
		ifrm.setAttribute("scrolling", scrolling);
		ifrm.style.width = w +"px";
		ifrm.style.height = h +"px";
		element.appendChild(ifrm);
		element.style.display='block';
		element.style.width = w + "px";
		element.style.height = h + "px";
		if((ignoreXAxis != null) && (ignoreXAxis)) {
			element.style.left = offX + "px"; 
		}
		else {
			element.style.left = cursor.x + offX + "px";
		}
		element.style.top = cursor.y + offY + "px";
		hoverNumber = 1;
	} else {
		return;
	}
}
function hideHoverContent(event,elm){
	var element = document.getElementById(elm);
	element.style.display = "none";
	if(element.hasChildNodes()){
		while (element.childNodes.length >= 1){
		element.removeChild(element.firstChild);
		}
	}
	hoverNumber = 0;
	
}
function showDebugMsg(msg) {
	try { console.log(msg); } catch(err) {
		var curHtml = (getInnerHTML("debug") != "" ) ? curHTML + "<hr />" : msg;
		setInnerHTML("debug",curHtml);
		if(getStyleAttr("debug","display") != "block") {
			setStyleAttr("debug","width","200px");
			setStyleAttr("debug","height","250px");
			setStyleAttr("debug","padding","5px");
			setStyleAttr("debug","backgroundColor","#eee");
			setStyleAttr("debug","position","absolute");
			setStyleAttr("debug","top","0");
			setStyleAttr("debug","right","0");
			setStyleAttr("debug","overflow","auto");
			setStyleAttr("debug","display","block");
		}
	}
}

function addScriptTag(src) {
	var replaceStr = "_dyn" + numAddedScripts + "_";
	numAddedScripts++;
	var id = src.replace(/\./,replaceStr);
	//alert(id);
	if(!get(id)) {
		var s= document.createElement('script');
		s.type= 'text/javascript';
		s.onload= helper; /* good browsers */
		s.onreadystatechange= function () { if (this.readyState == 'complete' || this.readyState == 'loaded') { helper(); }} /* ie */
		s.src= src; s.id = id;
		s.setAttribute('src',src); s.setAttribute('id',id);
		document.getElementsByTagName('head')[0].appendChild(s);
	}
	else {
		// script is already added to the page
	}
}
function helper() { return true; }

function strCompare(a,b) { if(a.toLowerCase()==b.toLowerCase()) { return true; }  else { return false;  } }
function stripHTML(str) { return str.replace(/\<.+?\>/g, ""); }
function trimString (str) { str = this != window? this : str; return str.replace(/^\s+/g, '').replace(/\s+$/g, '');}

/* use with EXTREME caution */
function addEvent(elm, evType, fn, useCapture)
{
	if(elm.addEventListener){ elm.addEventListener(evType, fn, useCapture); return true; }
	else if(elm.attachEvent){ var r = elm.attachEvent('on' + evType, fn); return r; }
	else { elm['on' + evType] = fn; }
}
function removeEvent( elm, evType, fn ) {
	if (elm.removeEventListener) {
		elm.removeEventListener( evType, fn, false );
	}
	else if (elm.detachEvent) {
		elm.detachEvent( "on" + evType, fn );
	}
}

function formatTo(base, precision, quantity) {
	var a = roundTo(base, precision);
	//alert(a + "x" + quantity); 
	var b = a * quantity;
	 	b = roundTo(b,2);
	var s = b.toString();
	
	var decimalIndex = s.indexOf(".");
	if(precision > 0 && decimalIndex < 0){
		decimalIndex = s.length;
		s += '.';
	}
	while (decimalIndex + precision + 1 > s.length){
		s += '0';
	}
	return s;
}
function roundTo(base, precision) {
  var m = Math.pow(10, precision);
  var a = Math.round(base * m) / m;
  return a;
}



/* -------------------- functions found online -------------------- */
// copyright Stephen Chapman 24th March 2006, 10th February 2007
// permission to use this function is granted provided
// that this copyright notice is retained intact
//javascript.about.com/library/blnumfmt.htm
function formatNumber(num,dec,thou,pnt,curr1,curr2,n1,n2) { var x = Math.round(num * Math.pow(10,dec));if (x >= 0) n1=n2='';var y = (''+Math.abs(x)).split('');var z = y.length - dec; if (z<0) z--; for(var i = z; i < 0; i++) y.unshift('0');y.splice(z, 0, pnt); while (z > 3) {z-=3; y.splice(z,0,thou);}var r = curr1+n1+y.join('')+n2+curr2;return r;}

function isComplete() {pageLoaded = true; }

addEvent(window,"load",isComplete,false);
var numAddedScripts = 0;
var pageLoaded = false;
var hoverNumber = 0; /* hoverNumber controls number of rollover popups with a limit of 1 */

function conCatTool() {
	var _self = this;
	this.conCatValue = [];
	this.currentIndex = 0;
	this.disableHTMLTranslationStartTag = "\n<!-- mp_trans_disable_start -->\n";
	this.disableHTMLTranslationEndTag = "\n<!-- mp_trans_disable_end -->\n";
	this.conCat = function(value, disableTranslation) {
		disableTranslation = arguments[1] ? disableTranslation : false;
		_self.conCatValue[_self.currentIndex] = (disableTranslation ? _self.disableHTMLTranslationStartTag : "") + value + (disableTranslation ? _self.disableHTMLTranslationEndTag : "");
		_self.currentIndex ++;
	};
	this.toString = function(doClear, joinValue) {
		var returnValue = _self.conCatValue.join( (exists(joinValue) ? joinValue : "\n") );
		if(exists(doClear) && doClear) {
			_self.clear();
		}
		return returnValue;
	};
	this.clear = function() {
		_self.conCatValue.length = 0;
		_self.currentIndex = 0;
	};
}

var mp_util = {
	startMPTag : "\n<!-- ",
	endMPTag : " -->\n",
	equals : "=",
	quote : "\"",
	emptyString : "",
	disableStart : "mp_trans_disable_start",
	disableEnd : "mp_trans_disable_end",
	partialStart : "mp_trans_partial_start",
	partialEnd : "mp_trans_partial_end",
	enableStart : "mp_trans_enable_start",
	enableEnd : "mp_trans_enable_end",
	removeStart : "mp_trans_remove_start",
	removeEnd : "mp_trans_remove_start",
	addStart : "mp_trans_add ",
	nestedDisableStart : "mp_trans_disable_start --]>",
	nestedDisableEnd : "mp_trans_disable_end --]>",
	transJSStartTag : "mp_trans_textjs_start",
	transJSEndTag : "mp_trans_textjs_start",
	navDisableStart : "mp_trans_navdisable_start",
	navDisableEnd : "mp_trans_navdisable_end",
	enableTransURLJSStart : "mp_trans_urljs_enable_start",
	endableTransURLJSEnd : "mp_trans_urljs_enable_end",
	disableTransURLJSStart : "mp_trans_urljs_disbale_start",
	disableTransURLJSEnd : "mp_trans_urljs_disbale_end",
	processDisableStart : "mp_trans_process_disable_start",
	processDisableEnd : "mp_trans_process_disable_end",
	translate : "mp_trans_translate=\"",
	schedule : "mp_trans_schedule=\"",
	addLanguages : function(languages) {
		return exists(languages) ? this.equals + this.quote + languages + this.quote : this.emptyString;
	},
	returnContent : function(content) {
		return exists(content) ? content : this.emptyString;
	},
	returnDisableStartTag : function(languages) {
		return this.startMPTag + this.disableStart + this.addLanguages(languages) + this.endMPTag;
	},
	returnDisableEndTag : function() {
		return this.startMPTag + this.disableEnd + this.endMPTag;
	},
	doDisable : function(content, languages) {
		return this.returnDisableStartTag(languages) + this.returnContent(content) + this.returnDisableEndTag();
	},
	returnStartPartialTag : function(languages) {
		return this.startMPTag + this.partialStart + this.addLanguages(languages) + this.endMPTag;
	},
	returnEndPartialTag : function() {
		return this.startMPTag + this.partialEnd + this.endMPTag;
	},
	doPartial : function(content, languages) {
		return this.returnStartPartialTag(languages) + this.returnContent(content) + this.returnEndPartialTag();
	},
	returnEnableStartTag : function(languages) {
		return this.startMPTag + this.enableStart + this.addLanguages(languages) + this.endMPTag;
	},
	returnEnableEndTag : function() {
		return this.startMPTag + this.enableEnd + this.endMPTag;
	},
	doEnable : function(content, languages) {
		return this.returnEnableStartTag(languages) + this.returnContent(content) + this.returnEnableEndTag();
	},
	returnRemoveStartTag : function(languages) {
		return this.startMPTag + this.removeStart + this.addLanguages(languages) + this.endMPTag;
	},
	returnRemoveEndTag : function() {
		return this.startMPTag + this.removeEnd + this.endMPTag;
	},
	doRemove : function(content, languages) {
		return this.returnRemoveStartTag(languages) + this.returnContent(content) + this.returnRemoveEndTag();
	},
	add : function(content, languages, nestedContent) {
		return this.startMPTag + this.addStart + this.addLanguages(languages) + this.returnContent(content) + this.nestedDisable(nestedContent) + this.endMPTag;
	},
	nestedDisable : function(content) {
		return exists(content) ? this.startMPTag + this.nestedDisableStart + content + this.startMPTag + this.nestedDisableEnd : this.emptyString;
	},
	disableNav : function(content) {
		return this.startMPTag + this.navDisableStart + this.endMPTag + this.returnContent(content) + this.startMPTag + this.navDisableEnd + this.endMPTag;
	},
	enableTransURLJS : function(content) {
		return this.startMPTag + this.enableTransURLJSStart + this.endMPTag + this.returnContent(content) + this.startMPTag + this.endableTransURLJSEnd + this.endMPTag;
	},
	disableTransURLJS : function(content) {
		return this.startMPTag + this.disableTransURLJSStart + this.endMPTag + this.returnContent(content) + this.startMPTag + this.disableTransURLJSEnd + this.endMPTag;
	},
	processDisable : function(content) {
		return this.startMPTag + this.processDisableStart + this.endMPTag + this.returnContent(content) + this.startMPTag + this.processDisableEnd + this.endMPTag;
	},
	translateTag : function(isDoTranslate) {
		return this.startMPTag + this.translate + isDoTranslate + this.quote + this.endMPTag;
	},
	scheduleTag : function(isDoSchedule) {
		return this.startMPTag + this.schedule + isDoSchedule + this.quote + this.endMPTag;
	}
};

var jsObjectArraySortUtil = {
	sortProperty : null,
	doSort : function(one, two) {
		if (exists(jsObjectArraySortUtil.sortProperty)) {
			var valueOne = one[jsObjectArraySortUtil.sortProperty];
			var valueTwo = two[jsObjectArraySortUtil.sortProperty];
			if (exists(valueOne) && exists(valueTwo)) {
				if (typeof(valueOne) === "string" && typeof(valueTwo) === "string") {
					valueOne = valueOne.toLowerCase();
					valueTwo = valueTwo.toLowerCase();
				}
				if (valueOne < valueTwo) {
					return -1;
				} else if (valueOne > valueTwo) {
					return 1; 
				} else {
					return 0;
				} 
			}
		}
		return 0;
	}
}

function collapseTable(elemId){
	if(elemId != null && elemId != ""){
		if(elemId.indexOf('_') > -1){
			elemId = elemId.split('_')[1];
		}
		setClassName(elemId + "_table_control", "display_ctl_closed");
		hide(elemId + "_table_container");		
	} else {
		return;
	}
}
function expandTable(elemId){
	if(elemId != null && elemId != ""){
		if(elemId.indexOf('_') > -1){
			elemId = elemId.split('_')[1];
		}
		setClassName(elemId + "_table_control", "display_ctl_open");
		show(elemId + "_table_container");
	} else {
		return;
	}
}

function isBadBrowser() { 
	return ( !exists(window.opera) && exists(window.ActiveXObject) && exists(document.all) ) ? true : false; 
}

/** end /delta/shared_content/edgecache/js/core/util.js **/

function currentPage() {
	var pageURL = "";
	var pageArray = window.location.toString().split("?");
	var re = new RegExp(/https?:\/\/(([a-zA-z]{2})\.)?delta.com/);
	if(pageArray.length>1)
	{
		if (pageArray[0].match(re)) 
		{
			re = new RegExp(/https?:\/\/((si|pl|qa)\.)?delta.com/);
			if(!pageArray[0].match(re)) { pageArray.shift(); }
		}
	}
	re.compile(/\d+;/);
	pageURL = pageArray[0].toString();
	pageURL = pageURL.replace(re,'');
	re.compile(/https?:\/\/[a-zA-Z]*\.?delta.com/);
	pageURL = pageURL.replace(re,"");
	return pageURL;
}
function addBehaviors() {
	var pageURL = currentPage();
	if(exists(get("menu1Container"))) { setStyleAttr("menu1Container","display","block"); }
	if(exists(get("menu2Container"))) { setStyleAttr("menu2Container","display","block"); }
	if(exists(get("menu3Container"))) { setStyleAttr("menu3Container","display","block"); }
	if(exists(get("menu4Container")))
	{
		if(get("nonjs_Worldwide")!=null&&get("nonjs_Worldwide")!="null") { setStyleAttr("nonjs_Worldwide","display","none"); }
		if(get("lang_loc")!=null&&get("lang_loc")!="null") { setStyleAttr("lang_loc","display","inline"); }
		setStyleAttr("menu4Container","display","block");
	}
//	switch(pageURL)
//	{
//		case ("/home/index.jsp"||"/home/index.jsp#"||"/home/"||"/home/#"):
	//		setStyleAttr('hpApplications','display','block');
//			break;
//		default:
//			break;
//	}
}

// function: left nav rollover
function navRoll(item) {
	// if the nav item is not defaulted to the rollover state then change the nav item class
	if(item.parentNode.className != 'navHot')
	{
		// if the nav item is in the hover state change it to the default state
		if(item.parentNode.className == 'navHover') { item.parentNode.className = ''; }
		// if the navitem is not in the hover state change it to the hover state
		else { item.parentNode.className = 'navHover'; }
	}
}

function gotoAnchorLink(index) {
	if(index != null && index != "")
	{
		var locationString = document.location.href;
		var locationArray = locationString.toString().split('#');
		document.location.href = locationArray[0] + "#" + index;
	}
}

//jump to tab URL when user clicks on tab
function goURL(theUrl) { document.location.href = theUrl; }


function initScreenOverlay() { 
    var msgbox = document.getElementById('popupDiv');
    if (msgbox == null
          || msgbox.style.display == 'none') {
       return;
    }

    var footerdiv = document.getElementById('Footer');
    var bottomOffset = document.body.clientWidth;
    if (footerdiv != null) {
       bottomOffset =  footerdiv.offsetTop;
    }
    bottomOffset = eval(bottomOffset - 80);
    if (msgbox.style.display != 'none') {
        var offsetht = msgbox.offsetHeight;
        var offsetwd = msgbox.offsetWidth;

        var toppos =  Math.round(((document.body.clientHeight - offsetht) / 2.5) + document.body.scrollTop);
        var leftpos =  Math.round((document.body.clientWidth - offsetwd) / 4);

        var totalht = toppos +  offsetht;
        if (totalht > bottomOffset ) {
           toppos = eval(toppos - (totalht - bottomOffset));
        }
        if (toppos < 188) {
           toppos = 188;
        }
        msgbox.style.top = toppos + "px";

        var totalwd = leftpos +  offsetwd;
        if (totalwd > 750) {
           leftpos = eval(leftpos -(totalwd - 750));
        }
        if (leftpos < 0) {
           leftpos = 0;
        }
        msgbox.style.left  = leftpos + "px" ;
    }
} 
 

function resetPopupFrame() { 
    var msgbox = document.getElementById('popupFrame');
    if (msgbox != null) {
       document.getElementById('popupFrame').src = '/shared/components/blank.jsp';
    }

}

function openHelp(url,e) {
 w = 474;
 h = 408;
 openWin(url, e, w, h, "yes");
}

function openHelp2(url,e,v) {

   w = 474;
   h = v;
   openWin(url, e, w, h, "yes");
}


var cWin;
function openNewWin(url,name,w,h,scroll,chrome) {
	if(!arguments[5])  {
		chrome = 'no';
	}
	var att = 'width='+ w +',height='+ h +',left=50,top=50,scrollbars='+ scroll +',resizable=yes,toolbar=' + chrome + ',location=' + chrome + ',status=' + chrome + ',menubar=' + chrome;
	cWin = window.open(url,name,att);
	self.name="Main";
}

function openWin(url,name,wd,ht,scroll) {
	openNewWin(url, "deltaPopup", wd, ht, scroll);
	//DeltaOverlayUtil.showPopupOverlay(url, name, wd, ht, scroll);
}


function closeWin() {
   if (window.opener) { 
	   self.close();
   } else if (window.parent != window) {
      DeltaOverlayUtil.hideOverlay();
    } else if(cWin != null) { 
         cWin.close(); 
         cWin = null; 
   }
}

function closeNewWin() {
      self.close();
}

function hidePopupHeader() {
    var divArea = document.getElementById('popHeader');
    if (divArea != null) {
        divArea.style.display = 'none';
    }
}

function hidePopupFrameHeader() {
   try {
      var popupframe = document.getElementById('popupFrame');   
      if (popupframe && popupframe.contentWindow) {
            popupframe.contentWindow.hidePopupHeader();
      }
   } catch (e) {}
}

function closePopupDiv() {
    var divArea = document.getElementById('popupDiv');
    if (divArea != null) {
        divArea.style.display = 'none';
    }
   resetPopupFrame();
}


function closeMe() {
	try { 
	if (window.opener) { 
		self.close();
   }
		
	if(cWin != null){ cWin.close(); cWin = null; } }
	catch(e) {}
	try { if(childwin != null){ childwin.close(); childwin = null; } }
	catch(e) {}
}

// this will open a context-sensitive help window
function openNewHelpWin(url,e)
{
	w = screen.width-470;
	h = screen.height-370;
	x = e.screenX;
	y = e.screenY;
	if(x > w) { x = x-470; }
	if(y > h) { y = y-370; }
	childwin=window.open(url, "childwin", "width=470,height=370,top="+y+",left="+x+",scrollbars=yes,resizable=yes");
}
// this will open a pop-up help window
function openNewHelp2win(url,e,v)
{
	w = screen.width-470;
	h = screen.height-v;
	x = e.screenX;
	y = e.screenY;
	if(x > w) { x = x-470; }
	if(y > h) { y = y-v; }
	childwin=window.open(url, "childwin", "width=470,height="+v+",top="+y+",left="+x+",scrollbars=yes,resizable=yes");
}

function openDesc(title,desc,e)
{
	w = screen.width-470;
	h = screen.height-150;
	x = e.screenX;
	y = e.screenY;
	if(x >  w) { x = x-470; }
	if(y >  h) { y = y-150; }
	var dWin = window.open('','movieDesc', 'width=470,height=150,top='+y+',left='+x+',scrollbars=yes,resizable=yes');
	var head = '<html><head><title>Movies</title><link rel="stylesheet" type="text/css" href="/components/css/global.css" />\n<link rel="stylesheet" type="text/css" href="/components/css/forms.css" />\n<script type="text/javascript" src="/components/js/global.js"></script>'
	+'<script language="JavaScript">\nwindow.onLoad = window.focus();\n</script></head>';
	var banner = '<div id="popHeader">'
	+'<table cellspacing="0" cellpadding="0" border="0">'
	+'<tr>'
	+'<td class="left"><img src="http://delta.m7z.net/delta/delta/backgrounds/headers/popup_header_left.jpg" alt="Delta" title="Delta" /></td>'
	+'<td class="right"><a href="javascript:self.close();"><nobr>Close Window</nobr></a></td>'
	+'</tr>'
	+'</table>'
	+'</div>';
	dWin.document.open();
	dWin.document.write('');
	dWin.document.write(head+'<body>\n'+banner+'<div class="popContainer">\n<p><b>'+title+'</b><br>\n'+desc+'</p></div></body></html>');
	dWin.document.close();
}

function logAction(string)
{
	var trackingPixelSrc = "http://www.delta.com/tracking/htmltag.gif?Log=1";
	if(document.getElementById("trackingPixel")!=null) { document.getElementById("trackingPixel").src = trackingPixelSrc+string.replace("amp;","")+"&rand="+Math.round(Math.random()*100000000); }
}
function setActiveTab(triggerID,type)
{
	var tabsID = type+"Tabs";
	var tabContentClass = type+"TabsContent";
	var activeTab = triggerID.split("_")[0];
	var tabs = get(tabsID);
	var tabCollection = tabs.getElementsByTagName('li');
	var tempCollection = document.getElementsByTagName('div');
	var tabContentCollection = new Array();
	for(var i=0;i<tempCollection.length;i++) { if(tempCollection[i].className.toString().split(" ")[0]==tabContentClass){tabContentCollection.push(tempCollection[i]);}}
	for(var i=0;i<tabCollection.length;i++)
	{
		setClassName(tabCollection[i].id,"");
		if(tabCollection[i].id==triggerID) { setClassName(tabCollection[i].id,"active"); }
		setClassName(tabContentCollection[i].id,tabContentCollection[i].className.toString().split(" ")[0]+" inactive");
		if(tabCollection[i].id==triggerID) { setClassName(tabContentCollection[i].id,tabContentCollection[i].className.toString().split(" ")[0]+" active"); }
	}
	if(document.getElementById(triggerID.split("_")[0]+"_tracking")!=null) { logAction(document.getElementById(triggerID.split("_")[0]+"_tracking").innerHTML); }
	if((document.getElementById(triggerID.split("_")[0]+"_additional")!=null)&&(document.getElementById("additional")!=null)) { document.getElementById("additional").innerHTML = document.getElementById(triggerID.split("_")[0]+"_additional").innerHTML; }
	else if(document.getElementById("additional")!=null) { document.getElementById("additional").innerHTML = ""; }
	else { /*doNothing()*/ }
}
function openPhotoViewer(title,path,imageRoot,numItem,numTotal)
{
	var winPath = "/components/popups/photo_viewer.jsp";
	var query = "?title="+title.replace(" ","_")+"&path="+path+"&imageRoot="+imageRoot+"&numItem="+numItem+"&numTotal="+numTotal;
	openWin(winPath+query,"PhotoViewer",450,450,'no');
}
function openClose(id1,id2)
{
	if (document.getElementById(id1).style.display=="none") { setClassName(id2,"active"); show(id1); }
	else { setClassName(id2,"inactive"); hide(id1); }
}





// this opens window with customizable dimensions, chrome (controls), scroll bar and spawn location; used when content is whole page, not pop-up content
function openWinfull( url, name, width, height, xpos, ypos, chrome, scroll ) {
	var x, y, w, h, moveX=0, moveY=0, features="";
	chrome = chrome ? "yes" : "no";
	scroll = scroll ? "yes" : "no";
	features += "toolbar="+chrome+",location="+chrome+",status="+chrome+",menubar="+chrome;
	features += ",scrollbars="+scroll+",resizable="+scroll;
	if(width) features += ",width="+width;
	if(height) features += ",height="+height;
	if(xpos && window.screen) {
		w = window.screen.availWidth;
		width = parseInt(width);
		switch(xpos){
			case "left": x = 0; break;
			case "center": x = (w-width)/2; break;
			case "right": x = w-width; break;
			default: x = xpos;
		}
		features += ",screenX="+x+",left="+x;
		var moveX = x;
	}
	if(ypos && window.screen){
		h = window.screen.availHeight;
		height = parseInt(height);
		switch(ypos){
			case "top": y = 0; break;
			case "middle": y = (h-height)/2; break;
			case "bottom": y = h-height; break;
			default: y = ypos;
		}
		features += ",screenY="+y+",top="+y;
		var moveY = y;
	}
	var openWinReference = window.open(url,name,features);
	if(moveX || moveY){
		// position the window for browsers that don't recognize screenX, screenY
		openWinReference.moveTo(moveX,moveY);
	}
}
openFull = function(url,name){ openWinfull(url,name,"640","480","center","middle",false,"scroll"); }
openAll = function(url,name,width,height){ openWinfull(url,name,"640","480","center","middle","chrome","scroll"); }




var cWin = null;
var childwin = null;
var home_containers = new Array("primary_messaging","secondary_messaging","group_one","group_two_top","group_two_bottom");
var left_pos = 378;
var url_lang = window.location.toString().split(".")[0].split("//")[1];


function formatURL(url){
	var formattedURL = unescape(url);
	window.location = formattedURL;
}


function getDomainFromURL(url){
	var domain = null;
	if (url.length > 10 
		&& (url.substring(0,4) == 'http'))  {
		domain = url.substring(0, url.indexOf('/', 7));
}
return domain;
}
// Javascript Code for TeaLeaf Technology, Inc.
// Round Trip calculation function

function tltRoundTrip() {
//	var pos;
//	var GIF = "tlt_rt.gif";
//	var QueryString = "?TeaLeafRoundTrip=Yes&";
//	var PageTime = 0;
//	var d = new Date()
//	if (d.getTimezoneOffset) { QueryString += "TZ=" + -(d.getTimezoneOffset()/60) + "&"; }
//	PageTime = Math.round((new Date())/1000);
//	pos = document.cookie.indexOf("TLTSID=");
//	if (pos != -1) { QueryString += document.cookie.substring(pos,document.cookie.indexOf(";",pos)) + "&"; }
//	pos = document.cookie.indexOf("TLTUID=");
//	if (pos != -1) { QueryString += document.cookie.substring(pos,document.cookie.indexOf(";",pos)); }
//	QueryString += "&PageTime=" + PageTime
//	document.write("<img src=\"\/\/images.delta.com/delta/thirdparty/" + GIF + QueryString + "\" height=\"1\" width=\"1\" border=\"0\">");
//	return;
}
function SelectRadioButton(id){
	var tagRef = get(id);
	var radioList  = document[tagRef.form.name][tagRef.name];
	if(parseInt(radioList.length).toString() === 'NaN') {
		tagRef.checked = true;
	} else {
		for(var i = 0, j = radioList.length; i<j; i++) {
			radioList[i].checked = (radioList[i].value === tagRef.value);
		}
	}
}

function urlEncode(stringToEncode) {
	stringToEncode = stringToEncode.toString();  
	var encodedString = escape(stringToEncode);
	encodedString = encodedString.replace(/\+/g, "%2B").replace(/\//g, "%2F"); 
	return encodedString;
}

function doNWAInterstitial() {
	var qs = [];
	for(var i=0, j=arguments.length; i<j; i++) {
		var qsDefinition = arguments[i];
		if(typeof(qsDefinition) === 'object' && exists(qsDefinition.qsProp) && exists(qsDefinition.value) ) {
			qs[qs.length] = qsDefinition.qsProp + '=' + urlEncode(qsDefinition.value);
		}
	}
	openNewWin('/shared/components/interstitial/nwa/index.jsp' + (qs.length !== 0 ? '?' + qs.join('&') : ''), 'nwaWait', 750, 600, 'yes', 'yes');
	cWin.focus();
}
var dashboardUtil = {
	skyMilesInputId : null,
	pinInputId : null,
	lnameInputId : null,
	skyMilesRadioId : null,
	skyMilesInputRef : null,
	pinInputRef : null,
	lnameInputRef : null,
	skyMilesProgram : null,
	isSkyMilesLogin : true,
	skymilesLoginAction : null,
	deltaContainerId : null,
	loginFormId : null,
	skyMilesFormTarget : null,
	inErrorState : false,
	webapp : null,
	dashboardContainerId : "dashboard",
	offsetContainerId : "genLoginSpacer",
	minimumOffset : 30,
	unitOfMeasure : "px",
	isBadBrowser : isBadBrowser(),
	currentAction : null,
	zeroClientHeightOffsetHeight : 120,
	skymilesIEResetOpenHeight : 120,
	skymilesIEMinimumOffsetHeight : 30,
	status : null,
	isLoggedIn : false,
	openStatus : "open",
	closedStatus : "closed",
	smErr : false,
	pinErr : false,
	lnameErr : false,
	offset : function() {
		var dashboardElement = get(this.dashboardContainerId);
		var offsetElement = get(this.offsetContainerId);
		var computedHeight;
		if( exists(dashboardElement) && exists(offsetElement) ) {
			show(this.dashboardContainerId);
			show(this.offsetContainerId);
			var offsetCords = getElementXAndYPos(offsetElement);
			var dashboardCords = getElementXAndYPos(dashboardElement);
			if(dashboardCords.y <= 0) { dashboardCords.x = 10; dashboardCords.y = 70;}
			if( (dashboardCords.y + dashboardElement.clientHeight) <= offsetCords.y ) {
				if( dashboardElement.clientHeight == 0 ) { 
					/* houston we have a problem in ie6 */
					if(this.isBadBrowser) {
					   this.zeroClientHeightOffsetHeight = this.skymilesIEResetOpenHeight;
					   this.minimumOffset = this.skymilesIEMinimumOffsetHeight;
					}
					if(this.currentAction == "expand") {
						offsetElement.style.height = this.zeroClientHeightOffsetHeight + this.unitOfMeasure;
					} else if (this.currentAction == "collapse") {
						offsetElement.style.height = this.minimumOffset + this.unitOfMeasure;
					} else {
						offsetElement.style.height = this.zeroClientHeightOffsetHeight + this.unitOfMeasure;
					}
				} else {
					offsetElement.style.height = this.minimumOffset + this.unitOfMeasure;
				}
			} else {
				if( getContextPath() == "home" || getContextPath() == "" || getContextPath() == "schedules") {
					computedHeight = ((dashboardCords.y + dashboardElement.clientHeight) - offsetCords.y) + this.unitOfMeasure;
				} else {
					computedHeight = ((dashboardCords.y + dashboardElement.clientHeight) - offsetCords.y + this.minimumOffset) + this.unitOfMeasure;
				}
				offsetElement.style.height = computedHeight;
			}
			show(this.dashboardContainerId);
		}
		try { show(this.dashboardContainerId); } catch(error) { /*for the new netscape 4: ie6 */ }
	},
	expand : function() {
		this.currentAction = "expand";
		try { show("skymilesInfo"); } catch(e) {}
		try { show("loyaltyAccount"); } catch(e) {}
		show("dashboard_close");
		hide("dashboard_open");
		this.offset();
	},
	collapse : function() {
		this.currentAction = "collapse";
		try { hide("skymilesInfo"); } catch(e) {}
		try { hide("loyaltyAccount"); } catch(e) {}
		hide("dashboard_close");
		show("dashboard_open");
		this.offset();
	},
	handleErrorState : function() {
		this.clearErrors();
		
		if(!dashboardUtil.isValidSkyMilesNumber(dashboardUtil.skyMilesInputRef.value)) {
			if (this.smErr == true){
				if (get("skyMilesNumber").value != "") {
					show("shortSkyMiles");
					this.markError("skyMilesNumber");
					this.markError("skyMilesNumber_label");
				} else {
					show("noSkyMiles");
					this.markError("skyMilesNumber");
					this.markError("skyMilesNumber_label");
				}
			}
		}
		if(!dashboardUtil.isValidPin(dashboardUtil.pinInputRef.value)){
			if (this.pinErr == true) {
				if(get("pin").value != "") {
					show("shortPin");
					this.markError("pin");
					this.markError("pin_label");
				} else {
					show("noPin");
					this.markError("pin");
					this.markError("pin_label");
				}
			} 
		}
		if(!dashboardUtil.isValidLname(dashboardUtil.lnameInputRef.value)){
			if(this.lnameErr == true) {
				if (get("lastName").value != "") {
					show("formatLname");
					this.markError("lastName");
					this.markError("lastName_label");				
				} else {
					show("noLname");
					this.markError("lastName");
					this.markError("lastName_label");
				}
			}
		}
		if (this.smErr || this.pinErr || this.lnameErr) {
			return false;
		}
		return true;
	},
	markError : function(id) {
		get(id).setAttribute("class","error");
	},
	removeError : function(id) {
		get(id).setAttribute("class","");
	},
	clearErrors : function() {
		this.removeError("skyMilesNumber");
		this.removeError("skyMilesNumber_label");
		this.removeError("pin");
		this.removeError("pin_label");
		this.removeError("lastName");
		this.removeError("lastName_label");
		hide("noSkyMiles");
		hide("shortSkyMiles");
		hide("noPin");
		hide("shortPin");
		hide("noLname");
		hide("formatLname");
	},
	postLoginData : function() {
		try {
			if( (dashboardUtil.isSkyMilesLogin && !dashboardUtil.isValidSkyMilesNumber(dashboardUtil.skyMilesInputRef.value)) || 
				(dashboardUtil.isPin && !dashboardUtil.isValidPin(dashboardUtil.pinInputRef.value)) ||
				(dashboardUtil.isLname && !dashboardUtil.isValidLname(dashboardUtil.lnameInputRef.value))
			 ) {
				dashboardUtil.inErrorState = true;
				if (dashboardUtil.handleErrorState()) {
					return true;
				}
				return false;
			} else {
				dashboardUtil.inErrorState = true;
				dashboardUtil.handleErrorState();
				var formRef = get(dashboardUtil.loginFormId);
			}
			return true;
		} catch(e) {
			//alert(e);
			return false;
		}
	},
	isValidSkyMilesNumber : function(smNum) {
		var tmpValue = smNum.replace(/\s+/g,'');

		if(tmpValue.length != 11) {
			if (/^\d{9,12}/.test(tmpValue)) {
				this.skyMilesInputRef.value = tmpValue;
				this.smErr = false;
			} else { 
				this.smErr = true;
			}
		} else {
			this.smErr = true;
		}
//		return /^\d{10}/.test(value);
	},
	isValidPin: function(value){
		if (/^\d{4}/.test(value)) {
			this.pinErr = false;
		} else {
			this.pinErr = true;
		}
	},
	isValidLname: function(value){
		if (/^([a-zA-Z][a-zA-Z\&\-\'\s]*|)$/i.test(value) && value!='' && value.length > 1) {
			this.lnameErr = false;
		} else {
			this.lnameErr = true;
		}
	},
	resetOffsets : function() {
		try {
			if (DeltaOverlayUtil.isIe()) {
				var contextPath = getContextPath();
				switch(contextPath.toLowerCase()) {
					case "skymiles":
						if (this.status.toLowerCase() === this.openStatus.toLowerCase()) {
							this.zeroClientHeightOffsetHeight = this.skymilesIEResetOpenHeight;
							this.minimumOffset = this.skymilesIEMinimumOffsetHeight;
						}
						break;
				}
			}
		} catch(e) {}
	},
	init : function(Definition) {
		dashboardUtil.skyMilesInputRef = get(Definition.skyMilesInputId);
		dashboardUtil.pinInputRef =  get(Definition.pinInputId);
		dashboardUtil.lnameInputRef =  get(Definition.lnameInputId);
		dashboardUtil.skyMilesProgram = Definition.skyMilesProgram;
		dashboardUtil.deltaContainerId = Definition.deltaContainerId;
		dashboardUtil.isSkyMilesLogin = Definition.isSkyMilesLogin;
		dashboardUtil.skyMilesRadioId = Definition.skyMilesRadioId;
		dashboardUtil.skymilesLoginAction = Definition.skymilesLoginAction;
		dashboardUtil.loginFormId = Definition.loginFormId;
		dashboardUtil.skyMilesFormTarget = Definition.skyMilesFormTarget;
		dashboardUtil.status = exists(Definition.status) ? Definition.status : "";
		dashboardUtil.isLoggedIn = Definition.isLoggedIn;
		dashboardUtil.resetOffsets();
	}
};
function expandingLogin() {
	this.openMargin = "89px";
	this.closedMargin = "11px";
	this.open = null;//expandingLogin_open;
	this.close = null;//expandingLogin_close;
}
var DeltaOverlayUtil = {
	followPopupClass : "screenPopup_follow",
	followIframClass : "popupFrame_follow",
	noFollowPopupClass : "screenPopup_noFollow",
	noFollowIframClass : "popupFrame_noFollow",
	popupId : "popupDiv",
	iFrameId : "popupFrame",
	iFrameName : "popupFrame",
	overlayBgId : "modalOverlayBgDiv",
	pathToBlank : "java" + "script:'<html></html>';",
	idMapping : { headerContent : "defaultPopHeaderTitle", headerClose : "defaultPopheaderClose"},
	isIe : function() { return ( !exists(window.opera) && exists(window.ActiveXObject) && exists(document.all) ) ? true : false;},
	isBadBrowser : isBadBrowser(),
	isUsingOverlay : false,
	setIframeSrc : function(src) {
		var windowRef = window.parent != window ? window.parent : window;
		windowRef.get(DeltaOverlayUtil.iFrameId).src = src;
	},
	setClassNames : function(modalDiv, popupHeight, popupWidth, pageHeight, pageWidth) {
//		if(DeltaOverlayUtil.isIe() || (popupHeight > pageHeight) || (popupWidth > pageWidth)) {
			setClassName(modalDiv.id, DeltaOverlayUtil.noFollowPopupClass);
//			setClassName(DeltaOverlayUtil.iFrameId, DeltaOverlayUtil.noFollowIframClass);
//		} else {
//			modalDiv.className = DeltaOverlayUtil.followPopupClass;
//			setClassName(modalDiv.id, DeltaOverlayUtil.followPopupClass);
//			setClassName(DeltaOverlayUtil.iFrameId, DeltaOverlayUtil.followIframClass);
//		}
	},
	showPopupOverlay : function(url, name, width, height, scroll, Overrides) {
		try {
			var modalDiv = get(DeltaOverlayUtil.popupId);
			var overlayBgDiv = get(DeltaOverlayUtil.overlayBgId);
			var overlayIframe = get(DeltaOverlayUtil.iFrameId);
			if( exists(modalDiv) && exists(overlayBgDiv) && exists(overlayIframe) ) {
				if (arguments[5] && typeof(arguments[5] === "object")) {
					if (exists(Overrides.headerReplaceContent)) {
						setInnerHTML(this.idMapping.headerContent, Overrides.headerReplaceContent);
					}
					if (exists(Overrides.linkCloseContent)) {
						setInnerHTML(this.idMapping.headerClose, Overrides.linkCloseContent);
					}
					if (typeof(Overrides.linkCloseAction) === "function") {
						this.hideOverlay = Overrides.linkCloseAction;
					}
				}
				var pageSize = DeltaOverlayUtil.getPageSize();
				overlayBgDiv.style.height = pageSize.pageHeight + 'px';
				overlayBgDiv.style.width = pageSize.pageWidth + 'px';
				var modalDivStyle = modalDiv.style;
				modalDivStyle.height = height + 50 + 'px';
				modalDivStyle.width = width + 'px';
				DeltaOverlayUtil.centerElement(pageSize, modalDiv, height, width);
				var iFramStyle = overlayIframe.style;
				overlayIframe.width = (width - 10) + 'px';
				overlayIframe.height = height + 'px';
				DeltaOverlayUtil.setIframeSrc(url);
				DeltaOverlayUtil.setClassNames(modalDiv, height, width, pageSize.pageHeight, pageSize.pageWidth);
				show(DeltaOverlayUtil.popupId);
				show(DeltaOverlayUtil.overlayBgId);
				show(DeltaOverlayUtil.iFrameId);
				DeltaOverlayUtil.isUsingOverlay = true;
			} else {
				openNewWin(url, name, width, height, scroll);
				DeltaOverlayUtil.isUsingOverlay = false;
			}
		} catch(generalError) {
			openNewWin(url, name, width, height, scroll);
			DeltaOverlayUtil.isUsingOverlay = false;
		}
	},
	hideOverlay : function(id) {
		try {
			var windowRef = window.parent != window ? window.parent : window;
			windowRef.hide(DeltaOverlayUtil.popupId);
			windowRef.hide(DeltaOverlayUtil.overlayBgId);
			windowRef.hide(DeltaOverlayUtil.iFrameId);
			DeltaOverlayUtil.setIframeSrc(DeltaOverlayUtil.pathToBlank);
		} catch(noOverlayError) {
			try {
				cWin.close(); 
				cWin = null;
			} catch(noWindowError) {}
		}
	},
	getPageSize : function() {
		var pageSize = { xScroll: 0, yScroll : 0, pageWidth : 0, pageHeight : 0, windowWidth : 0, windowHeight: 0 };
		var docBody = document.body;
		var docElem = document.documentElement;
		if (window.innerHeight && window.scrollMaxY) {	
			pageSize.xScroll = docBody.scrollWidth;
			pageSize.yScroll = window.innerHeight + window.scrollMaxY;
		} else if (docBody.scrollHeight > docBody.offsetHeight){
			pageSize.xScroll = docBody.scrollWidth;
			pageSize.yScroll = docBody.scrollHeight;
		} else {
			pageSize.xScroll = docBody.offsetWidth;
			pageSize.yScroll = docBody.offsetHeight;
		}
		if (self.innerHeight) {
			pageSize.windowWidth = self.innerWidth;
			pageSize.windowHeight = self.innerHeight;
		} else if (docElem && docElem.clientHeight) {
			pageSize.windowWidth = docElem.clientWidth;
			pageSize.windowHeight = docElem.clientHeight;
		} else if (docBody) {
			pageSize.windowWidth = docBody.clientWidth;
			pageSize.windowHeight = docBody.clientHeight;
		}
		pageSize.pageHeight = pageSize.yScroll < pageSize.windowHeight ? pageSize.windowHeight : pageSize.yScroll;
		pageSize.pageWidth = pageSize.xScroll < pageSize.windowWidth ? pageSize.windowWidth : pageSize.xScroll;
		if (self.pageYOffset) {
			pageSize.yScroll = self.pageYOffset;
		} else if (docElem && docElem.scrollTop){
			pageSize.yScroll = docElem.scrollTop;
		} else if (docBody) {
			pageSize.yScroll = docBody.scrollTop;
		}
		if (self.pageXOffset) {
			pageSize.xScroll = self.pageXOffset;
		} else if (docElem && docElem.scrollLeft){
			pageSize.xScroll = docElem.scrollLeft;
		} else if (docBody) {
			pageSize.xScroll	= docBody.scrollLeft;
		}
		return pageSize;
	},
	centerElement : function(pageSize, objToCenter, height, width) {
		if(typeof pageSize != "object") {
			pageSize = DeltaOverlayUtil.getPageSize();
		}
		var objStyle = objToCenter.style;
		var prevVisible = objStyle.visibility;
		var preDisplay = objStyle.display;	
		objStyle.display = "none";
		objStyle.visibility = "hidden";
		objStyle.display = "block";
		var objTop = pageSize.yScroll + (( pageSize.windowHeight - 35 - objToCenter.offsetHeight) / 2);
		var objLeft = (pageSize.windowWidth - objToCenter.offsetWidth) / 2;
		objStyle.top = (objTop < 0) ? "0px" : objTop + "px";
		objStyle.left = (objLeft < 0) ? "0px" : objLeft + "px";
		objStyle.display = preDisplay;
		objStyle.visibility = "visible";
	}
};

function iFrameUtility() {
	this.name = null;
	this.id = null;
	this.tagReference = null;
	this.documentBody = null;
	this.tagReferenceForForms = null;
	this.tagReferenceForJS = null;
	this.useContentDocument = null;
	this.timeoutId = null;
	this.isInitialized = false;
	this.isParentToChild = true;
	this.parentReference = window;
	this.iframePadding = 20;
	this.childObjectToSet = null;
}
iFrameUtility.prototype.init = function(Definition) {
	this.name = Definition.name;
	this.id = Definition.id;
	this.isParentToChild = Definition.isParentToChild;
	this.parentReference = window.opener != null ? window.opener : window.parent != null ? window.parent :  window.top != null ? window.top : window;
	this.setTagReferences(Definition.id);
	this.childObjectToSet = Definition.childObjectToSet;
	this.timeoutId = Definition.timeoutId;
};
iFrameUtility.prototype.setTagReferences = function(Reference) {
	if (Reference !== this.tagReference) {
		if (this.isParentToChild) {
			this.tagReference = typeof(Reference) === "object" ? Reference : get(Reference);
		} else {
			this.tagReference = typeof(Reference) === "object" ? Reference : this.parentReference.get(Reference);
		}
	}
	if (exists(this.tagReference)) {
		try {
			this.useContentDocument = exists(this.tagReference.contentDocument);
			this.documentBody = !this.useContentDocument ? this.tagReference.Document.body : this.tagReference.contentDocument.body;
			this.tagReferenceForForms = !this.useContentDocument ? window.frames[this.tagReference.name] : this.tagReference.contentDocument;
			this.tagReferenceForJS = window.frames[this.tagReference.name];
			this.isInitialized = true;
		} catch(accessDeniedError) { /* YOU ARE TRYING TO GO HTTP PARENT TO HTTPS IFRAME, NOT ALLOWED */}
	}
};
iFrameUtility.prototype.clearTimeoutEvent = function() {
	if (exists(this.timeoutId)) {
		window.clearTimeout(this.timeoutId);
		this.timeoutId = null;
	}
};
iFrameUtility.prototype.setSrc = function(src) {
	if (this.isInitialized) {
		this.tagReference.src = src;
	}
};
iFrameUtility.prototype.setWidth = function(width) {
	if (this.isInitialized) {
		this.tagReference.width = width;
	}
};
iFrameUtility.prototype.setHeight = function(height) {
	if (this.isInitialized) {
		this.tagReference.height = height;
	}
};
iFrameUtility.prototype.resize = function(width, height) {
	this.setWidth(height);
	this.setHeight(height);
};
iFrameUtility.prototype.getFullHeight = function() {
	if (this.isInitialized) {
		if (this.isParentToChild) {
			return this.iframePadding + (!this.useContentDocument ? this.documentBody.scrollHeight : this.documentBody.offsetHeight);
		} else {
			return DeltaOverlayUtil.getPageSize().pageHeight;
		}
	}
};
iFrameUtility.prototype.fullySize = function(heightOffset) {
	if (this.isInitialized) {
		this.setWidth("100%");
		this.setHeight(this.getFullHeight() + (arguments[0] ? arguments[0]  : 0));
		this.clearTimeoutEvent();
	}
};
iFrameUtility.prototype.fullySizeByReference = function(iFrameReference, heightOffset) {
	this.setTagReferences(iFrameReference);
	this.fullySize(heightOffset);
	this.clearTimeoutEvent();
	if (exists(this.childObjectToSet)) { this.setJavascriptValue(this.childObjectToSet, this); }
};
iFrameUtility.prototype.runJavascriptFunction = function(functionName, parameters) {
	if (this.isInitialized) {
		if (this.isParentToChild) {
			eval('window.frames["' + this.tagReference.name + '"].' + functionName + '(' + parameters + ');');
		} else {
			eval('this.parentReference.' + functionName + '(' + parameters + ');');
		}
	}
};
iFrameUtility.prototype.setJavascriptValue = function(variableName, value) {
	if (this.isInitialized) {
		if (this.isParentToChild) {
			this.tagReferenceForJS[variableName] = value;
		} else {
			this.parentReference[variableName] = value;
		}
	}
};
iFrameUtility.prototype.getJavascriptValue = function(variableName) {
	if (this.isInitialized) {
		if (this.isParentToChild) {
			return this.tagReferenceForJS[variableName];
		} else {
			return this.parentReference[variableName];
		}
	}
	return null;
};
iFrameUtility.prototype.getFormReference = function(formId, formName) {
	if (this.isParentToChild) {
		return !this.useContentDocument ? this.tagReferenceForForms[formName] : this.tagReferenceForForms.getElementById(formId);
	} else {
		return this.parentReference.document.getElementById(formId);
	}
};
iFrameUtility.prototype.getFieldReference = function(formId, formName, fieldName) {
	var formReference = this.getFormReference(formId, formName);
	if (exists(formReference)) {
		return formReference[fieldName];
	}
	return null;
};
iFrameUtility.prototype.setFormValue = function(formId, formName, fieldName, value) {
	if (this.isInitialized) {
		var fieldReference = this.getFieldReference(formId, formName, fieldName);
		if (exists(fieldReference) && fieldReference.length > 0) {
			var fieldType = fieldReference[0].type;
			switch(fieldType) {
				case "text":
				case "textarea":
				case "hidden":
					fieldReference[0].value = value;
					break;
				case "checkbox":
					fieldReference[0].checked = true;
					break;
				case "select-one": 
					for (var i=0, j=fieldReference.length; i<j; i++) {
						if (fieldReference[i].value == value) { fieldReference.selectedIndex = i; } 
					}
					break;
				case "radio":
					for (var i=0, j=fieldReference.length; i<j; i++) {
						if (fieldReference[i].value == value) { fieldReference[i].checked = true; } 
					}
					break;
			}
		}
	}
};
iFrameUtility.prototype.getFormValue = function(formId, formName, fieldName) {
	if (this.isInitialized) {
		var fieldReference = this.getFieldReference(formId, formName, fieldName);
		if (exists(fieldReference) && fieldReference.length > 0) {
			var fieldType = fieldReference[0].type;
			switch(fieldType) {
				case "text":
				case "textarea":
				case "hidden":
					return fieldReference[0].value;
				case "checkbox":
					return fieldReference[0].checked ? fieldReference.value : null;
				case "select-one": 
					return fieldReference[0].options[fieldReference[0].selectedIndex].value;
				case "radio":
					for (var i=0, j=fieldReference.length; i<j; i++) {
						if (fieldReference[i].checked) { return fieldReference[i].value; } 
					}
					return null;
			}
		}
	}
	return null;
};
iFrameUtility.prototype.submitForm = function(formName, formId) {
	if (this.isInitialized) {
		var formReference = this.getFormReference(formId, formName);
		if (exists(formReference)) {
			formReference.submit();
		}
	}
};
iFrameUtility.prototype.removeIframe = function() {
	if (this.isInitialized) {
		this.tagReference.parentNode.removeChild(this.tagReference);
	}
}

function killFrameInclude() {
	if (top != self) { 
		top.location=self.location;
	}
}
/*****************************************************
 * ypSlideOutMenu
 * http://ypslideoutmenus.sourceforge.net/
 *
 * Licensed under AFL 2.0
 * http://www.opensource.org/licenses/afl-2.0.php
 *****************************************************/
 
ypSlideOutMenu.Registry=[];
ypSlideOutMenu.aniLen=250;
ypSlideOutMenu.hideDelay=1000;
ypSlideOutMenu.minCPUResolution=10;
function ypSlideOutMenu(id,_2,_3,_4,_5,_6)
{
	this.ie=document.all?1:0;
	this.ns4=document.layers?1:0;
	this.dom=document.getElementById?1:0;
	this.css="";
	if(this.ie||this.ns4||this.dom)
	{
		this.id=id;
		this.dir=_2;
		this.orientation=_2=="left"||_2=="right"?"h":"v";
		this.dirType=_2=="right"||_2=="down"?"-":"+";
		this.dim=this.orientation=="h"?_5:_6;
		this.hideTimer=false;
		this.aniTimer=false;
		this.open=false;
		this.over=false;
		this.startTime=0;
		this.gRef="ypSlideOutMenu_"+id;
		eval(this.gRef+"=this");
		ypSlideOutMenu.Registry[id]=this;
		var d=document;
		var _8="";
		_8+="#"+this.id+"Container{visibility:hidden;";
		_8+="left:"+_3+"px;";
		_8+="top:"+_4+"px;";
		_8+="overflow:hidden;z-index:10000;}";
		_8+="#"+this.id+"Container,#"+this.id+"Content{position:absolute;";
		_8+="width:"+_5+"px;";
		_8+="height:"+_6+"px;";
		_8+="clip:rect(0 "+_5+" "+_6+" 0);";
		_8+="}";
		this.css=_8;
		this.load();
	}
}
ypSlideOutMenu.writeCSS=function()
{
	document.writeln("<style type=\"text/css\">");
	for(var id in ypSlideOutMenu.Registry)
	{
		document.writeln(ypSlideOutMenu.Registry[id].css);
	}
	document.writeln("</style>");
}
ypSlideOutMenu.prototype.load=function()
{
	var d=document;
	var _10=this.id+"Container";
	var _11=this.id+"Content";
	var _12=this.dom?d.getElementById(_10):this.ie?d.all[_10]:d.layers[_10];
	if(_12)
	{
		var _13=this.ns4?_12.layers[_11]:this.ie?d.all[_11]:d.getElementById(_11);
	}
	var _14;
	if(!_12||!_13)
	{
		window.setTimeout(this.gRef+".load()",100);
	}
	else
	{
		this.container=_12;
		this.menu=_13;
		this.style=this.ns4?this.menu:this.menu.style;
		this.homePos=eval("0"+this.dirType+this.dim);
		this.outPos=0;
		this.accelConst=(this.outPos-this.homePos)/ypSlideOutMenu.aniLen/ypSlideOutMenu.aniLen;
		if(this.ns4)
		{
			//alert("ns4");
			this.menu.captureEvents(Event.MOUSEOVER|Event.MOUSEOUT);
		}
		this.menu.onmouseover=new Function("ypSlideOutMenu.showMenu('"+this.id+"')");
		this.menu.onmouseout=new Function("ypSlideOutMenu.hideMenu('"+this.id+"')");
		this.endSlide();
	}
}
ypSlideOutMenu.showMenu=function(id)
{
	if((id=="menu1")||(id=="menu2")||(id=="menu3")) { isOpening[id]=true;setMenuState(id); }
	var reg=ypSlideOutMenu.Registry;
	var obj=ypSlideOutMenu.Registry[id];
	if(obj.container)
	{
		obj.over=true;
		for(menu in reg)
		{
			if(id!=menu)
			{
				ypSlideOutMenu.hide(menu);
			}
		}
		if(obj.hideTimer)
		{
			reg[id].hideTimer=window.clearTimeout(reg[id].hideTimer);
		}
		if(!obj.open&&!obj.aniTimer)
		{
			reg[id].startSlide(true);
		}
	}
}
ypSlideOutMenu.hideMenu=function(id)
{
	var obj=ypSlideOutMenu.Registry[id];
	if(id!="menu4")
	{
		isOpening[id]=false;
		if(obj.container)
		{
			if(obj.hideTimer)
			{
				window.clearTimeout(obj.hideTimer);
			}
			obj.hideTimer=window.setTimeout("ypSlideOutMenu.hide('"+id+"')",ypSlideOutMenu.hideDelay);
		}
	}
}
ypSlideOutMenu.hideAll=function()
{
	var reg=ypSlideOutMenu.Registry;
	for(menu in reg)
	{
		ypSlideOutMenu.hide(menu);
		if(menu.hideTimer)
		{
			window.clearTimeout(menu.hideTimer);
		}
	}
}
ypSlideOutMenu.hide=function(id)
{
	var obj=ypSlideOutMenu.Registry[id];
	obj.over=false;
	if(obj.hideTimer)
	{
		window.clearTimeout(obj.hideTimer);
	}
	obj.hideTimer=0;
	if(obj.open&&!obj.aniTimer)
	{
		obj.startSlide(false);
	}
}
ypSlideOutMenu.prototype.startSlide=function(_21)
{
	this[_21?"onactivate":"ondeactivate"]();
	this.open=_21;
	if(_21)
	{
		this.setVisibility(true);
	}
	this.startTime=(new Date()).getTime();
	this.aniTimer=window.setInterval(this.gRef+".slide()",ypSlideOutMenu.minCPUResolution);
}
ypSlideOutMenu.prototype.slide=function()
{
	var _22=(new Date()).getTime()-this.startTime;
	if(_22>ypSlideOutMenu.aniLen)
	{
		this.endSlide(false);
	}
	else
	{
		var d=Math.round(Math.pow(ypSlideOutMenu.aniLen-_22,2)*this.accelConst);
		if(this.open&&this.dirType=="-")
		{
			d=-d;
		}
		else
		{
			if(this.open&&this.dirType=="+")
			{
				d=-d;
			}
			else
			{
				if(!this.open&&this.dirType=="-")
				{
					d=-this.dim+d;
				}
				else
				{
					d=this.dim+d;
				}
			}
		}
		this.moveTo(d);
	}
}
ypSlideOutMenu.prototype.endSlide=function()
{
	this.aniTimer=window.clearTimeout(this.aniTimer);
	this.moveTo(this.open?this.outPos:this.homePos);
	if(!this.open)
	{
		this.setVisibility(false);
		if(this.id=="menu4") { checkPrefTab(); /* see preferences.js */ }
		else { setMenuState(this.id); }
	}
	if((this.open&&!this.over)||(!this.open&&this.over))
	{
		this.startSlide(this.over);
	}
}
ypSlideOutMenu.prototype.setVisibility=function(_24)
{
	var s=this.ns4?this.container:this.container.style;s.visibility=_24?"visible":"hidden";
}
ypSlideOutMenu.prototype.moveTo=function(p)
{
	this.style[this.orientation=="h"?"left":"top"]=this.ns4?p:p+"px";
}
ypSlideOutMenu.prototype.getPos=function(c)
{
	return parseInt(this.style[c]);
}
ypSlideOutMenu.prototype.onactivate=function(){}
ypSlideOutMenu.prototype.ondeactivate=function(){}

/*****************************************************
 * added for handling of menu states
 *****************************************************/
function setMenuState(id)
{
	var t = "_trigger";
	if(isOpening[id])
	{
		/* reset menus to original state on page load */
		if(isActivated["menu1"]) { isActivated["menu1"]=false;setClassName("menu1"+t,getClassName("menu1"+t).split("_")[0]); }
		if(isActivated["menu2"]) { isActivated["menu2"]=false;setClassName("menu2"+t,getClassName("menu2"+t).split("_")[0]); }
		if(isActivated["menu3"]) { isActivated["menu3"]=false;setClassName("menu3"+t,getClassName("menu3"+t).split("_")[0]); }
		isActivated[id]=true;
		if(getClassName(id.toString()+t)=="active") { setClassName(id.toString()+t,getClassName(id.toString()+t)+"_activated"); }
		else { setClassName(id.toString()+t,"activated"); }
	}
	else
	{
		isActivated[id]=false;
		if(getClassName(id.toString()+t)!="active")
		{
			if(getClassName(id.toString()+t).split("_").length>1) { setClassName(id.toString()+t,"active"); }
			else { setClassName(id.toString()+t,""); }
		}
	}
}
var isActivated = { menu1:false, menu2:false, menu3:false };
var isOpening = { menu1:false, menu2:false, menu3:false };
function GenObj() {}
GenObj.prototype.setProp = function(prop,value) { this[prop] = value; }
GenObj.prototype.getProp = function(prop) { return this[prop]; }
/* Country Object */
function Country(display,country_code, supported_languages, region_code) {
	this.oProps = new GenObj();
	this.setProp("display", display);
	this.setProp("country_code", country_code);
	this.setProp("supported_languages", supported_languages);
	this.setProp("region_code",region_code);
}
Country.prototype.setProp = function(prop,value) { this.oProps.setProp(prop,value); }
Country.prototype.getProp = function(prop) { var rtn = this.oProps.getProp(prop); if(rtn==undefined) {} return rtn; }
Country.prototype.toString = function() { return this.oProps.getProp("display"); }
/* Language Object */
function Language(display, language_code, default_country) {
	this.oProps = new GenObj();
	this.setProp("display", display);
	this.setProp("language_code", language_code);
	this.setProp("default_country", default_country);
}
Language.prototype.setProp = function(prop,value) { this.oProps.setProp(prop,value); }
Language.prototype.getProp = function(prop) { var rtn = this.oProps.getProp(prop); if(rtn==undefined) {} return rtn; }
Language.prototype.toString = function() { return this.oProps.getProp("display"); }

function isEnglishURL(str) {
	var re = new RegExp(/www\d*|delta|draft\d*|si\d*|st\d*|qa\d*|ddwa\d*|dswa\d*|dtwa\d*|dpwa\d*|\d*|.*as\d*|localhost/);
	return str.match(re)[0] != "";
}

function getCountry(code) {
	code = code.toLowerCase();
	for (var i=0; i<CountryOptions.length; i++) {
		if (CountryOptions[i].getProp("country_code") == code) {
			return CountryOptions[i].toString();
		}
	}
}
function getLanguage(code) {
	var rtnString;
	for (var i=0; i<LanguageOptions.length; i++) {
		if (LanguageOptions[i].getProp("language_code") == code) {
			return LanguageOptions[i].toString();
		}
	}
}
function getCountryLanguages(code) {
	for (var i=0; i<CountryOptions.length; i++) {
		if (CountryOptions[i].getProp("country_code") == code) {
			return CountryOptions[i].getProp("supported_languages");
		}
	}
}
function getProxy() {
	var rtn = window.location.href.split(";");
	if(rtn.length >1) { rtn = rtn[0] + ";" }
	else { rtn = rtn[0]; }
	return rtn;
}

/* function for creating country select */
function writeAvailableCountries() {
	var rtnString = '<select id="loc" name="loc" onChange="writeAvailableLanguages(this.value);" style="width:100%;">';
	rtnString += '<option value="none" selected="true">Select One</option>';
	for(var i=0;i<CountryOptions.length;i++) {
		rtnString += '<option value="'+ CountryOptions[i].getProp("country_code");
		rtnString +='">' + CountryOptions[i].toString()+'</option>';
	}
	rtnString += '</select>';
	return rtnString;
}
/* function for creating language select */
function writeAvailableLanguages(code) {
	var rtnString;
	if (code != "none" && code!="") {
		var supported = getCountryLanguages(code);
		rtnString = '<select id="lang" name="lang" style="width:100%;">';
		rtnString += '<option value="none">Select One</option>';
		for(var i=0;i<supported.length;i++) {
			rtnString += '<option value="'+ supported[i];
			if(supported.length==1) { rtnString += '" selected="selected' }
			rtnString +='">' + getLanguage(supported[i])+'</option>';
		}
		document.getElementById("lang_select").innerHTML = rtnString;
	} else {
		rtnString = '<select id="lang" name="lang" style="width:100%;" disabled>';
		rtnString += '<option value="none" selected="selected">Select One</option>';
	}
	rtnString += '</select>';
	return rtnString;
}
function refreshPage(oForm, lang, loc) {
	var curURL = window.location.toString();
	var name = curURL.match("//[^.]*").toString().split("//")[1];
	var locatn;
	if(isEnglishURL(name)) {
		curURL = curURL.replace(name, "www");
		name = "www"; 
	}
	if ( ((lang=="en")&&(name=="www" || name=="si"))||(lang==name) ) {
			if(curURL.indexOf("#")!=-1) { window.location.href=curURL.replace(/#/,""); }
			else { window.location.href=curURL+"#"; }
	} else {
		if (lang == "en") {
			if(curURL.indexOf("https")!=-1) { locatn = curURL.match("[^:]*") + curURL.split(";")[1].replace(/https/,""); }
			else { locatn = curURL.match("[^:]*") + curURL.split(";")[1].replace(/http/,""); }
		} else {
			if(isEnglishURL(name)) { locatn = curURL.match("[^:]*") + "://"+lang+".delta.com/delta/en"+lang+"/?24;"+curURL; }
			else { locatn = curURL.match("[^:]*") + "://"+lang+".delta.com/delta/en"+lang+"/?24;"+curURL.split(";")[1]; }
		}
		window.location = locatn;
	}
}
/* form handler */
function doLanguageChoice(language, location) {
	var pref = language + "-" + location;
	setPref(pref);
	refreshPage(null, language, location);
}
function submitPreferences(oForm) {
	var lang = document.getElementById(oForm).lang.value;
	var loc = (document.getElementById(oForm).loc.value!="none") ? document.getElementById(oForm).loc.value : "us";
	var oForm = document.getElementById(oForm);
	if (lang == "none") {
		var curLang = window.location.toString().match("//[^.]*").toString().split("//")[1];
		lang = (isEnglishURL(curLang)) ? "en" : curLang;
	}
	doLanguageChoice(lang, loc);
}

// language and location cookie stuff
function createCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires = "; expires=" + date.toGMTString();
	}
	document.cookie = name+"="+value+expires+"; path=/" + "; domain=delta.com";
}
function deleteCookie(name, path) {
	var value = getCookie(name);
	if (exists(value)) {
		document.cookie = name + "=;path=/;domain=delta.com;expires=Thu, 01-Jan-1970 00:00:01 GMT";
	}
}
function getCookie(name) {
	var nameEQ = name + "=";
	var cookieArray = document.cookie.split(';');
	for (var i=0;i < cookieArray.length; i++) {
		var c = cookieArray[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function setPref(value) { createCookie('pref',value,30); }
function checkPrefTab() { if(prefTabActive) { togglePrefTab("hide"); prefTabActive=false; } }
function togglePrefTab(state) {
	if (state == "hide") { document.getElementById("lang_loc").className = 'pref_inactive'; }
	else if( state == "show") { document.getElementById("lang_loc").className = 'pref_active';prefTabActive=true; }
	return true;
}
function getDefault(lang) {
	var rtnString = "en-us";
	if (isEnglishURL(lang)) { return rtnString; }
	for (var i=0; i<LanguageOptions.length; i++) {
		if (LanguageOptions[i].getProp("language_code") == lang) {
			rtnString = LanguageOptions[i].getProp("language_code") + "-" + LanguageOptions[i].getProp("default_country");
			return rtnString;
		}
	}
	return rtnString;
}
function getLangLoc() {
	var prefString = getPrefs();
	var rtnString = '<span style="display:block;">';
	if (prefString == "null" || prefString == null) {
		prefString=getDefault(window.location.toString().match("//[^.]*").toString().split("//")[1]);
		rtnString += getCountry(prefString.split("-")[1]);
		rtnString += "<br />" + getLanguage(prefString.split("-")[0]);
	} else {
		rtnString += getCountry(prefString.split("|")[0].split("-")[1]);
		rtnString += "<br />" + getLanguage(prefString.split("|")[0].split("-")[0]);
	}
	rtnString += "</span>";
	return rtnString;
}
function autoRedirect() {
	var windowLocation = window.location.toString();
	if(windowLocation.match("business_programs_services") || windowLocation.match("business_programs_services")) { return true; }
	var prefLang=getPrefs().split("|")[0].split("-")[0];
	var curLang;
	if (prefLang != null && prefLang != "null") {
      var browserLang = windowLocation.match("//[^.]*").toString().split("//")[1];
		for (var i=0; i<LanguageOptions.length; i++) {
			curLang = LanguageOptions[i].getProp("language_code");
			if (prefLang==curLang && browserLang!=curLang) {
				if( strCompare(curLang,"en") ) { break; }
				else {
               var redirectURL = windowLocation;
               if (document.title == "Page Not Found") {
                  redirectURL = "http://delta.delta.com/";
               }
               window.location.href = "http://" + curLang + ".delta.com/delta/en" + curLang + "/?24;" + redirectURL; 
            }
			}
		}
	}
}
var prefTabActive = false;
var CountryOptions = [
	/****** Country, code, [ary lang codes], 3c region code ******/
	new Country("Antigua &amp; Barbuda", "ag", ["en"], "CAR"),
	new Country("Argentina", "ar", ["en", "es"], "SAM"),
	new Country("Aruba & Antilles","aw", ["en"], "CAR"),
	new Country("Austria", "at", ["en", "de"], "ENT"),
	new Country("Australia", "au", ["en"], "PS"),
	new Country("Bahamas", "bs", ["en"], "CAR"),
	new Country("Barbados", "bb", ["en"], "CAR"),
	new Country("Belgium", "be", ["en", "fr"], "ENT"),
	new Country("Belize",  "bz", ["en", "es"], "CAM"),
	new Country("Bermuda",  "bm", ["en"], "CAR"),
	new Country("Brazil",  "br", ["en", "pt"], "BR"),
	new Country("Canada",  "ca", ["en", "fr"], "CA"),
	new Country("Cayman Islands",  "ky", ["en"], "CAR"),
	new Country("Chile",  "cl", ["en", "es"], "SAM"),
	new Country("China",  "cn", ["en", "zh"], "GC"),
	new Country("Colombia",  "co", ["en", "es"], "SAM"),
	new Country("Costa Rica",  "cr", ["en", "es"], "CAM"),
	new Country("Croatia", "hr", ["en"], "EET"),
	new Country("Cyprus", "cy", ["en"], "EZT"),
	new Country("Czech Republic", "cz", ["en"], "EET"),
	new Country("Denmark", "dk", ["en"], "ENT"),
	new Country("Dominican Republic", "do", ["en", "es"], "CAR"),
	new Country("Ecuador", "ec", ["en", "es"], "SAM"),
	new Country("Egypt", "eg", ["en"], "ME"),
	new Country("El Salvador", "sv", ["en", "es"], "CAM"),
	new Country("Finland", "fi", ["en"], "ENT"),
	new Country("France", "fr", ["en", "fr"], "FR"),
	new Country("Germany", "de", ["en", "de"], "DE"),
	new Country("Greece", "gr", ["en"], "EZT"),
	new Country("Guadeloupe", "gp", ["en", "fr"], "CAR"),
	new Country("Guam", "gu", ["en"], "MI"),
	new Country("Guatemala", "gt", ["en", "es"], "CAM"),
	new Country("Honduras", "hn", ["en", "es"], "CAM"),
	new Country("Hong Kong", "hk", ["en", "zt"], "GC"),
	new Country("Hungary", "hu", ["en"], "EET"),
	new Country("India", "in", ["en"], "IN"),
	new Country("Indonesia", "id", ["en"], "AS"),
	new Country("Ireland", "ie", ["en"], "IE"),
	new Country("Israel", "il", ["en"], "ME"),
	new Country("Italy", "it", ["en", "it"], "IT"),
	/* new Country("Jamaica", "jm", ["en"], "CAR"), */
	new Country("Japan", "jp", ["en",  "ja"], "JP"),
	new Country("Kuwait", "kw", ["en"], "ME"),
	new Country("Luxembourg", "lu", ["en"], "ENT"),
	new Country("Malaysia", "my", ["en"], "AS"),
	new Country("Martinique", "mq", ["en", "fr"], "CAR"),
	new Country("Mexico", "mx", ["en", "es"], "MX"),
	new Country("Netherlands", "nl", ["en"], "ENT"),
	new Country("Netherlands Antilles", "an", ["en"], "CAR"),
	new Country("New Zealand", "nz", ["en"], "PS"),
	new Country("Nicaragua", "ni", ["en", "es"], "CAM"),
	new Country("N. Mariana Islands", "mp", ["en"], "MI"),
	new Country("Norway", "no", ["en"], "ENT"),
	new Country("Panama", "pa", ["en", "es"], "CAM"),
	new Country("Peru", "pe", ["en", "es"], "SAM"),
	new Country("Philippines", "ph", ["en"], "AS"),
	new Country("Poland", "pl", ["en"], "EET"),
	new Country("Portugal", "pt", ["en"], "ES"),
	new Country("Puerto Rico", "pr", ["en", "es"], "CAR"),
	new Country("Qatar", "qa", ["en"], "ME"),
	new Country("Romania", "ro", ["en"], "EET"),
	new Country("Russia", "ru", ["en", "ru"], "EE"),
	new Country("Saudi Arabia", "sa", ["en"], "ME"),
	new Country("Singapore", "sg", ["en"], "AS"),
	new Country("South Africa", "za", ["en"], "AF"),
	new Country("South Korea", "kr", ["en", "ko"], "AN"),
	new Country("Spain", "es", ["en", "es"], "ES"),
	new Country("St. Croix", "vi", ["en"], "CAR"),
	new Country("St. Lucia", "lc", ["en"], "CAR"),
	new Country("St. Maarten", "an", ["en"], "CAR"),
	new Country("St. Thomas", "vi", ["en"], "CAR"),
	new Country("Sweden", "se", ["en"], "ENT"),
	new Country("Switzerland", "ch", ["en", "fr", "de", "it"], "ENT"),
	new Country("Taiwan", "tw", ["en", "zt"], "GC"),
	new Country("Thailand", "th", ["en"], "AS"),
	new Country("Trinidad &amp Tobago", "tt", ["en"], "CAR"),
	new Country("Turkey", "tr", ["en"], "EZT"),
	new Country("Turks &amp; Caicos", "tc", ["en"], "CAR"),
	new Country("Ukraine", "ua", ["en", "ru"], "EET"),
	new Country("United Arab Emirates", "ae", ["en"], "ME"),
	new Country("United Kingdom", "gb", ["en"], "GB"),
	new Country("United States", "us", ["en", "es"], "US"),
	new Country("Uruguay", "uy", ["en", "es"], "SAM"),
	new Country("Venezuela", "ve", ["en", "es"], "SAM"),
	new Country("Viet Nam", "vn", ["en"], "AS")	
];

var LanguageOptions = [
	/* Language, code, default_country */
	new Language("English", "en", "us"),
	new Language("Chinese", "zh", "cn"),
	new Language("French", "fr", "fr"),
	new Language("German", "de", "de"),
	new Language("Italian", "it", "it"),
	new Language("Portuguese", "pt", "br"),
	new Language("Russian", "ru", "ru"),
	new Language("Spanish", "es", "us"),
	new Language("Japanese", "ja", "jp"),
	new Language("Korean", "ko", "kr"),
	new Language("Traditional Chinese", "zt", "hk")
];
CountryOptions.sort();

var calForm = "";
var calSDay = "";
var calSMonth = "";
childwin = null;

var cal_isNetscape = navigator.appName.indexOf("Netscape") != -1;

var cal_today = new Date();
var cal_currentDate = cal_today.getDate();
var cal_currentMonth = cal_today.getMonth();
var cal_currentYear = cal_today.getYear();

if (cal_isNetscape) cal_currentYear += 1900;

function openCalendar(tbForm, sDay, sMonth, e) {
   self.calForm = tbForm;
   self.calSDay = sDay;
   self.calSMonth = sMonth;

   w = screen.width-310
   h = screen.height-170
   x = e.screenX
   y = e.screenY
      if(x > w){
         x = x-310
         }
      if(y > h){
         y = y-170
         }

   var calendarUrl = "/components/calendar.jsp";

   var monthSel = document.getElementsByName(calSMonth);

   if (monthSel != null) {
      var selectedMonthIndex = monthSel[0].selectedIndex;
      var month = selectedMonthIndex;
      var year =  cal_currentYear;

      if (month < cal_currentMonth ) {
         year = year  + 1;
      }
      calendarUrl = calendarUrl + "?y=" + year + "&m=" + month;

   }
   childwin=window.open(calendarUrl,'Calendar','width=310,height=170,top='+y+',left='+x);
}

function setDate(day, month) {
   var daySel = document.getElementsByName(calSDay);
   daySel[0].options[day - 1].selected = true;
   var monthSel = document.getElementsByName(calSMonth);
   monthSel[0].options[month].selected = true;
}

function setRetMonth(tbForm, deptMonth, retMonth){
   var box1 = document.getElementsByName(deptMonth);
   var box2 = document.getElementsByName(retMonth);
   box2[0].selectedIndex = box1[0].selectedIndex;
}

// this will auto close the calendar window if no date is selected

function closeMe(){
   if (childwin != null){
   childwin.close()
   childwin = null
   }
}var airportListForm = "";
var airportListBox = "";

function openCityCodes(tbForm, tbBox, e) {
   self.airportListForm = tbForm;
   self.airportListBox = tbBox;

   w = screen.width-465
   h = screen.height-315
   x = e.screenX
   y = e.screenY
      if(x > w){
         x = x-45
         }
      if(y > h){
         y = y-315
         }

   childwin=window.open('/booking/cityCodes.do','CityCodes','width=465,height=315,top='+y+',left='+x);
}

function setAirportValue(airportCode) {
   var box = document.getElementsByName(airportListBox);
   for (var i=0; i<box.length; i++) {
      box[i].value = airportCode;
   }
}

// this will auto close the calendar if no date is selected and focus is lost

function closeMe(){
   if (childwin != null){
   childwin.close()
   childwin = null
   }
}/* begin /delta/shared_content/components/js/myitineraryHomepage.js */
function validateNumberform() {
	var f = document.forms['itinForm'];
	var validationError = false;
	var invalidfirstname = false;
	var invalidlastname = false;
	var invalidnumber = false;

	var errorMsg = "";
	setInnerHTML("itinerarySearchAlerts_Errors",errorMsg);
	var firstnamelength = f.firstName.value.length;
	var firstnamematch = f.firstName.value.match(/[a-zA-Z\s]+/);
	var lastnamelength = f.lastName.value.length;
	var lastnamematch = f.lastName.value.match(/[a-zA-Z\s-]+/);
	var numberlengthmatch = f.recLocId.value.match(/[^\s]+/);

	if (numberlengthmatch == null) {
		numberlength = 0;
		validationError = true;
	} else {
		numberlength = numberlengthmatch[0].length;
	}
	numbermatch1 = f.recLocId.value.match(/[\d]+/);
	numbermatch2 = f.recLocId.value.match(/[\w^_]+/); 

	if(firstnamematch == null || firstnamematch[0].length != firstnamelength) {
		validationError = true;
		invalidfirstname = true;
	}
	if(lastnamematch == null || lastnamematch[0].length != lastnamelength) {
		validationError = true;
		invalidlastname = true;
	}
	if(numberlength != 6) {
		validationError = true;
		invalidnumber = true;
	}
	if(numbermatch2 == null || numbermatch2[0].length != numberlength) {
		validationError = true;
		invalidnumber = true;
	}
	if(invalidfirstname) {
		setClassName('firstnamelabel','error');
		setClassName('firstName','error');
		errorMsg += '<div class="error">Please provide a first name.<\/div>';
	} else {
		setClassName('firstnamelabel','');
		setClassName('firstName','');
	}
	if(invalidlastname) {
		setClassName('lastnamelabel','error');
		setClassName('lastName','error');
		errorMsg += '<div class="error">Please provide a last name.<\/div>';
	} else {
		setClassName('lastnamelabel','');
		setClassName('lastName','');
	}
	if(invalidnumber) {
		setClassName('recLocIdlabel','error');
		setClassName('recLocId','error');
		errorMsg += '<div class="error">Please provide a confirmation number.<\/div>';
	} else {
		setClassName('recLocIdlabel','');
		setClassName('recLocId','');
	}
	setInnerHTML("itinerarySearchAlerts_Errors",errorMsg);
	if(validationError) { return false; }
	else { return true; }
}
/* end /delta/shared_content/components/js/myitineraryHomepage.js */
 function submitForm() {
	 var Index = document.getElementById('when').selectedIndex;
	switch(Index){
		case 0:
			document.flifoForm.flight_date.value = "Yesterday";
			document.schedForm.flight_date.value = "Yesterday";
			break;
		case 1:
			document.flifoForm.flight_date.value = "Today";
			document.schedForm.flight_date.value = "Today";
			 break;
		case 2:
			document.flifoForm.flight_date.value = "Tomorrow";
			document.schedForm.flight_date.value = "Tomorrow";
			break;
		default:
			break;
	}
	if (get('byFlightDate').checked) {
		document.schedForm.DptText.value = get('leavingfrom').value;
		document.schedForm.ArrText.value = get('goingto').value
		document.schedForm.submit();
	} else {
		document.flifoForm.flight_number.value = document.inputForm.flight_number.value;
		document.flifoForm.submit();
	}
}
function clearFlightNumber() {
	if(get('leavingfrom').value !== "" || get('goingto').value !== "") {
		get('flightnumber').value = "";
		document.flifoForm.flight_number.value = "";
		get('byFlightDate').checked = true;
	}
}
function clearOrigDest() {
	if(get('flightnumber').value !== "") {
		get('leavingfrom').value = "";
		get('goingto').value = "";
		document.schedForm.DptText.value = "";
		document.schedForm.ArrText.value = "";
		get('byFlightNumber').checked = true;
	}
}
/********************* begin misc.js ****************************/

var lostItems = {
	whereValue : !exists(get("required-where")) ? "" : this.getWhereValue(),
	airport_label_flight : '* To <a href="#" onClick="javascript:openCityCodes(\'LostItems\',\'required-airport\',event); return false;">airport</a>',
	airport_label : '* <a href="#" onClick="javascript:openCityCodes(\'LostItems\',\'required-airport\',event); return false;">Airport</a>',
	getWhereValue : function() {
		if(get("where-flight").checked) {
			this.whereValue = "flight";
			return;
		}
		if(get("where-gate").checked) {
			this.whereValue = "gate";
			return;
		}
		if(get("where-skyclub").checked) {
			this.whereValue = "club";
			return;
		}
	},
	setFlight : function() {
		get("airport_label").innerHTML = this.airport_label_flight;
		show("flight");
		show("fromAirport");
		hide("gate");
		get("required-flightNumber").value = "";
		get("required-fromAirport").value = "";
		get("required-gate").value = "none";
	},
	setGate : function() {
		get("airport_label").innerHTML = this.airport_label;
		hide("flight");
		hide("fromAirport");
		show("gate");
		get("required-flightNumber").value = "none";
		get("required-fromAirport").value = "none";
		get("required-gate").value = "";
	},
	setClub : function() {
		get("airport_label").innerHTML = this.airport_label;
		hide("flight");
		hide("fromAirport");
		hide("gate");
		get("required-flightNumber").value = "none";
		get("required-fromAirport").value = "none";
		get("required-gate").value = "none";
	},
	init : function() {
		lostItems.getWhereValue();
		switch(this.whereValue) {
			case "flight":
				lostItems.setFlight();
				break;
			case "gate":
				this.setGate();
				break;
			case "SkyClub" :
				this.setClub();
				break;
		}		
	}
}
