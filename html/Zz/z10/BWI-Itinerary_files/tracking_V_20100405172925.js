// 'omniture 'english variable':'Omniture Variable'
var omtrMapping = { 
eventMapping:{cartView:'scView',cartAdd:'scAdd',checkout:'scCheckout',bookings:'purchase',prodView:'prodView',flightSearch:'event1',hotelSearch:'event2',carRentalSearch:'event3',viewSeats:'event4',changeSeats:'event5',skyMilesEnrollStart:'event6',skyMilesEnrollComplete:'event7',skyMilesLoginPage:'event8',emailEnrollments:'event9',skyMilesPartnerClickThru:'event10',skyMilesToolsUsed:'event11',skyMilesPinRetrieval:'event12',emailUnsubscribe:'event13',OCIStart:'event14',OCIComplete:'event15',startCancel:'event16',completeCancel:'event17',reissue:'event18',holdTicket:'event19', holdTicketPurch:'event20',redepositUnused:'event21',errorCodes:'event22',fareDiff:'event23',docDownload:'event24',potentialRevenue:'event25',potentialTickets:'event26',skyMilesUsed:'event31',taxesAndFees:'event37',skyBonusSignUp:'event38',skyBonusRedeem:'event39',skyBonusAddTicket:'event40',skyBonusLogin:'event41',crcConfirmation:'event45',calendarSearch:'event46',onlineBagCheckin:'event47',upsell:'event56',iropProtectionSelect:'event54', iropFindAlternateFlights:'event52', merchandisingUnits:'event57', merchandisingOrders:'event58', merchandisingRevenue:'event59', awardTickets:'event60', awardPnrs:'event61', revenueTickets:'event62', revenuePnrs:'event63', revTicketRevenue:'event66', scMessageDisplay:'event67',scAcknowledgment:'event68'},
	pageName:'pageName',siteSection:'channel',server:'server',pageType:'pageType',state:'state',zip:'zip',hierarchy:'hier1',currencyCode:'currencyCode',
	confirmNum:'purchaseID',countryLanguage:'prop1,eVar2',flightSearchType:'prop2,eVar3',priceSchedule:'prop3',searchOriginCity:'prop4,eVar4',
	searchDestinationCity:'prop5,eVar5',cityPairs:'prop6,eVar6',multiCityflights:'prop7',searchCabinPreference:'prop8,eVar7',
	searchFareClass:'prop9,eVar8',searchType:'prop10,eVar9',searchOutboundDate:'prop11,eVar10',searchReturnDate:'prop12,eVar11',
	searchOutboundTime:'prop13',searchReturnTime:'prop14',searchNumPassengers:'prop15,eVar12',searchTripDuration:'prop16,eVar13',
	searchDaysToBooking:'prop17,eVar14',searchToolsUsed:'prop18,eVar15',numOutboundFlights:'prop19',numReturnflights:'prop20',
	sortOption:'prop21,eVar17',skyPriorityBanner:'prop22,eVar16',timeDifferenceFlightsAndPurchase:'prop23',timeSpentCarHotelAndPurchase:'prop24',
	emailPreferencesChecked:'prop25',emailPreferencesUnsubscribe:'prop26',internalSearch:'prop27',internalSearchResults:'prop28',eCreditsUsed:'prop29',
	formAbandonment:'prop30',emailUsNatureOfComment:'prop31',emailUsTimeOfTravel:'prop32',emailUsCommentPertainingTo:'prop33',OCIOptionsUsed:'prop34,eVar29',
	startOverButton:'prop35',startOverButtonPages:'prop36',skyMilesToolsUsed:'prop37,eVar33',skyMilesLoginPage:'prop38',loyaltyId:'prop39',
	daysHoldToPurchase:'prop40',skyBonusCountryLanguage:'prop41',skyBonusRewardsUsed:'prop42',skyBonusAccountNumer:'prop43',upsellCheckbox:'prop44',ticketType:'eVar18',
	formPayment:'eVar19',credCardCity:'eVar20',credCardCtry:'eVar21',outboundFlightDate:'eVar22',tripDuration:'eVar23',bookingWindow:'eVar24',
	skyMilesMemType:'eVar25',EDPCodes:'eVar26',OASCCodes:'eVar27',errorCodes:'eVar28',skyMilesType:'eVar30',skyMilesBucket:'eVar31',
	skyMilesPartnerClickThru:'eVar32',skyMilesPinRetrieval:'eVar34',emailUnsubscribe:'eVar35',internalCampaigns:'eVar39',
	skyBonusRewardsRedeem:'eVar43',promoName:'eVar44', tripEstimate: 'eVar48'
};

function TrackingObject() {
	this.oProps = new GenObj();
	this.mapping = null;
	this.products = [];
	this.events = [];
	this.fileSep = ',';
	this.isResend = false;
	this.milesBucket = "null";
	this.memberType = "null";
	this.smLoginComponentWPErrorId = "alerts_errors_dashboard";
	this.generalMemberType = "General Member";
}
TrackingObject.prototype.setCurrencyCode = function(currency) {
	if(currency !== 'USD') {
		var convertCodes = {RON:'ROL', IDR:'JOD', TDY:'TRL'};
		this.setProp({prop:'currencyCode', value:(!exists(convertCodes[currency]) ? currency : convertCodes[currency])} );
	}
};
TrackingObject.prototype.returnFlightString = function(Definition) {
	var originFlights = Definition.originCity.split(','), destinationFlights = Definition.destinationCity.split(',');
	if(Definition.flightType.toLowerCase() === 'multicity') {
		var flights = [];
		for(var i=0, j=originFlights.length; i<j; i++) {
			flights.push(originFlights[i] + '-' + destinationFlights[i]);		
		}
		return flights.join('-');
	}
	return originFlights[0] + '-' + destinationFlights[0];
};
TrackingObject.prototype.doProductView = function(Definition) {
	this.logEvent('prodView');
	switch(Definition.prodType.toLowerCase()) {
		case 'hotel':
			this.products.push('HO-' + Definition.brand);
			break;
	}
}
TrackingObject.prototype.doScAddEvent = function(Definition) {
	this.logEvent('cartAdd', 'cartView');
	switch(Definition.prodType.toLowerCase()) {
		case 'flight':
			this.products.push(';' + Definition.ticketType + '-' + Definition.flightType + '-' + this.returnFlightString(Definition));
			break;
		case 'carrental':
			this.products.push('CA-' + Definition.destinationCity.split(',')[0] + '-' + Definition.brand + '-' + Definition.type);
			break;
		case 'hotel':
			this.products.push('HO-' + Definition.destinationCity.split(',')[0] + '-' + Definition.brand);
			break;
		case 'insurance':
			this.products.push('TI-' + Definition.destinationCity.split(',')[0] + ';' + Definition.passengers + ';' + Definition.insurance.total);
			break;
		case 'dsp':
			this.products.push('AM-' + Definition.originCity.split(',')[0] + '-' + Definition.destinationCity.split(',')[0]);
			break;
	}
};
TrackingObject.prototype.doScCheckout = function(Definition) {
	this.logEvent('checkout');
	this.products.push(';' + Definition.ticketType + '-' + Definition.flightType + '-' + this.returnFlightString(Definition));
	if(exists(Definition.hotel)) {
		this.products.push('HO-' + Definition.destinationCity + '-' + Definition.hotel.brand);
	}
	if(exists(Definition.carRental)) {
		this.products.push('CA-' + Definition.destinationCity + '-' + Definition.carRental.brand + '-' + Definition.carRental.type);
	}
	if(exists(Definition.insurance)) {
		this.products.push('TI-' + Definition.destinationCity + ';' + Definition.passengers + ';' + Definition.insurance.total);
	}
};
TrackingObject.prototype.doAwardsPurchase = function(Definition) {
	this.logEvent('bookings', 'taxesAndFees', 'skyMilesUsed', 'awardTickets', 'awardPnrs');
	this.products.push(';awards-' + Definition.flightType + '-' + this.returnFlightString(Definition) + ';' + Definition.numberTix + ';' + Definition.totalCost + ';event37=' + Definition.taxesAndFees + '|event60=' + Definition.numberTix + '|event31=' + Definition.skyMilesUsed);
	if(exists(Definition.hotel)) {
		this.products.push('HO-' + Definition.destinationCity + '-' + Definition.hotel.brand + ';' + Definition.hotel.numberNights + ';' + Definition.hotel.cost);
	}
	if(exists(Definition.carRental)) {
		this.products.push('CA-' + Definition.destinationCity + '-' + Definition.carRental.brand + '-' + Definition.carRental.type + ';' + Definition.carRental.numberDays + ';' + Definition.carRental.cost);
	}
	if(exists(Definition.insurance)) {
		this.products.push('TI-' + Definition.destinationCity + ';' + Definition.passengers + ';' + Definition.insurance.total);
	}
};
TrackingObject.prototype.doHoldTicketPurchase = function(Definition) {
	this.logEvent('bookings', 'holdTicketPurch');
	this.products.push(';' + Definition.ticketType + '-' + Definition.flightType + '-' + this.returnFlightString(Definition) + ';' + Definition.numberTix + ';' + Definition.totalCost + ';event37=' + Definition.taxesAndFees + '|event31=' + Definition.skyMilesUsed);
};
TrackingObject.prototype.doHoldTicket = function(Definition) {
	this.logEvent('holdTicket');
	this.products.push(';awards-' + Definition.flightType + '-' + this.returnFlightString(Definition));
};
TrackingObject.prototype.checkEmailPrefs = function(checkedFieldName, unCheckedFieldName) {
	var uri = this.getProp('uri');
	if(uri.toLowerCase() === '/customerprofile/servlet/contactme' && document.contact_me) {
		var checkBoxes = document.contact_me.RsnForCtacCd;
		var checkedBoxes = [];
		var unCheckedBoxes = [];
		for(var i=0, j=checkBoxes.length; i<j; i++) {
			if(checkBoxes[i].checked) {
				checkedBoxes.push(this.findEmailLongName(checkBoxes[i]));
			} else {
				unCheckedBoxes.push(this.findEmailLongName(checkBoxes[i]));
			}
		}
		var CheckedInput = this.createElement({elementType:'input',type:'hidden',name:checkedFieldName,id:checkedFieldName,value:checkedBoxes.join(this.fileSep)});
		document.contact_me.appendChild(CheckedInput);
		var UnCheckedInput = this.createElement({elementType:'input',type:'hidden',name:unCheckedFieldName,id:unCheckedFieldName,value:unCheckedBoxes.join(this.fileSep)});
		document.contact_me.appendChild(UnCheckedInput);
	}
};
TrackingObject.prototype.findEmailLongName = function(Node) {
	while(Node.nextSibling) {
		var NextSibling = Node.nextSibling;
		if(NextSibling.getElementsByTagName && exists(NextSibling.getElementsByTagName('a'))) {
			var returnText = stripHTML(NextSibling.getElementsByTagName('a')[0].innerHTML);
			return returnText;
		} else {
			return this.findEmailLongName(NextSibling);
		}
	}
};
TrackingObject.prototype.checkSkyMilesLogin = function() {
		
	if ( ( exists(this.milesBucket) || exists(this.memberType) ) && ((this.getProp('pageName').toLowerCase() === "home page" && window.location.protocol.toLowerCase() === 'https:' && document.referrer.indexOf('/smlogin/skymiles_login.action') !== -1) || this.findQSParamValue('source').toLowerCase() === 'login' ||  this.findQSParamValue('status').toLowerCase() === 'open') ) {
		this.setProp({prop:'skyMilesLoginPage', value:this.getProp('pageName')});
		this.setSkyMilesBucket(this.milesBucket);
		this.setskyMilesType((this.memberType !== "" ? this.memberType : this.generalMemberType));
	}
};
TrackingObject.prototype.createElement = function(Definition) {
	var element = document.createElement(Definition.elementType);
	element.setAttribute('name', Definition.name);
	element.setAttribute('id', Definition.id);
	if(Definition.type) { element.setAttribute('type', Definition.type); }
	if(Definition.value) { element.setAttribute('value', Definition.value); }
	return element;
};
TrackingObject.prototype.findPageName = function() {
	var uri = this.getProp('uri').toLowerCase();
	switch(true) {
		case uri === '/':
		case uri === '':
		case uri === '/index.jsp':
		case uri === '/home/index.jsp':
			return 'Home Page';
			break;
		case uri.substr(0, 8) == '/awards/':
			var val = this.findQSParamValue('EventId');
			if(exists(val)) {
				switch(val.toLowerCase()) {
					case 'enter_application': return 'Awards: Home';
					case 'process_rtr' : return 'Awards: Wait Page';
					case 'process_calendar': return 'Awards: Wait Page';
					case 'process_start_over': return 'Awards: Start Over';
					case 'document_search': return 'Awards Search for eCredits';
					default: return uri;
				}
			} else {
				return uri;
			}
		case uri.substr(0, 17) === '/customerprofile/':
			switch(true) {
				case uri.indexOf('aboutme') !== -1: return 'Customer Profile: About Me';
				case uri.indexOf('contactme') !== -1: return 'Customer Profile: Contact Me';
				case uri.indexOf('creditcards') !== -1: return 'Customer Profile: Credit Cards';
				case uri.indexOf('flights') !== -1: return 'Customer Profile: Flights';
				default: return uri;
			}
			break;
		case uri === '/help/site_map/': return 'Site Map';
		case uri === '/accounthistory/servlet/accounthist': return 'Account History';
		case uri === '/monthlystmt/servlet/monthlystmt': return 'Monthly Statement';
		case uri === '/emailus/servlet/emailus': return 'Email Us';
		case uri === '/smlogin/skymiles_logout.action': return 'Sky Miles Logout';
		case uri === '/smlogin/skymiles_sessionexpired.action': return 'Sky Miles Session Expired';
		case uri === '/cns/travel/flight_notification/index.jsp':
		case uri === '/cns/travel/flight_notification/': return 'One-time Flight Notification';
		case uri === '/schedules/travel/reservations/flight_sched/results/index.jsp': return 'Flight Schedules';
		case uri === '/smlogin/skymiles_login.action': return 'Skymiles – Login Failure';
		default: return uri;
	}
};
TrackingObject.prototype.getSkyMilesBucket = function(param) {
	var miles = param.replace(/,/g, "");
	var Possibilities = [{range:'miles<5000',value:'<5000'},{range:'miles >=5000 && miles <=9999',value:'5000-9999'},{range:'miles >=10000 &&  miles <=14999',value:'10000-14999'},{range:'miles >=15000 &&  miles <=19999',value:'15000-19999'},{range:'miles >=20000 &&  miles <=24999',value:'20000-24999'},{range:'miles >=25000 &&  miles <=29999',value:'25000-29999'},{range:'miles >=30000 &&  miles <=34999',value:'30000-34999'},{range:'miles >=35000 &&  miles <=39999',value:'35000-39999'},{range:'miles >=40000 &&  miles <=44999',value:'40000-44999'},{range:'miles >=45000 &&  miles <=49999',value:'45000-49999'},{range:'miles >=50000 &&  miles <=54999',value:'50000-54999'},{range:'miles >=55000 &&  miles <=59999',value:'55000-59999'},{range:'miles >=60000 &&  miles <=64999',value:'60000-64999'},{range:'miles >=65000 &&  miles <=69999',value:'65000-69999'},{range:'miles >=70000 &&  miles <=74999',value:'70000-74999'},{range:'miles >=75000 &&  miles <=79999',value:'75000-79999'},{range:'miles >=80000 &&  miles <=84999',value:'80000-849999'},{range:'miles >=85000 &&  miles <=89999',value:'85000-89999'},{range:'miles >=90000 &&  miles <=94999',value:'90000-94999'},{range:'miles >=95000 &&  miles <=99999',value:'95000-99999'},{range:'miles >=100000 &&  miles <=104999',value:'100000-104999'},{range:'miles >=105000 &&  miles <=109999',value:'105000-109999'},{range:'miles >=110000 &&  miles <=114999',value:'110000-114999'},{range:'miles >=115000 &&  miles <=119999',value:'115000-119999'},{range:'miles >=120000 &&  miles <=124999',value:'120000-124999'},{range:'miles >=125000 &&  miles <=129999',value:'125000-129999'},{range:'miles >=130000 &&  miles <=134999',value:'130000-134999'},{range:'miles>135000',value:'>135000'}];
	if(exists(miles)) {
		for(var i=0, j=Possibilities.length; i<j; i++) {
			if(eval(Possibilities[i].range)) {
				return Possibilities[i].value;
			}
		}
	}
};
TrackingObject.prototype.findQSParamValue = function(param) {
	if(!exists(this.getProp('queryString'))) { return ''; }
	var QSQuery = new RegExp('[?&]' + param + '=([^&$]*)', 'i');
	return ( this.getProp('queryString').search(QSQuery) >= 0 ) ? RegExp.$1 : '';
};
TrackingObject.prototype.getByClassName = function(Definition){
	var ClassTest = new RegExp('(^|\s)' + Definition.className.replace(/\-/g, '\\-') + '(\s|$)', 'i');
	var tagName = '';
	var testElements;
	if( exists(Definition.tagName) ) {
		switch(typeof Definition.tagName) {
			case 'object':
				var testElements = [];
				var RootElement = ( exists(Definition.startElem) ) ? Definition.startElem : document;
				for(var i=0, j=Definition.tagName.length; i<j; i++) {
					var childElements = RootElement.getElementsByTagName(Definition.tagName[i]);
					for(var k=0, l=childElements.length; k<l; k++) {
						testElements.push(childElements[k]);
					}
					testElements.push(RootElement.getElementsByTagName(Definition.tagName[i]));
				}
				break;
			default:
				testElements = ( exists(Definition.startElem) ) ? Definition.startElem.getElementsByTagName(Definition.tagName) : document.getElementsByTagName(Definition.tagName);
				break;
		}
	} else {
		testElements = ( exists(Definition.startElem) ) ? Definition.startElem.getElementsByTagName('*') : document.getElementsByTagName('*');
	}
	var matchingElements = [];
	for(var i=0, j=testElements.length; i<j; i++){
		if(ClassTest.test(testElements[i].className)) {
			if( exists(Definition.childTagName) ) {
				var childElements = testElements[i].getElementsByTagName(Definition.childTagName);
				for(var k=0, l=childElements.length; k<l; k++) {
					matchingElements.push(childElements[k]);
				}
			} else {
				matchingElements.push(testElements[i]);
			}
		}
	}
	return matchingElements;
};
TrackingObject.prototype.getCityPairs = function() {
	var searchOriginCity = ( exists(this.getProp('searchOriginCity')) ) ? this.getProp('searchOriginCity') : '';
	var searchDestinationCity = ( exists(this.getProp('searchDestinationCity')) ) ? this.getProp('searchDestinationCity') : '';
	var originCities = searchOriginCity.split(',');
	var destinationCity = searchDestinationCity.split(',');
	if( originCities.length === destinationCity.length ) {
		var cityPairs = [];
		for(i=0, j=originCities.length; i<j; i++) {
			cityPairs.push(originCities[i] + '-' + destinationCity[i]);
		}
		if( cityPairs.length > 1 ) { this.setProp({prop:'multiCityflights', value:cityPairs.length}); }
		return cityPairs.join('-');
	} else {
		return searchOriginCity + '-' + searchDestinationCity;
	}
};
TrackingObject.prototype.getPageErrors = function() {
	var rows = this.getByClassName({className:'cpyError',tagName:['td', 'span']});
	var errors = [];
	var errorsString = '';
	for(var i=0, j=rows.length; i<j; i++) {
		if(rows[i].style.display.toLowerCase() !== 'none') {
			errors.push(rows[i].innerHTML.replace(/\n/g, ' '));
		}
	}

	rows = this.getByClassName({className:'error',tagName:'div'});
	for(var i=0, j=rows.length; i<j; i++) {
		var logError = (exists(rows[i].parentNode) && rows[i].parentNode.id === this.smLoginComponentWPErrorId) || rows[i].style.display.toLowerCase() === 'none'? false : true;
		if(logError) {
			errors.push(rows[i].innerHTML.replace(/\n/g, ' '));
		}
	}
	if(errors.length > 0) {
		var errorString = trimString(stripHTML(errors.join('|'))).substr(0, 100);
		this.setProp({prop:'errorCodes', value:errorString});
	}
	return errorsString;
};
TrackingObject.prototype.getProp = function(prop) { var rtn = this.oProps.getProp(prop); return rtn; };
TrackingObject.prototype.getSearchType = function() {
	switch(true) {
		case this.getProp('uri').substr(0, 8) == '/awards/': return 'Award Ticket Search';
		default: return 'Simple Search';
	}
};
TrackingObject.prototype.doOCIBags = function(Definition) {
	this.logEvent('bookings', 'onlineBagCheckin');
	this.products.push(';Bags Check-in;' + Definition.numberBags + ';' + Definition.totalCost);
};
TrackingObject.prototype.logEvent = function(events) {
	for(var i=0, j=arguments.length; i<j; i++) {
		this.events.push(arguments[i]);
	}
};
TrackingObject.prototype.readCookie = function(name) {
	var oRegExp = new RegExp(name + '=([\\w]*)', 'i');
    var Match = oRegExp.exec(document.cookie);
    if (Match !== null && Match.length > 1) { return unescape(Match[1]); }
	return '';
};
TrackingObject.prototype.setChannel = function(){
	var uri = this.getProp('uri').toLowerCase();
	switch(true) {
		case uri === '/awards/home.do':
			uri = '/awards/home/';
			break;
		case uri.substr(0, 17) === '/customerprofile/':
			switch(true) {
				case uri.indexOf('aboutme') !== -1:
					uri = '/customerprofile/servlet/aboutme/';
					break;
				case uri.indexOf('contactme') !== -1:
					uri = '/customerprofile/servlet/contactme/';
					break;
				case uri.indexOf('creditcards') !== -1:
					uri = '/customerprofile/servlet/creditcards/';
					break;
				case uri.indexOf('flights') !== -1:
					uri = '/customerprofile/servlet/flights/';
					break;			
				default:
					uri = uri.substring(0, (uri.lastIndexOf('/')) + 1);
					break;
			}
			break;
		default:
			uri = uri.substring(0, (uri.lastIndexOf('/')) + 1);
			break;
	}
	this.setProp({prop:'siteSection', value:uri});
};
TrackingObject.prototype.setCountryLanguage = function() {
	var countryLanguage = this.readCookie('pref');
	switch(true) {
		case countryLanguage.split('-').length === 2:
			countryLanguage = countryLanguage.split('-')[1] + ':' + countryLanguage.split('-')[0];
			break;
		default:
			countryLanguage = 'US:EN';
	}
	this.setProp({prop:'countryLanguage', value:countryLanguage});
};
TrackingObject.prototype.setEvents = function() {
	var uri = this.getProp('uri');
	switch(uri) {
		case '/skymilesenrollment/skymiles/enrollment/index.jsp': this.logEvent('skyMilesEnrollStart'); this.setProp({prop:'pageName', value:'Start Skymiles Enrollment'}); break;
		case '/cancelawardticket/skymiles/awards/cancelConfirm/index.jsp': this.logEvent('redepositUnused'); break;
	}
};
TrackingObject.prototype.setFormTracking = function(trackingObject) {
	var currentForms = getByTagName('form');
	var formList = [];
	var doTrackForms = false;
	if(currentForms.length > 0) {
		doTrackForms = true;
		for(var i=0, j=currentForms.length; i<j; i++) {
			if(exists(currentForms[i].name)) { formList.push(currentForms[i].name); }
		}
	}
	trackingObject.formList = formList.join(',');
	trackingObject.trackFormList = doTrackForms;
};
TrackingObject.prototype.setGeneralProps = function() {
	var QSValue = this.findQSParamValue('displayMethod');
	if (QSValue.toLowerCase() === 'dostartover')  { this.setProp({prop:'startOverButton', value:'Purchase Start Over'}); }
	QSValue = this.findQSParamValue('EventId');
	if (QSValue.toLowerCase() === 'process_start_over') { this.setProp({prop:'startOverButton', value:'Award Start Over'}); }
	QSValue = this.findQSParamValue('t_cc');
	if (QSValue !== 'null' && QSValue.length>0) { this.setProp({prop:'internalCampaigns', value:QSValue}); }
};
TrackingObject.prototype.setHierarchy = function(){
	var uri = this.getProp('uri').toLowerCase();
	var hierarchy = '';
	switch(true) {
		case uri === '/awards/home.do':
			hierarchy = 'Awards:Home';
			break;
		case uri.substr(0, 17) === '/customerprofile/':
			switch(true) {
				case uri.indexOf('aboutme') !== -1:
					hierarchy = 'Customer Profile:Servlet:About Me';
					break;
				case uri.indexOf('contactme') !== -1:
					hierarchy = 'Customer Profile:Servlet:Contact Me';
					break;
				case uri.indexOf('creditcards') !== -1:
					hierarchy = 'Customer Profile:Servlet:Credit Cards';
					break;
				case uri.indexOf('flights') !== -1:
					hierarchy = 'Customer Profile:Servlet:Flights';
					break;			
				default:
					hierarchy = uri.replace(/\//g, ':');
					hierarchy =  hierarchy.substring(hierarchy.indexOf(':') + 1, hierarchy.lastIndexOf(':'));
					break;
			}
			break;
		default:
			hierarchy = uri.replace(/\//g, ':');
			hierarchy =  hierarchy.substring(hierarchy.indexOf(':') + 1, hierarchy.lastIndexOf(':'));
	}
	this.setProp({prop:'hierarchy', value:hierarchy});
};
TrackingObject.prototype.setPageName = function(pageName) {
	if(!exists(this.getProp('pageName'))) {
		if(arguments[0]) {
			this.setProp({prop:'pageName', value:arguments[0]});
		} else {
			var uri = this.getProp('uri');
			var pageNameToSet = this.findPageName();
			if(pageNameToSet.toLowerCase() === uri.toLowerCase()) {
				var elements = this.getByClassName({className:'genContent',tagName:'div',childTagName:'h1'});
				pageNameToSet = (elements.length >= 1) ? elements[0].innerHTML : uri;
			}
			this.setProp({prop:'pageName', value:pageNameToSet}); 
		}
	}
	// isSkyPriorityEligibleByLevel, isSkyPriorityEligibleByFare, isSkyPriorityEligible
	try {
		if(exists(isSkyPriorityEligible) && isSkyPriorityEligible){
			var skyPriorityPageName = (arguments[0]) ? pageName : pageNameToSet;
			this.setProp({prop:'skyPriorityBanner', value:skyPriorityPageName})
		}
	} catch (error) {}
};
TrackingObject.prototype.setProp = function() { 
	for(var i=0, j=arguments.length; i<j; i++) {
		if(typeof(arguments[i]) === 'object' && exists(arguments[i].prop) && exists(arguments[i].value) && arguments[i].value != '') {
			var prop = arguments[i].prop;
			var value = arguments[i].value;
			switch(true) {
				case (prop === 'searchOriginCity' || prop === 'searchDestinationCity') && exists(this.getProp('flightSearchType')) && this.getProp('flightSearchType').toLowerCase() !== 'multicity':
					value = value.split(',')[0];
					break;
				case (prop === 'pageName' && value === 'Awards: Select outbound flight'):
					this.logEvent('flightSearch');
					break;
				case prop === 'setOutboundTime':
					prop = 'searchOutboundTime';
					value = value.split(',')[0];
					break;
				case prop === 'setReturnTime':
					prop = 'searchReturnTime';
					var timeList = value.split(',');
					value = timeList[timeList.length-1];
					break;
			}
			this.oProps.setProp(prop, value); 
			if(exists(this.mapping.eventMapping[prop])) { this.logEvent(prop); }
		}
	}
};
TrackingObject.prototype.setQueryString = function() {
	var queryString = '';
	var queryString = (window.location.href.lastIndexOf('?') === -1) ? '': window.location.href.substr(window.location.href.lastIndexOf('?')).split('#')[0];
	if(queryString.indexOf('=') === -1) { queryString = ''; }
	this.setProp({prop:'queryString', value:queryString});
};
TrackingObject.prototype.setServer = function() {
	this.setProp({prop:'server', value:window.location.host.toString().split('.')[0]});
};
TrackingObject.prototype.returnArrayDifferences = function(LongerArray, ShorterArray) {
	var difs = [];
	LongerArray.sort();
	ShorterArray.sort();
	for(var i=0, j = LongerArray.length; i<j; i++) {
		var x = ShorterArray.length - 1;
		var useValue = true;
		while(x >= 0) {
			if(ShorterArray[x].toLowerCase() === LongerArray[i].toLowerCase()) {
				useValue = false;
				x = -1;
			}
			x--;
		}
		if(useValue) { difs.push(LongerArray[i]); }
	}
	return difs.join(',');
};
TrackingObject.prototype.setSubscribeUnubscribe = function(currentChecked, currentUnChecked, prevChecked, prevUnChecked) {
	var enrollEmails = '', unsubscribeEmails = '', toolOne = '', toolTwo = '';
	this.setProp('emailPreferencesChecked', currentChecked);
	this.setProp('emailPreferencesUnsubscribe', currentUnChecked);
	if(currentChecked !== '' && currentChecked.length > prevChecked.length) {
		enrollEmails = this.returnArrayDifferences(currentChecked.split(this.fileSep), prevChecked.split(this.fileSep));
		if(enrollEmails !== '') { toolOne = 'Email Update'; }
	}
	if(currentUnChecked !== '' && currentUnChecked.length > prevUnChecked.length) {
		unsubscribeEmails = this.returnArrayDifferences(currentUnChecked.split(this.fileSep), prevUnChecked.split(this.fileSep));
		if(unsubscribeEmails !== '') { toolTwo = 'Email Update'; }
	}
	this.setProp({prop:'emailPreferencesChecked', value:currentChecked}, {prop:'emailPreferencesUnsubscribe', value:currentUnChecked}, {prop:'emailEnrollments', value:enrollEmails}, {prop:'emailUnsubscribe', value:unsubscribeEmails}, {prop:'skyMilesToolsUsed', value:toolOne}, {prop:'skyMilesToolsUsed', value:toolTwo});
};
TrackingObject.prototype.setTrackingVariables = function(trackingObject) {
	if(exists(this.mapping)) {
		for(var prop in this.mapping) {
			if(typeof(this.mapping[prop]) === 'string' && exists(this.oProps.getProp(prop)) && this.oProps.getProp(prop) !== '') {
				var Options = this.mapping[prop].split(',');
				for(var i=0, j=Options.length; i<j; i++) {
					switch (true) {
						case (prop === 'searchOriginCity' || prop === 'searchDestinationCity') && exists(this.getProp('flightSearchType')) && this.getProp('flightSearchType').toLowerCase() === 'multicity': 
							trackingObject[Options[i]] = this.oProps.getProp(prop).split(',')[0]; 
							break;
						default:
							trackingObject[Options[i]] = this.oProps.getProp(prop);
					}
				}
			}
		}
		if(this.events.length > 0) {
			var usedEvents = [];
			var EventHash = {};
			for(var i=0, j=this.events.length; i<j; i++){
				if( !exists(EventHash[this.events[i]]) ) {
					if(exists(this.mapping.eventMapping[this.events[i]])) { usedEvents.push(this.mapping.eventMapping[this.events[i]]); }
					EventHash[this.events[i]] = true;
				}
			}
			if(usedEvents.length > 0) { trackingObject.events = usedEvents.join(','); }
		}
		if(this.products.length > 0) { trackingObject.products = this.products.join(',;'); }
		if(this.isResend) {
			void(trackingObject.t());
		}
		this.isResend = true;
	}
};
TrackingObject.prototype.setURI = function() {
	var URIBegin = window.location.href.lastIndexOf('.delta.com') + 10;
	var URIEnd = (window.location.href.lastIndexOf('?') > URIBegin) ? window.location.href.lastIndexOf('?') : window.location.href.length;
	var URI = window.location.href.substring(URIBegin, URIEnd);
	this.setProp({prop:'uri', value:URI});
};
TrackingObject.prototype.setLoyaltyId = function(param) { 
	this.setProp({prop:'loyaltyId', value:param}); 
};
TrackingObject.prototype.setskyMilesType = function(param) { 
	this.setProp({prop:'skyMilesMemType', value:param}); 
};
TrackingObject.prototype.setSkyMilesBucket = function(param) {	
	var miles = param.replace(/,/g, "");
	if(exists(miles)) {
		this.setProp({prop:'skyMilesBucket', value:this.getSkyMilesBucket(miles)});
	}
};
TrackingObject.prototype.clearProps = function(trackingObj) {
	if(exists(this.mapping)) {
		for(var prop in this.mapping) {
			if(typeof(this.mapping[prop]) === 'string' && exists(this.oProps.getProp(prop)) && this.oProps.getProp(prop) !== '') {
				var Options = this.mapping[prop].split(',');
				for(var i=0, j=Options.length; i<j; i++) {
					trackingObj[Options[i]] = "";
				}
			}
		}
	}
	trackingObj.events = "";
	trackingObj.products = "";
	this.oProps = null;
	this.oProps = new GenObj();
	this.products = [];
	this.events = [];
}
TrackingObject.prototype.init = function(mappingObject) {
	this.mapping = mappingObject;
	this.setURI();
	this.setQueryString();
	this.setChannel();
	this.setHierarchy();
	this.setServer();
	//this.setLoyaltyId();
	this.setCountryLanguage();
	this.setEvents();
	this.setGeneralProps();
};

var UserTracking = new TrackingObject();
UserTracking.init(omtrMapping);

