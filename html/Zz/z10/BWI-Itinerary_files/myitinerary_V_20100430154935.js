<!-- begin File /delta/shared_content/components/js/itinsearch.js -->
// Itineraries search component javascript file.

function hideAll(){
	hide('skymilesNumberLabel');
	hide('skymilesText');
	hide('firstnameLabel');
	hide('firstnameText');
	hide('lastnameLabel');
	hide('lastnameText');
	hide('pinLabel');
	hide('pinText');
	hide('remMeCheckBox');
	hide('remMeText');
	hide('confirmNumLabel');
	hide('confirmNumText');
	hide('ccTypeLabel');
	hide('ccTypeSelect');
	hide('creditCardNumLabel');
	hide('ccText');
	hide('eTicketNumLabel');
	hide('eTicket');
}

function showSmNumber(){
	hideAll();
	show('skymilesNumberLabel');
	show('skymilesText');
	show('lastnameLabel');
	show('lastnameText');
	show('pinLabel');
	show('pinText');
	show('remMeCheckBox');
	show('remMeText', 'inline');
}

function showConfNumber(){
	hideAll();
	show('firstnameLabel');
	show('firstnameText');
	show('lastnameLabel');
	show('lastnameText');
	show('confirmNumLabel');
	show('confirmNumText');
}

function showCcNumber(){
	hideAll();
	show('firstnameLabel');
	show('firstnameText');
	show('lastnameLabel');
	show('lastnameText');
	show('ccTypeLabel');
	show('ccTypeSelect');
	show('creditCardNumLabel');
	show('ccText');
}

function showEtNumber(){
	hideAll();
	show('firstnameLabel');
	show('firstnameText');
	show('lastnameLabel');
	show('lastnameText');
	show('eTicketNumLabel');
	show('eTicket');
}

var radchecked = 0;

function chkRadioStatus(i){
radchecked = i;
	if(document.SearchForm.searchType[i].checked == true){
		showFields(i);
	}
	else{
		showFields(1);
		radchecked = 1;
	}
}

function showFields(radchecked){
	if(document.SearchForm.searchType){
	var checkedId = document.SearchForm.searchType[radchecked].id;
		switch(checkedId){
			case "skymilesNumberRad":
			clearErrors();
			showSmNumber();
			whereLink();
			break;
			
			case "confirmNumberRad":
			clearErrors();
			showConfNumber();
			whereLink();
			break;
			
			case "ccNumberRad":
			clearErrors();
			showCcNumber();
			whereLink();
			break;
			
			case "eTicketNumberRad":
			clearErrors();
			showEtNumber();
			whereLink();
			break;
			
			default:
			clearErrors();
			showCcNumber();
			whereLink();
		}
	}
}

function whereLink(){
   if (document.getElementById('confirmNumberRad').checked) {
   		showDiv('confirmPopup');
		hideDiv('eticketPopup');
		} else if (document.getElementById('eTicketNumberRad').checked) {
			hideDiv('confirmPopup');
			showDiv('eticketPopup');
		} else { 
		    	hideDiv('confirmPopup');
		    	hideDiv('eticketPopup');
		}
  }
	
function clearErrors(){
get('errorText').style.display = 'none';
var allLabels = get('inputFields').getElementsByTagName('label');
var allInputs = get('inputFields').getElementsByTagName('input');
var allSelects = get('inputFields').getElementsByTagName('select');
	for(i=0; i<allLabels.length; i++){
	allLabels[i].className = "none";
	}
	for(j=0; j<allInputs.length; j++){
		if(allInputs[j].className == "error"){
		allInputs[j].className = "input150";
		}
	}
	for(n=0; n<allSelects.length; n++){
	allSelects[n].className = "none";
	}
}


function valSearch(srvrName){
var srcform= document.forms["SearchForm"];
var srctype = document.getElementById('skymilesNumberRad').checked;	
	if (srctype ){
	srcform.action = "https://" + srvrName + "/smlogin/skymiles_login.action";
	} else {
	srcform.action = "https://" + srvrName + "/myitinerary/itinSearch.action";		
	}
populateHideField();
var isError = false;
	switch(radchecked){
		case 0:
			if(get('skymilesText').value.length == 0){
			get('skymilesText').className = "error";
			get('skymilesNumberLabel').className = "error";
			isError = true;
			}
			if(get('lastnameText').value.length == 0){
			get('lastnameText').className = "error";
			get('lastnameLabel').className = "error";
			isError = true;
			}
			if(get('pinText').value.match(/\d{4}/) == null){
			get('pinText').className = "error";
			get('pinLabel').className = "error";
			isError = true;
			}
		break;
		
		case 1:
			if(get('firstnameText').value.length == 0){
			get('firstnameText').className = "error";
			get('firstnameLabel').className = "error";
			isError = true;
			}
			if(get('lastnameText').value.length == 0){
			get('lastnameText').className = "error";
			get('lastnameLabel').className = "error";
			isError = true;
			}	
			if(get('confirmNumText').value.length == 0){
			get('confirmNumText').className = "error";
			get('confirmNumLabel').className = "error";
			isError = true;
			}	
		break;
		
		case 2:
			if(get('firstnameText').value.length == 0){
			get('firstnameText').className = "error";
			get('firstnameLabel').className = "error";
			isError = true;
			}
			if(get('lastnameText').value.length == 0){
			get('lastnameText').className = "error";
			get('lastnameLabel').className = "error";
			isError = true;
			}	
			if(get('ccTypeSelect').selectedIndex == 0){
			get('ccTypeLabel').className = "error";
			get('ccTypeSelect').className = "error";
			isError = true;
			}
			if(get('ccText').value.length == 0){
			get('creditCardNumLabel').className = "error";
			get('ccText').className = "error";
			isError = true;
			}	
		break;
		
		case 3:
			if(get('firstnameText').value.length == 0){
			get('firstnameText').className = "error";
			get('firstnameLabel').className = "error";
			isError = true;
			}
			if(get('lastnameText').value.length == 0){
			get('lastnameText').className = "error";
			get('lastnameLabel').className = "error";
			isError = true;
			}
			if(get('eTicketNumText').value.length == 0){
			get('eTicketNumLabel').className = "error"
			get('eTicketNumText').className = "error";
			isError = true;
			}
		break;
	}
	if(isError == true){
	get('errorText').style.display = 'block';
	return false;
	}
}
	
function itinSearchFormVal(srvrName) {
	try {
		/* sets FormName in validationObj */
		setFormName('SearchForm');
		var srcform= document.forms["SearchForm"];
		var srctype = document.getElementById('skymilesNumberRad').checked;	
		if (srctype ){
			srcform.action = "https://" + srvrName + "/smlogin/skymiles_login.action";
		} else {
			srcform.action = "https://" + srvrName + "/myitinerary/itinSearch.action";		
		}
		populateHideField();
		valSearch();
	} catch (e) {
		alert(e + 'formVal Error');	
	}
}

function populateHideField(){
		if(document.getElementById('confirmNumberRad').checked){
			if(document.getElementById('confirmNumText').value.length > 0){
			document.getElementById('sharedNumber').value = document.getElementById('confirmNumText').value;
			}
		}
		if(document.getElementById('eTicketNumberRad').checked){
			if(document.getElementById('eTicketNumText').value.length > 0){
			document.getElementById('sharedNumber').value = document.getElementById('eTicketNumText').value;
			}
		}
	}
<!-- end File /delta/shared_content/components/js/itinsearch.js -->

//freqflyerutility/dwr/interface/FFAddProcessor.js
if(dwr==null)var dwr={};if(dwr.engine==null)dwr.engine={};if(DWREngine==null)var DWREngine=dwr.engine;if(FFAddProcessor==null)var FFAddProcessor={};FFAddProcessor._path='/freqflyerutility/dwr';FFAddProcessor.addFFNo=function(p2,p3,p4,callback){dwr.engine._execute(FFAddProcessor._path,'FFAddProcessor','addFFNo',false,false,p2,p3,p4,callback);}
FFAddProcessor.addChangeFFNo=function(p2,p3,p4,p5,p6,p7,callback){dwr.engine._execute(FFAddProcessor._path,'FFAddProcessor','addChangeFFNo',false,false,p2,p3,p4,p5,p6,p7,callback);}
function handleErrors(error){
	if (error == "NameError") {
	   setInnerHTML('alerts_errors', '<div id ="ff_pax_req_err_e" class="error">The name '+psgrName+' is invalid for '+progNm+' account number '+ffNo+'. Please verify the account information entered.</div>');
	   	   show('alerts_errors');
	} else if(error == "SystemError"){
		//setInnerHTML('ffNum_ffProgram_pax'+pNo,'<img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> <span class="cpyError">Frequent Flyer #</span>');
		setInnerHTML('alerts_errors', '<div id ="ff_pax_req_sys_err_e" class="error">We\'re sorry. There was an internal system error while updating your frequent flyer number. Please try again later.</div>');
		 show('alerts_errors');
	} else if (error = "Error") {
		  setInnerHTML('alerts_errors', '<div id ="ff_pax_req_err_e" class="error">The information entered for Frequent Flyer # below is not valid.</div>');
			show('alerts_errors');
	 }
   window.scroll(0,0);
}
var updtDiv = '';
var pnr='';
var pNo='';
var chgInd='';
var progNm='';
var psgrName ='';
var OMTR_FFNbr = "";
function addFreqFlyerNo(passNo, pnrNo, psgName, addChgInd, ssrNbr,objectId){
	if (!formValLoyalty(objectId)) {return false;}
	try {
		pnr = pnrNo;
		pNo = passNo;
		chgInd = addChgInd;
		psgrName = psgName;
		var frm = 'addffno_'+passNo;
		updtDiv= 'pass_ffno_' + passNo;
		ffNo = document.forms[frm].acct.value;
		progCd = document.forms[frm].airProgSelect.value;
		OMTR_FFNbr = progCd + " FF: "+ffNo;
		var selInd = document.forms[frm].airProgSelect.selectedIndex;
		progNm = document.forms[frm].airProgSelect.options[selInd].text+"/"+progCd;
		//alert("ProgCd: " + progNm + " Ind: " + addChgInd + " SSrNbr:" +ssrNbr );		
		setLoadingMsg("Updating Information..");
		FFAddProcessor.addChangeFFNo(ffNo, pnrNo, psgName, progCd, addChgInd, ssrNbr, displayResult);		
	} catch (e) {
		handleErrors();
	}
}
function displayResult(data){
	try {
		if (data.ffnumber == null || data.error != null ) {
			handleErrors(data.error);
		} else  {
			if(chgInd == "A" ) {
				skymilesNoPending = skymilesNoPending - 1; // One more added
			}
			//setInnerHTML(updtDiv, data.ffnumber);
			updateFFInfo(updtDiv, pNo, data);
			showFFUpdateForm('N', pNo);
			if (skymilesNoPending == 0 ) {
				//	alert("its 0 nbr");
				updateInfo(pnr);
			}
			// there is also data.eliteCd and data.eliteDesc available
			if( (data.smLevel != null && data.smLevel != "") && (data.smLevel == "DM" || data.smLevel == "PM" || data.smLevel == "GM") 
				|| (data.eliteDesc !=null && data.eliteDesc != "" && data.eliteDesc == "Elite Plus") ) {
				if(getStyleAttr("skyPriority","display") == "block") {
					hide("spByFareClass"); // in case we were already showing it for fare class
					show("spBySMLevel");
				} else {
					show("skyPriority");
					show("spBySMLevel");
				}
			}
			//	alert(" done");
		}
	} catch (e) {
		handleErrors();
	}
}
function showFFUpdateForm(showFlg, passNo ) {
	var ff_updt_div = "pass_ffupdateform_"+passNo;
	var ff_nbr_div = "pass_ffno_"+passNo;
	if (showFlg == "Y" ){
		showDiv(ff_updt_div);
		showDiv('loyaltyFFNote');
		hideDiv(ff_nbr_div);
	} else {
		hideDiv(ff_updt_div);
		hideDiv('loyaltyFFNote');
		showDiv(ff_nbr_div);
	}
}
function updateFFInfo(updtDiv, psgrNo, data){
	var ffTxt = "";
	airLine = "";
	prgName = "";
	parseProgram(progNm);
	ffTxt = ffTxt + airLine + " # " + data.ffnumber;
	ffTxt = ffTxt +"<br><nobr>"+prgName+"</nobr>";
	ffTxt = ffTxt +"<br><nobr>" + data.eliteDesc + "</nobr>" ;
	ffTxt = ffTxt +"<br><a href=\"javascript:showFFUpdateForm('Y', '" +psgrNo+"');\" id=\"ffPrgm_ffProgram_changeAdd_pax"+psgrNo+"\" >Change Frequent Flyer #</a> <br>";
	setInnerHTML(updtDiv, ffTxt);
}
var prgName = "";
var airLine = "";
var airLineCd = "";
function parseProgram(programName){
	if (programName != null) {
		airLineCd = "";
		airLine = "";
		prgName = "";
		for (var x = 0; x <programName.length; x++ ){
			if (programName.charAt(x) == "/") {
				break;
			} else{
				airLine = airLine + programName.charAt(x);
			}
		}
		for (var y = x+1; y < programName.length; y++){
			if (programName.charAt(y) == "/") {
				break;
			} else{
				prgName = prgName + programName.charAt(y);
			}
		}
		for (var z = y+1; z < programName.length; z++){
			airLineCd = airLineCd + programName.charAt(z);
		}	
	} else{
		prgName = "";
	} 
}
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (CleanScheduleChangedPnrProcessor == null) var CleanScheduleChangedPnrProcessor = {};
CleanScheduleChangedPnrProcessor._path = '/myitinerary/dwr';
CleanScheduleChangedPnrProcessor.cleanSCPnr = function(p2, p3, p4, callback) {
  dwr.engine._execute(CleanScheduleChangedPnrProcessor._path, 'CleanScheduleChangedPnrProcessor', 'cleanSCPnr', false, false, p2, p3, p4, callback);
}
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (ItineraryDetailsProcessor == null) var ItineraryDetailsProcessor = {};
ItineraryDetailsProcessor._path = '/myitinerary/dwr';
ItineraryDetailsProcessor.getItinerary = function(p2, callback) {
	dwr.engine._execute(ItineraryDetailsProcessor._path, 'ItineraryDetailsProcessor', 'getItinerary', false, false, p2, callback);
}
ItineraryDetailsProcessor.getItineraryFromName = function(p2, p3, p4, callback) {
	dwr.engine._execute(ItineraryDetailsProcessor._path, 'ItineraryDetailsProcessor', 'getItineraryFromName', false, false, p2, p3, p4, callback);
}
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (UpgradeRequestProcessor == null) var UpgradeRequestProcessor = {};
UpgradeRequestProcessor._path = '/myitinerary/dwr';
UpgradeRequestProcessor.upgradeSegment = function(p2, p3, p4, p5, callback) {
	dwr.engine._execute(UpgradeRequestProcessor._path, 'UpgradeRequestProcessor', 'upgradeSegment', false, false, p2, p3, p4, p5, callback);
}
var showLoading = true;
var loadingMsg = null;

DWRUtil.useLoadingMessage = function()
{
DWREngine.setPreHook(function() { 

    var msgbox = document.getElementById('loadingbox');
    if (showLoading 
           && msgbox != null) {
        if (loadingMsg == null) { 
           loadingMsg = 'Loading';
        }
        msgbox.innerHTML=loadingMsg + '.<br><span class="oneMoment">One moment, please...</span>';

 
        msgbox.style.left  = Math.round((document.body.clientWidth - msgbox.offsetWidth) / 3.5) + "px" ;
        msgbox.style.top   = Math.round(((document.body.clientHeight - msgbox.offsetHeight) / 4) + document.body.scrollTop) + "px";
        msgbox.style.display = 'block';
    }
});
DWREngine.setPostHook(function() {
   hideLoadingMsg();
 });
};


function hideLoadingMsg() {
   var msgbox = document.getElementById('loadingbox');
   if (msgbox != null) {
       msgbox.innerHTML = '';
       msgbox.style.display = 'none';
   }

}
function init() {
    DWRUtil.useLoadingMessage();
}
  
function setLoadingMsg(msg) {
    showLoading = true; 
    loadingMsg = msg;
}
      




// Omniture SiteCatalyst Variables
OMTR_currencyCode="";
OMTR_reissuesMarker="";
OMTR_pageName="";
OMTR_channel="";
OMTR_ecreditsUsed="";
OMTR_taxesFees="";

OMTR_tripType="";
OMTR_departureCity= new Array();
OMTR_destinationCity= new Array();
OMTR_departureMonthOptions= new Array();
OMTR_departureDayOptions= new Array();
OMTR_departureTimeOptions= new Array();
OMTR_flexMainRTRTravelDate="";

OMTR_priceSchedule="";
OMTR_flexSearchOption="";
OMTR_cabinClassOption="";
OMTR_cabinFareBundle="";
OMTR_cabinFareClass="";
OMTR_departureAirportMilesRange="";
OMTR_destinationAirportMilesRange="";
OMTR_flexEarlierDepartureDays="";
OMTR_flexEarlierDestinationDays="";
OMTR_flexLaterDepartureDays="";
OMTR_flexLaterDestinationDays="";
OMTR_nearByDateFlexOption="";
OMTR_flexMonthForWeekendSearch="";
OMTR_fareBundle="";
OMTR_paxCount="";
OMTR_fareCategory="";
OMTR_ccType="";
OMTR_ccCity="";
OMTR_ccState="";
OMTR_ccZip="";
OMTR_ccCountryCode="";

OMTR_BaseFare="";
OMTR_flightTotalPrice="";
OMTR_taxesFees="";

// Removal Pending ** OMTR_currencyCodeBilling=""
// Removal Pending ** OMTR_destinationCity=""

OMTR_hotelName="";
OMTR_hotelRooms="";
OMTR_hotelTotal="";

OMTR_carCompanyName="";
OMTR_carType="";
OMTR_carTotal="";
OMTR_carPickupDate="";
OMTR_carReturnDate="";

OMTR_crownRoom="";
OMTR_carbonOffset="";
OMTR_parking="";
OMTR_groundTrans="";
OMTR_activity="";
OMTR_dspTotal="";

OMTR_insurance="";
OMTR_insuranceTotal="";

// Removal Pending ** OMTR_departureDate=""
// Removal Pending ** OMTR_returnDate=""

// Removal Pending ** OMTR_skymilesNo=""
OMTR_oascID="";

// Removal Pending ** hier1=channel;

events= null;
sEvent= null;

// Delta SiteCatalyst Functions
function countFlightRows() {
	var rows;
	var numrows ;
	if (document.getElementsByName("select")!= null) {
		rows = (document.getElementsByName("select"));
	} else {
		rows = (document.getElementsByName("SELECT"));
	}
	numrows = (rows.length);
	return numrows;
}

function searchResults() {
	if(document.getElementById("SearchresultSetSize")!=null) {
		return document.getElementById("SearchresultSetSize").innerHTML;
	}
}

function sEvents(a) {
	var com= ",";
	if (sEvent== "" || sEvent== null) {
		sEvent=a;
	} else {
		sEvent= sEvent + com + a;
	}
	return sEvent;
}

function checkboxes() {
	var choices = document.getElementsByName("RsnForCtacCd");
	for (j=0;j<choices.length;++j) { alert(choices[j].checked==true); };
}

function getSearchType() {
	/* currently there is an issue in which ie is not finding prevPage so the else statement below handles it */
	if(exists(prevPage))
	{
		if(	prevPage.match("booking")!=null 
			&& OMTR_flexMainRTRTravelDate=="null" 
			&& exists(OMTR_cabinFareClass) 
			&& OMTR_cabinFareClass!="") { return "Full Search"; }
		else if(prevPage.match("awards")!=null) { return "Award Ticket Search"; }
		else { return "Simple Search"; }
	} else {
		/* handles IE, will need handling for Award ticket in ASAP */
		if(exists(OMTR_cabinFareClass)&&OMTR_cabinFareClass!="") { return "Full Search"; }
		else { return "Simple Search"; }
	}
}

function getSearchTools() {
	var tools = new Array();
	var rtn = "";
	var limit;
	if (OMTR_cabinClassOption=="cabin") {
		tools.push("Cabin");
	} else if (OMTR_cabinClassOption=="class") {
		tools.push("Fare Class");
	} else {}
	
	if (exists(OMTR_flexMainRTRTravelDate)) {
		if(exists(OMTR_nearByDateFlexOption)) {
			if(OMTR_nearByDateFlexOption=="flex_dates") {
				tools.push("Flexible Dates"); 
			}
		}
	} else if(exists(OMTR_flexSearchOption)) {
		switch (OMTR_flexSearchOption) {
			case "exact":
				tools.push("Search with Exact Dates");
				break;
			case "flex_airports":
				tools.push("Flexible Airports");
				break;
			case "flex_dates":
				if(exists(OMTR_nearByDateFlexOption)) {
					if(OMTR_nearByDateFlexOption=="flex_dates") {
						tools.push("Flexible Dates"); 
					} else if(OMTR_nearByDateFlexOption=="flex_weekends") {
						tools.push("Flexible Weekends");
					} else {}
				} else {}
				break;
			default:
				break;
		}
	} else if(exists(OMTR_fareCategory)) {
		if(OMTR_fareCategory=="refundable") { tools.push("Refundable"); }
	}else {}
	if(tools.length>0) {
		limit = tools.length; limit--;
		for(var i=0;i<tools.length;i++) {
			rtn += tools[i];
			if(i<limit) { rtn +=","; }
		}
	}
	return rtn;
}

/* remove prop10() function once validated it is no longer used */
function prop10() {
	if ( (OMTR_cabinFareClass!="" && OMTR_cabinFareClass!=null) 
		|| (OMTR_departureAirportMilesRange!=null  && OMTR_departureAirportMilesRange!="") 
		|| (OMTR_destinationAirportMilesRange!=null  && OMTR_destinationAirportMilesRange!="") 
		|| (OMTR_flexEarlierDepartureDays!=null  && OMTR_flexEarlierDepartureDays!="") 
		|| (OMTR_flexEarlierDestinationDays!=null  && OMTR_flexEarlierDestinationDays!="") 
		|| (OMTR_flexLaterDepartureDays!=null  && OMTR_flexLaterDepartureDays!="") 
		|| (OMTR_flexLaterDestinationDays!=null  && OMTR_flexLaterDestinationDays!="") 
		|| (OMTR_nearByDateFlexOption!=null  && OMTR_nearByDateFlexOption!="" && ((prevPage!=null)&&(prevPage.match("home")!=null))) 
		|| (OMTR_flexMonthForWeekendSearch!=null  && OMTR_flexMonthForWeekendSearch!="") ) {
		/* all the following must be updated as it is the wrong return */
		return "Full Search";
		if (OMTR_cabinFareClass!="" || OMTR_cabinFareClass== null) { return "cabinFareClass=" +  OMTR_cabinFareClass; }
		if (OMTR_departureAirportMilesRange!="" || OMTR_departureAirportMilesRange== null) { return "departureAirportMilesRange=" + OMTR_departureAirportMilesRange;}
		if (OMTR_destinationAirportMilesRange!="" || OMTR_destinationAirportMilesRange== null) { return "destinationAirportMilesRange=" + OMTR_destinationAirportMilesRange; }
		if (OMTR_flexEarlierDepartureDays!="" || OMTR_flexEarlierDepartureDays== null) { return "flexEarlierDepartureDays=" + OMTR_flexEarlierDepartureDays; }
		if (OMTR_flexLaterDepartureDays!="" || OMTR_flexLaterDepartureDays== null) { return "flexLaterDepartureDays=" + OMTR_flexLaterDepartureDays; }
		if (OMTR_flexLaterDestinationDays!="" || OMTR_flexLaterDestinationDays== null) { return "flexLaterDestinationDays=" + OMTR_flexLaterDestinationDays; }
		if (OMTR_nearByDateFlexOption!="" || OMTR_nearByDateFlexOption== null) { return "nearByDateFlexOption=" + OMTR_nearByDateFlexOption; }
		if (OMTR_flexMonthForWeekendSearch!="" || OMTR_nearByDateFlexOption== null) { return "flexMonthForWeekendSearch=" + OMTR_flexMonthForWeekendSearch; }
	} else {
		return "Simple Search";
	}
}

function lastArray(arrayName) {
	var i= (arrayName.length -1);
	if (i>0) { return arrayName[i]; }
}

function CityPairs() {
	cityPairs="";
	for (i=0;i<=(OMTR_departureCity.length-1);++i) {
		if (i<OMTR_departureCity.length-1) {	
			cityPair= (OMTR_departureCity[i] + "-" + OMTR_destinationCity[i]) + "-";
		} else {
			cityPair= (OMTR_departureCity[i] + "-" + OMTR_destinationCity[i]);
		}
		cityPairs= cityPairs + cityPair;
	}
	return cityPairs;
}

function getErrors() {
	var eVar="";
	var rows = document.getElementsByTagName("td")
	var numrows = rows.length;
	var errors = new Array();
	for(i=0;i<numrows;i++) {
		if(rows[i].className=="cpyError") { errors.push(rows[i].innerHTML); }
	}
	return (errors.toString());
}

function deleteCommas(num) {
	parsedAmount= num.replace(/,/g,"");
	return(parsedAmount);
}

function checkDate(mm,dd) {
	var yearNow= dateNow.getFullYear();
	var dd= Math.floor(dd);
	var testStr=  mm + " " + dd + ", " + yearNow;
	var testDate= new Date(testStr);
	var mm= testDate.getUTCMonth();
	var passDate= new Date();
	passDate.setDate(dd);
	passDate.setMonth(mm);
	passDate.setFullYear(yearNow, mm, dd);
	if (passDate < dateNow) {
		yearNow= ((yearNow) + 1);
		passDate.setFullYear(yearNow, mm, dd);
	}
	return passDate;
}

function dateDiff(date1,date2) {
	var date1= new Date(date1);
	var date2= new Date(date2);
	var ONE_DAY = 1000 * 60 * 60 * 24;
	var date1_ms = date1.getTime();
	var date2_ms = date2.getTime();
	var difference_ms = Math.abs(date1_ms - date2_ms);
	return (Math.round(difference_ms/ONE_DAY));
}

function arrayOut(arr) {
	arrays= arr.toString();
	return arrays;
}

function skyMileBuckets(OMTR_miles) {
	if (OMTR_miles<5000) { return "<5000"; }
	else if (OMTR_miles >=5000 && OMTR_miles <=9999) { return "5000-9999"; }
	else if (OMTR_miles >=10000 &&  OMTR_miles <=14999) { return "10000-14999"; }
	else if (OMTR_miles >=15000 &&  OMTR_miles <=19999) { return "15000-19999"; }
	else if (OMTR_miles >=20000 &&  OMTR_miles <=24999) { return "20000-24999"; }
	else if (OMTR_miles >=25000 &&  OMTR_miles <=29999) { return "25000-29999"; }
	else if (OMTR_miles >=30000 &&  OMTR_miles <=34999) { return "30000-34999"; }
	else if (OMTR_miles >=35000 &&  OMTR_miles <=39999) { return "35000-39999"; }
	else if (OMTR_miles >=40000 &&  OMTR_miles <=44999) { return "40000-44999"; }
	else if (OMTR_miles >=45000 &&  OMTR_miles <=49999) { return "45000-49999"; }
	else if (OMTR_miles >=50000 &&  OMTR_miles <=54999) { return "50000-54999"; }
	else if (OMTR_miles >=55000 &&  OMTR_miles <=59999) { return "55000-59999"; }
	else if (OMTR_miles >=60000 &&  OMTR_miles <=64999) { return "60000-64999"; }
	else if (OMTR_miles >=65000 &&  OMTR_miles <=69999) { return "65000-69999"; }
	else if (OMTR_miles >=70000 &&  OMTR_miles <=74999) { return "70000-74999"; }
	else if (OMTR_miles >=75000 &&  OMTR_miles <=79999) { return "75000-79999"; }
	else if (OMTR_miles >=80000 &&  OMTR_miles <=84999) { return "80000-849999"; }
	else if (OMTR_miles >=85000 &&  OMTR_miles <=89999) { return "85000-89999"; }
	else if (OMTR_miles >=90000 &&  OMTR_miles <=94999) { return "90000-94999"; }
	else if (OMTR_miles >=95000 &&  OMTR_miles <=99999) { return "95000-99999"; }
	else if (OMTR_miles >=100000 &&  OMTR_miles <=104999) { return "100000-104999"; }
	else if (OMTR_miles >=105000 &&  OMTR_miles <=109999) { return "105000-109999"; }
	else if (OMTR_miles >=110000 &&  OMTR_miles <=114999) { return "110000-114999"; }
	else if (OMTR_miles >=115000 &&  OMTR_miles <=119999) { return "115000-119999"; }
	else if (OMTR_miles >=120000 &&  OMTR_miles <=124999) { return "120000-124999"; }
	else if (OMTR_miles >=125000 &&  OMTR_miles <=129999) { return "125000-129999"; }
	else if (OMTR_miles >=130000 &&  OMTR_miles <=134999) { return "130000-134999"; }
	else if (OMTR_miles>135000) { return ">135000"; }
	else {}
}

function adjustCurrencyCode(omtr_currency) {
	if (omtr_currency=="RON" ) { return "ROL"; }
	if (omtr_currency=="IDR") { return "JOD"; }
	if (omtr_currency=="TDY" ) { return "TRL"; }
	else { return omtr_currency; }
}

function clearArray(arrayName) {
	for(i=0;i<arrayName.length;i++) {
		if (arrayName[i]=="") {
			arrayName.length= i;
			break;
		}
	}
}


/*** File /myitinerary/components/dwr/itindetails_dwr.js ***/
/* Optimost test on this page

	-  //Optimost function
	
			*/
			
/*** To disable IROP functionality ***

Line 198 – comment out the following lines,
	if(data.iropPresent == true){
		IROP = true;
	}

Line 469 – comment out the following line, and replace with ‘IROP = false;’
IROP = data.iropPresent;

***/

var recordLocator = '';
var lastName = '';
var firstName = '';
var dlRecordLocator = '';
var prevDisplayedPNR = '';
var skymilesNoPending = 0;
var setIROPPageName = false;
var myitin_timeout_tid;
var dwrResponse = null;
DWREngine.setErrorHandler(handleError);

function handleError(){ hide('processing'); }
 
function getDetail(pnrNo) {
	try {
		data = null;
		getDetailNew(pnrNo);
	} catch (e) {
		handleError();
	}
}
function getDetailNew(pnrNo) {
	try {
		if (prevDisplayedPNR == pnrNo ) {
			prevDisplayedPNR ='';
			hide('tripDetailsClose'+pnrNo);
			hide('tripDetails');
			show('tripDetailsOpen'+pnrNo);
		} else {
			hide("skyPriority");
			hide("spBySMLevel");
			hide("spByFareClass");
			initDetails(pnrNo);
			recordLocator = '';
			dlRecordLocator = '';
			lastName = '';
			firstName = '';
			ItineraryDetailsProcessor.getItinerary(pnrNo, processResponse);
		}
		
	} catch (e) {
		handleError();
	}
}

function cleanSCPnr() {
	try {
		var pnrNum = recordLocator;
		var lName = lastName;
		var fName = firstName;
		initDetails(pnrNum);
		recordLocator = '';
		dlRecordLocator = '';
		lastName = '';
		firstName = '';
		CleanScheduleChangedPnrProcessor.cleanSCPnr(pnrNum, lName, fName, processResponse);
		skymilesNoPending = 0;
	} catch (e) {
		handleError();
	}
}

function setDWRError(error) {
	if (!exists(error) || error === "") {
		hide('alerts_errors');
	} else {
		if (error.indexOf('Session') > -1) {
			window.location = "/myitinerary/itin_session_expired/index.jsp";
		} else {
			var errorTxt = '';
			errorTxt = '<div class="error">';
			if (error == '205890' || error == '205892' || error == '205895' || error == '205894' || error == '205896' || error == '205897' || error == '205898' || error == '205899') {
				errorTxt += 'System Unavailable We\'re sorry but this service is not available at this time. Please try again later.';
			} else if (error == '205901' || error == '205893' || error == '205891' || error == '20999' || error == '20006' ) {
				errorTxt += 'We couldn\'t find any reservations with the information you have provided.';
				errorTxt += ' Try searching for it again using your eTicket number below.';
			} else if (error == '205902' || error == '205900') {
				errorTxt += 'Let\'s Try That Again <br />Return shortly to <a href="/myitinerary/itinLanding.action">Itineraries & Check-in</a>';
				errorTxt += ' and try your request again. If the problem continues, <a href="/help/contact_us/index.jsp">contact us</a> for help.';
				errorTxt += ' Message # 999';
			} else if (error == '205903') {
				errorTxt += 'There are no remaining flights in this reservation. Please call your <a target="_blank" href="http://www.delta.com/help/contact_us/reservations/index.jsp">local reservations office</a> for assistance.';
			} else {
				errorTxt += 'System Unavailable We\'re sorry but this service is not available at this time. Please try again later.';
			}
			errorTxt += '</div>';
			if (errorTxt != '') {
				setInnerHTML('alerts_errors', errorTxt);
				show('alerts_errors');
				window.location = '#errors_anchor';
			}
		}
		hide('processing');
		show('alerts_errors');
		expandTable('search');
	}
}

function processResponse(data) {
	try {
		if (data == null ) {
			handleError();
		} else {
			setDWRError(data.error);
			if ( !exists(data.error) || data.error === "" ) {
				processResponseNew(data);
			}
		}
	} catch (e) {
		handleError();
	}
}

function processResponseNew(data) {
	dwrResponse = data;
	try {
		if (data == null) {
			hide("skyPriority");
			hide("spBySMLevel");
			hide("spByFareClass");
			hide("processing");
			hide("tripDetails");
			hide("displayPaxInfo");
			show('detailNotFound');
		} else {
			setRecordLocator(data);
			addLinks(data); 
			setHoldMsg(data);     
			setRedeemMsg(data);  
			addHiddenValues(data);
			if (data.iropPresent) {
				IROP = true;
			}
			try {
				setOmnitureTracking.setOmniturePageName(IROP, data.showFindAltLink);	
			} catch (e){ }
			hide('processing');
			itineraryDisplayController.display(data);
			setButtons(data);
			publishLegend(data);
			displayPriceInfo(data);
			hide("NWAOperated");
			hide("pwmNoUpgrade");
			hide("pwmUpgrade");
			isDprtCityNWConstrainedCity = false;
			if (data.PWM){
				if (data.medallion){
					show("pwmUpgrade");
				} else {
					show("pwmNoUpgrade");
				}
			}
			if(data.skyPriorityMember || (data.skyPriorityMember && data.skyPriorityFare)) {
				show("skyPriority");
				show("spBySMLevel");
				isSkyPriorityEligible = true;
			} else if (data.skyPriorityFare) {
				show("skyPriority");
				show("spByFareClass");
				isSkyPriorityEligible = true;
			} else {
				isSkyPriorityEligible = false;
			}
	
		  	//Optimost function
			if (typeof(renderOptimost) == "function") {
				renderOptimost();
			}
			//End Optimost function
			refreshmyitin_timeout();
		}
		if (exists(get('summarySection'))) {
			window.location = '#detail';
		} else {
			window.location = '#summary'; 
		}
	} catch (e) {
		handleError();
	}
}  

function updatePassengerInfo(pnr) {
	collapseTable('seating');
	ItineraryDetailsProcessor.getItinerary(pnr, updatePaxInfo);
}

function updatePaxInfo(data) {
	if (data != null) {
		collapseTable('seating');
		itineraryDisplayController.getSegmentsFromTrips(data);
		populatePassengerTable(data);
		expandTable('seating');
	}
}

function updateInfo(pnr) {
	ItineraryDetailsProcessor.getItinerary(pnr, rebuild);
}

function rebuild(data) {
	itineraryDisplayController.display(data);
	if (anyConfirmed(data)) {
		updatePaxInfo(data);
	}
	publishLegend(data);
	displayPriceInfo(data);
	hide("pwmNoUpgrade");
	hide("pwmUpgrade");
	if (data.PWM) {
		if (data.medallion) {
			show("pwmUpgrade");
		} else {
			show("pwmNoUpgrade");
		}
	}
}

function anyConfirmed(data) {
	var segArray = data.reservationSegments;
	for (var i = 0; i < segArray.length; i++) {
		var status = segArray[i].upgradeStatus;
		if (status.indexOf('CONFIRM') > -1 ) {
			return true;
		}
	}
	return false;
}

function setRecordLocator(data) {
	dlRecordLocator = exists(data.DLRecordLocator) && data.DLRecordLocator !== "" ? data.DLRecordLocator : data.recordLocator;
	recordLocator = data.recordLocator;
	lastName = data.lastName;
	firstName = data.firstName;
}

function refreshmyitin_timeout() {
	try {
		clearInterval(myitin_timeout_tid);
		myitin_timeout_tid = setInterval("myitin_timeout()", 1260000);
	} catch (e) {}
}

function myitin_timeout() {
	timeoutURL = '/myitinerary/itinSearch.action';
	if ( timeoutURL != null ) {
		window.location.replace(timeoutURL);
	}
}
	
function addLinks(data) {
	var requestParams = '?recLocId=' + dlRecordLocator + '&firstName=' + data.firstName + '&lastName=' + data.lastName + '&creationCarrierCode=' + DELTA_CODE;

	var emailItin = "<a href=\"javascript:openWin('/myitinerary/email_itin_form/popup_index.jsp" + requestParams + "','emailItinerary',648,600,'yes');\">Email Itinerary</a>";
	setInnerHTML('EmailItineraryLink', emailItin);

	var printItin = "<a href=\"javascript:openWin('popup_printItinerary.action" + requestParams + "','printItinerary',730,500,'yes');\">Print Itinerary</a>";
	setInnerHTML('PrintItineraryLink', printItin);

	var GCLink = "<a href=\"javascript:openWin('/myitinerary/calendar/GCform.jsp?recLocId=" + dlRecordLocator + "&checkSum=" + data.checkSum + "&src=myitinerary','AGC',450, 150,'yes');\">Add to Google Calendar</a>";	
	setInnerHTML('GCMeetingRequestLink', GCLink);

	var emailReciept = "<a href=\"javascript:openWin('/myitinerary/send_eticket_form/popup_index.jsp" + requestParams + "','emailreciept',648,600,'yes');\">Email Receipt</a>";
	setInnerHTML('EmailRecieptLink', emailReciept);

	var confirmContactInfo = 0;

	if (data.reconfirmed) {
		confirmContactInfo = "Your contact information has been updated.";
		setInnerHTML('ctc_reconfirmed', confirmContactInfo);
		show('ctc_reconfirmed');
		hide('ctc_default');
	} else {
		if (data.phoneNumber || data.emailAddress) {
			confirmContactInfo = "We'll send flight updates for this trip using the contact information we have on file. <a href=\"javascript:void[0];\" onclick=\"javascript:DeltaOverlayUtil.showPopupOverlay('components/myitinerary_overlay/confirm_contact_info_overlay.jsp?recLocId=" + dlRecordLocator + "&phoneNumber=" + data.phoneNumber + "&emailAddress=" + data.emailAddress + "', 'confirm_contact_info', 450, 310, 'no');\">Edit contact info</a>";
		} else {
			confirmContactInfo = "We don't have your contact information yet. Please <a href=\"javascript:void[0];\" onclick=\"javascript:DeltaOverlayUtil.showPopupOverlay('components/myitinerary_overlay/confirm_contact_info_overlay.jsp?recLocId=" + dlRecordLocator + "', 'confirm_contact_info', 450, 310, 'no');\">enter it now</a> so we can send you flight updates for this trip.";
		}
		setInnerHTML('ctc_default', confirmContactInfo);
		show('ctc_default');
		hide('ctc_reconfirmed');
	}
	if (data.migratedPnr) {
		setInnerHTML('nwMigratedPnrInfo', 'Your Northwest itinerary is now a Delta itinerary.  <a href="javascript:openHelp2(\'/components/popups/merger/itinerary_popup.jsp\', \'itinFaqs\' , 670);" onclick="var s=s_gi(s_account); s.tl(this,\'o\',\'Itinerary FAQs from Merged PNR\');" title="learn more">Learn More</a>');
		show('nwMigratedPnrInfo');
	} else {
		hide('nwMigratedPnrInfo');
	}
}

function addHiddenValues(data) {
 	var allForms = document.forms;
	for (var i = 0; i < allForms.length; i++) {
		if (allForms[i].recLocId != null){
			allForms[i].recLocId.value = dlRecordLocator;
		}
 		if (allForms[i].checkSum != null){
 			allForms[i].checkSum.value = data.checkSum;
 		}
		if (allForms[i].firstNameId != null) {
			allForms[i].firstNameId.value = data.firstName;
		}
		if (allForms[i].lastNameId != null) {
			allForms[i].lastNameId.value = data.lastName;
			try {
				if (data.nameSuffix && data.nameSuffix != null) {
					allForms[i].lastNameId.value =   data.lastName + ' ' + data.nameSuffix;
				}
			} catch (e) { }
		}
		if (allForms[i].pwmId != null) {
			if (data.partialPWM) {
				allForms[i].pwmId.value = 'partial';
			} else if (data.fullPWM) {
				allForms[i].pwmId.value = 'partial';
			} else {
				allForms[i].pwmId.value = '';
			}
		}
		if (allForms[i].SCCleanedPnrId != null) {
			if (data.SCCleanedPnr || data.migratedPnr) {
				allForms[i].SCCleanedPnrId.value = 'Y';
			} else {
				allForms[i].SCCleanedPnrId.value = 'N';
			}
		}
	}
 }
 
 function initDetails(newpnrNo) {
	show('tripDetailsOpen'+prevDisplayedPNR);
	hide('tripDetailsClose'+prevDisplayedPNR);
	prevDisplayedPNR = newpnrNo;	
	hide('tripDetailsOpen'+newpnrNo);
	hide('tripDetails');
	show('tripDetailsClose'+newpnrNo);
	show('processing');
}

function setTripDetailHdr(data, divId) {
	try {
		if (data[0] != null) {
			var pluralText = data[1] ? 'Flights' : 'Flight';
			var segments = data[0].segments;
			var deptCity = segments[0].departureCityName + ' (' +segments[0].departureAirportCode + ')' ;
			var arrivalCity = 'to ' + segments[segments.length - 1].arrivalCityName + ' (' +segments[segments.length - 1].arrivalAirportCode + ')';
			var deptDate = 'on ' + segments[0].formattedDepartureDate;
			var alertText = 'Your Next ' + pluralText + ': ';
			if (!IROP) {
				switch (divId) {
					case 'checkin':
						alertText = 'Your Next ' + pluralText + ': ';
						break;
					case 'remaining':
						alertText = 'Other ' + pluralText + ' in this Reservation: ';
						break;
					default:
						break;
				}
				if (!IROP && itineraryDisplayController.SCCleanedPnr) {
					get('checkin_td_header').className += ' success';
					alertText = 'Confirmed Flight(s): ';
				}
			} else {
				setIROPMsgData();
				if (IROP_PNR_CLEAN && divId.match('checkin')) {
					get('checkin_td_header').className += ' success';
					alertText = 'Confirmed Flights(s): ';
				} else {
					switch (divId) {
						case 'checkin':
							if (getAffectedFlightInfo.affTrip != '') {
								segments = getAffectedFlightInfo.affTrip;
								deptCity = segments.departureCityName + ' (' +segments.departureAirportCode + ')' ;
								arrivalCity = 'to ' + segments.arrivalCityName + ' (' +segments.arrivalAirportCode + ')';
								deptDate = 'on ' + segments.formattedDepartureDate;
								get('checkin_td_header').className += ' cpyError';
								alertText = 'Affected ' + pluralText + ': ';
							} else {
								deptCity = '';
								arrivalCity = '';
								deptDate = '';
								get('checkin_td_header').className += ' cpyError';
								alertText = 'Affected ' + pluralText + ': ';
							}
							break;
						case 'irop':
							alertText = 'Alternate ' + pluralText + ': ';
							break;
						case 'remaining':
							alertText = 'Other ' + pluralText + ' in this Reservation: ';
							break;
						default:
							break;
					}
				}
			}
			if (!IROP) {
				if (divId == 'remaining' ) {
					show('segments_table_control');
					deptCity = alertText;
					arrivalCity = '';
					deptDate = '';
				} else {
					deptCity = alertText + deptCity;
				}
			} else {
				if ((divId == 'remaining' || divId == 'irop') && displayedItin.showFindAltLink) {
					collapseTable('segments');
					deptCity = alertText;
					arrivalCity = '';
					deptDate = '';
				} else {
					deptCity = alertText + deptCity;
				}
			}
			setInnerHTML(divId + '_td_deptCity', deptCity);
			setInnerHTML(divId + '_td_arrCity', arrivalCity);
			setInnerHTML(divId + '_td_date', deptDate);
			show(divId + '_td_header');
			if (dlRecordLocator !== recordLocator) {
				setInnerHTML('oaRecordLocatorText', recordLocator);
				show('oaRecordLocatorInfo');
				setInnerHTML('dlRecordLocatorText', dlRecordLocator);
			} else {
				hide('oaRecordLocatorInfo');
				setInnerHTML('oaRecordLocatorText', '');
				setInnerHTML('dlRecordLocatorText', '');
			}
		}
	} catch (e) { }
}

function setIROPMsgData() {
	var affCityName = (getAffectedFlightInfo.affTrip.arrivalCityName != null) ? getAffectedFlightInfo.affTrip.arrivalCityName : getAffectedFlightInfo.affArrCity ;
	var affAirportCode = (getAffectedFlightInfo.affTrip.arrivalAirportCode != null) ? getAffectedFlightInfo.affTrip.arrivalAirportCode : getAffectedFlightInfo.affArrCityCode ;
	var msgString = '';
	if (affCityName != null && affAirportCode != null) {
		msgString = affCityName + "&nbsp;(" + affAirportCode + ")";
		setInnerHTML('iropMsg_td_arrCity', msgString);
		setInnerHTML('iropMsg_td_date', getAffectedFlightInfo.affDate);
		setInnerHTML('delay_type_msg', itineraryDisplayController.iropType + '&nbsp;');
	} else {
		msgString = 'There has been a flight ' + itineraryDisplayController.iropType + ' affecting your trip. But, don\'t worry, '; 
		setInnerHTML('irop_flight_info_msg', msgString);
	}
}

var itineraryDisplayController = {
	localConCatTool:new conCatTool(),
	currentSegment:null,
	currentPNR:null,
	linkURLStart:null,
	dwrData:null,
	segmentCount:0,
	segmentsArray:['sessionId','mctCompliant'],
	checkinTrips:[],
	affectedTrips:[],
	protectionTrips:[],
	remainingTrips:[],
	buildingTrip:'',
	isProperlyInitialized:false,
	eligibleForCheckin:false,
	iropAffectedFlight:'',
	iropStatusDesc:null,
	iropRecoveryType:null,
	errorDesc:null,
	iropType:'cancellation',
	nonIropDelay:false,
	iropAppMsgCode:'', /* assigned by MSG_CODE in /itin_display/index.jsp */
	iropAppRecovered:'', /* assigned by DONE in /itin_display/index.jsp */
	iropAppFrom:'', /* assigned by IROP_RECOVERED in /itin_display/index.jsp */
	inhibitAcceptOptions:false,
	SCInPnr:'',
	misconnectInPnr:'',
	SCCleanedPnr:'',
	display:function(data) {
		try {
			this.clearPrevResData();
			this.dwrData = data;
			IROP = data.iropPresent;
			displayedItin = data;
			this.SCInPnr = data.SCInPnr; 
			this.misconnectInPnr = data.misconnectInPnr; 
			this.SCCleanedPnr = data.SCCleanedPnr; 
			this.iropRecoveryType = (exists(data.recoveredType)) ? data.recoveredType : '';
			this.eligibleForCheckin = data.eligibleForCheckin;
			if (this.dwrData !== null && this.dwrData.error === null && data.trips != null) {
				this.tripsInPNR = data.trips.length;
				this.getSegmentsFromTrips(data);
				populatePassengerTable(data);
				expandTable('seating');
				setSegmentCountForSegmentTable(data.reservationSegments);
				if (IROP && this.dwrData.showFindAltLink) {
					collapseTable('seating');
					this.setIropState();
					this.setTrips(data);
					this.processIropAppResponse();
					this.iropAffectedFlight = data.affectedFlightNo;
					getAffectedFlightInfo.init(this.affectedTrips);
					this.doIropDisplay(data);
				} else {
					IROP = false;
					hide('irop_table_container');
					hide('irop_td_header');
					hide( 'itinerary_irop_msg');
					show('itin_actions');
				}
				setSchedChangeMsg(data);
				this.buildItineraries(data);
				this.setTripDetailHeaders();
			} else {
				setDWRError('205900')
			}
		} catch(e) {
			this.handleError(e, 'display');	
		}
	},
	getSegmentsFromTrips:function(data) {
		try {
			this.segmentsArray = [];
			var tripIndex = 0;
			var tripData = data.trips[tripIndex].segments;
			this.segmentsArray['sessionId'] = data.sessionId;
			this.segmentsArray['mctCompliant'] = true;
			while (tripIndex < data.trips.length) {
				if (data.trips[tripIndex].tripType == 'O') {
					this.checkinTrips.push(data.trips[tripIndex]);		
				} 
				if (data.trips[tripIndex].tripType == 'N') {
					this.remainingTrips.push(data.trips[tripIndex]);
				}
				if (data.trips[tripIndex].tripType == 'P') {
					IROP_PROTECTED = true;
					this.protectionTrips.push(data.trips[tripIndex]);
				}
				if (IROP && data.trips[tripIndex].internationalTrip) {
					setStyleAttr('td_passport_visa_link', 'display', 'list-item');	
					setStyleAttr('passport_visa_link', 'display', 'list-item');	
				}
				tripData = data.trips[tripIndex].segments;
				if(!data.trips[tripIndex].mctCompliant){
					this.segmentsArray['mctCompliant'] = data.trips[tripIndex].mctCompliant;	
				}
				for (var i=0, j = tripData.length; i<j; i++) {
					this.segmentsArray.push(tripData[i]);
					if (tripData[i].dprtCityNWConstrainedCity) {
						isDprtCityNWConstrainedCity = true;
						show("NWAOperated");
					}
					if (!IROP && (tripData[i].departureDelayInMins > 0 || tripData[i].arrivalDelayInMins > 0)) {
						this.nonIropDelay = true;	
					}
				}
				tripIndex++;
			}
			if (IROP) {
				if (data.iropType == 'delay') {
					this.iropType = data.iropType
				} else if (data.iropType != '') {
					this.iropType = 'cancellation'	
				}
				if (!this.dwrData.showFindAltLink && this.protectionTrips.length > 0) {
					IROP_PNR_CLEAN = true;
					this.setTrips(data);
				}
			}
			data.reservationSegments = null;
			data.reservationSegments = this.segmentsArray;
		} catch(e) {
			this.handleError(e, 'getSegmentsFromTrips');	
		}
	},
	setTrips:function(data) {
		try {
			if (IROP_PNR_CLEAN) {
				if (this.protectionTrips.length > 0 && !this.checkinTrips.length > 0) {
					this.checkinTrips = this.protectionTrips;
					this.protectionTrips = [];
				}
			} else {
				if (this.checkinTrips.length > 0) {
					this.affectedTrips = this.checkinTrips;
					this.checkinTrips = [];
				}
			}
		} catch(e) { }
	},
	setIropState:function() {
		if (this.iropRecoveryType == '') {
			if (this.protectionTrips.length == 1 && !this.checkinTrips.length > 0) {
				IROP_PNR_CLEAN = true;
			}
		} else {
			if (this.iropRecoveryType == 'user' || this.iropRecoveryType == 'system') {
				IROP_PNR_CLEAN = true;
			}				
		}
	},
	buildItineraries:function(data) {
		try {
			expandTable("segments");
			show('tripDetails'); 
			hide('processing');
			hide('detailNotFound');
			setInnerHTML('td_recLocator', dlRecordLocator);
			optOut = data.optOut;   
			isEligible = data.eligibleForUpgrade;
			var tripIndex = 0;
			var tripData = null;
			if (!IROP) {
				hide(['itinerary_irop_msg', 'summary_irop_msg']);
				if (this.checkinTrips.length > 0) {
					this.buildingTrip = 'checkin';
					show('checkin_table_container');
					checkinTableController(this.checkinTrips);
				}
				if (this.remainingTrips.length > 0) {
					this.buildingTrip = 'remaining';
					remainingTableController(this.remainingTrips);
					expandTable('segments');
				} else {
					hide('segments_table_control');
					hide('segments_table_container');
				}
			} else {
				if (!IROP_PNR_CLEAN) {
					if (this.protectionTrips.length > 0) {
						this.buildingTrip = 'protection';					
						show('irop_table_container');
						show('irop_segmentsFootInfo');
						iropTableController(this.protectionTrips);
					}
					if (this.affectedTrips.length > 0) {
						this.buildingTrip = 'affected';
						show('checkin_table_container');
						checkinTableController(this.affectedTrips);
					}
					if (this.remainingTrips.length > 0) {
						this.buildingTrip = 'remaining';
						remainingTableController(this.remainingTrips);
					} else {
						hide('segments_table_control');
						hide('segments_table_container');
					}
				} else {
					if (this.checkinTrips.length > 0) {
						this.buildingTrip = 'checkin';
						show('checkin_table_container');
						checkinTableController(this.checkinTrips);
					}
					if (this.affectedTrips.length > 0) {
						this.buildingTrip = 'affected';
						show('checkin_table_container');
						checkinTableController(this.affectedTrips);
					}
					if (this.remainingTrips.length > 0) {
						this.buildingTrip = 'remaining';
						remainingTableController(this.remainingTrips);
						expandTable('segments');
					} else {
						hide('segments_table_control');
						hide('segments_table_container');
					}
				}
			}
		} catch(e) {
			this.handleError(e, 'buildItineraries');	
		}
	},
	setTripDetailHeaders:function() {
		if (!IROP || (IROP && IROP_PNR_CLEAN)) {
			if (this.checkinTrips.length > 0) {
				setTripDetailHdr(this.checkinTrips, 'checkin');
			}
			if (this.remainingTrips.length > 0) {
				setTripDetailHdr(this.remainingTrips, 'remaining');
			}
		} else {
			if (this.protectionTrips.length > 0) {
				setTripDetailHdr(this.protectionTrips, 'irop');
			}
			if (this.affectedTrips.length > 0) {
				setTripDetailHdr(this.affectedTrips, 'checkin');
			}
			if (this.remainingTrips.length > 0) {
				setTripDetailHdr(this.remainingTrips, 'remaining');
			}
		}
	},
	clearPrevResData:function() {
		try {
			this.currentSegment = null;
			this.currentPNR = null;
			this.linkURLStart = null;
			this.dwrData = null;
			this.checkinTrips = [];
			this.affectedTrips = [];
			this.protectionTrips = [];
			this.remainingTrips = [];
			this.buildingTrip = '';
			this.segmentCount = 0;
			this.segmentsArray = ['sessionId','mctCompliant'];
			this.isProperlyInitialized = false;
			this.eligibleForCheckin = false;
			this.iropAffectedFlight = '';
			this.iropStatusDesc = null;
			this.iropRecoveryType = null;
			this.errorDesc = null;
			this.iropType = 'cancellation';
			this.nonIropDelay = false;
			this.iropAppMsgCode = '';
			this.iropAppRecovered = '';
			this.iropAppFrom = '';
			this.inhibitAcceptOptions = false;
			this.SCInPnr = false;
			this.misconnectInPnr = false;
			this.SCCleanedPnr = false;
			DWRUtil.removeAllRows('checkin_segmentsBody');
			setClassName('checkin_td_header', 'itinerary_header');
			DWRUtil.removeAllRows('irop_segmentsBody');
			setClassName('irop_td_header', 'itinerary_header');
			DWRUtil.removeAllRows('remaining_segmentsBody');
			setClassName('remaining_td_header', 'itinerary_header');
		} catch(e) {
			this.handleError(e, 'clearPrevResData');
		}
	},
	doIropDisplay:function(data) {
		try {
			if (!IROP_PNR_CLEAN && ((this.dwrData.showFindAltLink && this.iropType != 'delay') || this.protectionTrips.length > 0)) {
				hide('itin_actions');
			}
			if (data.showEULink) {
				show('exit_EU_link');
			}
			if (exists(get('iropTable_AF_link'))) {
				get('iropTable_AF_link').href += this.segmentsArray['sessionId'];
			}
			if (exists(get('checkinTable_AF_link'))) {
				get('checkinTable_AF_link').href += this.segmentsArray['sessionId'];
			}
			if (exists(get('irop_itin_msg_action'))) {
				get('irop_itin_msg_action').href += this.segmentsArray['sessionId'];
			}
			var iropStatusDescription = "irop_";
			show('itinerary_irop_msg');
			show('summary_irop_msg');
			if (IROP_PNR_CLEAN) {
				if (this.iropAppFrom != null && this.iropAppFrom != 'null') {
					iropStatusDescription += "recovered_user";
					expandTable('seating');
				} else {
					if (this.iropRecoveryType == 'user') {
						hide('itinerary_irop_msg');
						hide('summary_irop_msg');
						expandTable('seating');
					} else {
						iropStatusDescription += "recovered_system";
					}
				}
			} else if (this.iropAppFrom != null) {
				if (IROP_PROTECTED) {
					iropStatusDescription += "protected_";	
				} else {
					iropStatusDescription += "unprotected_";	
				}
				if (this.iropType == 'delay') {
					iropStatusDescription += this.iropType;
				} else {
					iropStatusDescription += 'cancelled';
				}
			} else {
				if (IROP_PROTECTED) {
					iropStatusDescription += "protected_";	
				} else {
					iropStatusDescription += "unprotected_";	
				}
				if (this.iropType == 'delay') {
					iropStatusDescription += this.iropType;
				} else {
					iropStatusDescription += 'cancelled';
				}
			}
			this.iropStatusDesc = iropStatusDescription;
			if (exists(get('itinerary_irop_msg'))) {
				setClassName('itinerary_irop_msg', this.iropStatusDesc);
			}
			if (IROP_PNR_CLEAN) {
				show('checkin_segmentsFootInfo');
				if (!this.checkinTrips.length > 0) {
					hide('checkin_table_container');
				}
				if (!this.eligibleForCheckin) {
					hide('sys_recover_p'); /* itinerary_irop_msg checkin line & summary_irop_msg checkin line */
					hide('summary_checkin_li'); /* itinerary_irop_msg checkin line & summary_irop_msg checkin line */
				}
			}
		} catch(e) {
			this.handleError(e, 'doIropDisplay');
		}
	},
	processIropAppResponse:function() {
		this.iropAppMsgCode = MSG_CODE;
		this.iropAppRecovered = IROP_RECOVERED;
		this.iropAppFrom = FROM;
		this.iropAppMsgCode = parseInt(this.iropAppMsgCode);
		if (this.iropAppRecovered == 'N') {
			var msgText = '';
			switch (this.iropAppFrom) {
				case 'faf':
					msgText += '<div class="alert">We were unable to find alternate flights for your itinerary. You can attempt to find alternate flights again, or contact a <a href="/help/contact_us/reservations/index.jsp" target="_blank">Delta representative</a> who will be happy to assist you.</div>';
					setInnerHTML('alerts_errors', msgText);
					show('alerts_errors');
					window.location = '#errors_anchor';
					break;
				case 'ps':
					msgText += '<div class="alert">There was an error processing your alternate flight selection. You can attempt to select the flight again, or contact a <a href="/help/contact_us/reservations/index.jsp" target="_blank">Delta representative</a> who will be happy to assist you.</div>';
					if (this.iropAppMsgCode == '1101') {
						msgText = '<div class="error">Sorry, we were unable to complete your last request because your itinerary was being updated. Please review your trip details for changes before you proceed.</div>';	
					}
					if (this.iropAppMsgCode == '1103' || this.iropAppMsgCode == '1001') {
						msgText = '<div class="error">Sorry, we could not update your itinerary at this time. please try again or call <a href="/help/contact_us/reservations/index.jsp" target="_blank">your local reservations office</a> for assistance.</div>';	
					}
					if (this.iropAppMsgCode == '1105') {
						msgText = 'Sorry, we were unable to make the change you requested. Please call your <a href="/help/contact_us/reservations/index.jsp" target="_blank">local reservations office</a> for help.';
					}
					setInnerHTML('alerts_errors', msgText);
					show('alerts_errors');
					window.location = '#errors_anchor';
					break;
				case 'ss':
					msgText += '<div class="alert">There was an error processing your alternate flight selection. You can attempt to find alternate flights again, or contact a <a href="/help/contact_us/reservations/index.jsp" target="_blank">Delta representative</a> who will be happy to assist you.</div>';
					if (this.iropAppMsgCode == '1101') {
						msgText = '<div class="error">Sorry, we were unable to complete your last request because your itinerary was being updated. Please review your trip details for changes before you proceed.</div>';	
					}
					if (this.iropAppMsgCode == '1105') {
						msgText = 'Sorry, we were unable to make the change you requested. Please call your <a href="/help/contact_us/reservations/index.jsp" target="_blank">local reservations office</a> for help.';
					}
					setInnerHTML('alerts_errors', msgText);
					show('alerts_errors');
					window.location = '#errors_anchor';
					break;
				default:
					msgText += '<div class="alert">We encountered an error while processing your alternate flight selection. Please check your flights below to ensure accuracy. If you are not satisfied, you may attempt to find alternate flights again, or contact a <a href="/help/contact_us/reservations/index.jsp" target="_blank">Delta representative</a> who will be happy to assist you.</div>';
					setInnerHTML('alerts_errors', msgText);
					show('alerts_errors');
					window.location = '#errors_anchor';
					break;					
			}
		} else if (this.iropAppRecovered == 'Y') {
			if (this.iropAppMsgCode == '1150') {
				this.inhibitAcceptOptions = true;
				IROP_RECOVERED = 'N';
				MSG_CODE = '1105';
				FROM = 'ps';
				this.processIropAppResponse();
			} else {
				this.iropRecoveryType = 'user';	
				setInnerHTML('possessive_noun', 'your'); /* in itinerary_irop_msg.jsp */
			}
		}
	},
	getDelayDisplay:function(delayInMin) {
		try {
			var returnDelay = ['hours', 'minutes'];
			var depDelayHrs = 0;
			var depDelayMin = parseInt(delayInMin);
			if (depDelayMin > 60) {
				depDelayHrs = depDelayMin / 60;
				depDelayHrs = Math.floor(depDelayHrs);
				depDelayMin = depDelayMin % 60;
				returnDelay['hours'] = depDelayHrs;
				returnDelay['minutes'] = depDelayMin;
			} else {
				returnDelay['minutes'] = depDelayMin;
			}
			if (depDelayHrs > 1) {
				returnDelay['hours'] = returnDelay['hours'] + ' hours';
			} else if (depDelayHrs > 0 && depDelayHrs < 2) {
				returnDelay['hours'] = returnDelay['hours'] + ' hour';
			} else {
				displayDepDelayHrs = 0;
			}
			returnDelay['minutes'] = returnDelay['minutes'] + ' min';
			return returnDelay;
		} catch (e) {
			this.handleError(e, 'getDelayDisplay');	
		}
	},
	handleError:function(e, message) { }
};

var	getAffectedFlightInfo = {
	affFlightNo:null,
	affTrip:[],
	affDepCityCode:null,
	affArrCitycode:null,
	affDepCity:null,
	affArrCity:null,
	affDepTime:null,
	affArrTime:null,
	affCabin:null,
	affArrDelay:null,
	affDepDelay:null,
	affDate:null,
	affArrDate:null,
	hasAffectedFlightInfo:'no',
	init:function(affectedTrips) {
		this.affFlightNo = itineraryDisplayController.iropAffectedFlight;
		if (affectedTrips.length > 0) {
			for (var i = 0, j = affectedTrips.length; i < j; i++) {
				for (var s = 0, t = affectedTrips[i].segments.length; s < t; s++) {
					var segment = affectedTrips[i].segments[s];
					var multileg = affectedTrips[i].segments[affectedTrips[i].segments.length - 1];
					if (segment != null && segment.flightNumber == this.affFlightNo) {
						this.affTrip = affectedTrips[i].segments[s];
						this.affDepCityCode = segment.departureAirportCode;
						this.affArrCityCode = segment.arrivalAirportCode;
						this.affDepCity = segment.departureCityName;
						this.affArrCity = segment.arrivalCityName;
						this.affDepTime = segment.formattedDepartureTime;
						this.affArrTime = segment.formattedArrivalTime;
						this.affCabin = segment.cabinClassDescription;
						this.affArrDelay = segment.arrivalDelayInMins;
						this.affDepDelay = segment.departureDelayInMins;
						this.affDate = segment.formattedDepartureDate;
						this.affArrDate = multileg.formattedArrivalDate;
					}
				}
			}
			if (this.affArrDate != null && this.affArrCity != null && this.affDepCity != null) {
				this.hasAffectedFlightInfo = 'yes';	
			} else {
				this.affTrip = '';
				this.affArrCityCode = displayedItin.affectedFlightArrCityCde;
				this.affArrCity = displayedItin.affectedFlightArrCity;
				this.affDepCityCode = displayedItin.affectedFlightDepCity;
				this.affDepCity = displayedItin.affectedFlightDepCity;
				this.affDate = displayedItin.affectedFlightDate;
			}
		} else if (itineraryDisplayController.checkinTrips.length > 0) {
			var trip = itineraryDisplayController.checkinTrips;
			this.affDepCityCode = trip[0].segments[0].departureAirportCode;
			this.affArrCityCode = trip[0].segments[trip[0].segments.length -1].arrivalAirportCode;
			this.affDepCity = trip[0].segments[0].departureCityName;
			this.affArrCity = trip[0].segments[trip[0].segments.length -1].arrivalCityName;
			this.affDepTime = trip[0].segments[0].formattedDepartureTime;
			this.affArrTime = trip[0].segments[trip[0].segments.length -1].formattedArrivalTime;
			this.affCabin = trip[0].segments[0].cabinClassDescription;
			this.affArrDelay = trip[0].segments[trip[0].segments.length -1].arrivalDelayInMins;
			this.affDepDelay = trip[0].segments[0].departureDelayInMins;
			this.affDate = trip[0].segments[0].formattedDepartureDate;
			this.affArrDate = trip[0].segments[trip[0].segments.length -1].formattedArrivalDate;
			if (displayedItin.affectedFlightNo != "") {
				this.affFlightNo = displayedItin.affectedFlightNo;
			}
			if (displayedItin.affectedFlightArrCity != "") {
				this.affArrCity = displayedItin.affectedFlightArrCity;
			}
			if (displayedItin.affectedFlightArrCityCde != "") {
				this.affArrCityCode = displayedItin.affectedFlightArrCityCde;
			}
			if (displayedItin.affectedFlightDepCity != "") {
				this.affDepCity = displayedItin.affectedFlightDepCity;
			}
			if (displayedItin.affectedFlightDate != "") {
				this.affDate = displayedItin.affectedFlightDate;
			}
			if (this.affArrDate != null && this.affArrCity != null && this.affDepCity != null) {
				this.hasAffectedFlightInfo = 'yes';	
			}
		} else {
			return;	
		}
	},
	markChanges:function(column, segment) {
		var changes = ['flight', 'depCity', 'depTime', 'depDate', 'arrCity', 'arrTime', 'arrDate', 'cabin', 'upgrade'];
		switch (column) {
			case 'flight':
				break;
			case 'departure':
				changes['depCity'] = false;
				changes['depDate'] = false;
				changes['depTime'] = false;
				if (exists(segment.departureAirportCode) && !segment.departureAirportCode.match(this.affDepCityCode)) {
					if (this.affDepCityCode != null) {
						changes['depCity'] = true;
					}
				}
				if (exists(segment.formattedDepartureDate) && !segment.formattedDepartureDate.match(this.affDate)) {
					if (this.affDate != null) {
						changes['depDate'] = true;
					}
				}
				if (exists(segment.formattedDepartureTime) && !segment.formattedDepartureTime.match(this.affDepTime)) {
					if (this.affDepTime != null) {
						changes['depTime'] = true;
					}
				}
				break;
			case 'arrival':
				changes['arrCity'] = false;
				changes['arrDate'] = false;
				changes['arrTime'] = false;
				if (exists(segment.arrivalAirportCode) && !segment.arrivalAirportCode.match(this.affArrCityCode)) {
					if (this.affArrCityCode != null) {
						changes['arrCity'] = true;
					}
				}
				if (exists(segment.formattedArrivalDate) && !segment.formattedArrivalDate.match(this.affArrDate)) {
					if (this.affArrDate != null) {
						changes['arrDate'] = true;
					}
				}
				if (exists(segment.formattedArrivalTime) && !segment.formattedArrivalTime.match(this.affArrTime)) {
					if (this.affArrTime != null) {
						changes['arrTime'] = true;
					}
				}
				break;
			case 'cabin':
				changes['cabin'] = false;
				if (exists(segment.cabinClassDescription) && !segment.cabinClassDescription.match(this.affCabin)) {
					if (this.affCabin != null) {
						changes['cabin'] = true;	
					}							
				}
				break;
			case 'upgrade':
				break;
			default:
				break;
		}
		if (itineraryDisplayController.buildingTrip.match('protection')) {
			return changes;
		} else {
			return false;
		}
	}
};

function setSchedChangeMsg(data) {
	if (data.SCInPnr) {
		show('sc_msg');
		get('sc_msg').className = 'sc_action';
		setOmnitureTracking.setOmnitureEvents('scMessageDisplay');
	} else {
		get('sc_msg').className = '';
	}
	if (!IROP) {
		if (!data.SCInPnr && data.SCCleanedPnr && data.SCAutoCleaned && !data.misconnectInPnr && data.editItinAllowed) {
			get('sc_msg').className = 'sc_ack_auto_change';
		}
		if (!data.SCInPnr && data.SCCleanedPnr && data.SCAutoCleaned && !data.misconnectInPnr && !data.editItinAllowed) {
			get('sc_msg').className = 'sc_ack_auto';
		}
		if (!data.SCInPnr && data.SCCleanedPnr && !data.SCAutoCleaned && !data.misconnectInPnr && data.editItinAllowed) {
			get('sc_msg').className = 'sc_ack_user_change';
		}
		if (!data.SCInPnr && data.SCCleanedPnr && !data.SCAutoCleaned && !data.misconnectInPnr && !data.editItinAllowed) {
			get('sc_msg').className = 'sc_ack_user';
		}
		if (data.overlapMisconnect){
			hide('sc_mc_overlap');
		}
		if (!data.SCInPnr && data.SCCleanedPnr && data.SCAutoCleaned && data.misconnectInPnr && data.editItinAllowed) {
			get('sc_msg').className = 'sc_ack_auto_mc_change';
		}
		if (!data.SCInPnr && data.SCCleanedPnr && !data.SCAutoCleaned && data.misconnectInPnr && data.editItinAllowed) {
			get('sc_msg').className = 'sc_ack_user_mc_change';
		}
		if (!data.SCInPnr && data.SCCleanedPnr && data.SCAutoCleaned && data.misconnectInPnr && !data.editItinAllowed) {
			get('sc_msg').className = 'sc_ack_auto_mc_noChange';
		}
		if (!data.SCInPnr && data.SCCleanedPnr && !data.SCAutoCleaned && data.misconnectInPnr && !data.editItinAllowed) {
			get('sc_msg').className = 'sc_ack_user_mc_noChange';
		}
	}
}

function setHoldMsg(data) {
	hide('td_onHoldMsg');              
	if (data.awardTicket) {
		if ( data.showAwardTicketBtn && data.redeemItinAllowed) {
			show('td_onHoldMsg');              
		}
	}
}

function setAdvisoryMsg(data) {
    hide('td_advisoryMsg'); 
    setInnerHTML('td_advisoryMsgText', data.advisoryMsg);
    setInnerHTML('message', data.advisoryMsg);
    show('td_advisoryMsg');
}
function setRedeemMsg(data) {
	hide('td_redeemDataMsg');
	if (data.awardTicket && data.showAwardTicketBtn &&  data.redeemItinAllowed && data.expirationDate != null && data.expirationDate != '') {
		setInnerHTML('td_redeemExpDate', data.expirationDate);
		show('td_redeemDataMsg');
 	}
}
 
function setButtons(data) {
   	try {
		hide('td_editItin');
		hide('editItin_eligible');
		hide('editItin_ineligible');
		hide('td_cancelItin');
		hide('td_redeemAwardItin');
		hide('checkIn_eligible');
		hide('checkIn_ineligible');
		DWRUtil.setValue('recLocId', dlRecordLocator);
		var formRef = get('editForm');
		var redirectURL = '', redirectAction = '', redirectSiteCode = '';
		hide('editItin_eligible');
		hide('editItin_ineligible');
		redirectSiteCode = data.chgFltRedirectSiteCode;
		if (data.editItinAllowed && !IROP) {
			show('td_editItin');
			if ( (!(data.awardTicket && data.redeemItinAllowed ) && exists(redirectSiteCode)) ||
				 (data.awardTicket && exists(redirectSiteCode)) ) {
				if (redirectSiteCode.toLowerCase() == 'kl') {
					redirectURL = data.NWMMRURL;
					redirectAction = 'nwEditItinRedirect';
				    show('editItin_eligible');
				}
			}
			if (data.awardTicket) {
				if (formRef != null) {
					if (data.unticketedAward)
					{
					formRef.action = AWARD_EDIT_URL;
					}else {
						formRef.action = AWARD_REISSUE_URL;
					}
				}
			    show('editItin_eligible');
			} else if (exists(redirectSiteCode)) {
				if (formRef != null) {
					if (exists(redirectURL) && redirectURL !== '') {
						var custLastName = data.custName != null && data.custName.split('/').length >= 1 ? data.custName.split('/')[0] : '';
						if (data.isAsianSite) {
						   formRef.action = 'java' + 'script:doNWAInterstitial({ qsProp : \'action\', value : \'' + redirectAction + '\'}, { qsProp : \'redirectURL\', value : \'' + redirectURL.replace(/\'/g, '\'').replace(/\\/g, '\\\\') + '\'}' + ');';
						} else {
						   var strNWExtra = data.chgFltRedirectSiteCode.toLowerCase() === 'nw' ? ', { qsProp: \'selRes\', value : \'Confirmation\' }, { qsProp : \'Pnr\' , value : \'' + data.recordLocator + '\'}, { qsProp : \'LastName\', value : \'' + custLastName.replace(/\'/g, '\'').replace(/\\/g, '\\\\') + '\'}, { qsProp: \'StartIndex\', value : \'0\' }, { qsProp: \'referer\', value : \'1\' }, { qsProp: \'View\', value : \'   VIEW RESERVATIONS   \' }' : ', {qsProp : \'name\', value : \'' + custLastName.replace(/\'/g, '\'').replace(/\\/g, '\\\\') + '\'}, { qsProp : \'code\' , value : \'' + data.carrierPNR + '\'}, { qsProp: \'getPage\', value : \'getSummary\' }, {qsProp: \'thisPage\', value : \'singleBooking\' }';
					       formRef.action = 'java' + 'script:doNWAInterstitial({ qsProp : \'action\', value : \'' + redirectAction + '\'}, { qsProp : \'redirectURL\', value : \'' + redirectURL.replace(/\'/g, '\'').replace(/\\/g, '\\\\') + '\'}' + strNWExtra + ');';
						}
					} else {
						formRef.action = BOOKING_EDIT_URL;
					}
				}
				if ( (data.awardTicket && data.showAwardTicketBtn) || !data.awardTicket && exists(redirectSiteCode) ) {
					show('editItin_eligible');
				}
			}
			if (data.SCInPnr || (data.SCCleanedPnr && data.overlapMisconnect)) {
				hide('editItin_eligible');
			}
		}
		if (data.advisoryMsg != null) {
		    hide('editItin_eligible');
		    hide('editItin_ineligible');
		    setAdvisoryMsg(data);
		    show('editItin_ineligible');
		}
		formRef = get('cancelForm');
		hide('td_cancelItin');
		redirectURL = '';
		redirectSiteCode = data.cnclFltRedirectSiteCode;
		if (data.voidItinAllowed ) {
			if (!(data.awardTicket && data.redeemItinAllowed ) && exists(redirectSiteCode)) {
				if (redirectSiteCode.toLowerCase() == 'kl') {
					redirectURL = data.NWMMRURL;
					redirectAction = 'nwCancelItinRedirect';
				}
			}
			if (data.awardTicket) {
				if (formRef != null) {
					formRef.action = AWARD_CANCEL_URL;
				}
			} else if (exists(redirectSiteCode)) {
				if (formRef != null) {
					if (exists(redirectURL) && redirectURL !== '') {
						var custLastName = data.custName != null && data.custName.split('/').length >= 1 ? data.custName.split('/')[0] : '';
						var strNWExtra = data.chgFltRedirectSiteCode.toLowerCase() === 'nw' ? ', { qsProp: \'selRes\', value : \'Confirmation\' }, { qsProp : \'Pnr\' , value : \'' + data.recordLocator + '\'}, { qsProp : \'LastName\', value : \'' + custLastName.replace(/\'/g, '\'').replace(/\\/g, '\\\\') + '\'}, { qsProp: \'StartIndex\', value : \'0\' }, { qsProp: \'referer\', value : \'1\' }, { qsProp: \'View\', value : \'   VIEW RESERVATIONS   \' }' : '';
						formRef.action = 'java' + 'script:doNWAInterstitial({ qsProp : \'action\', value : \'' + redirectAction + '\'}, { qsProp : \'redirectURL\', value : \'' + redirectURL.replace(/\'/g, '\'').replace(/\\/g, '\\\\') + '\'}' + strNWExtra + ');';
					} else if(data.voidItinAllowed) {
						formRef.action = !data.migratedPnr ? NDFG_URL : '/onlinerefunds/refundsHome.do';
					}
				}
			}
			if (data.awardTicket || exists(redirectSiteCode)) {
				show('td_cancelItin');
			}
		}
		if (data.awardTicket && data.showAwardTicketBtn &&  data.redeemItinAllowed) {
			show('td_redeemAwardItin');
		}
		redirectURL = '';
		hide('checkIn_ineligible');
		hide('checkIn_ineligible_alt');
		hide('checkIn_eligible');
		hide('checkIn_eligible_alt');
		redirectSiteCode = exists(GROUNDHANDLING_SWITCHON) && GROUNDHANDLING_SWITCHON.toLowerCase() === 'y' ? data.trips[0].ckinRedirectSiteCode : 'DL';
		redirectSiteCode = exists(redirectSiteCode) ? redirectSiteCode : data.trips[0].chkinRedirectSiteCode;
		if (data.eligibleForCheckin && (ERROR === "false" || ERROR == 'false' || !ERROR)) {
			if (exists(redirectSiteCode)) {
				formRef = get('topSegmentTableOCIForm');
				if (redirectSiteCode.toLowerCase() !== 'dl') {
					switch (redirectSiteCode.toLowerCase()) {
						case 'af':
							redirectURL = data.AFCkinURL;
							redirectAction = 'afCheckinItinRedirect';
							break;
						case 'kl':
							redirectURL = data.KLCkinURL;
							redirectAction = 'klCheckinItinRedirect';
							break;
					}
				}
				if (formRef != null) {
					if(exists(redirectURL) && redirectURL !== '') {
						formRef.action = 'java' + 'script:doNWAInterstitial({ qsProp : \'action\', value : \'' + redirectAction + '\'}, { qsProp : \'redirectURL\', value : \'' + redirectURL.replace(/\'/g, '\'').replace(/\\/g, '\\\\') + '\'} );';
					} else if(data.eligibleForCheckin)  {
						formRef.action = OCI_URL;
					}
				}
				formRef = get('bottomSegmentTableOCIForm');
				if (formRef != null) {
					if (exists(redirectURL) && redirectURL !== '') {
						formRef.action = 'java' + 'script:doNWAInterstitial({ qsProp : \'action\', value : \'' + redirectAction + '\'}, { qsProp : \'redirectURL\', value : \'' + redirectURL.replace(/\'/g, '\'').replace(/\\/g, '\\\\') + '\'} );';
					} else {
						formRef.action = OCI_URL;
					}
				}
			}
			// not using array approach as it is failing 
			// for some reason
			show('checkIn_eligible');
			show('checkIn_eligible_alt');
		} else {
			// not using array approach as it is failing 
			// for some reason
			show('checkIn_ineligible');
			show('checkIn_ineligible_alt');
	}
	} catch (e) { }
}

var setOmnitureTracking = {
	pageName:"",
	events:"",
	setOmniturePageName:function(irop, showFindAltLink) {
		if ((irop || irop == true || irop == 'true') && (showFindAltLink || showFindAltLink == true || showFindAltLink == 'true')) {
			this.pageName = 'IROP - Itineraries Manage Trip';
		} else if ((irop || irop == true || irop == 'true') && (!showFindAltLink || showFindAltLink != true || showFindAltLink != 'true')) {
			this.pageName = 'DISABLED IROP - Itineraries Manage Trip';
		} else {
			this.pageName = 'Itineraries Manage Trip';	
		}
		UserTracking.setProp({prop : "pageName", value : this.pageName});
		// isSkyPriorityEligibleByLevel, isSkyPriorityEligibleByFare, isSkyPriorityEligible
		if(exists(isSkyPriorityEligible) && isSkyPriorityEligible){
			UserTracking.setProp({prop : "skyPriorityBanner", value : this.pageName});
		}
	},
	setOmnitureEvents:function(whichEvent) {
		this.events = "";
		switch (whichEvent) {
			case 'protectionSelect':
				this.events = "iropProtectionSelect"; 
				break;
			case 'findAlternateFlights':
				this.events = "iropFindAlternateFlights"; 
				break;
			case 'scMessageDisplay':
				this.events = "scMessageDisplay";  
				break;
			case 'scAcknowledgment':
				this.events = "scAcknowledgment"; 
				break;
 
			default:
				break;
		}
		UserTracking.logEvent(this.events);
		UserTracking.setTrackingVariables(s);
	}
};
/*** end File /myitinerary/components/dwr/itindetails_dwr.js ***/

/* Begin File /delta/shared_content/edgecache/js/myitinerary/segmentTable_DWR.js */


/*<%-- Globals from itindetails_dwr.js --%>*/
var displayedItin = null;
var passenger = null;
var scheduleNote = false;
var optOut = false;
var isEligible = '';
var IROP = false; 
var IROP_PROTECTED = false; 
var IROP_PNR_CLEAN = false;

/*<%-- LOCAL GLOBALS ---%>*/
var upgradePresent = false;
var scheduleChange = false;
var SCPresent = false; 
var pnr = '';
var IROP_SHOW_MISCONNECT = false;

function displayPriceInfo(data){
	hide("td_pricePaid");
	hide("companionInfo"); 
	hide("td_companionTickets");
	hide("td_companionTotal");
	if (data.awardTicket) {
		setInnerHTML('td_ticketPrice', 'Miles per passenger: ');
		setInnerHTML('td_ticketTotal' , data.miles);
	} else if ( exists(data.amexCompanionTicket) && data.amexCompanionTicket && exists(get('td_companionTotal')) ) {
		setInnerHTML('td_companionTickets', 'Price for Primary passenger: <br /> Price for Companion passenger:<br/><br/>Total for all passengers (2):' );	
		setInnerHTML('td_companionTotal', '<!-- mp_trans_disable_start -->\n' + data.price + '<br />' + data.companionPrice + '<br /><br/>' + data.totalPrice + '<!-- mp_trans_disable_end -->\n');	
		show("companionInfo");
		show("td_companionTickets");
		show("td_companionTotal");
	} else { 
		setInnerHTML('td_ticketPrice' , 'Price per passenger: ');
		setInnerHTML('td_ticketTotal' , '<!-- mp_trans_disable_start -->\n' + data.price + '<!-- mp_trans_disable_end -->\n');
	}
	if (!data.groupReservation && !data.awardTicket && !data.amexCompanionTicket) {
		show("td_pricePaid");
	}
	if(data.ECertMilAccrUpgOSIRemark != null){
		show('certificateInfo');
		show('displayClass');
		get('displayClass').className = data.ECertMilAccrUpgOSIRemark;
		if(data.ecertEligibleForCheckin != null){
			if(data.ecertEligibleForCheckin != true){
				show('eCert_noCheckIn');
			} else {
				hide('eCert_noCheckIn');	
			}
		}
	}
}
function displayMileageInfo(data){
	var mileageInfo ='';
	hide("td_milesEarned");
	hide("td_SkyMilesEarned");
	hide("td_MQMEarned");
	hide("td_MQMLink");
	hide("perPAX");

	if (data.loggedIn != null) { 
		if (data.totalSkyMiles != 0 && data.totalMQMMiles != 0 ){				
			if (!data.PWM){
				if(data.amexCompanionTicket) {
					mileageInfo = mileageInfo + 'Primary passenger ';
				} else {
					mileageInfo = mileageInfo + 'Per Passenger ';
				} 
				mileageInfo = mileageInfo + 'Miles earned = '+ data.totalSkyMiles+';<br/> ';
				mileageInfo = mileageInfo + 'MQM earned = '+ data.totalMQMMiles+';';
				mileageInfo = mileageInfo + addSMDetails(data);
			} else {
				mileageInfo = mileageInfo + 'Miles earned = 0; ';
				mileageInfo = mileageInfo + 'MQM earned = 0;';
			}
		}
	} else {
		if(data.sessionName == null || data.custName == null || data.sessionName == data.custName ) {
			hide('td_MQMEarned');
			hide("td_MQMLink");
			mileageInfo = mileageInfo + 'Miles and MQM data for this itinerary is currently unavailable.';
		}
	}
	if(!mileageInfo == ''){
		setInnerHTML('td_milesEarned', mileageInfo);
		show("td_milesEarned");
	}
}
 
function addSMDetails(data) {
	var smDetail = "";
	var opCrrName = "";
	var carrierSymbol = "";
	var segmentArray = data.reservationSegments;
	for (var s = 0, i=segmentArray.length ; s<i; s++) {
		if (s%2 == 0) {
			bgColor = "even";
		} else {
			bgColor = "odd";
		}
		segment = segmentArray[s];
		opCrrName = (segment.operatingCarrierName === "") ? "%20" : segment.operatingCarrierName;
		if (segment.connCarrier || segment.codeShare ) {
			carrierSymbol = "*";
		} else {
			carrierSymbol = " ";
		}
		smDetail = smDetail + segment.carrierNameForDisplay + " " + segment.flightNumber + carrierSymbol + "|";
		smDetail = smDetail + opCrrName + "|";
		if (segment.bookedClassCode != null && segment.bookedClassCode !="") {
			smDetail = smDetail + segment.bookedClassCode;
		} else {
			smDetail = smDetail + segment.cabinClassCode;
		}
		smDetail = smDetail + "|";
		smDetail = smDetail + segment.departureCityName + "(" + segment.departureAirportCode + ")|"; 
		smDetail = smDetail + segment.arrivalCityName + "(" + segment.arrivalAirportCode + ")|"; 
		smDetail = smDetail + segment.flightSkyMiles + "|" + segment.flightMQM + "|" + bgColor + "^";
	}
 	return "<!-- mp_trans_disable_start -->\n &nbsp;(<a href=\"javascript:openWin('/myitinerary/components/myitinerary/SM_MQM_popup_content.jsp?smDetails=" + smDetail + "','SM_MQM','614','375','yes')\">details</a>)<!-- mp_trans_disable_end -->\n";
}

function getArrivalColumn(segment) {
	var itinChanges = ['arrCity', 'arrDate', 'arrTime'];
	var isArrDelay = (segment.formattedEstArrivalDateTime != segment.formattedArrivalTime) ? true : false;
	
	if(IROP){
		itinChanges = getAffectedFlightInfo.markChanges('arrival', segment);
	}
	
	var arrText ='';
	if(itinChanges['arrCity']||segment.connPointChanged){
		arrText += '<span class="key_info">';	
	}
	
	if (exists(segment.arrivalCityName) && exists(segment.arrivalAirportCode) && segment.arrivalCity != "" && segment.arrivalAirportURL != null) {
		arrText += segment.arrivalCityName + "&nbsp;(<a target='_blank' href=" + segment.arrivalAirportURL + ">" + segment.arrivalAirportCode + "</a>)";
	} else { 
		arrText += segment.arrivalCityName+"&nbsp;("+segment.arrivalAirportCode+")";
	}
	
	if(itinChanges['arrCity']||segment.connPointChanged){
		arrText += '</span>';	
	}
	
	if(exists(segment.arrivalTerminal) && segment.arrivalTerminal != "") {
		arrText= arrText+"<br />" + segment.arrivalTerminal;
	}
	arrText += "<br /><!-- mp_trans_schedule_disable_start -->Gate: " + segment.arrGate + "<!-- mp_trans_schedule_disable_end --><br />"; 
	//arrText += "<br /><!-- mp_trans_disable_end -->Gate: n/a <br />";
	
	if(segment.arrTimeChanged){
		var arrTime = '<span class="key_info">Scheduled: </span>';
	} else {
		var arrTime = 'Scheduled: ';
	}

	if (exists(segment.arrivalDateTime)) { 
	   	if(itinChanges['arrTime']||segment.arrTimeChanged){
			arrTime += '<span class="key_info">';	
		}
		if(itineraryDisplayController.misconnectInPnr && itineraryDisplayController.SCCleanedPnr){
			if(segment.arrMisconnected){
			arrTime += '<span class="clean_misconnect">';
			}
		}

		arrTime += segment.formattedArrivalTime;
		
		if(itineraryDisplayController.misconnectInPnr && itineraryDisplayController.SCCleanedPnr){
			if(segment.arrMisconnected){
			arrTime += '</span>';
			}
		}
		if(itinChanges['arrTime']||segment.arrTimeChanged){
			arrTime += '</span>';	
		}
		
		arrTime += "<br />";

		if(isArrDelay){
			arrTime += '<span class="key_info">Estimated: ';	
		
			arrTime += segment.formattedEstArrivalDateTime;
    	
			arrTime += '</span>';	
			
			arrTime += "<br />";
		}
		
		if(itinChanges['arrDate']||segment.arrDateChanged){
			arrTime += '<span class="key_info">';	
		}
		
		arrTime += segment.formattedArrivalDate;
	
		if(itinChanges['arrDate']||segment.arrDateChanged){
			arrTime += '</span>';	
		}
	
	} else {
  		arrTime = "&nbsp;";
    } 
	
	arrText += arrTime;
	return '<!-- mp_trans_disable_start -->\n' + arrText + '<!-- mp_trans_disable_end -->\n';
}

function getDepartureColumn(segment) {
    var itinChanges = ['depCity', 'depDate', 'depTime'];
	var isDepDelay = (segment.formattedEstDepartureDateTime != segment.formattedDepartureTime) ? true : false;
	
	if(IROP){
		itinChanges = getAffectedFlightInfo.markChanges('departure', segment);
	}
	
	var deptText ='';
    
	if(itinChanges['depCity']||segment.connPointChanged){
		deptText += '<span class="key_info">';	
	}
	
	if (exists(segment.departureCityName) && exists(segment.departureAirportCode) && segment.departureCity != "" && segment.departureAirportURL != null) {
 		deptText += segment.departureCityName + "&nbsp;(<a target='_blank' href=" + segment.departureAirportURL + ">" + segment.departureAirportCode + "</a>)";
 	} else { 
       deptText += segment.departureCityName + "&nbsp(" + segment.departureAirportCode + ")";       
    } 
	
	if(itinChanges['depCity']||segment.connPointChanged){
		deptText += '</span>';	
	}
	
	if(exists(segment.departureTerminal) && segment.departureTerminal != "") {
		deptText += "<br />" + segment.departureTerminal;
	}
	deptText += "<br /><!-- mp_trans_schedule_disable_start -->Gate: " + segment.deptGate+"<!-- mp_trans_schedule_disable_end --><br />";
	//deptText += "<br /><!-- mp_trans_disable_end -->Gate: n/a <br />";

	if(segment.dptTimeChanged){
		var deptTime = '<span class="key_info">Scheduled: </span>';
	} else {
		var deptTime = 'Scheduled: ';
	}

	if (exists(segment.departureDateTime)) { 
		if(itinChanges['depTime']||segment.dptTimeChanged){
			deptTime += '<span class="key_info">';	
		}
		
		if(itineraryDisplayController.misconnectInPnr && itineraryDisplayController.SCCleanedPnr){
			if(segment.dptMisconnected){
			//deptTime = '';
			deptTime += '<span class="clean_misconnect">';
			}
		}

			deptTime += segment.formattedDepartureTime;
			
			
		if(itineraryDisplayController.misconnectInPnr && itineraryDisplayController.SCCleanedPnr){
			if(segment.dptMisconnected){
			//deptTime = '';
			deptTime += '</span>';
			}
		}

		if(itinChanges['depTime']||segment.dptTimeChanged){
			deptTime += '</span>';	
		}

		deptTime += "<br />";
		
		if(isDepDelay){
			deptTime += '<span class="key_info">Estimated: ';	
		
			deptTime += segment.formattedEstDepartureDateTime;
    	
			deptTime += '</span>';	
			
			deptTime += "<br />";

		}
		
	
		if(itinChanges['depDate']||segment.dptDateChanged){
			deptTime += '<span class="key_info">';	
		}
	
		deptTime += segment.formattedDepartureDate;

		if(itinChanges['depDate']||segment.dptDateChanged){
			deptTime += '</span>';	
		}

	} else {
    	      deptTime = "&nbsp;";
    }
	
	deptText += deptTime;
	
	return '<!-- mp_trans_disable_start -->\n' + deptText + '<!-- mp_trans_disable_end -->\n';
}

function getFlightColumn(segment) {
	var flightNo = '';
	
	

	
	
	var flightChangeArray = [segment.fltNumChanged, segment.connPointChanged, segment.arrDateChanged, segment.arrTimeChanged, segment.dptDateChanged, segment.dptTimeChanged];
	var isSchedChange = flightChangeArray.toString();
	if (exists(segment.flightDetailsUrl)) {  
		if (segment.flightDetailsUrl .indexOf(BOOKING_URL_TXT) >-1 ) {
			flightNo += "<a href=\"javascript:openWin('" + segment.flightDetailsUrl + "','equipmentDetail', 630, 450)\">";
		} else {
			flightNo += '<a href=\"' + segment.flightDetailsUrl + '\">';
		}
	}
	var cdshr_prtnr_tbl = displayedItin.legend;
	var superScript = ''; 
	
	if (((segment.codeShare || segment.connCarrier) || 
		(segment.carrierCode != "DL" && segment.operatingCarrierName.indexOf('Delta') > -1)
		&& cdshr_prtnr_tbl != null)) {
			for (var i = 0, j=cdshr_prtnr_tbl.length; i <j; i++) {
				if (cdshr_prtnr_tbl[i] == segment.operatingCarrierName) {
					superScript = '<sup>' + (i+1) + '</sup>';
				}
			}
	}	 
	

	if(!itineraryDisplayController.SCInPnr && !IROP){
		if(segment.previousActionCode == 'TK' || segment.previousActionCode == 'SC'){
			if(segment.currentActionCode != 'TK' && segment.currentActionCode != 'SC'){
				flightNo += '<div class="sc_confirm">';	
			}
		}
	}
	/* OLD to REMOVE
	if((segment.currentActionCode != 'TK' && segment.currentActionCode != 'SC') && (segment.previousActionCode == 'TK' || segment.previousActionCode == 'SC')){
		
		//alert('logic true');
		flightNo += '<div class="sc_confirm">';	
	}
	*/
	if(segment.fltNumChanged){
			flightNo += segment.carrierNameForDisplay;
			flightNo += '<span class="key_info">';	
			flightNo += '<nobr>&nbsp;' + segment.flightNumber + '</a>' + superScript + '</nobr><br />';
			flightNo +='</span>';
	
	} else {
	flightNo += segment.carrierNameForDisplay + '<nobr>&nbsp;' + segment.flightNumber + '</a>' + superScript + '</nobr><br />'; //need to add codeshare logic
		
	}

  	var status ='';
	var standbyCodes = {CB:"Codeshare Standby", SB:"Standby"};

	status += 'Reservation: ';
	
	if(!IROP || (IROP && IROP_PNR_CLEAN)){
		status += segment.segmentStatusDescript + "&nbsp";
	} else {
		if(itineraryDisplayController.buildingTrip == 'affected'){
			status += '<span id="IROPSegmentStatusMsg">' + itineraryDisplayController.iropType + '</span>';
		} else {
			status += segment.segmentStatusDescript + "&nbsp";
		}
	}
	
	if(scheduleChange){ 
	status += '';	
	status = '';
		
	}
	
	
	if(segment.flightChanged){
		status ='<div class="alert key_info">Flight has changed</div>';
	} 
	

	
	
	if (segment.standbyStatusAvail  && exists(standbyCodes[segment.segmentStatusCode])) {
		var legToUpdradeStandby = myItin_Current_Segment_Count <= myItin_Segment_Count_Check ? myItin_Current_Segment_Count : 0;
		status += "<br /><a class=\"upgradeStandby\" href=\"javascript:DeltaOverlayUtil.showPopupOverlay('/myitinerary/components/itinerary/upgradeStandby.jsp?appCode=myitinerary&segment=" + legToUpdradeStandby + "&recLocId=" + recordLocator  + "', 'upgradeStandBy', 660, 400, 'yes')\">View Standby List</a>";
		myItin_Current_Segment_Count ++;
	}

	
	if(itineraryDisplayController.buildingTrip != 'affected') {
	  	flightNo += status;
	} else { 
		
	}
	
	if(itineraryDisplayController.buildingTrip == 'checkin' || itineraryDisplayController.buildingTrip == 'affected'){
		var displayDepDelayHrs = 0;
		var displayDepDelayMin = 0;
		
		if(parseInt(segment.departureDelayInMins) > 0 || segment.departureDelayInMins > 0){
			var delayDisplay = ['hours', 'minutes'];
			delayDisplay = itineraryDisplayController.getDelayDisplay(segment.departureDelayInMins);
		
			displayDepDelayHrs = parseInt(delayDisplay['hours']) > 0 ? delayDisplay['hours'] : 0;
			displayDepDelayMin = delayDisplay['minutes'];
		}
		
		if(IROP
		   	&& !IROP_PNR_CLEAN
			&& itineraryDisplayController.iropType != ''
			&& segment.flightNumber == getAffectedFlightInfo.affFlightNo){
				flightNo += '<div class="irop_' + itineraryDisplayController.iropType + ' key_info">';
				flightNo += '<span class="irop_delay">Delayed Departure';
				if(segment.departureDelayInMins > 0){
					if(parseInt(displayDepDelayHrs) != 0){
						flightNo += '<br />(' + displayDepDelayHrs + ' ' + displayDepDelayMin + ')';
					} else {
						flightNo += '<br />(' + displayDepDelayMin + ')';
					}
				}
				flightNo += '</span>';
				flightNo += '<span class="irop_cancelled">Flight Cancelled</span>';
				flightNo += '<div class="clear"></div>'
				
				if(IROP_SHOW_MISCONNECT && itineraryDisplayController.buildingTrip == 'affected'){
					flightNo += '<span id="misconnect_note">You may miss this flight</span>'	
					IROP_SHOW_MISCONNECT = false;
				}
				
				flightNo += '</div>';
				
				if(segment.departureDelayInMins > 0 && itineraryDisplayController.segmentsArray['mctCompliant'] != true){
					IROP_SHOW_MISCONNECT = true;
				}
				
		} else if(segment.departureDelayInMins > 0){
			flightNo += '<div class="delay key_info">';
			flightNo += '<span class="delay">Delayed Departure';
			
			if(parseInt(displayDepDelayHrs) != 0){
				flightNo += '<br />(' + displayDepDelayHrs + ' ' + displayDepDelayMin + ')';
			} else {
				flightNo += '<br />(' + displayDepDelayMin + ')';
			}
			
			flightNo += '</span>';
			flightNo += '<div class="clear"></div></div>';
		} else {
			if((segment.flightNumber == displayedItin.affectedFlightNo) && displayedItin.iropType == 'cancelled' && !IROP_PNR_CLEAN && IROP_PNR_CLEAN != true){
				flightNo += '<div class="irop_cancellation key_info">';
				flightNo += '<span class="irop_cancelled">Flight Cancelled</span>';
				flightNo += '<div class="clear"></div></div>'
			}
		}
	}
	
	if (segment.marketedFlightNbr != null) {
       flightNo = segment.marketedFlightNbr + '<br/>' + flightNo;
    }
		
  	return '<!-- mp_trans_disable_start -->\n' + flightNo + '<!-- mp_trans_disable_end -->\n';
}	  



function getCabin(segment) {
	var itinChanges = ['cabin'];

	if(IROP){
		itinChanges = getAffectedFlightInfo.markChanges('cabin', segment);
	}
	
	
	var cabinText ='';
	var deltaCarrier = (segment.carrierCode == DELTA_CODE) ? true : false;
	var nwaCarrier = (segment.carrierCode == 'NW' && segment.operatingCarrierName.indexOf('Delta Air') > -1) ? true : false;
	
	if (exists(segment.cabinClassCode)) {
		if (!deltaCarrier && !nwaCarrier) {
			if(exists(segment.oaCabin)){
				cabinText = segment.oaCabin;
			} else {
				cabinText = "";	
			}
			cabinText += "(" + segment.cabinClassCode + ")";
	 	} else {
			
			if(itinChanges['cabin']){
				cabinText += '<span class="key_info">';	
			}
	   		
			cabinText += segment.cabinClassDescription + "&nbsp;(" + segment.cabinClassCode + ")";
      		
			if(itinChanges['cabin']){
				cabinText += '</span>';	
			}
			
			if(itineraryDisplayController.buildingTrip == 'protection') {
				if(getAffectedFlightInfo.affCabin == 'business' || getAffectedFlightInfo.affCabin == 'first'){
					cabinText += '<div class="cabinClassNote">';
					if(getAffectedFlightInfo.affCabin == 'business'){
						cabinText += 'Business ';
					} else {
						cabinText += 'First ';
					}
					cabinText += 'Class not available on all flights.';
					cabinText += '</div>';
				}
			}
			
		} 
	} else { 
        cabinText = "&nbsp;";
    }

	if((!IROP || IROP_PNR_CLEAN) && !scheduleChange){
	// removed to put logic for SC exists if(!IROP || IROP_PNR_CLEAN){
		var seatingText = '';
		seatingText += '<br /><a href="#your_seating" onclick="expandTable(\'seating\');">Your Seating</a>';
		cabinText += seatingText;
	}
	
	if(itinChanges['cabin']){
		show('irop_cabin_msg');	
	}
	
	return '<!-- mp_trans_disable_start -->\n' + cabinText + '<!-- mp_trans_disable_end -->\n'; 
}

function getUpgradeColumn(segment){
 	var upgrade = '';
	var classOfservice = '';
    var seatType = '';
	var segmentNumber = '';
	var flightNumber = '';
    classOfService = segment.cabinClassCode;
	segmentNumber = segment.segmentNumber;
	flightNumber = segment.flightNumber;
	
	if (upgradePresent)  { 	
		
		var status = segment.upgradeStatus;
		if (status != null){ 
						
			if (segment.carrierCode == DELTA_CODE) {
				if (status.indexOf('Request Only') > -1 || status.indexOf('Available') > -1) {
					if (scheduleChange) {
						upgrade = "&nbsp;";
					} else{
						upgrade = createUpgradeDLCheckBox(segmentNumber,status,flightNumber);
						hide('upgradeCreated_note');									 										 
					}
				} else if (status.indexOf('Requested') > -1 ) {
					if (segment.codeShareCode == 'NW') {
						upgrade = status + "*";
						show('upgradeCreated_note');
					} else {
						upgrade = status;
					}
				} else{
					upgrade= status;	
				}
			} else{
				upgrade = segment.upgradeStatus;
			}
			if(segment.standbyStatusAvail && !segment.codeShare && segment.carrierCode == DELTA_CODE && segment.upgradeRequestPresent && status.indexOf('Confirmed') === -1) {
				var legToUpdradeStandby = myItin_Current_Segment_Count <= myItin_Segment_Count_Check ? myItin_Current_Segment_Count : 0;
				upgrade += "<br /><a class=\"upgradeStandby\" href=\"javascript:DeltaOverlayUtil.showPopupOverlay('/myitinerary/components/itinerary/upgradeStandby.jsp?appCode=myitinerary&segment=" + myItin_Current_Segment_Count + "&recLocId=" + dlRecordLocator  + "', 'upgradeStandBy', 660, 400, 'yes')\" title=\"View Upgrade List\" >View Upgrade List</a>";
				myItin_Current_Segment_Count ++;
			}
		} else{
			upgrade = "&nbsp;";
		}
	}
	return (upgrade.length <= 1 && (upgrade === " " || upgrade === "")) ? "&nbsp;" : '<!-- mp_trans_disable_start -->\n' + upgrade + '<!-- mp_trans_disable_end -->\n';
}

function getActionColumn(segment) {
	var actText ='';
	if(!IROP && !segment.checkinEligible){
                if (segment.countDownDays != 0) {
                        if ( segment.countDownDays == 1) {
                                actText = '<div class=\'countDownDays\'>' + segment.countDownDays + ' Day Until Departure</div>';
                        } else {
                                actText = '<div class=\'countDownDays\'>' + segment.countDownDays + ' Days Until Departure</div>';
                        }
                } else {
                        actText = '<div class="clear"></div>';
                }
	} else if(IROP && !IROP_PNR_CLEAN && itineraryDisplayController.buildingTrip != 'remaining'){
		if(IROP_PROTECTED){
			actText = '<div id="irop_action_col_txt">To replace your affected flight(s) at no extra cost, choose an alternate flight option or click Find Alternate Flights above</div>';
		} else if(itineraryDisplayController.iropRecoveryType == 'system' || itineraryDisplayController.iropRecoveryType == 'user') {
			actText = '<input class="button right" type="button" value="Check-In" onclick="itinCheckin()" name="checkIn" id="checkIn" />';
		} else {
			actText = '<span>Replace your affected flight(s) now at no extra cost.<br />';
			actText += '<a class="linkNav" id="irop_checkin_tbl_action" onclick="setOmnitureTracking.setOmnitureEvents(\'findAlternateFlights\');" href="/irop/fixedFlightSearch.action?cId=' + itineraryDisplayController.segmentsArray['sessionId'] + '">Find Alternate Flights</a></span>';
		}
	} else {
		if(displayedItin.showSegmentCheckin && segment.checkinEligible && ERROR != 'true'){
			actText = '<input class="button right checkIn" type="button" value="Check-In" onclick="itinCheckin()" name="checkIn" id="checkIn" />';
		} else {
			if (segment.countDownDays != 0) {
                                if ( segment.countDownDays == 1) {
                                        actText = '<div class=\'countDownDays\'>' + segment.countDownDays + ' Day Until Departure</div>';
                                } else {
                                        actText = '<div class=\'countDownDays\'>' + segment.countDownDays + ' Days Until Departure</div>';
                                }
                        } else {
                                actText = '<div class="clear"></div>';
                        }
		}
		
	} 
	
	return '<!-- mp_trans_disable_start -->\n' + actText + '<!-- mp_trans_disable_end -->\n';
}

function getEmptyActionColumn(segment) {
        var actText = '&nbsp;';
        if (segment.countDownDays != 0) {
                if ( segment.countDownDays == 1) {
                        actText = '<div>' + segment.countDownDays + ' Day Until Departure</div>';
                } else {
                        actText = '<div>' + segment.countDownDays + ' Days Until Departure</div>';
                }
        } else {
                actText = '<div class="clear"></div>';
        }
        return '<!-- mp_trans_disable_start -->\n' + actText + '<!-- mp_trans_disable_end -->\n';
}

var segmentCellFuncsRow1 = [getFlightColumn, getDepartureColumn, getArrivalColumn,
  	getCabin, getEmptyActionColumn
];
var segmentCellFuncs = [getFlightColumn, getDepartureColumn, getArrivalColumn,
  	getCabin
];
var upgradeSegmentCellFuncsRow1 = [getFlightColumn,	getDepartureColumn,	getArrivalColumn,
  	getCabin, getUpgradeColumn, getEmptyActionColumn
];
var upgradeSegmentCellFuncs = [getFlightColumn,	getDepartureColumn,	getArrivalColumn,
  	getCabin, getUpgradeColumn
];
var checkin_segmentCellFuncsRow1 = [getFlightColumn, getDepartureColumn, getArrivalColumn,
  	getCabin, getActionColumn
];
var checkin_segmentCellFuncs = [getFlightColumn, getDepartureColumn, getArrivalColumn,
  	getCabin
];
var checkin_upgradeSegmentCellFuncsRow1 = [getFlightColumn,	getDepartureColumn,	getArrivalColumn,
  	getCabin, getUpgradeColumn,	getActionColumn
];
var checkin_upgradeSegmentCellFuncs = [getFlightColumn,	getDepartureColumn,	getArrivalColumn,
  	getCabin, getUpgradeColumn
];

function setSegmentCountForSegmentTable(segmentsArray) {
	myItin_Segment_Count_Check = 0;
	myItin_Current_Segment_Count = 0;
	for (var i = 0, j=segmentsArray.length; i < j; i++) {
		if (!segmentsArray[i].hiddenSegment) {
			myItin_Segment_Count_Check ++;
		}
	}
	myItin_Segment_Count_Check = myItin_Segment_Count_Check > 0 ? myItin_Segment_Count_Check - 1 : 0;
}

function populateItineraryTable(tableId, tableSegments, cellFuncs, spanRows){
	var noOfConfSeg = 0;
	
	if(tableSegments.length > 1){
		for( var j=0 ; j< tableSegments.length; j++ ) {
				noOfConfSeg++;			
		}
	}
	
	if (!tableSegments[0].hiddenSegment) {
		DWRUtil.addRows( tableId, tableSegments, cellFuncs, {
		
			rowCreator:function(options) {
					var row = document.createElement("tr");
					if(tableId == 'checkin_segmentsBody' || tableId == 'remaining_segmentsBody'){
						if (scheduleChange){
							row.setAttribute ("id", "schedChanged" + tableSegments[0].segmentNumber);
							row.style.display = "none";
							row.className =  'schedChange';							
						} else if(tableId == 'checkin_segmentsBody'){
							if((tableSegments[0].flightNumber == getAffectedFlightInfo.affFlightNo) && !IROP_PNR_CLEAN && itineraryDisplayController.iropType != 'delay'){
								row.className = 'cancelled';	
							} else { 
								row.className = 'active';	
							}	
						}
					} else if (tableId != 'remaining_segmentsBody') {
						row.className = 'active';	
					} else {
						row.className =  'inactive';
					}			
					return row;
			},
			cellCreator:function(options) {
					var td = document.createElement("td");
					if (options.cellNum == 0) {
						td.style.borderLeft = "1px solid #D8D8D8";
						td.className = "flight";
						
					} else if (options.cellNum == 1) {
						td.className =  td.className + " departs";
					} else if (options.cellNum == 2) {
						td.className =  td.className + " arrives";
					} else if (options.cellNum == 3) {
						td.className =  td.className + " class";
					} else if (options.cellNum == 4) {
						if ((!upgradePresent) || (tableId == 'standby_segmentsBody')) {

							td.className =  td.className + " action";  			    
							td.setAttribute ("rowSpan", spanRows);
						} else {
							td.className =  td.className + " upgrade";
						}
					} else if (options.cellNum == 5 && upgradePresent) {
						td.className =  td.className + " action"; 
						td.setAttribute ("rowSpan", spanRows);
					} else {
						
					}
					return td;
			},
			escapeHtml:false
		});
	}
}

function checkinTableController(trips) {
	
	try {
		var tripsArray = (trips.length > 0) ? trips.length : 1;
		var cellfuncRow1 = checkin_segmentCellFuncsRow1;
		var cellfunc = checkin_segmentCellFuncs;
		
		if ((displayedItin.upgradeDataPresent) || (displayedItin.containUpgradableSegment )) { 
			//show('checkin_upgradeHeader');     
			show('checkin_upgradeHeader', (DeltaOverlayUtil.isIe() ? "block" : "table-cell") );
			hide('upgradeCreated_note');
			cellfuncRow1 = checkin_upgradeSegmentCellFuncsRow1;
			cellfunc = checkin_upgradeSegmentCellFuncs;
			upgradePresent = true;
		} else {
			hide('checkin_upgradeHeader');
			hide('upgradeCreated_note');
			upgradePresent = false;
		}	

		var tableId = "checkin_segmentsBody";
		DWRUtil.removeAllRows(tableId);
		var currentSegment = [];
		
		for(var i = 0, j = tripsArray; i < j; i++){
			for(var s = 0, t = trips[i].segments.length; s < t; s++) {			
				currentSegment[0] = trips[i].segments[s];
				
				scheduleChange = (currentSegment[0].segmentStatusCode.indexOf('WK')) > -1|| (currentSegment[0].segmentStatusCode.indexOf('WN')) > -1|| (currentSegment[0].segmentStatusCode.indexOf('UN') > -1);
				
				var SCPresent = false;
				if (s > 0 && scheduleChange){
					SCPresent = (trips[i].segments[s-1].segmentStatusCode.indexOf('SC') > -1 || trips[i].segments[s-1].segmentStatusCode.indexOf('TK') > - 1);
				} 
				//alert('checkinTableController SCPresent: ' + SCPresent);
				
				if((scheduleChange && SCPresent) || currentSegment[0].chgFlag){
					populateScheduleNote(currentSegment, tableId);
				}

				if(s == 0){
					if(!scheduleChange) {
						populateItineraryTable(tableId, currentSegment, cellfuncRow1, trips[i].segments.length);
					}
				} else {
					if(!scheduleChange || (scheduleChange && SCPresent)) {
						populateItineraryTable(tableId, currentSegment, cellfunc);
					}
				}
			}
		}
	} catch(e) {
		//alert(e + 'There was an error processing your Check-in eligible itinerary segments');
	}
			
}

function remainingTableController(trips) {
	try {
		var tripsArray = (trips.length > 0) ? trips.length : 1;
		//var cellfunc = segmentCellFuncs;
		//var cellfuncRow1 = segmentCellFuncsRow1;
		
		var cellfuncRow1 = checkin_segmentCellFuncsRow1;
		var cellfunc = checkin_segmentCellFuncs;
		
		if ((displayedItin.upgradeDataPresent) || (displayedItin.containUpgradableSegment )) { 
			//show('upgradeHeader');
			show('upgradeHeader', (DeltaOverlayUtil.isIe() ? "block" : "table-cell") );
			//show('upgradeCreated_note'); 
			hide('upgradeCreated_note');
			//cellfunc = upgradeSegmentCellFuncs;
			//cellfuncRow1 = upgradeSegmentCellFuncsRow1;
			
			cellfuncRow1 = checkin_upgradeSegmentCellFuncsRow1;
			cellfunc = checkin_upgradeSegmentCellFuncs;
			upgradePresent = true;
		} else {
			hide('upgradeHeader');
			hide('upgradeCreated_note'); 
			upgradePresent = false;
		}
	
		var tableId = "remaining_segmentsBody";
		DWRUtil.removeAllRows(tableId);
		var currentSegment = [];
		
		for(var i = 0, j = tripsArray; i < j; i++){
					
			for(var s = 0, t = trips[i].segments.length; s < t; s++) {			
				currentSegment[0] = trips[i].segments[s];
				
				
				scheduleChange = (currentSegment[0].segmentStatusCode.indexOf('WK')) > -1|| (currentSegment[0].segmentStatusCode.indexOf('WN')) > -1|| (currentSegment[0].segmentStatusCode.indexOf('UN') > -1);
				
				var SCPresent = false;
				if (s > 0 && scheduleChange){
					SCPresent = (trips[i].segments[s-1].segmentStatusCode.indexOf('SC') > -1 || trips[i].segments[s-1].segmentStatusCode.indexOf('TK') > - 1);
				} 
				//alert('remainingTableController SCPresent: ' + SCPresent);
				
				if((scheduleChange && SCPresent) || currentSegment[0].chgFlag){
					populateScheduleNote(currentSegment, tableId);
				}

				if(s == 0){
					if(!scheduleChange){
						populateItineraryTable(tableId, currentSegment, cellfuncRow1, trips[i].segments.length);
					}
				} else {
					if(!scheduleChange || (scheduleChange && SCPresent)) {
						populateItineraryTable(tableId, currentSegment, cellfunc);
					}
				}
			}
		}
		
		if(IROP && !IROP_PNR_CLEAN){
			setClassName("segments_table_control", "display_ctl_closed");
		}
	} catch(e) {
		//alert(e + 'There was an error processing your remaining itinerary segments');
	}
	
}

function populateScheduleNote(segment, tableId) {
	 	DWRUtil.addRows( tableId, segment, notefunc, {
		
          rowCreator:function(options) {
			var row = document.createElement("tr");
			
			row.className = 'active sched_details';	
			row.valign =  "top"; 
            return row;
          },
          cellCreator:function(options) {
            var td = document.createElement("td");
            td.className =  "tableCell ";
            if (options.cellNum == 0) {
               td.style.borderRight = "1px solid #D8D8D8";
               td.style.borderLeft = "1px solid #D8D8D8";
               td.style.borderTop = "1px solid #D8D8D8";
			   td.style.borderBottom = "1px solid #D8D8D8";
               td.setAttribute("valign", "middle");
               td.setAttribute("align", "right"); 
			   if(upgradePresent){
               td.setAttribute("colSpan", 5); 	
			   } else {td.setAttribute("colSpan", 4);}
			   
            } 
            //alert("options.data=" + options.data + ":options.cellNum=" +  options.cellNum);
            return td;
          },
          escapeHtml:false
        });
        
} // end for}
var notefunc = [
	getScheduleNote
];

function createUpgradeDLCheckBox(segmentNumber,status,flightNumber) {
	var box="";
	box = box + "<form name=\"requestUpgDL\" action=\"\" method=\"post\">";
	box = box + "<input type=\"checkbox\" id=\"checkUpgrade" + segmentNumber + "\" name=\"Upgrade Status\" id=\"request\" value=\"Request\" onclick=\"Checkvalue('" + segmentNumber + "')\" />";
	box = box + "&nbsp;<a class=\"reqUpgInfoLink\" onclick=\"openHelp2('/components/help/mile_upgrade/upgrade_status_popup.jsp',event,265); return false\" onfocus=\"blur()\" href=\"#\">" + status + "</a>";
	box = box + "<br />";
	box = box + "<div id=\"submitRequest" + segmentNumber + "\" class=\"submitUpgReqContainer\" style=\"display:none;\"><a class=\"linkNav\" href=\"javascript:requestUpgrade('Upgrade Segment','" + segmentNumber + "', '" + dlRecordLocator + "','" + flightNumber + "');\"> Submit </a></div>";
	box = box + "<div class=\"loading\" style=\"align:center; padding:10px; position:absolute; display:none\" id=\"loadingbox\"></div>";
	box = box + "</form>";
	return '<!-- mp_trans_disable_start -->\n' + box + '<!-- mp_trans_disable_end -->\n';
}

function createUpgradeOALCheckBox() {
	var box = "";
	box = box + "<form name=\"requestUpgOA\" action=\"\" method=\"post\">";
	box = box + "<input type=\"checkbox\"  name=\"Upgrade Status\" id=\"request\" value=\"Request\" />";
	box = box + "Request only";
	box = box +"<br>";
	box = box + "<div style=\"margin-left: 50px;\"/><a href=\"\"> Submit </a></div>";
	box = box + "</form>";
	return '<!-- mp_trans_disable_start -->\n' + box + '<!-- mp_trans_disable_end -->\n';
}
function getScheduleNote(segment) {
	var note = "";
if (scheduleChange) {
		note = note + "<span id=\"viewOrigOpen" + segment.segmentNumber + "\" style=\"display:inline;\"><span id=\"scheduleChangeMsg\" class=\"cpyError\" style=\"display:inline;\"><strong></span>";
		note = note +  "<a href=\"javascript:show('viewOrigClose" + segment.segmentNumber + "'); hide('viewOrigOpen" + segment.segmentNumber + "'); tableExpand('schedChanged" + segment.segmentNumber + "');\"><span style=\"margin-right: 1em;\"><img src=\"//images.delta.com/delta/icons/arrow_leftnav_up.gif\" id=\"collapsed\">&nbsp;Open details for your original flight(s)</span></a>";
    	note = note +  "     </span>";
    	note = note +  "     <span id=\"viewOrigClose" + segment.segmentNumber + "\" style=\"display: none;\"><span id=\"scheduleChangeMsg\" class=\"cpyError\" style=\"display:inline;\"><strong></span>";
    	note = note +  "         <a href=\"javascript:hide('viewOrigOpen" + segment.segmentNumber + "'); hide('viewOrigClose" + segment.segmentNumber + "'); show('viewOrigOpen" + segment.segmentNumber + "'); hide('schedChanged" + segment.segmentNumber + "'); \"><span style=\"margin-right: 1em;\"><img src=\"//images.delta.com/delta/icons/arrow_leftnav_down.gif\" id=\"expanded\">&nbsp;Close details for your original flight(s)</span></a>";
    	note = note +  "      </span>";
	} else {
		note = "<strong><font color=\"#FF0000\">Note change planes in <!-- mp_trans_disable_start -->" + segment.chgCity + "<!-- mp_trans_disable_end -->&nbsp;</font></strong>";
	}
	return '<!-- mp_trans_disable_start -->\n' + note + '<!-- mp_trans_disable_end -->\n';
}

function tableExpand(segment) {
	var ie7 = (document.all && !window.opera && window.XMLHttpRequest) ? true : false;
	if (ie7 == true ) {
		show(segment);
	} else if (document.all){
		show(segment);
	} else {
		show(segment, 'table-row');
	}
}

function publishLegend(data){
	var carrier = data.legend;
	var opLegend ="";
	hide("td_infoOAL");
	if  (carrier != null && carrier[0] != null) {
		var y = data.reservationSegments.length;
		var reservationSegmentsStart = 0;
		for (var i=0, j=carrier.length ; i<j; i++) {
			if(exists(carrier[i])){
				if (carrier[i].indexOf("Operated By") < 0) {
					opLegend = opLegend + "<sup>" + (i+1) + "</sup> Operated By " + carrier[i] + " ";
				} else {
					opLegend = opLegend + "<sup>" + (i+1) + "</sup> " + carrier[i] + " ";
				}
				for (var x= reservationSegmentsStart; x<y; x++) {
					var reservationSegment = data.reservationSegments[x];
					if (reservationSegment.connCarrier && exists(reservationSegment.operatingCarrierName) && (reservationSegment.carrierCode === "DL")) {
						var legendHasCarrier = reservationSegment.operatingCarrierName.length >  carrier[i].length ? reservationSegment.operatingCarrierName.toLowerCase().indexOf(carrier[i].toLowerCase()) !== -1 : carrier[i].toLowerCase().indexOf(reservationSegment.operatingCarrierName.toLowerCase()) !== -1
						if (legendHasCarrier) {
							opLegend = opLegend + " / Doing business as Delta Connection";
							break;
						}
					}
				}
			}
		}
	}
	setInnerHTML('td_infoOAL', opLegend);
	show("td_infoOAL");
} 
function requestUpgrade(seatType,segmentNumber,recordLocator,flightNumber){
	pnr = recordLocator;		
	setLoadingMsg("Loading");
	try {
		UpgradeRequestProcessor.upgradeSegment(seatType,segmentNumber,recordLocator,flightNumber,displayUpgradeResult,hideLoadingMsg);
	} catch (e) {
		handleErrors();
	}
}
function displayUpgradeResult(pnr) {
	if(exists(recordLocator) && pnr['error'] != 'SystemError'){
		updateInfo(recordLocator);
	} else {
		hideLoadingMsg("Loading");	
	}
}

function handleErrors() {
	setInnerHTML('skymilesNumberLabel','<img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> <span class="cpyError">Frequent Flyer #</span>');
	setInnerHTML('alerts_errors', '<div class="error">The Frequent Flyer Number is invalid.</div>');
	window.location.replace('#error');
}

function initLoadingMessage() {
	DWRUtil.useLoadingMessage();
}

function Checkvalue(segmentNumber) {
	chckBox = "checkUpgrade" + segmentNumber;
	var tmp = get(chckBox); 
	if (tmp.checked) {
		show('submitRequest'+segmentNumber);
	} else {
		hide('submitRequest'+segmentNumber);
	}
}

/* end File /delta/shared_content/edgecache/js/myitinerary/segmentTable_DWR.js */


/*** /myitinerary/components/js/segmentTableIROP.js ***/


var protectionSelIndex = 0; 
function getIROPActionColumn(segment) {
	var itinChanges = ['cabin'];
		itinChanges = getAffectedFlightInfo.markChanges('cabin', segment);
	
	var sessionId = itineraryDisplayController.segmentsArray['sessionId'];
	var sequenceString = 'tripIndex_' + protectionSelIndex + '_' + segment.segmentNumber;
	var sequenceNo = itineraryDisplayController.protectionTrips[sequenceString];
	protectionSelIndex++
	var onlyConfirmedSegments = segment.segmentStatusDescript;
	onlyConfirmedSegments = onlyConfirmedSegments.toLowerCase();
	var actText ='';
	if(onlyConfirmedSegments == 'confirmed' && itineraryDisplayController.inhibitAcceptOptions == false){
		actText = '<form action="/irop/protectionSelection.action" name="iropAccept' + sequenceNo + '">';
		actText += '<input type="hidden" name="cId" value="' + sessionId + '" />';
		actText += '<input type="hidden" name="protsel" value="' + sequenceNo + '" />';
		actText += '<input class="submit right" type="submit" value="Accept This Option" name="acceptIROPAlt" id="acceptIROPAlt" onclick="setOmnitureTracking.setOmnitureEvents(\'protectionSelect\');" />';
		actText += '</form>';
		actText += '<div>You will not be charged.</div>';
		if(itinChanges && (getAffectedFlightInfo.affCabin == 'business' || getAffectedFlightInfo.affCabin == 'first')){
			actText += '<div id="irop_cabin_msg" class="alerts_errors"><div class="alert">First Class not available on all flights</div></div>';
		}
	}
	return actText;
}

/*<%-- Lucas Standby ---%>*/
/* <%-- Future IROP Release --%>
function getStandbyFlightColumn(segment){
 var flightNo="";
 if (segment.flightDetailsUrl != null) {  
       		if (segment.flightDetailsUrl .indexOf(BOOKING_URL_TXT) >-1 ) {       		
				   	 flightNo="<a href=\"javascript:openWin('"+segment.flightDetailsUrl+"','equipmentDetail', 500, 350)\">";
   	      	} else {
		       	    flightNo='<a href=\"'+segment.flightDetailsUrl+'\">';
  	        }

  } 
  
	var cdshr_prtnr_tbl = displayedItin.legend;
	var superScript = ''; 
	// include this code later in the code
	  
	if (((segment.codeShare || segment.connCarrier) || 
		(segment.carrierCode != "DL" && segment.operatingCarrierName.indexOf('Delta') > -1)
		&& cdshr_prtnr_tbl!= null)) {
			for (var i =0; i <cdshr_prtnr_tbl.length; i++){
				if (cdshr_prtnr_tbl[i] == segment.operatingCarrierName){
					superScript = '<sup>'+(i+1)+'</sup>';
		 		}
		 	}  
	}	 
	flightNo=flightNo+segment.carrierNameForDisplay+'<nobr>&nbsp;'+segment.flightNumber+'</a>'+superScript+'</nobr><br>'; //need to add codeshare logic
  	flightNo += '<br />Reservation: <span id="IROPSegmentStatusMsg">Confirmed</span>';
  
  return flightNo;
}	  

function getStandbyDepartureColumn(segment){
	var deptText ='';
    if ((segment.departureCityName!= null) && (segment.departureAirportCode!= null) && (segment.departureCity!="") && (segment.departureAirportURL != null) ) {
 		deptText= deptText+segment.departureCityName+"&nbsp;(<a href="+segment.departureAirportURL+">"+segment.departureAirportCode+"</a>)";
    } else { 
       deptText= deptText+segment.departureCityName+"&nbsp("+segment.departureAirportCode+")"
       
    } 
	if(exists(segment.departureTerminal) && segment.departureTerminal != "") {
		deptText= deptText+"<br />" + segment.departureTerminal;
	}
	deptText= deptText+"<br /><!-- mp_trans_disable_end -->Gate: "+ segment.deptGate+"<br />";
    var deptTime = 'Scheduled: ';
	if (segment.arrivalDateTime != null) { 
        deptTime += segment.formattedDepartureTime+"<br />";
    	deptTime += segment.formattedDepartureDate;
	} else {
    	deptTime= "&nbsp;";
    }
	deptText += deptTime;
	return deptText;
}

function getStandbyArrivalColumn(segment) {
	var arrText ='';
	if ((segment.arrivalCityName!= null) && (segment.arrivalAirportCode!= null) && (segment.arrivalCity!="") && (segment.arrivalAirportURL != null) ) {
		arrText= arrText+segment.arrivalCityName+"&nbsp;(<a href="+segment.arrivalAirportURL+">"+segment.arrivalAirportCode+"</a>)"
	} else { 
		arrText= arrText+segment.arrivalCityName+"&nbsp;("+segment.arrivalAirportCode+")";
	} 
	if(exists(segment.arrivalTerminal) && segment.arrivalTerminal != "") {
		arrText= arrText+"<br />" + segment.arrivalTerminal;
	}
	arrText= arrText+"<br /><!-- mp_trans_disable_end -->Gate: "+ segment.arrGate+"<br />"; 
	var arrTime = 'Scheduled: ';
	if (segment.arrivalDateTime != null) { 
    	arrTime += segment.formattedArrivalTime+"<br />";
        arrTime += segment.formattedArrivalDate;
	} else {
    	arrTime = "&nbsp;";
    }
	arrText += arrTime;
	return arrText;
}
function getStandbyActionColumn(segment) {
	var actText ='';
	actText = 'Your seat request cards will print automatically when you finish checking in for your confirmed flight(s)';
	return actText;
}
*/
var optionNumber = 1;
var getBanner = function (segment) {
	var bannerText = 'Option ' + optionNumber + ': ';
	bannerText += segment.departureCityName + '&nbsp('+ segment.departureAirportCode +')';
	bannerText += ' to ' + segment.arrivalCityName + '&nbsp('+ segment.arrivalAirportCode +')';
	bannerText += ' on ' + segment.formattedDepartureDate;
	optionNumber++;
    return bannerText;

}


var irop_segmentCellFuncs = [getFlightColumn,getDepartureColumn,getArrivalColumn,
	getCabin
];
var irop_segmentCellFuncsRow1 = [getFlightColumn,getDepartureColumn,getArrivalColumn,
	getCabin,getIROPActionColumn
];
var irop_upgradeSegmentCellFuncs = [getFlightColumn,getDepartureColumn,getArrivalColumn,
	getCabin, getUpgradeColumn/* function in segmentTable.js */
];
var irop_upgradeSegmentCellFuncsRow1 = [getFlightColumn,getDepartureColumn,getArrivalColumn,
	getCabin, getUpgradeColumn/* function in segmentTable.js */, getIROPActionColumn
];
/*<%-- Future IROP Release --%>
var standbySegmentCellFuncs = [getStandbyFlightColumn,getStandbyDepartureColumn,getStandbyArrivalColumn,
	getCabin, getStandbyActionColumn
];
*/
var bannerCellFuncs = [ getBanner ];


function iropTableController(trips) {
	
	try {
		var tripsArray = (trips.length > 0) ? trips.length : 1;
		var cellfuncRow1 = irop_segmentCellFuncsRow1;
		var cellfunc = irop_segmentCellFuncs;
		if ((displayedItin.upgradeDataPresent) || (displayedItin.containUpgradableSegment )) { 
			//show('irop_upgradeHeader');     
			show('irop_upgradeHeader', (DeltaOverlayUtil.isIe() ? "block" : "table-cell") )
			cellfuncRow1 = irop_upgradeSegmentCellFuncsRow1;
			cellfunc = irop_upgradeSegmentCellFuncs;
			upgradePresent = true;
			
		} else {
			hide('irop_upgradeHeader');
			upgradePresent = false;			
		}
		var tableId = "irop_segmentsBody";
		DWRUtil.removeAllRows(tableId);
		var currentSegment = [];
		
		for(var i = 0, j = tripsArray; i < j; i++){
			/*
			var segNbr = 0;
			while ( segNbr < segments.length && segments[segNbr].segmentStatusCode == "WK" ) {
				segNbr ++;
	    	}
			*/
			currentSegment[0] = trips[i].segments[0];
			
				populateRowBanner(tableId, currentSegment, bannerCellFuncs);
			
				for(var s = 0, t = trips[i].segments.length; s < t; s++) {			
					
					currentSegment[0] = trips[i].segments[s];
					itineraryDisplayController.protectionTrips['tripIndex_' + i + '_' + currentSegment[0].segmentNumber] = trips[i].sequenceNo;

					if(s == 0){
						populateItineraryTable(tableId, currentSegment, cellfuncRow1, trips[i].segments.length);	
					} else {
						populateItineraryTable(tableId, currentSegment, cellfunc);
					}
					if(scheduleChange || currentSegment[0].chgFlag){
						populateScheduleNote(currentSegment, tableId);
					}
				}
		}

	} catch(e) {
		//alert(e + 'There was an error processing your IROP itinerary segments');
	}
			
}
/* <%-- Future IROP release --%>
function standbyTableController(segments) {
	
	try {
		var cellfunc = standbySegmentCellFuncs;
		var tableId = "standby_segmentsBody";
		DWRUtil.removeAllRows(tableId);
		var currentSegment = [];
		
		for(var s = 0; s < segments.length; s++) {			
			currentSegment[0] = segments[s] 
			populateItineraryTable(tableId, currentSegment, cellfunc);
		}
	} catch(e) {
		alert(e + 'There was an error processing your standby itinerary segments');
	}
			
}
*/
function populateRowBanner(tableId, bannerText, cellFuncs) {
	DWRUtil.addRows( tableId, bannerText, cellFuncs, {
		rowCreator:function(options) {
			var row = document.createElement("tr");
			row.className =  "rowBanner";
			return row;
		},
		cellCreator:function(options) {
			var td = document.createElement("th");
			td.setAttribute("align","left");
			if(upgradePresent){
				td.setAttribute("colSpan", 6);
			} else {
				td.setAttribute("colSpan", 5);
			}
			return td;
		},
		escapeHtml:false
	});
}

/*** end /myitinerary/components/js/segmentTableIROP.js ***/


/*** begin File /myitinerary/components/js/dwr/passengerTable.js ***/
var airLineTable = null;
var segsForPassFuncs = [ getPAXDepartureColumn, getPAXArrivalColumn, getSeat, getSSR ];
var segsForPassFuncsRow1 = [ getPassengerName, getPAXDepartureColumn, getPAXArrivalColumn, getSeat, getSSR ];
var segmentStatus_codeshare_standby = "cb";
var segmentStatus_standby = "sb";
function populatePassengerTable(data) {
	try{
		var tableId = "passengerTableBody";
		DWRUtil.removeAllRows(tableId);
		airLineTable = displayedItin.airlineTable;
		var segmentsArray = data.reservationSegments;
		var passengerArray = data.passengers;
		var passAirSeg = passengerArray.passengerAirSegment;
		var noOfConfSeg = 0;
		for( var j=0, i = segmentsArray.length; j < i; j++ ) {
			if( segmentsArray[j].segmentStatusCode != "WK" && !segmentsArray[j].hiddenSegment) {
				noOfConfSeg = noOfConfSeg + 1;
			}
		}
		myItin_Segment_Count_Check = noOfConfSeg > 0 ? noOfConfSeg - 1 : 0;
		for( var i = 0, k = passengerArray.length; i < k; i++ ){
			myItin_Current_Segment_Count = 0;
			passenger = passengerArray[i];
			var currentSegment = [];
			var segNbr = 0;
			while ( segNbr < segmentsArray.length && (segmentsArray[segNbr].segmentStatusCode == "WK" || segmentsArray[segNbr].hiddenSegment)) {
				segNbr ++;
			}
			currentSegment[0] = segmentsArray[segNbr];
			DWRUtil.addRows( tableId, currentSegment, segsForPassFuncsRow1, {
				rowCreator:function(options) {
					var rowColor;
					if( (options.rowIndex % 2) == 0 ){
						rowColor = "tblContent1"; // odd 
					} else {
						rowColor =  "tblContent2"; // even
					}
					var row = document.createElement("tr");
					row.className =  rowColor;
					row.valign =  "top"; 
					return row;
				},
				cellCreator:function(options) {
					var td = document.createElement("td");
					td.className =  "tableCell";
					if( options.cellNum == 0 ) {
						td.style.borderLeft = "1px solid #D8D8D8";
					}
					if( options.cellNum == 0 ) {
						td.setAttribute("class", "tableCell appBoxContent");
						td.setAttribute ("rowSpan", noOfConfSeg);
						td.setAttribute("width", "140px");
					} else if( options.cellNum == 1 ) {
						td.setAttribute("width", "140px"); 
					} else if( options.cellNum == 2 ) {
						td.setAttribute("width", "140px");
					} else if( options.cellNum == 3 ) {
						td.setAttribute("width", "100px"); 
					} else if( options.cellNum == 4 ) {
						td.setAttribute("width", "184px");
					}
					return td;
				},
				escapeHtml:false
			});
			for( var s=segNbr+1 ; s< segmentsArray.length; s++ ) {
				while ( s< segmentsArray.length && segmentsArray[s].segmentStatusCode == "WK" ) {
					s = s + 1;
				}
				if( s >= segmentsArray.length ) {
					break;
				}
				currentSegment[0] =  segmentsArray[s];
				if (!currentSegment[0].hiddenSegment) {
					DWRUtil.addRows( tableId, currentSegment, segsForPassFuncs, {
						rowCreator:function(options) {
							var rowColor;
							if( (options.rowIndex % 2) == 0 ){
								rowColor = "tblContent1"; // odd
							} else {
								rowColor =  "tblContent2"; // even
							}
							var row = document.createElement("tr");
							row.className =  rowColor;
							row.valign = "top";
							return row;
						},
						cellCreator:function(options) {
							var td = document.createElement("td");
							td.className =  "tableCell";
							if( options.cellNum == 0 ) {
								td.setAttribute("width", "140px");
							} else if( options.cellNum == 1 ) {
								td.setAttribute("width", "140px");
							} else if( options.cellNum == 2 ) {
								td.setAttribute("width", "100px");
							} else if( options.cellNum == 3 ) {
								td.setAttribute("width", "184px");
							}
							return td;
						},
						escapeHtml:false
					});
				}
			}
		}
	} catch(e){
		//alert(e + 'error building the passenger table');	
	}
}

function getPAXArrivalColumn(segment) {
   	return segment.arrivalCityName + "&nbsp;(" + segment.arrivalAirportCode + ")";
}
function getPAXDepartureColumn(segment) {
    return segment.departureCityName + "&nbsp(" + segment.departureAirportCode + ")";
}
function isSegmentStandByStatus(segmentStatus) {
	return segmentStatus.toLowerCase() === segmentStatus_codeshare_standby || segmentStatus.toLowerCase() === segmentStatus_standby;
}
function getSeat(segment) {
	var seatName = 'Not Assigned';
	var dlCarrierCode = "DL";

	var ismCapableCarrierCodes = { DL : true, KL : true, AS : true };

	var pInfoList = passenger.passengerAirSegmentInfo;
	var pInfo = null;
	var seatLink = "";
	var descript = segment.segmentStatusDescript;
	var segmentStatus = exists(segment.segmentStatusCode) ? segment.segmentStatusCode : "";
	var displayChangeSeatLink = true;
	if( pInfoList == null ) {
		seatName = "Not Assigned";
	} else {
		if( isSegmentStandByStatus(segmentStatus) ) {
			seatName = "Standby";
			displayChangeSeatLink = false;
		} else {
			for( var i=0; i < pInfoList.length ; i++ ) {
				if( pInfoList[i] == null ) {
					seatName = "Not Assigned";
				} else {
					var seg = segment.segmentNumber;
					if( seg.length == 1 ) {
						seg = '0' + seg;
					}
					if( pInfoList[i].reservationSegment == seg ){
						pInfo =  pInfoList[i];
					}
					if( descript==null || descript.length == 0 ) {
						seatName = "&nbsp;";
					} else {
						if( pInfo != null && pInfo.seatName != null && pInfo.seatName != "" ) {
							if (pInfo.seatStatus != null && pInfo.seatStatus == "NN") {
								seatName ="Requested";
							} else  {
								seatName = pInfo.seatName;
                            }
						} else {
							seatName =  "Not Assigned";
						}
					}
				}
			}
		}
	}
	if( !segment.shuttle && seatName != "On Request") {
		if( displayedItin.seatMapURL != null && displayedItin.seatMapURL != 'null' && displayChangeSeatLink ) {
			if( exists(segment.carrierCode) && exists(ismCapableCarrierCodes[segment.carrierCode]) ) {
			var legToISM = myItin_Current_Segment_Count <= myItin_Segment_Count_Check ? myItin_Current_Segment_Count : 0;
			seatLink = "<br /><span id=\"changeSeat\"  ><a href=\"" + displayedItin.seatMapURL + "&leg=" + legToISM + "\" >Select/Change </a></span>";
			}
			myItin_Current_Segment_Count ++;
		}
	}
	if( segment.shuttle && seatName =="Not Assigned" ) {
		seatName="Open Seating";
	}
	return seatName + seatLink;
}

var divNo = 0;
var prgName = "";
var airLine = "";
var airLineCd = "";
function getPassengerTicketNumber(pnrPaxNum) {
	var passengers = dwrResponse.passengers;
	var numPax = passengers.length;
	for(var i=0;i<numPax;i++){
		if(passengers[i].passengerNumber == pnrPaxNum) {
			return passengers[i].ticketNumber;
		}
	}
	return null;
}
function getPassengerName(segment) {
	var paxInfoText = "";
	var psgrSMNbr = "";
	var psgrOANbr = "";
	var psgrName = "";
	var psgrNo = "";
	var passNo = "";
	var ssrNbr = "";
	var eliteDesc = "";
	var ffName = "Delta Air Lines/SkyMiles";
	if( passenger.name != null ) {
		psgrName = passenger.nameWithSpaces;
		passNo = passenger.passengerNumber;
	} else {
		psgrName = "&nbsp;";
	}
	psgrNo = passNo 
	divNo = divNo + 1;
	if( passenger.skymilesNumber != null  && passenger.skymilesNumber != "" ) {
		psgrSMNbr = passenger.skymilesNumber;
	} else {
		psgrSMNbr = passenger.oaFFNumber;
		ffName =  passenger.mbrProg;
	}
	prgName = "";
	airLine = "";
	if(exists(parseProgram)) {
		parseProgram(ffName);
	}
	ssrNbr = passenger.ffSSRNbr;
	eliteDesc = passenger.eliteDesc;
	paxInfoText += "<!-- mp_trans_schedule_disable_start -->";
	paxInfoText += psgrName + "<div id=\"pass_ffno_" + divNo + "\">";
	if( psgrSMNbr != null && psgrSMNbr != "" ) {
		paxInfoText += airLine + " # " + psgrSMNbr;
		paxInfoText += "<br /><nobr>" + prgName + "</nobr>";
		paxInfoText += "<br /><nobr>" + eliteDesc + "</nobr>" ;
		if( displayedItin.allowFFChange ) {
			paxInfoText += "<br /><a href=\"javascript:showFFUpdateForm('Y', '" + divNo + "');\" id=\"ffPrgm_ffProgram_changeAdd_pax" + divNo + "\">Change Frequent Flyer #</a> </div> <br />";
		}
		paxInfoText += createChangeFFBox(divNo, passenger.name, "C", ssrNbr);
	} else { 
		paxInfoText += "<br /><a href=\"javascript:showFFUpdateForm('Y', '" + divNo + "');\" id=\"ffPrgm_ffProgram_changeAdd_pax" + divNo + "\" >Add Frequent Flyer #</a> </div> <br />";
		paxInfoText += createChangeFFBox(divNo, passenger.name, "A", ssrNbr);
		skymilesNoPending = skymilesNoPending + 1; // No Frequent Flyer No
	}
	paxInfoText += "<br />Ticket Number: ";
	if(getPassengerTicketNumber(psgrNo) != null && getPassengerTicketNumber(psgrNo) != "null"){
		paxInfoText += getPassengerTicketNumber(psgrNo);
	} else {
		paxInfoText += "Not Available";
	}
	paxInfoText += "<!-- mp_trans_schedule_disable_end -->";
	return paxInfoText;

}
function getSSR ( segment) {
	var ssrLink = "&nbsp; ";
	var ssr = segment.SSRs;
	passNo = passenger.passengerNumber ;
	if( segment.carrierCode == DELTA_CODE && !segment.codeShare && segment.segmentStatusCode != "WK" ) {
		ssrLink = "<a href=\"javascript:openWin('/ssrutility/display.action";
		var requestParams = '?recLocator=' + dlRecordLocator + '&flightNo=' + segment.flightNumber + '&passenger=' + passNo + '&segmentNum=' + segment.segmentNumber;
		ssrLink = "<br /><div align=\"right\" id=\"addEdit6\">" + ssrLink + requestParams + "','SSR',648,600,'yes');\" >Add/Edit</a></div>";
	}
	var requests = "";
	if( ssr != null ) {
		for( var i = 0; i < ssr.length; i++ ) {
			if( ssr[i].passenger == passNo || ssr[i].passenger == "*.*" ) {
				requests += ssr[i].description + ", ";
    		}
    	}
		return requests.substring(0, requests.length-2) + "&nbsp;" + ssrLink;	
 	}
 	return requests + ssrLink;
	
}
	
function createChangeFFBox(passNo, psgName, addChgInd, ssrNbr) {
	var box = "<div id=\"pass_ffupdateform_" + passNo + "\" style=\"display:none;\">";
	box += "<form id=\"addffno_" + passNo + "\" name=\"addffno_" + passNo + "\" onSubmit=\"return addFreqFlyerNo('" + passNo + "','" + dlRecordLocator+"','" + psgName+"','" + addChgInd + "','" + ssrNbr + "','ffNum_ffProgram_pax" + passNo + "_req');\" action=\"javascript:void(0);\" method=\"post\">";
	box += createAlDropBox(passNo);
	box += "<label for=\"ffNum_ffProgram_pax" + passNo + "_req\">Frequent Flyer #<sup>1</sup></label><div><input id=\"ffNum_ffProgram_pax" + passNo + "_req\" type=\"text\"  name=\"acct\" maxlength=\"20\"  size=\"20\" ></div>";
	box += "<div id=\"undoLinks_ pax" + passNo + "\" ><a href=\"javascript:showFFUpdateForm('N', '" + passNo + "');clearLoyalty('ffNum_ffProgram_pax" + passNo + "_req')\"  >Undo</a></div>";
	box += "<input class=\"button right\" type=\"submit\" value=\"Submit\" name=\"Submit\" id=\"Submit_pax" + passNo + "\"  />";
	box += "</form>";
	box += "</div>";
	return box;
	
}

function createAlDropBox(passNo) {
	
	var dropTxt = "<label for=\"ffPrgm_ffProgram_pax" + passNo + "_req\">Airline Program</label>";
	dropTxt += "<select name=\"airProgSelect\" id=\"ffPrgm_ffProgram_pax" + passNo + "_req\">";
	dropTxt += "<option selected value=\"DL\">Delta Air Lines/SkyMiles</option>";
	if( airLineTable != null ) {
		for( var i = 0; i < airLineTable.length; i++ ) {
			//if(exists(parseProgram)) {
			parseProgram(airLineTable[i]);
			//}
			if( airLineCd != 'DL' ) {
				if( prgName == "" ) {
					dropTxt += "<option value=\'" + airLineCd + "'\">" + airLine + "</option>";
				} else {
					dropTxt += "<option value=\'" + airLineCd + "'\">" + airLine + "/" + prgName + "</option>";
				}
			}
		}
	}
	dropTxt = dropTxt + "</select>";
	return dropTxt;
	
}
/*** end File /myitinerary/components/js/dwr/passengerTable.js ***/



var upgradeStandbyHandler = {
	localConCatTool:new conCatTool(),
	currentSegment:null,
	currentPNR:null,
	linkURLStart:null,
	dwrData:null,
	segmentCount:0,
	segmentReferences:[],
	isProperlyInitialized:false,
	rowElementType:"tr",
	cellElementType:"td",
	standbyCodes:{CB:"Codeshare Standby", SB:"Standby"},
	disableHTMLTranslationStartTag:"<!-- mp_trans_disable_start -->",
	disableHTMLTranslationEndTag:"<!-- mp_trans_disable_end -->",
	currentSegmentReference:null,
	seatStatusCodes:{ checkedIn:{CV:true,CI:true,BP:true}},
	standbyCodes:{CB:"Codeshare Standby", SB:"Standby"},
	myItineraryAppCode:"myitinerary",
	ociAppCode:"oci",
	appCode:null,
	firstName:null,
	lastName:null,
	isViewingUpgradeList:true,
	standbyHeaderText:"Standby Status",
	defaultCount:-1,
	segmentNumber:"",
	DELTA_CODE:"DL",
	isPassengerCheckedIn:function(passengerNumber, segmentNumber) {
		var passengerAirSegmentInfo = this.dwrData.passengers[passengerNumber].passengerAirSegmentInfo;
		for (var i=0, j=passengerAirSegmentInfo.length; i<j; i++) {
			var passengerAirSegmentInfoRef = passengerAirSegmentInfo[i];
			if (passengerAirSegmentInfoRef.reservationSegment === segmentNumber) {
				return exists(this.seatStatusCodes.checkedIn[passengerAirSegmentInfoRef.seatStatus]);
			}
		}
		return false;
	},
	isSegmentStandby:function(segmentReference) {
		return exists(this.standbyCodes[segmentReference.segmentStatusCode]);
	},
	idReferences:{ segmentCountBody:{id:"segmentCount_body"}, tabData:{id:"tabData"}, totalFirstAvailable:{id:"totalFirstAvailable"}, totalCoachAvailable:{id:"totalCoachAvailable"},
		flightNumber:{id:"flightNumber"}, fromCity:{id:"fromCity"}, toCity:{id:"toCity"}, flightDate:{id:"flightDate"},
		firstClaimed:{id:"firstClaimed"}, coachClaimed:{id:"coachClaimed"}, firstUnclaimed:{id:"firstUnclaimed"}, coachUnclaimed:{id:"coachUnclaimed"},
		passengerData:{id:"passengerData"}, processing:{id:"processing"}, upgradeStandbyContainer:{id:"upgradeStandbyContainer"},
		dwrError:{id:"nullCurrentSegmentUpgradeList"}, generalError:{id:"dwrErrorContainer"}, checkInInfoMessage:{id:"checkInInfo"},
		standByInfoMessage:{id:"standByInfo"}, passengerListContainer:{id:"passengerListContainer"}, seatAvailabilityListContainer:{id:"seatAvailabilityListContainer"},
		dupeNameInfo:{id:"dupeNameInfo"}, standbyIndicator:{id:"standbyIndicator"}, flightData:{id:"flightData"}, standbyStatusHeader:{id:"statusHeader"},
		segmentCountCurrent : {id:"segmentCount_current"} },
	canAddSegmentReference:function(segment) {
		var isStandbySegment = this.isSegmentStandby(segment);
		if (exists(this.appCode) && this.appCode.toLowerCase() === this.ociAppCode && isStandbySegment) {
			return false;
		} else {
			return (isStandbySegment || segment.upgradeRequestPresent) && !segment.hiddenSegment && segment.standbyStatusAvail && !segment.codeShare && segment.carrierCode == this.DELTA_CODE && segment.upgradeStatus.indexOf("Confirmed") === -1;
		}
	},
	setSegmentCount:function() {
		this.dwrData.reservationSegments = [];
		for(s=0, t = this.dwrData.trips.length; s<t; s++){
		var tripData = this.dwrData.trips[s].segments;
			for(i=0, j = tripData.length; i<j; i++){
				this.dwrData.reservationSegments.push(tripData[i]);
			} //end for
		}
		var reservationSegments = this.dwrData.reservationSegments;
		for (var i=0, j=reservationSegments.length; i<j; i++) {
			var reservationSegment = reservationSegments[i];
			if (this.canAddSegmentReference(reservationSegment)) {
				this.segmentReferences[this.segmentCount] = reservationSegment;
				this.segmentCount ++;
			}
		}
		if (this.currentSegment >= this.segmentCount) {
			this.currentSegment = 0;
		}
		setInnerHTML(this.idReferences.segmentCountBody.id, this.segmentCount);
		setInnerHTML(this.idReferences.segmentCountCurrent.id, (this.currentSegment+1));
	},
	addTabs:function() {
		var conCatToolRef = this.localConCatTool;
		conCatToolRef.conCat("<ul>");
		for (var i=0, j=this.segmentReferences.length; i<j; i++) {
			var segmentReference = this.segmentReferences[i];
			conCatToolRef.conCat("<li " + ( parseInt(this.segmentNumber, 10)===parseInt(segmentReference.segmentNumber, 10) ? "class=\"active\"" : "") + (i === (j-1) ? "style=\"width: 21%\"" : "" ) + ">");
			conCatToolRef.conCat("<a href=\"" + this.linkURLStart + i + "\">");
			if (this.isSegmentStandby(segmentReference)) {
				conCatToolRef.conCat("*");
				show(this.idReferences.standbyIndicator.id);
			}
			conCatToolRef.conCat("To: ");
			conCatToolRef.conCat(segmentReference.arrivalCityName, true);
			conCatToolRef.conCat("</a>");
		}
		conCatToolRef.conCat("</ul>");
		var idReference = this.idReferences.tabData.id;
		setClassName(idReference, "applicationTabs_" + (this.segmentCount===1?2:this.segmentCount) + "_2Line");
		setInnerHTML(idReference, conCatToolRef.toString(true));
	},
	setSegmentNumber:function(segmentNumber) {
		this.segmentNumber = exists(segmentNumber) ? "00" + segmentNumber : "01";
		this.segmentNumber = this.segmentNumber.substr(this.segmentNumber.length-2, this.segmentNumber.length);
	},
	findSegmentForUpgradeListView:function(segmentReference) {
		/*LOGIC NOTE!!!!
			Hidden segments are created to signify the upgrade, this is where the actual standbyStatus, number of standbys, etc actualyl exists
			As a result, when you are viweing the upgrade standby list you want to adjust this.currentSegment to the preivous segment
		*/
		var reservationSegments = this.dwrData.reservationSegments;
		for (var i=0, j=reservationSegments.length; i<j; i++) {
			var reservationSegment = reservationSegments[i];
			if (segmentReference === reservationSegment) {
				if(i === 0 || !reservationSegments[i-1]) {
					return segmentReference;
				} else {
					return reservationSegments[i-1];
				}
			}
		}
		return segmentReference;
	},
	setCurrentSegmentReference:function() {
		for (var i=0, j=this.segmentReferences.length; i<j; i++) {
			if (i===this.currentSegment) {
				this.currentSegmentReference = this.segmentReferences[i];
				this.setSegmentNumber(this.currentSegmentReference.segmentNumber);
				if (!exists(this.standbyCodes[this.currentSegmentReference.segmentStatusCode])) {
					this.currentSegmentReference = this.findSegmentForUpgradeListView(this.currentSegmentReference);
				} else {
					this.isViewingUpgradeList = false;
					setInnerHTML(this.idReferences.standbyStatusHeader.id, this.standbyHeaderText);
				}
			}
		}
	},
	createElement:function(type) {
		return document.createElement(type);
	},
	setElementAttributess:function(target, defs) {
		for( var i=1, j=arguments.length; i<j; i++) {
			var def = arguments[i];
			target.setAttribute(def.att, def.value);
		}
	},
	appendElement:function(parent, child) {
		parent.appendChild(child);
	},
	kill:function() {
		for(var i=0, j=arguments.length; i<j; i++) {
			arguments[i] = null;
		}
	},
	segmentHasValidCount:function(segmentReference) {
		return segmentReference.firstOrBusRemaining > this.defaultCount || segmentReference.coachRemaining > this.defaultCount;
	},
	returnRemainingCount:function(remaining) {
		if (exists(remaining)) {
			return remaining < 0 ? 0 : remaining;
		}
		return "--";
	},
	returnStandbyOrUpgradeText:function() {
		return this.isViewingUpgradeList ? "Upgrade" : "Standby";
	},
	addPassengerStandbyData:function() {
		var segmentReference = this.currentSegmentReference;
		if (exists(segmentReference)) {
			var idReferenceObject = this.idReferences;
			var standByStatus = segmentReference.standbyStatus;
			var passengerContainer = get(idReferenceObject.passengerData.id);
			var rowElement = null;
			var cellElement = null;
			var hasOnePassengerCheckedIn = false;
			if (exists(standByStatus)) {
				for (var standByStatusCounter = 0, standByStatusLength = standByStatus.length; standByStatusCounter<standByStatusLength; standByStatusCounter++) {
					var standbyStatusReference = standByStatus[standByStatusCounter];
					var priority = this.isViewingUpgradeList ? standbyStatusReference.upgradePriority : standbyStatusReference.priority;
					var totalStandby = this.isViewingUpgradeList ? segmentReference.totalUpgrades : segmentReference.totalStandby;
					var isPassengerCheckedIn = priority !== this.defaultCount || standbyStatusReference.dupeName || this.isPassengerCheckedIn(standByStatusCounter, this.segmentNumber);
					rowElement = this.createElement(this.rowElementType);
					this.setElementAttributess(rowElement, {att:"class",value:(standByStatusCounter%2===0 ? "even" : "odd")});
					cellElement = this.createElement(this.cellElementType);
					cellElement.innerHTML = this.disableHTMLTranslationStartTag + standbyStatusReference.name + this.disableHTMLTranslationEndTag;
					this.appendElement(rowElement, cellElement);
					this.kill(cellElement);
					cellElement = this.createElement(this.cellElementType);
					if ( standbyStatusReference.dupeName || priority === this.defaultCount || totalStandby === this.defaultCount ) {
						if (standbyStatusReference.dupeName) {
							show(idReferenceObject.dupeNameInfo.id);
						}
						if (priority === this.defaultCount && totalStandby !== this.defaultCount) {
							var pluralPax = totalStandby > 1 ? "s" : "";
							cellElement.innerHTML = (totalStandby > 0 ? totalStandby + " passenger" + pluralPax + " on " + this.returnStandbyOrUpgradeText() + " List. " : "") + "Check with agent for priority.";
						} else {
							if (totalStandby === 0) {
								cellElement.innerHTML = "Please Check in";
							} else {
								cellElement.innerHTML = "Requested - Check with agent";
							}
						}
					} else {
						cellElement.innerHTML = (isPassengerCheckedIn ? "#" + priority + " of " + totalStandby + " on " + this.returnStandbyOrUpgradeText() + " List" : "Requested - Not Checked-in");
					}
					this.appendElement(rowElement, cellElement);
					this.appendElement(passengerContainer, rowElement);
					if (isPassengerCheckedIn) {
						hasOnePassengerCheckedIn = true;
					} else {
						show(idReferenceObject.checkInInfoMessage.id);
					}
				}
			} else {
				show(idReferenceObject.checkInInfoMessage.id);
			}
			this.kill(rowElement, cellElement);
			if (!hasOnePassengerCheckedIn) {
				hide(idReferenceObject.passengerListContainer.id);	
			}
			if (this.segmentHasValidCount(segmentReference)) {
				setInnerHTML(idReferenceObject.totalFirstAvailable.id, this.returnRemainingCount(segmentReference.firstOrBusRemaining));
				setInnerHTML(idReferenceObject.totalCoachAvailable.id, this.returnRemainingCount(segmentReference.coachRemaining));
				setInnerHTML(idReferenceObject.firstClaimed.id, this.returnRemainingCount(segmentReference.firstOrBusClaimed));
				setInnerHTML(idReferenceObject.coachClaimed.id, this.returnRemainingCount(segmentReference.coachClaimed));
				setInnerHTML(idReferenceObject.firstUnclaimed.id, this.returnRemainingCount(segmentReference.firstOrBusUnclaimed));
				setInnerHTML(idReferenceObject.coachUnclaimed.id, this.returnRemainingCount(segmentReference.coachUnclaimed));
			} else {
				hide(idReferenceObject.seatAvailabilityListContainer.id);
			}
			setInnerHTML(idReferenceObject.flightDate.id, segmentReference.formattedDepartureDate);
			setInnerHTML(idReferenceObject.flightNumber.id, segmentReference.flightNumber);
			setInnerHTML(idReferenceObject.fromCity.id, segmentReference.departureCityName);
			setInnerHTML(idReferenceObject.toCity.id, segmentReference.arrivalCityName);
		}
	},
	getUpgradeStandby:function() {
		if (exists(this.appCode) && this.appCode.toLowerCase() === this.myItineraryAppCode.toLowerCase() ) {
			ItineraryDetailsProcessor.getItinerary(this.currentPNR, handleUpgradeStandbyCallBack);
		} else {
			ItineraryDetailsProcessor.getItineraryFromName(this.currentPNR, this.firstName, this.lastName, handleUpgradeStandbyCallBack);
		}
	},
	init:function(currentSegment, currentPNR, linkURLStart, appCode, firstName, lastName) {
		this.currentSegment = currentSegment;
		this.currentPNR = currentPNR;
		this.linkURLStart = linkURLStart;
		this.appCode = appCode;
		this.firstName = firstName;
		this.lastName = lastName;
		this.isProperlyInitialized = true;
		this.getUpgradeStandby();
	},
	display:function(data) {
		this.dwrData = data;
		var idReferenceObject = this.idReferences;
		if (this.dwrData !== null && this.isProperlyInitialized && this.dwrData.error === null) {
			this.setSegmentCount();
			this.setCurrentSegmentReference();
			this.addTabs();
			this.addPassengerStandbyData();
		} else {
			var errorId = idReferenceObject.dwrError.id;
			if (this.dwrData.error !== null) {
				setInnerHTML(errorId, this.dwrData.error);
			} else if (!this.isProperlyInitialized) {
				errorId = this.idReferences.generalError;
				setInnerHTML(errorId, "handler needs to be set up properly");
			}
			show(errorId);
			hide(idReferenceObject.passengerListContainer.id);
			hide(idReferenceObject.seatAvailabilityListContainer.id);
			hide(idReferenceObject.flightData.id);
		}
		hide(idReferenceObject.processing.id);
		show(idReferenceObject.upgradeStandbyContainer.id);
	}
};
function itinCheckin(){
	if(exists(get('topSegmentTableOCIForm'))){
		get('topSegmentTableOCIForm').submit();
	}
}
function displayItinView(id){
	if(id == 'itin_cal_view'){
		hide(id);
		hide('tripDetails');
		hide('summarySection');
		show('itin_list_view');
		show('itin_cal_container');
		hide("skyPriority");
		hide("spBySMLevel");
		hide("spByFareClass");
	} else {
		hide(id);
		//show('tripDetails');
		show('itin_cal_view');
		show('summarySection');
		hide('itin_cal_container');
		hide("skyPriority");
		hide("spBySMLevel");
		hide("spByFareClass");
	}
}

/* ********* contact information form ****************** */

function itinContactFormVal(form) {
	var isComplete = true;
	var formComplete = true;
	var phoneNumber = 'phone_number';
	var primaryEmail = 'primary_email'
	var phoneNumberInput = 0;
	var primaryEmailInput = 0;
	if (get(phoneNumber) != null) {
		phoneNumberInput = get(phoneNumber).value;
	}
	if (get(primaryEmail) != null) {
		primaryEmailInput = get(primaryEmail).value;
	}
	if (phoneNumberInput != "") {
		if (!valObj.validateField(phoneNumber, 'phone')) { formComplete = false; }
	} 	
	if (primaryEmailInput != "") {
		if (!valObj.validateField(primaryEmail, 'email')) { formComplete = false; }
	} 
	if (phoneNumberInput == "" && primaryEmailInput == "") { 
		formComplete = false;
		valObj.markError(phoneNumber, 'atleastOneField'); 
		valObj.markError(primaryEmail, 'atleastOneField'); 
	}
	if(!formComplete) {
		isComplete = false;
	}
	return isComplete;
}

function itinContactSuccess(){
	window.parent.hide('ctc_default');
	window.parent.show('ctc_reconfirmed');
	window.parent.DeltaOverlayUtil.hideOverlay();
	window.parent.setInnerHTML('ctc_reconfirmed', 'Your contact information has been updated.');
}

function removeAlpha(id){
	var origValue = get(id).value;
	var removeAlpha = origValue.replace(/[^0-9- ]/g, '');
	get(id).value = removeAlpha;
}
/*********************** itinerary calendar **********************/
function updateCalItins(jsonData, month, year){
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var month = (months[month]);
	var tempItins = jsonData;
	var monthYear = month + year;
	var objCount = 0;
	var numItins =0;
	var numSameDayItins =0;
	//var itinStatusMsg = 'Itinerary Updated';
	var index = 0;
	var itinDepDay = 0;
	if (exists(tempItins[monthYear])) {
		objCount = tempItins[monthYear].length;
	}
	for (var i = 0; i <= objCount && exists(tempItins[monthYear][i]); i++){
		//loop through JSON objects
		itinDepDay = tempItins[monthYear][i].depDay;
		for (var j = index + 1; i <= index && j <= objCount && numItins >= numSameDayItins; j++) {
			if (exists(tempItins[monthYear][j]) && itinDepDay == tempItins[monthYear][j].depDay) {	
				index++;
			} else {
				index++;	
				numSameDayItins = index - i;
				break;
			}
		}
		var ni = get('cal_0_day_' + itinDepDay + '_d');
		var calDepDay ='calDepDay';
		var itinActive = 'itinActive';
		ni.setAttribute('class', calDepDay);
		ni.setAttribute('className', calDepDay); //ie
		var newSpan = document.createElement('span');
		var spanIdName = 'itin_dep_' + itinDepDay + '_' + numItins;
		newSpan.setAttribute('id',spanIdName);
		if (tempItins[monthYear][i].statusMsg != null && tempItins[monthYear][i].statusMsg != 'null') {
			if (tempItins[monthYear][i].statusMsg == 'Itinerary Updated'){
				newSpan.setAttribute('class', 'itin_updated');
				newSpan.setAttribute('className', 'itin_updated'); //ie
			}
			if (tempItins[monthYear][i].statusMsg == 'Delayed Departure'){
				newSpan.setAttribute('class', 'itin_delayed');
				newSpan.setAttribute('className', 'itin_delayed'); //ie
			}
		}
		newSpan.innerHTML = "<a href=\"javascript:getDetail(\'"+tempItins[monthYear][i].confNum+"\');selectedItinDetails('itinCalendarView.reservatations','" 
			+ tempItins[monthYear][i].depDay + "','" + monthYear + "','"+ objCount 
			+ "')\"  onmouseout=\"javascript:hide('itin_flt_summary');\" onmouseover=\"javascript:hoverFltSummary(event,'" 
			+ tempItins[monthYear][i].statusMsg + "','" + numSameDayItins + "','" + tempItins[monthYear][i].confNum + "','" 
			+ tempItins[monthYear][i].depName + "','" + tempItins[monthYear][i].depCode + "','" + tempItins[monthYear][i].arrName 
			+ "','" + tempItins[monthYear][i].arrCode + "','" + tempItins[monthYear][i].depMonth + "','" + tempItins[monthYear][i].depDay 
			+ "','" + tempItins[monthYear][i].depTm + "','" + tempItins[monthYear][i].arrMonth + "','" + tempItins[monthYear][i].arrDay 
			+ "','" + tempItins[monthYear][i].arrTm + "')\">" +tempItins[monthYear][i].depCode + ' - ' + tempItins[monthYear][i].arrCode 
			+ '<br /><strong>' + '#' + tempItins[monthYear][i].confNum + '</strong></a>';
		numItins++;
		if (numItins <= 2){
			ni.appendChild(newSpan);
			if (numItins == numSameDayItins) {
				//reset the counts
				numItins = 0;
				numSameDayItins = 0;
			}
		} else {
			i += numSameDayItins - numItins;
			//reset the counts
			numItins = 0;
			numSameDayItins = 0;
		}
	}
}


function selectedItinDetails(jsonData, itinDepDay, monthYear, objCount){
	var calDepDay ='calDepDay';
	var selectedItinDisplay = 'selectedItinDisplay';
	var hoverItinDisplay = 'hoverItinDisplay';
	//reset selected items on calendar
	for (var i = 0; i <= objCount && exists(itinCalendarView.reservatations[monthYear][i]); i++){
		var ni = get('cal_0_day_' + itinCalendarView.reservatations[monthYear][i].depDay + '_d');
		ni.setAttribute('class', calDepDay);
		ni.setAttribute('className', calDepDay)
	}
	var ni = get('cal_0_day_' + itinDepDay + '_d');
	ni.setAttribute('class', calDepDay + ' ' + selectedItinDisplay);
	ni.setAttribute('className', calDepDay + ' ' + selectedItinDisplay); //ie
}
 /* 
 function itinCheckin(){
	if(exists(get('td_checkin_form'))){
		get('td_checkin_form').submit();
	}
}
*/
function showHoverMessage(e, content, elm, w,h,offX,offY) {
	var cursor = getPosition(e);
	var dtlBox = get(elm);
	var pageSize = DeltaOverlayUtil.getPageSize();
	var windowWidth = pageSize.windowWidth;
	var pageWidthMin = 0;
	var adjoffMaxDiff = (w + cursor.x - windowWidth);
	var combinedWidthMax = (w + cursor.x);
	var combinedWidthMin = (cursor.x - w);
	var adjOffMax = (-adjoffMaxDiff);
	// removed for now - var adjOffMin = (cursor.y - w);	
	if (dtlBox != null) {
		// next project through needs to change the below
		// to use setStyleAttr() and test that its working
		setInnerHTML(elm , content);
		dtlBox.style.display='block';
		dtlBox.style.width = w + "px";
		if(h = 'auto'){
			dtlBox.style.height = h;
		} else {
			dtlBox.style.height = h + "px";
		}
		if (combinedWidthMax >= windowWidth) {
			dtlBox.style.left = cursor.x + offX + adjOffMax + "px";
			dtlBox.style.top = cursor.y + offY + "px";
		} else if (combinedWidthMin <= pageWidthMin) {
			dtlBox.style.left = cursor.x + "px";
			dtlBox.style.top = cursor.y + "px";
		} else {
			dtlBox.style.left = cursor.x + offX + "px";
			dtlBox.style.top = cursor.y + offY + "px";
		}
	}
}

function hoverFltSummary(event, statusMsg, numItins, confNum, depName, depCity, arrName, arrCity, depMonth, depDay, depTm, arrMonth, arrDay, arrTm) {
	var text = "";
	var stops = "";
	var statusMsg = statusMsg;
	var calViewNote = 'NOTE: The Calendar view only displays your first two trips for this date. To view additional trips, please switch to the list view.';
	if (statusMsg != null && statusMsg != 'null') {
		if (statusMsg == 'Itinerary Updated'){
			text += '<div id="itin_status_msg" class=\'itin_updated\' className=\'itin_updated\'>' + statusMsg + '</div>';
		}
		if (statusMsg == 'Delayed Departure'){
			text += '<div id="itin_status_msg" class=\'itin_delayed\' className=\'itin_delayed\'>' + statusMsg + '</div>';
		}
	}
	text += '<div id="itin_departs_label">Departs:</div>';
	text += '<div id="itin_departs_data">'+ depName + '(' + depCity + '), ' +  depDay + ' ' + depMonth + ', ' + depTm + '</div>';
	text += '<div class="clear"> </div>';
	text += '<div id="itin_arrives_label">Arrives:</div>';
	text += '<div id="itin_arrives_data">'+ arrName + ' (' + arrCity + '), ' + arrDay + ' ' + arrMonth + ', ' + arrTm + '</div>';
	text += '<div class="clear"> </div>';
	text += '<div id="itin_confirmation_label">Confirmation #:</div>';
	text += '<div id="itin_confirmation_data">'+ confNum + '</div>';
	if (numItins > 2){
		text += '<div id="cal_view_note">' + calViewNote + '</div>'; 
	}
	showHoverMessage(event, text, 'itin_flt_summary', 375, 'auto', -100, 0);
}
/* take out for upgrade standby list project.  if no issues found, remove before prod move */
function formValLoyalty(id) {
	var t;
	returnval = true;
	if(get(id)) {
		t = get(id);
		tmp = "ffPrgm" + id.toString().substr(id.toString().indexOf("_"));
		selType = get(tmp);
		valObj.stripWhiteSpace(id);
		if (!t.value.match(/^[a-zA-Z_0-9]{5,20}$/)) {
			show('alerts_errors');
			valObj.markError(id);
			window.scroll(0,0);
			returnval = false;
		} else {
			valObj.removeError(id);
			valObj.removeNotification(id);
		}
	}
	return returnval;
}
function clearLoyalty(id) {
	var t;
	if(get(id)) {
		tmp = "ffPrgm" + id.toString().substr(id.toString().indexOf("_"));
		valObj.removeError(id);
		valObj.removeError(tmp);
	}
}
/* take out for upgrade standby list project.  if no issues found, remove before prod move */
function openOCIhelp(url, e, v) {
	w = screen.width - 420;
	h = screen.height - v;
	x = e.screenX;
	y = e.screenY;
	if(x > w) {
		x = x - 420;
	}
	if(y > h) {
		y = y - v;
	}
	childwin = window.open(url, "childwin", "width=420,height="+v+",top="+y+",left="+x+",scrollbars=no,resizable=yes");
}
/*
take out for upgrade standby list project.  if no issues found, remove before prod move
*/
function validateEmailItinerary() {
	f = document.forms['emailitineraryform'];
	var invalidnoemails = false;
	var invalidtoemail1 = false;
	var invalidtoemail2 = false;
	var invalidtoemail3 = false;
	var invalidtoemail4 = false;
	var invalidtoemail5 = false;
	var invalidtoemail6 = false;
	var invalidfromemail = false;
	var invalidname = false;
	namelength = f.name.value.length;
	namematch = f.name.value.match(/[a-zA-Z\s-]+/);
	if (f.toemail1.value == "" && f.toemail2.value == "" && f.toemail3.value == "" && f.toemail4.value == "" && f.toemail5.value == "" && f.toemail6.value == "") {
		invalidnoemails = true;
	}
	if (f.toemail1.value != "") {
		if (f.toemail1.value.match(/.*[@].*[.].*/) == null || f.toemail1.value.length != f.toemail1.value.match(/.*[@].*[.].*/)[0].length) {
			invalidtoemail1 = true;
		}
	}
	if (f.toemail2.value != "") {
		if (f.toemail2.value.match(/.*[@].*[.].*/) == null || f.toemail2.value.length != f.toemail2.value.match(/.*[@].*[.].*/)[0].length) {
			invalidtoemail2 = true;
		}
	}
	if (f.toemail3.value != "") {
		if (f.toemail3.value.match(/.*[@].*[.].*/) == null || f.toemail3.value.length != f.toemail3.value.match(/.*[@].*[.].*/)[0].length) {
			invalidtoemail3 = true;
		}
	}
	if (f.toemail4.value != "") {
		if (f.toemail4.value.match(/.*[@].*[.].*/) == null || f.toemail4.value.length != f.toemail4.value.match(/.*[@].*[.].*/)[0].length) {
			invalidtoemail4 = true;
		}
	}
	if (f.toemail5.value != "") {
		if (f.toemail5.value.match(/.*[@].*[.].*/) == null || f.toemail5.value.length != f.toemail5.value.match(/.*[@].*[.].*/)[0].length) {
			invalidtoemail5 = true;
		}
	}
	if (f.toemail6.value != "") {
		if (f.toemail6.value.match(/.*[@].*[.].*/) == null || f.toemail6.value.length != f.toemail6.value.match(/.*[@].*[.].*/)[0].length) {
			invalidtoemail6 = true;
		}
	}
	if (f.fromemail.value.match(/.*[@].*[.].*/) == null || f.fromemail.value.length != f.fromemail.value.match(/.*[@].*[.].*/)[0].length) {
		invalidfromemail = true;
	}
	if (namematch == null || namematch[0].length != namelength) {
		invalidname = true;
	}
	if (invalidnoemails || invalidtoemail1 || invalidtoemail2 || invalidtoemail3 || invalidtoemail4 || invalidtoemail5 || invalidtoemail6 || invalidfromemail || invalidname) {
		if (invalidnoemails || invalidtoemail1 || invalidtoemail2 || invalidtoemail3 || invalidtoemail4 || invalidtoemail5 || invalidtoemail6) {
			if (invalidnoemails) {
				setInnerHTML('emailitineraryformerror1','<span class="cpyError" style="padding-top:10px;padding-bottom:5px;"><img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> Please enter at least one e-mail address.</span>');
			} else {
				setInnerHTML('emailitineraryformerror1','<span class="cpyError" style="padding-top:10px;padding-bottom:5px;"><img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> You have entered an invalid e-mail address.</span>');
			}
		} else {
			setInnerHTML('emailitineraryformerror1','<img src="/images/spacer.gif" width="1" height="10" alt="" border="0" />');
		}
		if (invalidname || invalidfromemail) {
			if (invalidname) {
				setInnerHTML('emailitineraryformerror2','<span class="cpyError" style="padding-top:10px;padding-bottom:5px;"><img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> You have entered an invalid name.</span>');
			}
			if (invalidfromemail) {
				setInnerHTML('emailitineraryformerror2','<span class="cpyError" style="padding-top:10px;padding-bottom:5px;"><img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> You have entered an invalid e-mail address.</span>');
			}
		} else {
			setInnerHTML('emailitineraryformerror2','<img src="/images/spacer.gif" width="1" height="10" alt="" border="0" />');
		}
		if (invalidnoemails || invalidtoemail1) {
			setInnerHTML('toemail1label','<img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> <span class="cpyError">E-mail address 1 *</span>');
		} else {
			setInnerHTML('toemail1label','E-mail address 1 *');
		}
		if (invalidtoemail2) {
			setInnerHTML('toemail2label','<img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> <span class="cpyError">E-mail address 2</span>');
		} else {
			setInnerHTML('toemail2label','E-mail address 2');
		}
		if (invalidtoemail3) {
			setInnerHTML('toemail3label','<img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> <span class="cpyError">E-mail address 3</span>');
		} else {
			setInnerHTML('toemail3label','E-mail address 3');
		}
		if (invalidtoemail4) {
			setInnerHTML('toemail4label','<img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> <span class="cpyError">E-mail address 4</span>');
		} else {
			setInnerHTML('toemail4label','E-mail address 4');
		}
		if (invalidtoemail5) {
			setInnerHTML('toemail5label','<img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> <span class="cpyError">E-mail address 5</span>');
		} else {
			setInnerHTML('toemail5label','E-mail address 5');
		}
		if (invalidtoemail6) {
			setInnerHTML('toemail6label','<img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> <span class="cpyError">E-mail address 6</span>');
		} else {
			setInnerHTML('toemail6label','E-mail address 6');
		}
		if (invalidfromemail) {
			setInnerHTML('fromemaillabel','<img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> <span class="cpyError">E-mail address *</span>');
		} else {
			setInnerHTML('fromemaillabel','E-mail address *');
		}
		if (invalidname) {
			setInnerHTML('namelabel','<img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> <span class="cpyError">Name *</span>');
		} else {
			setInnerHTML('namelabel','Name *');
		}
		return false;
	}
	return true;
}

/* Calendar Menu functions */
var divPositioned = false;
var childWinOpen = false;

function positionDiv(e){
	var posx = 0;
	var posy = 0;
	if(divPositioned == false){
		if (!e) var e = window.event;
			if (e.pageX || e.pageY){
			posx = e.pageX;
			posy = e.pageY;
		} else if (e.clientX || e.clientY) {
			posx = e.clientX + document.body.scrollLeft
				+ document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop
				+ document.documentElement.scrollTop;
		}
		get('mtgDropDown').style.top = posy-10 + 'px';
		get('mtgDropDown').style.left = posx-10 + 'px';
		divPositioned = true;
	}
}
function showCalDD(){
	if(childWinOpen == false){
		show('mtgDropDown');
	}
}

function hideCalDD(){
	if(childWinOpen == false){
		hide('mtgDropDown');
		divPositioned = false;
	}
}

function submitMtgForm(fAction,fName){
	if (fAction.indexOf('Yahoo') > 0){
		 get('unnamedForm').target = '_blank';
	}
	get('unnamedForm').name = fName;
	get('unnamedForm').action = fAction;
	get('unnamedForm').submit();
}

/* take out for upgrade standby list project.  if no issues found, remove before prod move */
function validateFrequentFlyerform() {
	f = document.forms['frequentflyerform'];
	var invalidskymiles = false;
	var invalidpartner = false;
	var partner = f.partner.options[f.partner.selectedIndex].value;
	if (partner == "Delta") {
		if (f.frequentflyernumber.value.length != 10) {
			invalidskymiles = true;
		}
		if (f.frequentflyernumber.value.match(/\d{10}/) == null) {
			invalidskymiles = true;
		}
	} else {
		if (f.frequentflyernumber.value.length == 0) {
			invalidpartner = true;
		}
	}
	if (invalidskymiles || invalidpartner) {
		setInnerHTML('frequentflyernumberlabel','<img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> <span class="cpyError">Frequent flyer number</span>');
		if(invalidskymiles) {
			setInnerHTML('frequentflyerformerror','<p class="cpyError" style="padding-top:5px;padding-bottom:5px;"><img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" />You have entered an invalid SkyMiles number.</p>');
		}
		if(invalidpartner) {
			setInnerHTML('frequentflyerformerror','<p class="cpyError" style="padding-top:5px;padding-bottom:5px;"><img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" />You have entered an invalid frequent flyer number.</p>');
		}
		return false;
	}
	return true;
}

function validateSkymilesform(f) {
	var invalidskymiles = false;
	var invalidpin = false;
	if (f.acct.value.length != 10) {
		invalidskymiles = true;
	}
	if (f.acct.value.match(/\d{10}/) == null) {
		invalidskymiles = true;
	}
	if (f.pin.value.length != 4) {
		invalidpin = true;
	}
	if (f.pin.value.match(/\d{4}/) == null) {
		invalidpin = true;
	}
	if (invalidskymiles || invalidpin) {
		if (invalidpin) {
			setInnerHTML('pinlabel','<img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> <span class="cpyError">PIN</span>');
			setInnerHTML('skymilesformerror','<p class="cpyError" style="padding-top:5px;padding-bottom:5px;"><img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" />You have entered an invalid PIN.</p>');
		} else {
			setInnerHTML('pinlabel','PIN');
		}
		if (invalidskymiles) {
			setInnerHTML('skymilesnumberlabel','<img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> <span class="cpyError">SkyMiles number</span>');
			setInnerHTML('skymilesformerror','<p class="cpyError" style="padding-top:5px;padding-bottom:5px;"><img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" />You have entered an invalid SkyMiles number.</p>');
		} else {
			setInnerHTML('skymilesnumberlabel','SkyMiles number');
		}
		return false;
	}
	return true;
}
function validateNumberform(f) {
	var invalidfirstname = false;
	var invalidlastname = false;
	var invalidnumber = false;
	var numberlabel = "Number";
	firstnamelength = f.firstName.value.length;
	firstnamematch = f.firstName.value.match(/[a-zA-Z\s]+/);
	lastnamelength = f.lastName.value.length;
	lastnamematch = f.lastName.value.match(/[a-zA-Z\s-]+/);
	var numberlengthmatch = f.recLocId.value.match(/[^\s]+/);
	if (numberlengthmatch == null) {
		numberlength = 0;
	} else {
		numberlength = numberlengthmatch[0].length;
	}
	numbermatch1 = f.recLocId.value.match(/[\d]+/);
	numbermatch2 = f.recLocId.value.match(/[\w^_]+/); 
	if (f.type.type == "select-one") {
		type = f.type.options[f.type.selectedIndex].value;
	} else {
		type = f.type.value;
		numberlabel = "Confirmation #";
	}
	if (firstnamematch == null || firstnamematch[0].length != firstnamelength) {
		invalidfirstname = true;
	}
	if (lastnamematch == null || lastnamematch[0].length != lastnamelength) {
		invalidlastname = true;
	}
	if (document.getElementById("confirmNumber").checked) {
		if (numberlength != 6) {
			invalidnumber = true;
		}
		if (numbermatch2 == null || numbermatch2[0].length != numberlength) {
			invalidnumber = true;
		}
	}
	if (type == "eticket") {
		if (numberlength != 13) {
			invalidnumber = true;
		}
		if (numbermatch1 == null || numbermatch1[0].length != numberlength) {
			invalidnumber = true;
		}
	}
	if (type == "creditcard") {
		if (numbermatch1 == null || numbermatch1[0].length != numberlength) {
			invalidnumber = true;
		}
	}
	if (invalidfirstname || invalidlastname || invalidnumber) {
		if (invalidfirstname) {
			setInnerHTML('firstnamelabel','<img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> <span class="cpyError">First name</span>');
		} else {
			setInnerHTML('firstnamelabel','First name');
		}
		if (invalidlastname) {
			setInnerHTML('lastnamelabel','<img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> <span class="cpyError">Last name</span>');
		} else {
			setInnerHTML('lastnamelabel','Last name');
		}
		if (invalidnumber) {
			setInnerHTML('numberlabel','<img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> <span class="cpyError">'+ numberlabel +'</span>');
		} else {
			setInnerHTML('numberlabel',numberlabel);
		}
		setInnerHTML('numberformerror','<p class="cpyError" style="padding-top:5px;padding-bottom:5px;"><img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" />You have entered invalid information in one or more fields below.</p>');
		return false;
	}
	return true;
}

/* take out for upgrade standby list project.  if no issues found, remove before prod move */
function validateChecks(formname) {
	var noneChecked = true;
	f = document.forms[formname+'form'];
	for (i=0; i < f.elements.length ;i++) {
		if (f.elements[i].type == "checkbox") {
			if (f.elements[i].checked == true) {
				noneChecked = false;
			}
		}
	}
	if (noneChecked) {
		if (document.getElementById('checkedinerror') != null) {
			setInnerHTML('checkedinerror','&nbsp;');
		}
		if (document.getElementById('notcheckedinerror') != null) {
			setInnerHTML('notcheckedinerror','&nbsp;');
		}
		setInnerHTML(formname+'error','<img src="/images/icons/error_x.gif" width="19" height="19" alt="" border="0" align="absmiddle" /> <span class="cpyError">Please select at least one passenger.</span>');
		return false;
	}
	return true;
}
/* take out for upgrade standby list project.  if no issues found, remove before prod move */
function removeCheckError(formname, obj) {
	if (obj.checked == true) {
		setInnerHTML(formname+'error',"&nbsp;");
	}
}
/* take out for upgrade standby list project.  if no issues found, remove before prod move */
function passesLoaded() {
	if(document.forms['errorform']) {
		if(document.forms['errorform'].errorflag) {
			parent.location.href = "/travel/oci/oci_checkin_error/index.jsp";
		}
	}
	if(document.layers && !document.all) {
		opener.document.step1.visibility = "hide";
		opener.document.step2.visibility = "show";
	} else {
		parent.document.getElementById('step1').style.visibility = "hidden";
		parent.document.getElementById('step2').style.visibility = "visible";
	}
}
/* take out for upgrade standby list project.  if no issues found, remove before prod move */
function printPasses() {
	f = document.forms['loggingform'];
	fframe = frames['loggingframe'].document.forms['loggingform'];
	for (i=0; i < f.elements.length; i++) {
		fframe.elements[i].value = f.elements[i].value;
	}
	fframe.submit();
	frames['printableframe'].focus();
	frames['printableframe'].print();
	window.setTimeout('subPrintPasses()', 2000);
}
/* take out for upgrade standby list project.  if no issues found, remove before prod move */
function subPrintPasses() {
	document.getElementById('step2').style.visibility = "hidden";
	document.getElementById('step3').style.visibility = "visible";
}

function formVal(pnr_search) {
	var srcform= document.forms["numberform"];
	var srctype = document.getElementById("confirmNumber").checked;
	if (srctype ) {
		hideDiv("skymilesformerror");
		if (validateNumberform(srcform)) {
			srcform.action = pnr_search;
			srcform.submit();
		} else {
			showDiv("numberformerror");
		}
	} else {
		hideDiv("numberformerror");
		if (validateSkymilesform(srcform)) {
			srcform.action = "/smlogin/skymiles_login.action";
			srcform.submit();
		} else {
			showDiv("skymilesformerror");
		}
	}
}

function syncFields(id) { 
	var code = document.getElementById("ssrCode_"+id);
	var text = document.getElementById("ssrDisplay_"+id);
	text.value = "";
	if (-1 != code.value.indexOf("DEAF")) text.value += "Deaf, ";
	if (-1 != code.value.indexOf("BLND")) text.value += "Blind, ";
	if (-1 != code.value.indexOf("WCHS") ||
		-1 != code.value.indexOf("WCHR") ||
		-1 != code.value.indexOf("WCHC")) text.value += "Wheelchair, ";
	if (-1 != code.value.indexOf("AVML")) text.value += "Asian Vegetarian Meal, ";
	else if (-1 != code.value.indexOf("BBML")) text.value += "Baby Meal, ";
	else if (-1 != code.value.indexOf("BLML")) text.value += "Bland Meal, ";
	else if (-1 != code.value.indexOf("CHML")) text.value += "Child Meal, ";
	else if (-1 != code.value.indexOf("DBML")) text.value += "Diabetic Meal, ";
	else if (-1 != code.value.indexOf("GFML")) text.value += "Gluten Free Meal, ";
	else if (-1 != code.value.indexOf("KSML")) text.value += "Kosher Meal, ";
	else if (-1 != code.value.indexOf("LSML")) text.value += "Low Sodium Meal, ";
	else if (-1 != code.value.indexOf("MOML")) text.value += "Muslim Meal, ";
	else if (-1 != code.value.indexOf("SFML")) text.value += "Seafood Meal, ";
	else if (-1 != code.value.indexOf("VGML")) text.value += "Vegetarian Meal, ";
	if (text.value.length >4) {  // Remove trailing ", "
		text.value = text.value.substring(0, text.value.length-2);
	}
}
function submitForm(code) {
	codesArray.push(code);
}
function updateSSRs(dummy) {
	dummy=null;
	if (codesArray.length > 0) {
		var code = codesArray.pop();
		var spinner = document.getElementById("spinner"+code.substring("SSRForwarder".length));
		if (document.getElementById(code) != null 
			&& document.getElementById(code).contentWindow.document.forms[0] != null) {
			document.getElementById(code).contentWindow.document.forms[0].submit();
		}
		if (spinner != null) {
			hide(spinner);
		}
	}
}
function submitForms() {
	if (codesArray.length == 0) {
		var iframes = document.getElementsByTagName('iframe');
		for(var i=0;i<iframes.length;i++) {
			codesArray.push(iframes[i].id);
		}
	}
	updateSSRs("kickitoff");
}
var codesArray = new Array();
var myItin_Segment_Count_Check = 0, myItin_Current_Segment_Count = 0;
function handleUpgradeStandbyCallBack(data) {
	upgradeStandbyHandler.display(data);
}


