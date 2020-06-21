function ValidationObj() {
	this.oProps = new GenObj();
	this.forms = new Array();
	this.today = new Date();
	this.months = {Jan:0,Feb:1,Mar:2,Apr:3,Apr:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
	this.monthsFullName = {"January":0,"February":1,"March":2,"April":3,"May":4,"June":5,"July":6,"August":7,"September":8,"October":9,"November":10,"December":11};
	this.curField = "";
	this.labels = null;
	this.numLabels = 0;
	this.numForms = 0;
	this.errorCollection = { }; /*this is a collection of errors based on LABEL, eg: { first_name : { count:2, errorRegionDivId : "name_fname_pax1_req_e", allElementIds:{ name_fname_pax1_req : "first_name", name_fname_pax2_req : "first_name"} } }*/
}
ValidationObj.prototype.setProp = function(prop,value) { this.oProps.setProp(prop,value); };
ValidationObj.prototype.getProp = function(prop) { var rtn = this.oProps.getProp(prop); if(rtn===undefined) {} return rtn; };
ValidationObj.prototype.disableFeatures = function(types) {
	//console.log("disableFeatures");
	/* supported values: disabled_buttons, init */
	this.setProp("disable",types);
};
/* function to allow the disabling of specific features, passed as a string array */
ValidationObj.prototype.isDisabled = function(val) {
	//console.log("isDisabled");
	var disabledFeatures = this.getProp("disable");
	if(exists(disabledFeatures)) {
		j = disabledFeatures.length;
		for (var i=0;i<j;i++) {
			if(disabledFeatures[i] == val) { return true; }
		}
	}
	return false;
};

ValidationObj.prototype.doesCCNumPassesLuhn = function(ccNum) {
	var sum = 0, digit = 0, addend = 0, timesTwo = false;
	for (i = ccNum.length - 1; i >= 0; i--) {
		digit = parseInt(ccNum.substring (i, i + 1));
		if (timesTwo) {
			addend = digit * 2;
			if (addend > 9) {
				addend -= 9;
			}
		} else {
			addend = digit;
		}
		sum += addend;
		timesTwo = !timesTwo;
	}
	return (sum % 10) === 0;
};
ValidationObj.prototype.getMonthNum = function(month) { 
	//console.log("getMonthNum");
	return this.months[month];
};
ValidationObj.prototype.deltamaticNames = function(t) {
	return t.replace(/['-]/g," "); /* replace ' with space, for names in deltamatic */
};
ValidationObj.prototype.removeSpaces = function(t) {
	return t.replace(/\s*/g,"");
};
ValidationObj.prototype.replaceMultipleSpaces = function(t) {
	return t.replace(/[\s]{2,}/g," "); 
};
ValidationObj.prototype.stripWhiteSpace = function(t) {
	return t.replace(/^\s*/,"").replace(/\s*$/,"");
};
ValidationObj.prototype.stripBadChars = function(t) {
	//console.log("stripBadChars");
	return this.stripWhiteSpace(this.replaceMultipleSpaces(t.replace(/[/\\]/g,""))).replace(/['-]/g," ");
};
ValidationObj.prototype.isNumber = function(id, length) {
	//console.log("isNumber");
	//Lucas added length parameter for number validation
	var t = get(id).value.replace(/,/g, "");
	if(arguments.length > 1){
		length = parseInt(length);	
		if(isNaN(t)){
			this.markError(id); return false;
		} else if(t.length == length){
			this.removeError(id);return true;
		} else {
			this.markError(id); return false;
		}		
	} else {
		if(isNaN(t) || this.stripWhiteSpace(t) === "") { this.markError(id); return false; }
		else { this.removeError(id);return true; }
	}
};
ValidationObj.prototype.isDataMMSlashDDSlashYYYY = function(id) {
	var t = get(id).value;
	if(/\d{1,2}\/\d{1,2}\/\d{2,4}/.test(t)) { this.removeError(id);return true; }
	else { this.markError(id); return false; }
}
ValidationObj.prototype.areEqual = function(id1, id2) {
	if(get(id1).value != get(id2).value) { this.markError(id2); return false; }
	return true;
}
ValidationObj.prototype.requiresCCID = function(type) {
	return (type == "AX" || type == "VI" || type == "CA" || type == "DS" || type == "DC");
};
ValidationObj.prototype.findParentForm = function(id) {
	//console.log("findParentForm");
	var curField = get(id);
	while(curField.parentNode) {
		if(exists(curField.parentNode.nodeName) && curField.parentNode.nodeName.toLowerCase() === "form") {
			return curField.parentNode.id;
		}
		curField = curField.parentNode;
	}
};
ValidationObj.prototype.copyFieldData = function(id,fromContainerId,toContainerId) {
	//console.log("copyFieldData");
	var tFrom = [];
	var tTo = [];
	var tmpCollection;
	var tmpType;
	if(get(id).checked) {
		tmpCollection = get(fromContainerId).getElementsByTagName("*");
		for(var i=0;i<tmpCollection.length;i++) {
			if(tmpCollection[i].id!="") {
				if(exists(get(tmpCollection[i].id))) {
					tmpType = tmpCollection[i].type;
					if(tmpType=="text"||tmpType=="textarea"||tmpType=="select-one"||tmpType=="select-multiple"||tmpType=="radio"||tmpType=="checkbox") {
						if(!tmpCollection[i].id.match(/_replicate/) && (!tmpCollection[i].id.match(/_exclude/))) { tFrom.push(tmpCollection[i]);}
					}
				}
			}
		}
	}
	tmpCollection = get(toContainerId).getElementsByTagName("*");
	for(var i=0;i<tmpCollection.length;i++) {
		if(tmpCollection[i].id!="") { 
			if(exists(get(tmpCollection[i].id))) {
				tmpType = tmpCollection[i].type;
				if(tmpType=="text"||tmpType=="textarea"||tmpType=="select-one"||tmpType=="select-multiple"||tmpType=="radio"||tmpType=="checkbox") {
					if(!tmpCollection[i].id.match(/_replicate/) && (!tmpCollection[i].id.match(/_exclude/))) { tTo.push(tmpCollection[i]);}
				}
			}
		}
	}
	if(get(id).checked) {
		for(var i=0;i<tFrom.length;i++) {
			tmpType = get(tFrom[i].id).type;
			switch(tmpType) {
				case "radio": get(tTo[i].id).selected = (get(tFrom[i].id).selected) ? "selected" : false; break;
				case "checkbox": get(tTo[i].id).checked = get(tFrom[i].id).checked; break;
				default: get(tTo[i].id).value = get(tFrom[i].id).value; break;
			}
			//get(tTo[i].id).disabled="disabled";
		}
	} else {
		for(var i=0;i<tTo.length;i++) { 
			tmpType = get(tTo[i].id).type;
			if(tmpType!="radio" && tmpType!="checkbox") { get(tTo[i].id).value=""; }
			//get(tTo[i].id).disabled="";
		}
	}
};


ValidationObj.prototype.copyHiddenFieldData = function(id,fromContainerId,toContainerId) {
	//number of fields must match in fromContainerId and toContainerId any other fields that are not to be copied should have a reference of _exclude in the ID
	//console.log("copyHiddenFieldData");
	var tFrom = [];
	var tTo = [];
	var tmpCollection;
	var tmpType;
	if(get(id).checked) {
		tmpCollection = get(fromContainerId).getElementsByTagName("input");
		for(var i=0;i<tmpCollection.length;i++) {
			if(tmpCollection[i].id!="") {
				if(exists(get(tmpCollection[i].id))) {
					tmpType = tmpCollection[i].type;
					if(tmpType=="hidden") {
						if(!tmpCollection[i].id.match(/_exclude/)) { tFrom.push(tmpCollection[i]); }
					}
				}
			}
		}
	}
	tmpCollection = get(toContainerId).getElementsByTagName("input");
	for(var i=0;i<tmpCollection.length;i++) {
		if(tmpCollection[i].id!="") { 
			if(exists(get(tmpCollection[i].id))) {
				tmpType = tmpCollection[i].type;
				if(tmpType=="hidden") {
					if(!tmpCollection[i].id.match(/_exclude/)) { tTo.push(tmpCollection[i]); }
				}
			}
		}
	}
	if(get(id).checked) {
		for(var i=0;i<tFrom.length;i++) {
			tmpType = get(tFrom[i].id).type;
			tmpValue = get(tFrom[i].id).value;
			get(tTo[i].id).value = get(tFrom[i].id).value; break;
		}
	} else {
		for(var i=0;i<tTo.length;i++) { 
		get(tTo[i].id).value=""; 
		}
	}
};

/* support for custom error messages */
ValidationObj.prototype.getCustomErrorMsg = function(id,label,whichCustom) {
	var formId = this.findParentForm(id);
	var customMessage = this.getProp("customMessages")[formId];
	var patterns = customMessage.patterns;
	for( var patternIdx=0, patternCheck=patterns.length; patternIdx<patternCheck; patternIdx++) {
		var patternTest = new RegExp(patterns[patternIdx].pattern);
		if(patterns[patternIdx].whichCustom.toLowerCase() === whichCustom.toLowerCase() && patternTest.test(id)) {
			return patterns[patternIdx].message;
		}
	}
	return ""; 
};

/* error marking */
ValidationObj.prototype.notificationExists = function(id) {
	//console.log("notificationExists");
	var t = get(id);
	return (exists(get("alerts_errors")) && exists(t))
};
ValidationObj.prototype.findErrorRegionDivIdByCollectionProp = function(errorCollectionProp, notFoundReturnValue) {
	var errorDetail = this.errorCollection[errorCollectionProp];
	if(exists(errorDetail)) {
		return errorDetail.errorRegionDivId
	}
	return notFoundReturnValue;
};
ValidationObj.prototype.createEmptyErrorElement = function(errorCollectionProp, currentErrorRegionDivId) {
	return this.errorCollection[errorCollectionProp] = { count : 0, errorRegionDivId : currentErrorRegionDivId, allIncludedElementIds : {} };
};
ValidationObj.prototype.addNotification = function(type,id,label,whichCustom) {	
	//console.log("addNotification");
	// supported types are alert, error, info, and success
	var errorCollectionProp = label.replace(/\W/g, "_");
	var errorDetail = this.errorCollection[errorCollectionProp];
	var currentErrorRegionDivId = this.findErrorRegionDivIdByCollectionProp(errorCollectionProp, id.toString() + '_e');
	if(!exists(errorDetail)) {
		errorDetail = this.createEmptyErrorElement(errorCollectionProp, currentErrorRegionDivId);
	}
	if(!exists(errorDetail.allIncludedElementIds[id])) {
		errorDetail.allIncludedElementIds[id] = errorCollectionProp;
		errorDetail.count ++;
	}
	if(!this.notificationExists(currentErrorRegionDivId)) {
		label = label.replace(/\*/g,"");
		var errorType = id.split("_")[0];
		   if(id.match("ffNum") || id.match("SMNum")) { errorType="loyaltyNum"; }
           if(id.match("ffPrgm")){ errorType="loyaltyProg"; }
		   if(id.match('email_reenter')){errorType="email";}
		var msgs = getInnerHTML("alerts_errors");
		var customMsg = "";
		if(exists(this.getProp("customMessages"))) {
			customMsg = this.getCustomErrorMsg(id,label, ( exists(whichCustom) ? whichCustom : "" ) );
		}
		var message = "<div class=\""+type+"\" id=\"" + currentErrorRegionDivId + "\">";
		if(customMsg == "") {
			message += "The information entered for "+label+" below is not valid.";
			message += " ";
			switch(errorType) {
				case "smname":
					message += "Please ensure it has at least 1 character and contains only letters and spaces.";
					break;
				case "name":
					message += "Please ensure it has at least 2 characters and contains only letters and spaces.";
					break;
				case "cc":
					message += "";
					break;
				case "birth":
					message += "Please enter a date in the past for the date of birth.";
					break;
				case "exp":
					message += "Please enter a date in the future for the expiration.";
					break;
				case "gender":
					message += "Please select one of the options for gender.";
					break;
				case "passport":
					message += "";
					break;
			    case "loyaltyNum":
					message += "Frequent flyer numbers must contain between 5 to 20 numbers.";
                    break;
                 case "loyaltyProg":
	                 message += "Please select an airline program from the list provided.";
                   break;
                 case "email":
	                 message += "Please make sure your email addresses match.";
                   break;
				default:
					break;
			}
		} else {
			message += customMsg;
		}
		message += "</div>";
		msgs += message;
		setInnerHTML("alerts_errors",msgs);
	}
};
ValidationObj.prototype.getErrorCollectionPropByElementId = function(id) {
	for(var errorProp in this.errorCollection) {
		var errorDetail = this.errorCollection[errorProp];
		for(var errorElementId in errorDetail.allIncludedElementIds) {
			if(errorElementId === id) {
				return errorDetail.allIncludedElementIds[errorElementId];
			}
		}
	}
	return null;

};
ValidationObj.prototype.removeNotification = function(id) {
	//console.log("removeNotification");
	setClassName(id,"");
	var removeErrorMessage = false;
	var errorRegionDivId = id + "_e";
	var errorCollectionProp = this.getErrorCollectionPropByElementId(id);
	var errorDetail = this.errorCollection[errorCollectionProp];
	if( exists(errorDetail) ) {
		if(exists(errorDetail.allIncludedElementIds[id])) {
			errorDetail.count --;
		}
		errorRegionDivId = errorDetail.errorRegionDivId;
		if(errorDetail.count === 0) { removeErrorMessage = true; }
		errorDetail.allIncludedElementIds[id] = null;
	}
	if(removeErrorMessage) {
		var msgNodes = get("alerts_errors").getElementsByTagName("div");
		for(var i=0;i<msgNodes.length;i++){
			if( msgNodes[i].id === errorRegionDivId ) { get("alerts_errors").removeChild(msgNodes[i]);}
		}
	}
};
ValidationObj.prototype.addFormAndLabelData = function(id) {
	var tmpId;
	this.labels = getByTagName("label");
	var fieldLabels = this.labels;
	this.forms = document.forms;
	this.numLabels = this.labels.length;
	this.numForms = this.forms.length;
	
}
ValidationObj.prototype.markError = function(id,whichCustom) {
	//console.log("markError");
	get(id).setAttribute('class','error');
	get(id).setAttribute('className','error'); /* for ie */

	if(!exists(this.labels)) { this.addFormAndLabelData(id); }
	var fieldLabels = this.labels;
	for(var i=0;i<fieldLabels.length;i++) {
		if(fieldLabels[i].getAttribute('for')==id || fieldLabels[i].getAttribute('htmlFor')==id) {
			fieldLabels[i].setAttribute('class','error');
			fieldLabels[i].setAttribute('className','error'); /* for ie */
			this.addNotification("error",id,fieldLabels[i].innerHTML,whichCustom);
		}
	}
};
ValidationObj.prototype.removeError = function(id) {
	//console.log("removeError");
	get(id).setAttribute('class','');
	get(id).setAttribute('className',''); /* for ie */
	if(!exists(this.labels)) { this.addFormAndLabelData(); }
	var fieldLabels = this.labels;
	for(var i=0;i<fieldLabels.length;i++) {
		if(fieldLabels[i].getAttribute('for')==id || fieldLabels[i].getAttribute('htmlFor')==id) {
			fieldLabels[i].setAttribute('class','');
			fieldLabels[i].setAttribute('className',''); /* for ie */
		}
	}
	this.removeNotification(id);
};

/* data validation functions */
ValidationObj.prototype.validateSelectField = function(id) {
	//console.log("validateSelectField");
	if(get(id).selectedIndex==0) { this.markError(id); return false; }
	else { this.removeError(id); return true; }
};
ValidationObj.prototype.validateName = function(id) {
	//console.log("validateName");
	var t = get(id);
	if(t.value == "" || t.value.length < 2 || t.value.match(/^([a-zA-Z][a-zA-Z\&\-\'\s]*|)$/) == null ) { this.markError(id); return false; }
	else { this.removeError(id);return true; }
};

ValidationObj.prototype.validateSMName = function(id) {
	//console.log("validateName");
	var value = this.stripWhiteSpace(get(id).value);
	if(value == "" || value.length < 1 || value.match(/^([a-zA-Z][a-zA-Z\&\-\'\s]*|)$/) == null ) { this.markError(id); return false; }
	else { this.removeError(id);return true; }
};

ValidationObj.prototype.validateFirstname = this.validateName; /* alias for itineraries app */
ValidationObj.prototype.validateLastname = this.validateName; /* alias for itineraries app */

ValidationObj.prototype.validatePassportNum = function(id) {
	//console.log("validatePassportNum");
	var t = get(id).value;
	if(!t.value.match(/^[a-z0-9]+$/i)) { this.markError(id); return false; }
	else { this.removeError(id); return true; }
};



ValidationObj.prototype.validateDate = function(id) {
	var t = get(id);
	t.value = t.value.replace(/\s*/g,"");
	if(!t.value.match(/^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/)) { this.markError(id); return false; }
	else { this.removeError(id);return true; }
};



ValidationObj.prototype.validateBirthDate = function(id) {
	//console.log("validateBirthDate");
	var custDate;
	var dayField_Id; var monthField_Id; var yearField_Id; 
	var dayField; var monthField; var yearField;
	if(id.match(/day/) != null) {
		dayField_Id = id;
		monthField_Id = id.replace(/day/,"month");
		yearField_Id = id.replace(/day/,"year");
	} else if(id.match(/month/) != null) {
		dayField_Id = id.replace(/month/,"day");
		monthField_Id = id;
		yearField_Id = id.replace(/month/,"year");
	} else if (id.match(/year/) != null) {
		dayField_Id = id.replace(/year/,"day");
		monthField_Id = id.replace(/year/,"month");
		yearField_Id = id;
	} else {}
	dayField = get(dayField_Id).value;
	monthField = this.getMonthNum(get(monthField_Id).value);
	yearField = get(yearField_Id).value;

	if(this.curField == yearField_Id || (this.dayField !="" && this.monthField != "" && this.yearField != "")) { 
		if( this.validateSelectField(dayField) 
		&& this.validateSelectField(monthField) 
		&& this.validateSelectField(id) ) {
			var custDate = new Date();
			custDate.setYear(get(id).value);
			custDate.setDate(get(dayField).value);
			custDate.setMonth(this.getMonthNum(get(monthField).value));
			if(this.today<custDate) { 
				this.markError(dayField_Id); 
				this.markError(monthField_Id);
				this.markError(yearField_Id);
				return false;
			} else { 
				this.removeError(dayField_Id); 
				this.removeError(monthField_Id);
				this.removeError(yearField_Id);
				return true;
			}
		}
		return this.validateSelectField(id);
	}
	return true;
};
ValidationObj.prototype.validateExpirationDate = function(id) {
	//console.log("validateExpirationDate");
	var custDate;
	var dayField_Id; var monthField_Id; var yearField_Id; 
	var dayField; var monthField; var yearField;
	var maxDays;
	if(id.match(/day/) != null) {
		dayField_Id = id;
		monthField_Id = id.replace(/day/,"month");
		yearField_Id = id.replace(/day/,"year");
	} else if(id.match(/month/) != null) {
		dayField_Id = id.replace(/month/,"day");
		monthField_Id = id;
		yearField_Id = id.replace(/month/,"year");
	} else if (id.match(/year/) != null) {
		dayField_Id = id.replace(/year/,"day");
		monthField_Id = id.replace(/year/,"month");
		yearField_Id = id;
	} else {}
	if(exists(get(dayField_Id))) { dayField = get(dayField_Id).value; }
	monthField = this.getMonthNum(get(monthField_Id).value);
	yearField = get(yearField_Id).value;
	maxDays = 32 - new Date(yearField,monthField, 32).getDate();

	if (exists(get(dayField_Id))) {
		if( this.validateSelectField(dayField_Id) 
		&& this.validateSelectField(monthField_Id) 
		&& this.validateSelectField(yearField_Id) ) {
			custDate = new Date(yearField,monthField,dayField);
			if(this.today>custDate) { 
				this.markError(dayField_Id);
				this.markError(monthField_Id);
				this.markError(yearField_Id);
				return false;
			}
			else { 
				this.removeError(dayField_Id);
				this.removeError(monthField_Id);
				this.removeError(yearField_Id);
				return true;
			}
		} else { /* not all date fields have selections */ }
	} else {
		if(this.curField == yearField_Id || (this.curField == monthField_Id && yearField != "")) { 
			if( this.validateSelectField(monthField_Id) 
			&& this.validateSelectField(yearField_Id) ) {
				custDate = new Date(get(id).value, this.getMonthNum(get(monthField_Id).value),maxDays);
				if(this.today>custDate) { 
					this.markError(monthField_Id);
					this.markError(yearField_Id);
					return false;
				} else { 
					this.removeError(monthField_Id);
					this.removeError(yearField_Id);
					return true;
				}
			}
		} else {
			return this.validateSelectField(monthField_Id);
		}
	}
	return this.validateSelectField(id);
};

// this will likely be migrated to an aliased function as it does not support validating the ccid
ValidationObj.prototype.validateCCExpDateMulti = function(monthId,yearId,i) {
	var theMonth = get(monthId).value;
	var theYear = get(yearId).value;
	var expLabel = "month_exp_pax" + i + "_req";
	//alert(theYear + " " + this.today.getFullYear() + " " + parseInt(theMonth, 10) + " " + (this.today.getMonth()+1));
	if (theMonth == "" || theYear == "") {
		this.markError(monthId);
		this.markError(yearId);
		this.markError(expLabel);
		return false;
	} else if ( ( theYear <= this.today.getFullYear() ) && ( parseInt(theMonth, 10) < this.today.getMonth()+1 ) ) {
		this.markError(monthId);
		this.markError(yearId);
		this.markError(expLabel);
		return false;
	} else {
		this.removeError(monthId);
		this.removeError(yearId);
		this.removeError(expLabel);
		return true;
	}
};


ValidationObj.prototype.validateCCExpDate = function(monthId,yearId,expLabel) {
	//console.log("validateCCExpDate");
	var theMonth = get(monthId).selectedIndex+1;
	var theYear = get(yearId).value;
	var expLabel = expLabel;
	//alert(theYear + " " + this.today.getFullYear() + " " + (theMonth) + " " + (this.today.getMonth()+1));
	if (theMonth == "" || theYear == "") {
		this.markError(monthId);
		this.markError(yearId);
		this.markError(expLabel);
		return false;
	} else if ( ( theYear <= this.today.getFullYear() ) && ((theMonth) < this.today.getMonth()+1 ) ) {
		this.markError(monthId);
		this.markError(yearId);
		this.markError(expLabel);
		return false;
	} else {
		this.removeError(monthId);
		this.removeError(yearId);
		this.removeError(expLabel);
		return true;
	}
};

ValidationObj.prototype.validateBoolean =function(id) {
	//console.log("validateBoolean");
	if(get(id).checked) {
		this.removeError(id); return true;
	} else {
		this.markError(id); return false;
	}
};

ValidationObj.prototype.validateGender = function(id) {
	//console.log("validateGender");
	if(get(id).value=="") { this.markError(id);return false; }
	else { this.removeError(id); return true; }
};
ValidationObj.prototype.validateRadioButton =function(id) {
	/* the ids are the same on radio inputs. needs more work or grouping. */
};

ValidationObj.prototype.validateGlobalPhone = function(reqPhoneObj) {
		
	var error = false;
	
	if(reqPhoneObj.phoneList.primaryPhone){
		if(!this.validatePhoneCC("primaryCountryCode")){
			error = true;
		}
		if(!this.validatePhoneArea("primaryAreaCode")){
			error = true;
		}
		if(!this.validatePhoneNumber("primaryNumber")){
			error = true;
		}
		if(reqPhoneObj.phoneList.primaryPhone.primExt != ""){
			if(!this.validatePhoneExt("primaryExt")){
				error = true;
			}
		}
	}
	
	if(reqPhoneObj.phoneList.alternatePhone){
		if(reqPhoneObj.phoneList.alternatePhone.altCC != ""){
			if(!this.validatePhoneCC("altCountryCode")){
				error = true;
			}
		}
		if(reqPhoneObj.phoneList.alternatePhone.altArea != ""){
			if(!this.validatePhoneArea("altAreaCode")){
				error = true;
			}
		}
		if(reqPhoneObj.phoneList.alternatePhone.altPhone != ""){
			if(!this.validatePhoneNumber("altNumber")){
				error = true;
			}
		}
		if(reqPhoneObj.phoneList.alternatePhone.altExt != ""){
			if(!this.validatePhoneExt("altExt")){
				error = true;
			}
		}
		
	}
	
	return error;
	
};


ValidationObj.prototype.validateGlobalAddress = function(reqAddrObj){

	var error = false;
	
	if(reqAddrObj.addrLine1StreetName) {
		if(!this.validateStreet("addr1")) {
			error = true;
		}
	}
	if(reqAddrObj.addrLine2RoomApartment) {
		if(!this.validateStreet("addr2")) { 
			error = true;
		}
	}
	if(reqAddrObj.cityCountyWard) {
		if(!this.validateCity("cityCountyWard")) { 
			error = true;
		}
	}
	if(reqAddrObj.stateProvCode) {
		if(!this.validateCity("stateProv")) {
			error = true;	
		}
	}	
	if(reqAddrObj.districtTownVillage) {
		if(!this.validateCity("districtTownVillage")) {
			error = true;	
		}
	}
	if(reqAddrObj.areaTerritoryPrefecture) {
		if(!this.validateStreet("areaTerritoryPrefecture")) {
			error = true;	
		}
	}
	if(reqAddrObj.postalCode) {
		if(!this.validatePostalCode("postal")) {
			error = true;	
		}
	}
	
	return error;		
};
/******* Global Phone Validation Methods ***************/
ValidationObj.prototype.validatePhoneNumber = function(id) {
	//console.log("validatePhoneNumber");
	var t = get(id);
	//t.value.replace("+","");
	//if(!t.value.match(/[\d\-\.]{10,}/)) { this.markError(id); return false; } 
	if(!t.value.match(/^[0-9- ]{7,20}$/))
	{ this.markError(id); return false; }
	else { this.removeError(id);return true; }
};
ValidationObj.prototype.validatePhoneCC = function(id){
	var t = get(id);
	if(t.value != "" && t.value.match(/[0-9\+]{1,10}/)) { this.removeError(id);return true;} 
	else { this.markError(id); return false; }
};
ValidationObj.prototype.validatePhoneArea = function(id){
	var t = get(id);
	if(t.value != "" && t.value.match(/[0-9]{3,5}/)) { this.removeError(id);return true; } 
	else { this.markError(id); return false; }
};
ValidationObj.prototype.validatePhoneExt = function(id){
	var t = get(id);
	if(t.value != "" && t.value.match(/[0-9\+]{0,5}/)) { this.removeError(id);return true; } 
	else { this.markError(id); return false; }
};


/******* Global Address Validation Methods ************/
ValidationObj.prototype.validateCity = function(id) {
	//console.log("validateCity");
	var t = get(id);
	if(t.value == "" || t.value.match(/[^-||\d||\w||\s]/)!=null) { this.markError(id); return false; } 
	else { this.removeError(id);return true; }
};
ValidationObj.prototype.validateStreet = function(id) {
	//console.log("validateStreet");
	var t = get(id);
	if(t.value == "" || t.value.match(/[^-||,||\d||\w||\s]\#/)!=null) { this.markError(id); return false; } 
	else { this.removeError(id); return true; }
};
ValidationObj.prototype.validatePostalCode = function(id) {
	//console.log("validateStreet");
	var t = get(id);
	if(t.value == "" || t.value.match(/[\d\w\-\s\.]{4,12}/)==null) { this.markError(id); return false; } 
	else { this.removeError(id); return true; }
};
ValidationObj.prototype.validateEmail = function(id) {
	//console.log("validateEmail");
	var t = get(id);
	if(t.value == "" || (t.value.match(/^[\w-]+(?:\.[\w-]+)*@([a-z0-9-]+\.)+[a-z]{2,4}$/i)==null) ) { this.markError(id); return false; }
	else { this.removeError(id); return true; }
};


ValidationObj.prototype.validateEmailReEnter = function(origId, reenterId) {
	//console.log("validateEmailRenter");
	var origIdValue = get(origId).value;
	var reenterIdValue = get(reenterId).value;
	if (exists(reenterId)){
		if(origIdValue != reenterIdValue){
			this.markError(reenterId); return false;
		} else { this.removeError(reenterId); return true; }
	}
};
ValidationObj.prototype.validateSMNum = function(id) {
	//console.log("validateSMNum");
	var t = get(id);
	if(this.isNumber(id)) {
		if(t.value == "" || t.value.match(/\d{9,12}/)==null) { this.markError(id); return false; }
		else { this.removeError(id); return true; }
	}
	return false;
};
ValidationObj.prototype.validatePinFormat = function(id) {
	//console.log("validatePinFormat");
	var t = get(id);
	if(this.isNumber(id)) {
		if(t.value.length!=4) { this.markError(id); return false; }
		else { this.removeError(id); return true; }
	}
	return false;
};
ValidationObj.prototype.validateCCID = function(id) {
	//console.log("validateCCID");
	var t = get(id);
	if(t.value.match(/[^\d]/) == null  && t.value.match(/\d{3,4}/) != null ) { 
		this.removeError(id); 
		return true; 
	} else { 
		this.markError(id); return false;
	}
};
ValidationObj.prototype.isCCNumMasked = function(ccNum, ccType) {
	ccNum = ccNum.replace(/^\s+/,"");
	switch(ccType) {
		case "AX": return ccNum.match(/^\*{11}\d{4}$/); // American Express: length 15
		case "VI":  // VI length 16
		case "CA": // CA: length 16
		case "DS": // Diners: length 16
		case "XS": // XS: length 16
		case "BB": // BB: length 16
		case "EC": // EC : length 16
		case "JC": // JC : length 16
		case "BF": // BF: length 16
		case "CG": // CG: length 16
		case "MD": // MD: length 16
		case "DL": // DL : length 16
			return ccNum.match(/^\*{12}\d{4}$/);
		case "TP": return ccNum.match(/^\*{11,12}\d{4}$/); // TP : length 16, 15
		case "ER": // ER : length 14
		case "DC": // Discover: length 14
		case "CB": // CB : length 14
			return ccNum.match(/^\*{10}\d{4}$/);
		default: return false;
	}
}
ValidationObj.prototype.validateCCNum = function(id, ccType) {
	//console.log("validateCCNum");
	var ccNum = get(id).value;
	if(ccNum === "") { this.markError(id); return false;}
	if(ccType == "AI" || ccType == "PA" || ccType == "UA") { ccType= "TP"; }
	if(ccType == "AT" || ccType == "TC") { ccType= "DC"; }
	if(ccType == "BR") { ccType= "DS"; }
	if(ccType == "CD") { ccType= "CA"; }
	if(this.isCCNumMasked(ccNum, ccType)) {
		this.removeError(id);
		return true;
	}
	ccNum = ccNum.replace(/\D/g, "");
	if (this.doesCCNumPassesLuhn(ccNum) ) {
		switch(ccType) {
			case "AX": if (ccNum.match(/^3[4,7]\d{13}$/)== null) { this.markError(id); return false;  } else { this.removeError(id); return true; }// American Express: length 15, prefix 34 or 37.
			case "VI": if (ccNum.match(/^4\d{15}$/) == null) { this.markError(id); return false;  } else { this.removeError(id); return true; } // VI length 16, prefix 4.
			case "CA": if (ccNum.match(/^5[1-5]\d{14}$/) == null) { this.markError(id); return false;  } else { this.removeError(id); return true; } // CA: length 16, prefix 51-55.
			case "DS":  if (ccNum.match(/^6[0,5]\d{14}$/) == null) { this.markError(id); return false;  } else { this.removeError(id); return true; } // Diners: length 16, prefix 60, 65
			case "DC": if (ccNum.match(/^3[0,6]\d{12}$/) == null) { this.markError(id); return false;  } else { this.removeError(id); return true; } // Discover: length 14, prefix 30, 36.
			case "CB": if (ccNum.match(/^3\d{13}$/) == null) { this.markError(id); return false;  } else { this.removeError(id); return true; } // CB : length 14, prefix 3
			case "TP": if (ccNum.match(/\d{15,16}$/) == null) { this.markError(id); return false; } else { this.removeError(id); return true; } // TP : length 16, no prefix
			case "XS": if (ccNum.match(/^5[1-5]\d{14}$/) == null) { this.markError(id); return false;  } else { this.removeError(id); return true; } // XS: length 16, prefix 51-55.
			case "BB": if (ccNum.match(/^4\d{15}$/) == null) { this.markError(id); return false;  } else { this.removeError(id); return true; } // BB: length 16, prefix 4.
			case "BF": if (ccNum.match(/^4\d{15}$/) == null) { this.markError(id); return false;  } else { this.removeError(id); return true; } // BF: length 16, prefix 4.
			case "CG": if (ccNum.match(/^4\d{15}$/) == null) { this.markError(id); return false;  } else { this.removeError(id); return true; } // CG: length 16, prefix 4.
			case "MD": if (ccNum.match(/^5[1-5]\d{14}$/) == null) { this.markError(id); return false;  } else { this.removeError(id); return true; } // MD: length 16, prefix 51-55.
			case "DL": if (ccNum.match(/^2006\d{12}$/) == null) { this.markError(id); return false;  } else { this.removeError(id); return true; } // DL : length 16, prefix 2006
			case "ER": if (ccNum.match(/\d{14}$/) == null) { this.markError(id); return false;  } else { this.removeError(id); return true; } // ER : length 14, no prefix
			case "EC": if (ccNum.match(/\d{16}$/) == null) { this.markError(id); return false;  }	else { this.removeError(id); return true; } // EC : length 16, no prefix
			case "JC": if (ccNum.match(/^3\d{15}$/) == null) { this.markError(id); return false;  } else { this.removeError(id); return true; } // JC : length 16, prefix 3
			default: this.removeError(id); return true;
		}
	} else {
		this.markError(id); return false;
	}
};
ValidationObj.prototype.validateCreditCard = function(id) {
	//console.log("validateCreditCard "+ id);
	var rtn = false;
	var valType;
	var ccType_Id; var ccNum_Id; var ccCCID_Id; // field ids
	var ccType; var ccNum; var ccCCID; // field values
	if(id.match(/num/) != null || id.match(/ccid/) != null || id.match(/type/) != null) {
		if(id.match(/type/) != null) {
			valType = "type";
			ccType_Id = id;
			ccCCID_Id = id.replace(/type/,"ccid");
			ccNum_Id = id.replace(/type/,"num");
		} else if(id.match(/num/) != null) { //if the id is for the cc number
			valType = "num";
			ccNum_Id = id;
			ccType_Id = id.replace(/num/,"type");
			ccCCID_Id = id.replace(/num/,"ccid");
		} else if (id.match(/ccid/) != null) { // else the id is for the ccid
			valType = "ccid";
			ccType_Id = id.replace(/ccid/,"type") + "_req";
			ccNum_Id = id.replace(/ccid/,"num") + "_req";
		} else {}
		// the assumption is that the credit card number is provided with the above naming
		// conventions, the field exists that provides the credit card type
		ccType = get(ccType_Id).options[parseInt(get(ccType_Id).selectedIndex)].value;
		ccNum = get(ccNum_Id).value;
		switch(valType) {
			case "type":
				if(ccType != "" && ccNum != "") { 
					rtn = this.validateCCNum(ccNum_Id, ccType);
					if(rtn) { 
						this.removeError(ccType_Id);
						this.removeError(ccNum_Id);
						return rtn;
					} else {
					}
				} else if (ccType == "" && ccNum != "") { 
					this.markError(ccType_Id);
					return false;
				} else {
				}
				break;
			case "num":
				if(ccType != "" && ccNum != "") { 
					rtn = this.validateCCNum(ccNum_Id, ccType);
					if(rtn) { 
						this.removeError(ccType_Id);
						this.removeError(ccNum_Id);
						return rtn;
					}
				} else if (ccType != "" && ccNum == "") { 
					this.markError(ccType_Id);
					this.markError(ccNum_Id);
					return false;
				} else {}
				break;
			case "ccid":
				if(this.curField == id  && exists(get(ccCCID_Id))) {
					if(this.requiresCCID(ccType)) { 
						return this.validateCCID(id);
					} else {
						return this.isNumber(id);
					}
				}
				break;
			default:
				break;
		}
	}  else { 
		//console.log("the field id "+ id +" does not contain num, ccid, or type");
		return false;
	}
};
ValidationObj.prototype.validateETicketNum = function(id, eticketTypeId) {
	//console.log("validateETicketNum");
	
	if(arguments[1] != null){
		var eticketType = get(eticketTypeId).value;
	} 	
	var t = get(id);
	t.value = this.removeSpaces(t.value);
		switch(eticketType) {
			case "006": if(t.value == "" || t.value.match(/\d{10,11}/)==null) { this.markError(id); return false; } else { this.removeError(id); return true; }
			break;
			case "012": if(t.value == "" || t.value.match(/\d{10,11}/)==null) { this.markError(id); return false; } else { this.removeError(id); return true; }
			break;
			default:
			break;
			
		}

};
ValidationObj.prototype.validateEDocNumber = function(id) {
	var t = get(id);
	t.value = this.removeSpaces(t.value);
	t.value = this.stripBadChars(t.value);
	if(t.value.length > 0 && t.value.length < 15 && t.value.match(/^[a-z0-9]+$/i)){
		this.removeError(id); return true; 
	} else { 
		this.markError(id); return false; 
	}
};
ValidationObj.prototype.validateRedemptionCode = function(id) {
	var t = get(id);
	t.value = this.removeSpaces(t.value);
	t.value = this.stripBadChars(t.value);
	if(t.value.length > 0 && t.value.length < 14 && t.value.match(/^[a-z0-9]+$/i)){
		this.removeError(id); return true; 
	} else { 
		this.markError(id); return false; 
	}
};
ValidationObj.prototype.validateRefNumber = function(id) {
	var t = get(id);
	t.value = this.removeSpaces(t.value);
	t.value = this.stripBadChars(t.value);
	if(t.value.length > 4 && t.value.length < 9 && t.value.match(/^[a-z0-9]+$/i)){
		this.removeError(id); return true; 
	} else { 
		this.markError(id); return false; 
	}
};
ValidationObj.prototype.validateRedressNumber = function(id) {
	//console.log("validateETicketNum");
	var t = get(id);
	t.value = this.removeSpaces(t.value);
	t.value = this.stripBadChars(t.value);
	if(t.value.length > 0 && t.value.length < 14 && t.value.match(/^[a-z0-9]+$/i)){
		this.removeError(id); return true; 
	} else { 
		this.markError(id); return false; 
	}
};
ValidationObj.prototype.validateSecureName = function(id) {
	var t = get(id);
	if(t.value.match(/^[a-z]+[a-z\'\-\s]*$/i)){
		this.removeError(id); return true; 
	} else { 
		this.markError(id); return false; 
	}
}

/*

ValidationObj.prototype.validateFields = function(fieldArray) {
	//console.log("validateFields");
	var submitForm = true;
	submitForm = true;
	for(i=0;i<fieldArray.length;i++){
		var tempProp = fieldArray[i].toString();
		var tempArray = tempProp.split(',');
		for(j=0;j<tempArray.length;j++){
			if(tempArray[j + 1] == "CCType"){
				var tempString = this.validateCCType(tempArray[j], tempArray[j+2]);
				if(!tempString){ submitForm = false; }
			} else if(tempArray[j+1]) {
				var tempString = this.validateField(tempArray[j], tempArray[j+1]);
				if(!tempString){ submitForm = false; }
			} else {}
		}	
	}
	if(submitForm){ formName.submit(); }
}

/*
	match two values
	get ie working.
*/

ValidationObj.prototype.validateField = function(id, type) { 
	//console.log("validateField "+id+", data type of "+type);
	var validationType = type;
	if(validationType=="day"||validationType=="month"|| validationType=="year") { validationType = id.split("_")[1]; }
	else if(validationType=="genderm"||validationType=="genderf") { validationType = "gender"; }
	else if(validationType=="booleant"||validationType=="booleanf") { validationType = "boolean"; }
	else if(validationType=="fname"||validationType=="lname") { validationType = "name"; }
	else if(validationType=="ETicketNum") {validationType = "eticket"; }
	else { /* doNothing() */ }
	if(exists(id)) {
		switch(validationType.toLowerCase()) {
			// name, cc, day, month, year, gender, passport 
			case "name": get(id).value = this.stripBadChars(get(id).value);return this.validateName(id);
			case "cc": if(get(id).type == "text" || get(id).type == "textarea" ) { get(id).value = this.stripBadChars(get(id).value); } return this.validateCreditCard(id);
			case "gender": return this.validateGender(id);
			case "boolean": return this.validateBoolean(id); 
			case "passport": get(id).value = this.stripBadChars(get(id).value);return this.validatePassportNum(id);
			case "birth": return this.validateBirthDate(id);
			case "exp": return this.validateExpirationDate(id);
			case "num": get(id).value = this.stripBadChars(get(id).value);return this.isNumber(id);
			case "pin": return this.validatePinFormat(id);
			case "country": return this.validateSelectField(id);
			case "state":  return this.validateSelectField(id);
			case "phone":  get(id).value = this.stripBadChars(get(id).value);return this.validatePhoneNumber(id);
			case "city":  get(id).value = this.stripBadChars(get(id).value);return this.validateCity(id);
			case "street":  get(id).value = this.stripBadChars(get(id).value);return this.validateStreet(id);
			case "freeform": get(id).value = this.stripBadChars(get(id).value);return true; /* update if needed */
			case "validateRadioButton": return this.validateRadioButton(id); /* function needs writing */
			case "mmslashddslashyyyydate": return this.isDataMMSlashDDSlashYYYY(id) ;
			case "email": return this.validateEmail(id);
			case "smnum": return this.validateSMNum(id);
			case "eticket": return this.validateETicketNum(id, eticketTypeId); break;
			//case "PINNum": return this.validatePINNum(id); break;
			//case "ConfirmNum": return this.validateConfirmNum(id); break;
			default: return true;
		}
	}
};
ValidationObj.prototype.validateForm = function(id) { /* validates that all fields with data are correct */
	//console.log("validateForm");
	var oForm = document.forms[id];
	for(var i=0;i<oForm.length;i++) {
		if(!this.validateField(oForm[i].id,oForm[i].id.split("_")[0])) { 
			//console.log(oForm[i].id + " failed to validate as datatype "+ oForm[i].id.split("_")[0]);
			return false; 
		}
	}
	return true;
};
ValidationObj.prototype.checkForm = function(id) {
	//console.log("checkForm");
	this.curField = id;
	var rtn = true;
	var parentFormId = this.findParentForm(id);
	var oForm = document.forms[parentFormId];
	for(var i=0;i<oForm.length;i++) {
		if(oForm.elements[i].id.match(/_req/)) { /* check if field is required */
			switch(oForm.elements[i].type) {
				case "text":  if(oForm[i].value=="") { rtn=false; }; break; /* catches only empty fields without a value */
				case "textarea":  if(oForm[i].value=="") { rtn=false; }; break;  /* catches only empty fields without a value */
				case "select-one": if(oForm[i].selectedIndex==0) { rtn=false; }; break; /* catches if left at index of 0 */
				//case "select-multiple": if(oForm[i].selectedIndex==0) { rtn=false; }; break;  /* catches if left at index of 0 */
				case "radio": if(!oForm[i].checked) { rtn=false; }; break;
				case "checkbox": if(!oForm[i].checked) { rtn=false; }; break;
				case "password": break;
				case "hidden": if(oForm[i].value=="") { rtn=false; }; break;
				default: break;
			}
		} else { /* handle non-required fields */
			switch(oForm.elements[i].type) {
				case "text":  if(oForm[i].value=="") { rtn=true; } else; break; /* catches only empty fields without a value */
				case "textarea":  if(oForm[i].value=="") { rtn=true; }; break;  /* catches only empty fields without a value */
				case "select-one": if(oForm[i].selectedIndex==0) { rtn=true; }; break; /* catches if left at index of 0 */
				//case "select-multiple": if(oForm[i].selectedIndex==0) { rtn=false; }; break;  /* catches if left at index of 0 */
				case "radio": if(!oForm[i].checked) { rtn=true; }; break;
				case "checkbox": if(!oForm[i].checked) { rtn=true; }; break;
				case "password": break;
				case "hidden": if(oForm[i].value=="") { rtn=true; }; break;
				default: break;
			}
			if(oForm.elements[i].id.match(/replicate/)) {
				/* put code here to copy fields from one to another */
			}
		}
		if(!rtn) { break; }
	}
	if(!rtn) {
		this.validateField(id,id.split("_")[0]);
	} else {
		if(this.validateForm(parentFormId)) { this.enableForm(parentFormId); /*this.submitForm(parentFormId);*/}
	}
	return rtn;
};

ValidationObj.prototype.enableForm = function(id) {
	//console.log("enableForm");
	var oForms = document.forms;
	for(var i=0;i<oForms.length;i++) {
		if(exists(oForms[i].id) && oForms[i].id == id) {
			for(var j=0;j<oForms[i].length;j++) {
				if(oForms[i][j].type=="submit" && oForms[i][j].value != "Start Over") { 
					oForms[i][j].disabled="";
					setClassName(oForms[i][j].id,getClassName(oForms[i][j].id).split("_")[0]);
					oForms[i].action = this.getProp(id+"_action");
					return true;
				}
			}
		}
	}
};
ValidationObj.prototype.submitForm = function(id) {
	//console.log("submitForm");
	var oForm = document.forms[id];
	oForm.submit();
};

/* .init() disables the continue button and adds "handleField()" as the onchange handler */
ValidationObj.prototype.init = function() { 
	//console.log("init");
	var hasButton = false;
	this.addFormAndLabelData();
	var oForms = document.forms;
	if (exists(this.getProp("disable")) && this.isDisabled("init")) { return; }
	for(var i=0;i<oForms.length;i++) {
		hasButton = false;
		if(exists(oForms[i]) && exists(oForms[i].id) && oForms[i].id !="") { 
			for(var j=0;j<oForms[i].length;j++) {
				if(exists(oForms[i][j].id) && oForms[i][j].type=="submit" && oForms[i][j].value != "Start Over" && oForms[i][j].value != "Back") { 
					/* if the desire is to not disable buttons for form submissions */
					if (!this.isDisabled("disabled_buttons")) {
						oForms[i][j].disabled="disabled";
						setClassName(oForms[i][j].id,getClassName(oForms[i][j].id)+"_disabled");
						hasButton = true;
					}
				} else { 
					oForms[i][j].onchange = handleField;
				}
			}
			if(hasButton) { /* in order to properly disable the buttons we remove the form action as well */
				this.setProp(oForms[i].id+"_action",oForms[i].action);
				oForms[i].action = "";
			}
		}
	}
};

// create instance of Object
var valObj = new ValidationObj();


// inline handlers for events and initialization
function handleField() { 
	//console.log("handleField: " + this.id);
	valObj.checkForm(this.id);
};
function addClientSideValidation() { 
	//console.log("addClientSideValidation");
	valObj.init();
};

// add form processing to page on load
//addEvent(window,"load",addClientSideValidation,false);

/*** default address fields are the same as US ***/
var CountryAddressFields = {
	US : { AddressFields :
		[
			{ id : "addr1", label : "Address Line 1", name : "addrLine1StreetName", isVisible : true },
			{ id : "addr2", label : "Address Line 2", name : "addrLine2RoomApartment", isVisible : true },
			{ id : "cityCountyWard", label : "City", name : "cityCountyWard", isVisible : true },
			{ id : "stateProv", label : "State", name : "stateProvCode", isVisible : true },
			{ id : "districtTownVillage", label : "District/Town/Village", name : "districtTownVillage", isVisible : false },
			{ id : "areaTerritoryPrefecture", label : "Area/Territory/Prefecture", name : "areaTerritoryPrefecture", isVisible : false },
			{ id : "postal", label : "Postal Code", name : "postalCode", isVisible : true }
		]
	},
	JP : { AddressFields :
		[
			{ id : "addr1", label : "Chome/Banchi", name : "addrLine1StreetName", isVisible : true },
			{ id : "addr2", label : "Company/Building/Apartment", name : "addrLine2RoomApartment", isVisible : true },
			{ id : "cityCountyWard", label : "City/Ward", name : "cityCountyWard", isVisible : true },
			{ id : "stateProv", label : "State", name : "stateProvCode", isVisible : false },
			{ id : "areaTerritoryPrefecture", label : "Prefecture", name : "areaTerritoryPrefecture", isVisible : true }
		]
	},
	KR : { AddressFields :
		[
			{ id : "cityCountyWard", label : "County/City", name : "cityCountyWard", isVisible : true },
			{ id : "stateProv", label : "State", name : "stateProvCode", isVisible : false },
			{ id : "districtTownVillage", label : "District/Town/Village", name : "districtTownVillage", isVisible : true }
		]
	},
	TW : { AddressFields :
		[
			{ id : "cityCountyWard", label : "County/City", name : "cityCountyWard", isVisible : true },
			{ id : "stateProv", label : "State", name : "stateProvCode", isVisible : false },
			{ id : "districtTownVillage", label : "District/Town/Village", name : "districtTownVillage", isVisible : true }
		]
	},
	HK : { AddressFields :
		[
			{ id : "addr1", label : "Street", name : "addrLine1StreetName", isVisible : true },
			{ id : "addr2", label : "Building/Apartment", name : "addrLine2RoomApartment", isVisible : true },
			{ id : "cityCountyWard", label : "City", name : "cityCountyWard", isVisible : false },
			{ id : "stateProv", label : "State", name : "stateProvCode", isVisible : false },
			{ id : "districtTownVillage", label : "City/Town/Village", name : "districtTownVillage", isVisible : true },
			{ id : "areaTerritoryPrefecture", label : "District", name : "areaTerritoryPrefecture", isVisible : true },
			{ id : "postal", label : "Postal Code", name : "postalCode", isVisible : false }
		]
	},
	CN : { AddressFields :
		[
			{ id : "addr1", label : "Address", name : "addrLine1StreetName", isVisible : true },
			{ id : "addr2", label : "Room/Building", name : "addrLine2RoomApartment", isVisible : true },
			{ id : "cityCountyWard", label : "City/County/District", name : "cityCountyWard", isVisible : true },
			{ id : "stateProv", label : "State", name : "stateProvCode", isVisible : false },
			{ id : "districtTownVillage", label : "District/Town/Village", name : "districtTownVillage", isVisible : false },
			{ id : "areaTerritoryPrefecture", label : "Province/City", name : "areaTerritoryPrefecture", isVisible : true },
			{ id : "postal", label : "Postal Code", name : "postalCode", isVisible : true }
		]
	},
	SG : { AddressFields :
		[
			{ id : "addr1", label : "Address", name : "addrLine1StreetName", isVisible : true },
			{ id : "addr2", label : "Room/Building", name : "addrLine2RoomApartment", isVisible : true },
			{ id : "cityCountyWard", label : "City", name : "cityCountyWard", isVisible : false },
			{ id : "stateProv", label : "State", name : "stateProvCode", isVisible : false },
			{ id : "districtTownVillage", label : "District/Town/Village", name : "districtTownVillage", isVisible : false },
			{ id : "areaTerritoryPrefecture", label : "Area/Territory/Prefecture", name : "areaTerritoryPrefecture", isVisible : false }
		]
	},
	PH : { AddressFields :
		[
			{ id : "addr1", label : "Street/Road", name : "addrLine1StreetName", isVisible : true },
			{ id : "addr2", label : "Apartment/Building/Block", name : "addrLine2RoomApartment", isVisible : true },
			{ id : "stateProv", label : "State", name : "stateProvCode", isVisible : false }
		]
	},
	TH : { AddressFields :
		[
			{ id : "addr1", label : "Street/Road", name : "addrLine1StreetName", isVisible : true },
			{ id : "addr2", label : "Room/Apartment", name : "addrLine2RoomApartment", isVisible : true },
			{ id : "cityCountyWard", label : "Village/City", name : "cityCountyWard", isVisible : true },
			{ id : "stateProv", label : "State", name : "stateProvCode", isVisible : false },
			{ id : "areaTerritoryPrefecture", label : "Area/Territory/Prefecture", name : "areaTerritoryPrefecture", isVisible : false }
		]
	},
	MY : { AddressFields :
		[
			{ id : "areaTerritoryPrefecture", label : "Province/State", name : "areaTerritoryPrefecture", isVisible : true },
			{ id : "stateProv", label : "State", name : "stateProvCode", isVisible : false },
			{ id : "postal", label : "Postal Code", name : "postalCode", isVisible : true }
		]
	},
	ID : { AddressFields :
		[
			{ id : "areaTerritoryPrefecture", label : "Province/State", name : "areaTerritoryPrefecture", isVisible : true },
			{ id : "stateProv", label : "State", name : "stateProvCode", isVisible : false },
			{ id : "postal", label : "Postal Code", name : "postalCode", isVisible : true }
		]
	},
	AU : { AddressFields :
		[
			{ id : "areaTerritoryPrefecture", label : "Province/State", name : "areaTerritoryPrefecture", isVisible : true },
			{ id : "stateProv", label : "State", name : "stateProvCode", isVisible : false },
			{ id : "postal", label : "Postal Code", name : "postalCode", isVisible : true }
		]
	},
	NZ : { AddressFields :
		[
			{ id : "areaTerritoryPrefecture", label : "Province/State", name : "areaTerritoryPrefecture", isVisible : true },
			{ id : "stateProv", label : "State", name : "stateProvCode", isVisible : false },
			{ id : "postal", label : "Postal Code", name : "postalCode", isVisible : true }
			]
	},
	MX : { AddressFields :
		[
			{ id : "stateProv", label : "Province/State", name : "stateProvCode", isVisible : true }
		]
	},
	CA : { AddressFields :
		[
			{ id : "stateProv", label : "Province", name : "stateProvCode", isVisible : true }
		]
	},
	KP : { AddressFields :
		[
			{ id : "cityCountyWard", label : "City/County", name : "cityCountyWard", isVisible : true },
			{ id : "stateProv", label : "State", name : "stateProvCode", isVisible : false },
			{ id : "districtTownVillage", label : "District/Town/Village", name : "districtTownVillage", isVisible : true }
		]
	}
}	

var addressMap = {
	reqAddrObj : {},
	langObj : [],
	langCode: '',
	langDropDown : [],
	createLabel : function(Definition) {
		var country = get('countryCode').value;
		
		if (country == "US") {
			addressMap.reqAddrObj = { 
				"addrLine1StreetName" : true,
				"addrLine2RoomApartment" : false,
				"districtTownVillage" : false,
				"cityCountyWard" : true,
				"areaTerritoryPrefecture" : false,
				"districtCode" : false,
				"stateProvCode" : true,
				"postalCode" : true	
			}	
		}
		if (country == "CA") {
			addressMap.reqAddrObj = { 
				"addrLine1StreetName" : true,
				"addrLine2RoomApartment" : false,
				"districtTownVillage" : false,
				"cityCountyWard" : true,
				"areaTerritoryPrefecture" : false,
				"districtCode" : false,
				"stateProvCode" : true,
				"postalCode" : true
			}	
		}	
		switch(Definition.name) {
			case "addrLine1StreetName":
				if (addressMap.reqAddrObj.addrLine1StreetName == true) {
					return ("* "+ Definition.label);
				} else {
					return Definition.label;				
				}
				break;
			case "addrLine2RoomApartment":
				if (addressMap.reqAddrObj.addrLine2RoomApartment == true) {
					return ("* "+ Definition.label);
				} else {
					return Definition.label;				
				}
				break;
			case "districtTownVillage":
				if (addressMap.reqAddrObj.districtTownVillage == true) {
					return ("* "+ Definition.label);
				} else {
					return Definition.label;				
				}
				break;
			case "cityCountyWard":
				if (addressMap.reqAddrObj.cityCountyWard == true) {
					return ("* "+ Definition.label);
				} else {
					return Definition.label;				
				}
				break;
			case "areaTerritoryPrefecture":
				if (addressMap.reqAddrObj.areaTerritoryPrefecture == true) {
					return ("* "+ Definition.label);
				} else {
					return Definition.label;				
				}
				break;
			case "districtCode":
				if (addressMap.reqAddrObj.districtCode == true) {
					return ("* "+ Definition.label);
				} else {
					return Definition.label;				
				}
				break;
			case "stateProvCode":
				if (addressMap.reqAddrObj.stateProvCode == true) {
					return ("* "+ Definition.label);
				} else {
					return Definition.label;				
				}
				break;
			case "postalCode":
				if (addressMap.reqAddrObj.postalCode == true) {
					return ("* "+ Definition.label);
				} else {
					return Definition.label;				
				}
				break;
		}
	},
	createReqAddrObj : function(data){
		if (data != null) {
			addressMap.reqAddrObj = { 
				"addrLine1StreetName" : data.addrLine1StreetNameRequired,
				"addrLine2RoomApartment" : data.addrLine2RoomApartmentRequired,
				"districtTownVillage" : data.districtTownVillageRequired,
				"cityCountyWard" : data.cityCountyWardRequired,
				"areaTerritoryPrefecture" : data.areaTerritoryPrefectureRequired,
				"districtCode" : data.districtCodeRequired,
				"stateProvCode" : data.stateProvCodeRequired,
				"postalCode" : data.postalCodeRequired
			}
		return addressMap.reqAddrObj;
		}
	},
	addressFields : function(countryCode) {
		if(arguments.length != 2) {
			countryCode = get('countryCode').value; 
		}
		if(countryCode != "US" && countryCode != "CA") {
			AddressValidationProcessor.getAddressValidation(countryCode,{callback:this.createReqAddrObj,timeout:25000,async:false});

		}
		var Country = '';
		if(CountryAddressFields[countryCode]) {
			Country = CountryAddressFields[countryCode].AddressFields;
		} else {
			Country =  CountryAddressFields["US"].AddressFields;
		}

		var DefaultState = CountryAddressFields["US"].AddressFields;
		for(var i=0; i < DefaultState.length; i++) {
			var isFound = false;
			for(var j=0; j < Country.length; j++) {
				if(DefaultState[i].id == Country[j].id) {
					if(Country[j].isVisible) {
						setInnerHTML(DefaultState[i].id + "_label", this.createLabel(Country[j]));
						show(DefaultState[i].id + "_label");
						show(DefaultState[i].id);
					} else { 
						hide(DefaultState[i].id + "_label");
						hide(DefaultState[i].id);
					}
				isFound = true;
				break;
				}
			}
			if(!isFound) {
				if(DefaultState[i].isVisible) {
					setInnerHTML(DefaultState[i].id + "_label", this.createLabel(DefaultState[i]));
					show(DefaultState[i].id + "_label");
					show(DefaultState[i].id);
				} else { 
					hide(DefaultState[i].id + "_label");
					hide(DefaultState[i].id);
				}
			}
		}
	},
	languageOptions : function(country) {
		if(country != "US" && country != "CA") {
			LanguageProcessor.getLanguages(country, this.displayLanguages);
		} else {
			var langArray = [];
			var langInfo = {
				"languageCode" : "ENG",
				"languageName" : "English",
				"primaryLanguageIndicator" : "Y"
			}
			langArray.push(langInfo);
			this.langObj = langArray;
			this.displayLanguages();
		}
	},
	displayLanguages : function(data){
		this.langDropDown = get('language');
		var langArray = [];
		var langData = {};
		
		if(data != null) {
			for(i=0; i<data.langList.length; i++) {
				langData = {
					"languageCode" : data.langList[i].languageCode,
					"languageName" : data.langList[i].languageName,
					"primaryLanguageIndicator" : data.langList[i].primaryLanguageIndicator
					};
				langArray.push(langData);
			}
			this.langObj = langArray;
		}
		
		var selIdx = 0
		if(this.langObj != null) {
			this.langDropDown.length = 0;
			for(i=0; i<this.langObj.length; i++) {
				var selValue = this.langObj[i].languageCode;
				if(addressMap.langCode == 'name') {
					selValue = this.langObj[i].languageName;
				}
				this.langDropDown.length++;
				this.langDropDown[i].text = this.langObj[i].languageName;
				this.langDropDown[i].value = selValue;
				if(this.langDropDown[i].primaryLanguageIndicator == 'Y'){
					selIdx = i;
				}
			}
		this.langDropDown.selectedIndex = selIdx;
		}
	},
	languageCodeSelect : function() {
	var langCd = lang;
		for(i=0; i<get('language').length; i++) {
			if(get('language')[i].value == langCd) {
				get('language').selectedIndex = i;
				return;
			}
		}
	},
	setAddressType : function() {
		var atype = get('atype').value;
		if(atype == 'B') {
			show('bname');
		} else {
			hide('bname');
		}
	},
	setPhoneType : function(id) {
		if(arguments.length < 1) {
			var id = "primaryPhone";
		}
		var phoneType = get(id).value;
		if(phoneType == 'B' && id == "primaryPhone") {
			setInnerHTML('pExt','Ext: <input type="text" maxlength="5" id="primaryExt" name="pext" size="5" value=""/>');
		} else if (phoneType != 'B' && id == "primaryPhone") {
			setInnerHTML('pExt','');
		}

		if(phoneType == 'B' && id == "altPhone") {
			setInnerHTML('aExt','Ext: <input type="text" maxlength="5" id="altExt" name="altpext" size="5" value=""/>');
		} else if (phoneType != 'B' && id == "altPhone") {
			setInnerHTML('aExt','');
		}
	},
	countrySwitch : function() {
		if(arguments.length == 0) {
			objId = 'countryCode';
		}
		var country = get(objId).value;
		this.addressFields(country);
		/*
		if(CountryAddressFields[country]) {
			this.addressFields(CountryAddressFields[country].AddressFields);
		} else {
			this.addressFields(CountryAddressFields["US"].AddressFields);
		}
		*/
		this.langCode = 'name';
		this.languageOptions(country);
	},
	validatePhone : function() {
		var error = false;
		var primCC = get("primaryCountryCode").value;
		var primArea = get("primaryAreaCode").value;
		var primPhone = get("primaryNumber").value;
		var altCC = get("altCountryCode").value;
		var altArea = get("altAreaCode").value;
		var altPhone = get("altNumber").value;
		var primExt = "";
		var altExt = "";

		//remove any previous errors
		valObj.removeError("primaryCountryCode");
		valObj.removeError("primaryAreaCode");
		valObj.removeError("primaryNumber");
		valObj.removeError("altCountryCode");
		valObj.removeError("altAreaCode");
		valObj.removeError("altNumber");
		if (get("primaryExt") ){
			valObj.removeError("primaryExt");
			primExt = get("primaryExt").value;
		}
		
		if (get("altExt") ){
			valObj.removeError("altExt");
			altExt = get("altExt").value;
		}

		if(primCC.match(/^[\d\-\.\+]{1,10}$/) == null) { 
			valObj.markError("primaryCountryCode");
			error = true;
		}
		if(primArea.match(/^[\d\-\.]{1,5}$/) == null) {
			valObj.markError("primaryAreaCode");
			error = true;
		}
		if(primPhone.match(/^[\d\-\.]{6,13}$/) == null) {
			valObj.markError("primaryNumber");
			error = true;
		}
		if(primExt != "") {
			if(primExt.match(/^[\d\-\.]{1,5}$/) == null || primExt.length > 5 ) {
				valObj.markError("primaryExt");
				error = true;
			}
		}
		if(altCC != "" ) {
			if(altCC.match(/^[\d\-\.\+]{1,10}$/) == null) {
				valObj.markError("altCountryCode");
				error = true;
			}
		}
		if(altArea != "" ) {
			if(altArea.match(/^[\d\-\.]{1,5}$/) == null) {
				valObj.markError("altAreaCode");
				error = true;
			}
		}
		if(altPhone != "" ) {
			if(altPhone.match(/^[\d\-\.]{6,13}$/) == null) {
				valObj.markError("altNumber");
				error = true;
			}
		}
		if(altExt != "" ) {
			if(altExt.match(/^[\d\-\.]{1, 5}$/) == null || altExt.length > 5 ) {
				valObj.markError("altExt");
				error = true;
			}
		}
		if(error == true) {
			return false;
		}
	},
	validateAddressFields : function() {
		var error = false;
		//var country = get("countryCode").value;
		//var requiredFields = AddressValidationObject[country].AddressFields;

		if(addressMap.reqAddrObj.addrLine1StreetName) {
			if(valObj.validateStreet("addr1") == false) { error = true;}
		}
		if(addressMap.reqAddrObj.addrLine2RoomApartment) {
			if(valObj.validateStreet("addr2") == false) { error = true;}
		}
		if(addressMap.reqAddrObj.cityCountyWard) {
			if(valObj.validateCity("cityCountyWard") == false) { error = true;}
		}
		if(addressMap.reqAddrObj.stateProvCode) {
			if(valObj.validateCity("stateProv") == false) { error = true;}
		}	
		if(addressMap.reqAddrObj.districtTownVillage) {
			if(valObj.validateCity("districtTownVillage") == false) { error = true;}
		}
		if(addressMap.reqAddrObj.areaTerritoryPrefecture) {
			if(valObj.validateStreet("areaTerritoryPrefecture") == false) { error = true;}
		}
		if(addressMap.reqAddrObj.postalCode) {
			if(valObj.validatePostalCode("postal") == false) { error = true;}
		}
		if(error == true) {
			return false;
		}
	},
	openCountryCodes : function(tbForm, tbBox, e) {
		self.countryCodeForm = tbForm;
		self.countryCodeBox = tbBox;
		
		w = screen.width-400
		h = screen.height-215
		x = e.screenX
		y = e.screenY
		if(x > w){
			x = x-400
		}
		if(y > h){
			y = y-215
		}
		childwin=window.open('/components/help/countryCodes.jsp','CountryCodes','width=460,height=319,top='+y+',left='+x);
	},
	setCountryCode : function(countryCode) {
		var box = get(countryCodeBox);
		box.value = countryCode;
	
		if (childwin != null){
			childwin.close()
			childwin = null
		}
	}	
}
<!-- Begin file /edgecache/js/core_apps/ntrMerchandisingTools.js -->

var ntrSummaryParentIframeUtilityReference = null;
function resizeItineraryIframe() {
	if (exists(ntrSummaryParentIframeUtilityReference)) {
		ntrSummaryParentIframeUtilityReference.fullySize();
	}
}

var paymentAppHander = {
	yesValue : "Y",
	noValue : "N",
	isAllowPaxInfoContinue : true,
	terminateIntervalId : null,
	terminateIntervalTime : 5000,
	defaultStringValue : "",
	defaultBooleanValue : false,
	defaultDoubleValue : 0.00,
	defaultIntValue : 0,
	passengerCount : 0,
	ccDropDownValue : "",
	maskingChar : "*",
	storedCCToggle : null,
	hasTripAdditions : false,
	returnValueToSet : function(value, ifNullValue) {
		return exists(value) ? value : ifNullValue;
	},
	idMapping : {
		creditCardFirstName:"", creditCardLastName:"", creditCardType:"", creditCardNumber:"", creditCardExpireMonth:"", creditCardExpireYear:"", ccID:"", storedCreditCardList:"", storedCreditCardExpireMonth:"", storedCreditCardExpireYear: "", storedCCId: "",useStoredCardValue:"", storedCCToggle: "",
		billingAddress1:"", billingAddress2:"", billingCity:"", billingRegion:"", billingZip:"", billingCountry:"", phoneNumber:"", phoneType:"",phoneAreaCode:"", emailAddress:"", initPaymentCache:"",
		formId : "", firstNameFieldPrefix : "", lastNameFieldPrefix : "", postNameFieldIndexChar : "", preNameFieldIndexChar : "", ccDropDownValue : "" , paymentHfId : "paymentHfId", isInsuranceSelected : "insuranceRadio", error : "", skymilesFieldPrefix : "paxFFNumber"
	},
	errorHash : "",
	setIdMapping : function(Definition) {
		var idMapping = this.idMapping;
		for (var prop in Definition) {
			if (exists(Definition[prop]) && exists(idMapping[prop])) {
				idMapping[prop] = Definition[prop];
			}
		}
	},
	init : function(Definition) {
		var defaultStringValue = this.defaultStringValue;
		var returnValueToSetRef = this.returnValueToSet;
		this.setIdMapping(Definition);
		this.errorHash = returnValueToSetRef(Definition.errorHash, defaultStringValue);
		this.ccDropDownValue = returnValueToSetRef(Definition.ccDropDownValue, defaultStringValue);
		this.passengerCount = returnValueToSetRef(Definition.passengerCount, this.defaultIntValue);
		this.hasTripAdditions = returnValueToSetRef(Definition.hasTripAdditions, this.defaultBooleanValue);
		this.skymilesNumber = returnValueToSetRef(Definition.skymilesNumber, defaultStringValue);
		this.storedCCToggle = Definition.storedCCToggle;
	},
	passPassengerInformationToNTRFrame : function(index, isFirstName, value) {
		if (typeof(ntrMerchandisingPaxInfoIframeHandler) !== "undefined" ) {
			var propertyToSet = ntrMerchandisingPaxInfoIframeHandler.getJavascriptValue('collectPaxInfoHandler').personProperties[(isFirstName ? 'firstName' : 'lastName')];
			var paramsToEval = index.toString() + ', \'' + propertyToSet + '\', \'' + value + '\', ' + index.toString() + ', \'' + ntrMerchandisingPaxInfoIframeHandler.getJavascriptValue('collectPaxInfoHandler').nameDataTypes.passenger + '\'';
			ntrMerchandisingPaxInfoIframeHandler.runJavascriptFunction('collectPaxInfoHandler.addName', paramsToEval);
		}
	},
	passPassengerSkymilesNumberToNTRFrame : function(index, value) {
		if (typeof(ntrMerchandisingPaxInfoIframeHandler) !== "undefined" ) {
			var propertyToSet = ntrMerchandisingPaxInfoIframeHandler.getJavascriptValue('collectPaxInfoHandler').personProperties['skymilesNumber'];
			var paramsToEval = index.toString() + ', \'' + propertyToSet + '\', \'' + value + '\', ' + index.toString() + ', \'' + ntrMerchandisingPaxInfoIframeHandler.getJavascriptValue('collectPaxInfoHandler').nameDataTypes.passenger + '\'';
			ntrMerchandisingPaxInfoIframeHandler.runJavascriptFunction('collectPaxInfoHandler.addName', paramsToEval);
		}
	},
	getTagValue : function(id) {
		var tag = get(id);
		if (exists(tag)) {
			switch (tag.type.toLowerCase()) {
				case "select-one":
					return tag.options[tag.selectedIndex].value;
				case "radio":
					tag = tag.form[tag.name];
					for (var i=0, j=tag.length; i<j; i++) {
						if (tag[i].checked) { 
							return tag[i].value; 
						} 
					}
					break;
				case "text":
				case "hidden":
					return tag.value;
			}
		}
		return "";
	},
	setTagValue : function(id, value) {
		var tag = get(id);
		if (exists(tag)) {
			switch (tag.type.toLowerCase()) {
				case "hidden":
				case "text":
					tag.value = value;
					break;
			}
		}
	},
	getIsAllowPaxInfoContinue : function() {
		return this.isAllowPaxInfoContinue;
	},
	setIsAllowPaxInfoContinue : function(value) {
		this.isAllowPaxInfoContinue = value;
	},
	markInsuranceError : function() {
		var insuranceErrorElement = get("insuranceRequired");
		if (!exists(insuranceErrorElement)) {
			var concat = new conCatTool();
			concat.conCat('<div class="error" id="insuranceRequired">Please tell us if you would like to add Trip Protection</div>');
			get(this.idMapping.error).innerHTML += concat.toString(true);
		}
		window.location.hash = "#" + this.errorHash;
	},
	removeInsuranceError : function() {
		try {
			var childToRemove = get("insuranceRequired");
			if (exists(childToRemove)) {
				get(this.idMapping.error).removeChild(childToRemove);
			}
		} catch(e) { }
	},
	markHotelError : function() {
		var hotelErrorElement = get("hotelRequired");
		if (!exists(hotelErrorElement)) {
			var concat = new conCatTool();
			concat.conCat('<div class="error" id="hotelRequired">Please provide all required information for your hotel reservation</div>');
			get(this.idMapping.error).innerHTML += concat.toString(true);
		}
		window.location.hash = "#" + this.errorHash;
	},
	removeHotelError : function() {
		try {
			var childToRemove = get("hotelRequired");
			if (exists(childToRemove)) {
				get(this.idMapping.error).removeChild(childToRemove);
			}
		} catch(e) { }
	},
	markCarError : function() {
		var carErrorElement = get("carRequired");
		if (!exists(carErrorElement)) {
			var concat = new conCatTool();
			concat.conCat('<div class="error" id="carRequired">Please provide all required information for your car rental</div>');
			get(this.idMapping.error).innerHTML += concat.toString(true);
		}
		window.location.hash = "#" + this.errorHash;
	},
	removeCarError : function() {
		try {
			var childToRemove = get("carRequired");
			if (exists(childToRemove)) {
				get(this.idMapping.error).removeChild(childToRemove);
			}
		} catch(e) { }
	},
	sendPassengerDataToPayment : function() {
		try {
			paymentAppHander.setIsAllowPaxInfoContinue(true);
			var isOptedForInsurance = false;
			if (typeof(ntrMerchandisingPurchaseTripInsuranceIframeHandler) !== "undefined") {
				var isInsuranceSelected = isPaymentEligibleForTripProtector ? ntrMerchandisingPurchaseTripInsuranceIframeHandler.getJavascriptValue('collectPaxInfoHandler').isInsuranceSelected() : true;
				paymentAppHander.setIsAllowPaxInfoContinue(isInsuranceSelected);
				if (!isInsuranceSelected) {
					this.markInsuranceError();
				} else {
					this.removeInsuranceError();
				}
				isOptedForInsurance = isPaymentEligibleForTripProtector ? ntrMerchandisingPurchaseTripInsuranceIframeHandler.getJavascriptValue('collectPaxInfoHandler').hasOptedForInsurance() : false;
				paymentAppHander.setTagValue(paymentAppHander.idMapping.isInsuranceSelected, (isOptedForInsurance ? paymentAppHander.yesValue : paymentAppHander.noValue) );
			}
			if (paymentAppHander.getIsAllowPaxInfoContinue() && typeof(ntrMerchandisingPaxInfoIframeHandler) !== "undefined") {
				var collectPaxInfoRef = ntrMerchandisingPaxInfoIframeHandler.getJavascriptValue('collectPaxInfoHandler');
				var isCarInformationEntered = collectPaxInfoRef.isCarDataEntered();
				var isHotelInformationEntered = collectPaxInfoRef.isHotelDataEntered();
				if (isHotelInformationEntered && isCarInformationEntered) {
					this.setNamesFromFormInput();
					paymentAppHander.setIsAllowPaxInfoContinue(true);
					this.removeCarError();
					this.removeHotelError();
					var idMapping = paymentAppHander.idMapping;
					var isUsingStoredCard = paymentAppHander.getTagValue(idMapping.useStoredCardValue) === paymentAppHander.storedCCToggle;
					var creditcCardFrstName = paymentAppHander.getTagValue(idMapping.creditCardFirstName);
					var creditcardLastName = paymentAppHander.getTagValue(idMapping.creditCardLastName);

					var ccID = paymentAppHander.getTagValue((!isUsingStoredCard || !exists(idMapping.storedCCId) ? idMapping.ccID : idMapping.storedCCId));
					var creditCardExpireMonth = paymentAppHander.getTagValue((!isUsingStoredCard || !exists(idMapping.storedCreditCardExpireMonth) ? idMapping.creditCardExpireMonth : idMapping.storedCreditCardExpireMonth));
					var creditCardExpireYear = paymentAppHander.getTagValue((!isUsingStoredCard  || !exists(idMapping.storedCreditCardExpireYear) ? idMapping.creditCardExpireYear : idMapping.storedCreditCardExpireYear));
					var profileCCID = !isUsingStoredCard ? "" : paymentAppHander.getTagValue(idMapping.storedCreditCardList);
					var creditCardNumber = !isUsingStoredCard ? paymentAppHander.getTagValue(idMapping.creditCardNumber) : "";
					var creditCardType = paymentAppHander.getTagValue(idMapping.creditCardType);
					if (creditCardNumber.indexOf(this.maskingChar) >= 0 && exists(this.ccDropDownValue) && this.ccDropDownValue !== "") {
						creditCardNumber = "";
						profileCCID = this.ccDropDownValue;
					}
					var phoneNumber = paymentAppHander.getTagValue(idMapping.phoneAreaCode) + paymentAppHander.getTagValue(idMapping.phoneNumber);
					var phoneType = paymentAppHander.getTagValue(idMapping.phoneType);
					var emailAddress = paymentAppHander.getTagValue(idMapping.emailAddress);
					var billingAddress1 = paymentAppHander.getTagValue(idMapping.billingAddress1);
					var billingAddress2 = paymentAppHander.getTagValue(idMapping.billingAddress2);
					var billingCity = paymentAppHander.getTagValue(idMapping.billingCity);
					var billingRegion = paymentAppHander.getTagValue(idMapping.billingRegion);
					var billingCountry = paymentAppHander.getTagValue(idMapping.billingCountry);
					var billingZip = paymentAppHander.getTagValue(idMapping.billingZip);
					paymentAppHander.terminateIntervalId = window.setInterval('paymentAppHander.failPaymentInitAndSubmitForm()', paymentAppHander.terminateIntervalTime);
					collectPaxInfoRef.initForPaymentCache(creditcCardFrstName, creditcardLastName, phoneNumber, phoneType, emailAddress, profileCCID, paymentAppHander.skymilesNumber, creditCardNumber, creditCardType, ccID, creditCardExpireMonth, creditCardExpireYear, billingAddress1, billingAddress2, billingCity, billingRegion, billingCountry, billingZip);
					window.clearInterval(paymentAppHander.terminateIntervalId);
					var isPaymentInit = collectPaxInfoRef.getIsPaymentCacheInit();
					var paymentHfId = collectPaxInfoRef.getPaymentHfId();
					paymentAppHander.setTagValue(paymentAppHander.idMapping.initPaymentCache, isPaymentInit);
					paymentAppHander.setTagValue(paymentAppHander.idMapping.paymentHfId, paymentHfId);
					if (isOptedForInsurance && isPaymentInit) {
						paymentAppHander.terminateIntervalId = window.setInterval('paymentAppHander.failPaymentInitAndSubmitForm()', paymentAppHander.terminateIntervalTime);
						ntrMerchandisingPurchaseTripInsuranceIframeHandler.getJavascriptValue('insurancePurchaseHandler').doSendMerchOverride(paymentHfId);
						window.clearInterval(paymentAppHander.terminateIntervalId);
					}
				} else {
					paymentAppHander.setIsAllowPaxInfoContinue(false);
					if (!isHotelInformationEntered) {
						this.markHotelError();
					}
					if (!isCarInformationEntered) {
						this.markCarError();
					}
				}
			}
		} catch(e) { }
		return paymentAppHander.getIsAllowPaxInfoContinue();
	},
	failPaymentInitAndSubmitForm : function() {
		paymentAppHander.setTagValue(paymentAppHander.idMapping.initPaymentCache, false);
		paymentAppHander.setTagValue(paymentAppHander.idMapping.paymentHfId, "");
		window.clearInterval(paymentAppHander.terminateIntervalId);
		get(paymentAppHander.idMapping.formId).submit();
	},
	setNamesFromFormInput : function() {
		var idMapping = this.idMapping;
		var form = get(paymentAppHander.idMapping.formId);
		for (var i=0, j=this.passengerCount; i<j; i++) {
			var formField = idMapping.firstNameFieldPrefix + idMapping.preNameFieldIndexChar + i.toString() + idMapping.postNameFieldIndexChar;
			var formFieldvalue = exists(form[formField]) ? form[formField].value : "";
			if (formFieldvalue !== "") {
				this.passPassengerInformationToNTRFrame(i, true, formFieldvalue);
			}
			formField = idMapping.lastNameFieldPrefix + idMapping.preNameFieldIndexChar + i.toString() + idMapping.postNameFieldIndexChar;
			formFieldvalue = exists(form[formField]) ? form[formField].value : "";
			if (formFieldvalue !== "") {
				this.passPassengerInformationToNTRFrame(i, false, formFieldvalue);
			}
			formField = idMapping.skymilesFieldPrefix + idMapping.preNameFieldIndexChar + i.toString() + idMapping.postNameFieldIndexChar;
			formFieldvalue = exists(form[formField]) ? form[formField].value : "";
			if (formFieldvalue !== "") {
				this.passPassengerSkymilesNumberToNTRFrame(i, formFieldvalue);
			}
			
		}
	}
};

var omniturePurhchaseHandler = {
	isUsingTrackingObject : true,
	isTripAdditionsIframePresent : false,
	isInsuranceIframePresent : false,
	tripAdditionsOmnitureHandlerReference : null,
	insuranceOmnitureHandlerReference : null,
	maxDataReturnedCheckTime : 5000,
	maxSetHandlerTime : 1000,
	checkProperty : null,
	iframOmnitureHandlerReference : null,
	forceHasDataReturnedTrue : function() {
		if (exists(omniturePurhchaseHandler.iframOmnitureHandlerReference) && exists(omniturePurhchaseHandler.checkProperty)) {
			omniturePurhchaseHandler.iframOmnitureHandlerReference.setDataReturnedChecksIsDataSet(omniturePurhchaseHandler.checkProperty, true);
		}
	},
	hasDataReturned : function(iframOmnitureHandlerReference, checkProperty) {
		var isReturned = true;
		if (exists(iframOmnitureHandlerReference) && exists(checkProperty)) {
			this.iframOmnitureHandlerReference = iframOmnitureHandlerReference;
			this.checkProperty = checkProperty;
//			var timeoutId = setTimeout("omniturePurhchaseHandler.forceHasDataReturnedTrue()", this.maxDataReturnedCheckTime);
			try {
//				while(!iframOmnitureHandlerReference.isNeededDataSet(checkProperty)) {
//					isReturned = false;
//				}
				isReturned = true
			} catch(e) {}
			clearTimeout(timeoutId);
		}
		return isReturned;
	},
	setTripAdditionsOmnitureHandlerReference : function() {
		if (this.isTripAdditionsIframePresent && !exists(this.tripAdditionsOmnitureHandlerReference)) {
			this.tripAdditionsOmnitureHandlerReference = ntrMerchandisingPurchaseTripAdditionsIframeHandler.getJavascriptValue('omnitureHandler');
		}
	},
	exitSetInsuranceOmnitureHandlerReference : function() {
		omniturePurhchaseHandler.insuranceOmnitureHandlerReference = {};
	},
	setInsuranceOmnitureHandlerReference : function() {
//		var timeoutId = setTimeout("omniturePurhchaseHandler.exitSetInsuranceOmnitureHandlerReference()", this.maxSetHandlerTime);
		if (this.isInsuranceIframePresent && !exists(this.insuranceOmnitureHandlerReference)) {
//			while(!exists(this.insuranceOmnitureHandlerReference)) {
				this.insuranceOmnitureHandlerReference = ntrMerchandisingPurchaseTripInsuranceIframeHandler.getJavascriptValue('omnitureHandler');
//			}
		}
	},
	setHotelData : function(hotelPurchaseDWR) {
		try {
			if (this.isTripAdditionsIframePresent) {
				this.setTripAdditionsOmnitureHandlerReference();
				var omnitureHandlerReference = this.tripAdditionsOmnitureHandlerReference;
				if (exists(omnitureHandlerReference) && this.hasDataReturned(omnitureHandlerReference, omnitureHandlerReference.dataReturnedCheckProperties.hotelCheck)) {
					var hotelDetails = this.tripAdditionsOmnitureHandlerReference.getHotelPurchaseDetails();
					if (!this.isUsingTrackingObject) {
						OMTR_hotelName = hotelDetails.name;
						OMTR_hotelTotal = hotelDetails.totalCost;
						OMTR_hotelRooms = hotelDetails.roomQuantity;
					}
				}
			} else {
				var hotelCheckinDate = hotelPurchaseDWR.bookingResponse.hotelRules.dateFrom;
					hotelCheckinDate = hotelCheckinDate.split(' ')[0];
	
				var hotelCheckoutDate = hotelPurchaseDWR.bookingResponse.hotelRules.dateTo;
					hotelCheckoutDate = hotelCheckoutDate.split(' ')[0];
				
				var lengthOfStay = parent.dateDiff(hotelCheckinDate, hotelCheckoutDate);
				var noOfRooms = hotelPurchaseDWR.bookingResponse.roomType[0].noOfAdults;
				var i = 0;
				var roomTotal = 0.00;
				roomTotal = hotelPurchaseDWR.bookingResponse.roomType[i].totalCharge * noOfRooms;
				roomTotal = formatTo(roomTotal, 2, 1);
				s.linkTrackVars="events,products,purchaseID";
				s.events = "event57, event58, event59";
				var productString = ";HO-" + (parent.OMTR_destinationCity[0].toUpperCase()) + ";" + noOfRooms + ";" + roomTotal + ";|event57=" + noOfRooms + "|event59=" + roomTotal;
				var hotelPurchaseId = parent.OMTR_confirmatinNumber;
				s.linkTrackEvents = s.events;
				s.products = productString;
				s.purchaseID = hotelPurchaseId;
				void(s.tl(this,'o', 'Hotel Purchase'));
			}
		} catch(e) { 
			var display = "update";
		}
	},
	setCarData : function(carPurchaseDWR) {
		try {
			if (this.isTripAdditionsIframePresent) {
				this.setTripAdditionsOmnitureHandlerReference();
				var omnitureHandlerReference = this.tripAdditionsOmnitureHandlerReference;
				if (exists(omnitureHandlerReference) && this.hasDataReturned(omnitureHandlerReference, omnitureHandlerReference.dataReturnedCheckProperties.carCheck)) {
					var carDetails = omnitureHandlerReference.getCarPurchaseDetails();
					if (!this.isUsingTrackingObject) {
						OMTR_carCompanyName = carDetails.vendorCode;
						OMTR_carType = carDetails.carType;
						OMTR_carTotal = carDetails.totalCost;
						OMTR_carPickupDate = carDetails.pickupDate;
						OMTR_carReturnDate = carDetails.returnDate;
					}
				}
			} else {
				var carRentalCost = carPurchaseDWR.requestOptions.totalCharge; // cost of rental
					carRentalCost = formatTo(carRentalCost, 2, 1);
				var carPickupDate = new Date(carPurchaseDWR.requestOptions.options.carPickUpDateTime);
					//carPickupDate = carPickupDate.split(' ')[0];
	
				var carReturnDate = new Date(carPurchaseDWR.requestOptions.options.carDropOffDateTime);
					//carReturnDate = carReturnDate.split(' ')[0];
				
				var lengthOfRental = parent.dateDiff(carPickupDate, carReturnDate);
							
				s.linkTrackVars="events,products,purchaseID";
				s.events = "event57, event58, event59";
				var productString = ";CA-" + (parent.OMTR_destinationCity[0].toUpperCase()) + ";" + lengthOfRental + ";" + carRentalCost + ";|event57=" + lengthOfRental + "|event59=" + carRentalCost;
				var carPurchaseId = parent.OMTR_confirmatinNumber;
				s.linkTrackEvents = s.events;
				s.products = productString;
				s.purchaseID = carPurchaseId;
				void(s.tl(this,'o', 'Car Rental Purchase'));
			}
		} catch(e) {
			var display = "update";	
		}
	},
	setDSPData : function(dspPurchaseDWR) {
		try {
			if (this.isTripAdditionsIframePresent) {
				this.setTripAdditionsOmnitureHandlerReference();
				var omnitureHandlerReference = this.tripAdditionsOmnitureHandlerReference;
				if (exists(omnitureHandlerReference) && this.hasDataReturned(omnitureHandlerReference, omnitureHandlerReference.dataReturnedCheckProperties.dspCheck)) {
					var dspDetails = omnitureHandlerReference.getDSPPurchaseDetails();
					if (!this.isUsingTrackingObject) {
						OMTR_dspTotal = dspDetails.totalCost;
					}
				}
			} else {
				if (exists(dspPurchaseDWR)) {
				var dspCount = dspPurchaseDWR.length;
				var successCount = 0;
				var dspTotal = 0.00;
				var dspVar = "";
				var productString = ";AM-";
				for (var i=0; i<dspCount; i++) {
					if (dspPurchaseDWR[i].success) {
					 	if(i != 0){
							dspVar += ",";
						}
						dspVar += dspPurchaseDWR[i].confirmationNumber;
						successCount ++;
						dspTotal += dspPurchaseDWR[i].dsbooking.totalCharge;
					}
				}
				if (successCount != 0) {
					s.linkTrackVars="events,products,purchaseID";
					s.events = "event57, event58, event59";
					if (parent.OMTR_tripType =="multicity") {
						productString += (parent.OMTR_cityPairs.toUpperCase()); 
					} else {
						productString += (parent.OMTR_departureCity[0].toUpperCase()) + "-" + (parent.OMTR_destinationCity[0].toUpperCase()); 
					}
					dspTotal = formatTo(dspTotal, 2, 1); 
					productString += ";;" + dspTotal + ";|event57=" + dspCount + "|event59=" + dspTotal;
					var dspPurchaseId = parent.OMTR_confirmatinNumber;
					s.linkTrackEvents = s.events;
					s.products = productString;
					s.purchaseID = dspPurchaseId;
					void(s.tl(this,'o', 'Merchandising Services Purchase'));				
				} 
			}
			
			}
		} catch(e) {}
	},
	setInsuranceData : function(insurancePurchaseDWR) {
		try {
			if (this.isInsuranceIframePresent) {
				this.setInsuranceOmnitureHandlerReference();
				var omnitureHandlerReference = this.insuranceOmnitureHandlerReference;
				if (exists(omnitureHandlerReference) && this.hasDataReturned(omnitureHandlerReference, omnitureHandlerReference.dataReturnedCheckProperties.insuranceCheck)) {
					var insuranceDetails = omnitureHandlerReference.getInsurancePurchaseDetails();
					if (exists(insuranceDetails)) {
						if (!this.isUsingTrackingObject) {
							OMTR_insurance = insuranceDetails.isPurchased;
							OMTR_insuranceTotal = insuranceDetails.cost;
						}
					}
				}
			} else {
				var insuranceCost = insurancePurchaseDWR.totalPremiumPrice;
					insuranceCost = formatTo(insuranceCost, 2, 1);
				s.linkTrackVars="events,products,purchaseID";
				s.events = "event57, event58, event59";
				var productString = ";TI-";
				if (parent.OMTR_tripType =="multicity") {
					productString += (parent.OMTR_cityPairs.toUpperCase()); 
				} else {
					productString += (parent.OMTR_departureCity[0].toUpperCase()) + "-" + (parent.OMTR_destinationCity[0].toUpperCase()); 
				}
				productString += ";" + parent.OMTR_paxCount + ";" + insuranceCost + "|event57=1|event59=" + insuranceCost;
				var insurancePurchaseId = parent.OMTR_confirmatinNumber;
				s.linkTrackEvents = s.events;
				s.products = productString;
				s.purchaseID = insurancePurchaseId;
				void(s.tl(this,'o', 'Merchandising Insurance Purchase'));
					
			}
		} catch(e) { }
	},
	init : function(isUsingTrackingObject) {
		this.isUsingTrackingObject = isUsingTrackingObject;
		this.isTripAdditionsIframePresent = typeof(ntrMerchandisingPurchaseTripAdditionsIframeHandler ) !== "undefined";
		this.isInsuranceIframePresent = typeof(ntrMerchandisingPurchaseTripInsuranceIframeHandler ) !== "undefined";
		this.setTripAdditionsOmnitureHandlerReference();
		this.setInsuranceOmnitureHandlerReference();
	}
}

var updateTotalHandler = {
	numericCosts : {insurance : 0.0, dsp : 0.0, hotel : 0.0, car : 0.0, flight : 0.0, totalCost : 0.0, tripTotalsNTRCost : 0.0},
	formattedCosts : {insurance : "", dsp : "",	hotel : "", car : "", flight : "", totalCost : "", tripTotalsNTRCost : ""},
	properties : {insurance : "insurance", dsp : "dsp",	hotel : "hotel", car : "car", flight : "flight", totalCost : "totalCost", tripTotalsNTRCost : "tripTotalsNTRCost"},
	selectedItems : {insurance : false, dsp : false, hotel : false, car : false},
	populateWhich : "",
	adjustForCurrencyFlip : false,
	currencyCode : "",
	currencySymbol : "",
	zeroFormattedValue : "",
	populateWhichTypes : { booking : "bookingTripTotals" },
	idMapping : {
		booking : { formattedHotelCostTag : "hotelCost", formattedCarRentalCostTag : "carRentalCost", formattedDSPCostTag : "dspCost", formattedInsuranceTag : "insuranceAmount", formattedTotalCost : "amountDue", formattedNTRTripTotalsDSPCostForConversion : "tripTotalsDSPCost", formattedHeaderDSPCost : "headerTripAdditionTotals" }
	},
	init : function(populateWhich, currencyCode, currencySymbol) {
		this.populateWhich = populateWhich;
		this.currencyCode = currencyCode;
		this.currencySymbol = currencySymbol;
		this.zeroFormattedValue = mp_util.doDisable(this.currencySymbol + '0.00 (' + this.currencyCode + ')');
	},
	setCarData : function(formattedValue, numericValue, isSelected) {
		this.formattedCosts[this.properties.car] = formattedValue;
		this.numericCosts[this.properties.car] = numericValue;
		this.selectedItems[this.properties.car] = isSelected;
	},
	getCarCost : function(isReturnNumeric) {
		return isReturnNumeric ? parseFloat(this.numericCosts[this.properties.car]) : this.formattedCosts[this.properties.car];
	},
	getIsCarSelected : function() {
		return this.selectedItems[this.properties.car];
	},
	setHotelData : function(formattedValue, numericValue, isSelected) {
		this.formattedCosts[this.properties.hotel] = formattedValue;
		this.numericCosts[this.properties.hotel] = numericValue;
		this.selectedItems[this.properties.hotel] = isSelected;
	},
	getHotelCost : function(isReturnNumeric) {
		return isReturnNumeric ? this.numericCosts[this.properties.hotel] : this.formattedCosts[this.properties.hotel];
	},
	getIsHotelSelected : function() {
		return this.selectedItems[this.properties.hotel];
	},
	setDSPData : function(formattedValue, numericValue, isSelected) {
		this.formattedCosts[this.properties.dsp] = formattedValue;
		this.numericCosts[this.properties.dsp] = numericValue;
		this.selectedItems[this.properties.dsp] = isSelected;
	},
	getDSPCost : function(isReturnNumeric) {
		return isReturnNumeric ? this.numericCosts[this.properties.dsp] : this.formattedCosts[this.properties.dsp];
	},
	getIsDSPSelected : function() {
		return this.selectedItems[this.properties.dsp];
	},
	setInsuranceData : function(formattedValue, numericValue, isSelected) {
		this.formattedCosts[this.properties.insurance] = formattedValue;
		this.numericCosts[this.properties.insurance] = numericValue;
		this.selectedItems[this.properties.insurance] = isSelected;
	},
	getInsuranceCost : function(isReturnNumeric) {
		return isReturnNumeric ? this.numericCosts[this.properties.insurance] : this.formattedCosts[this.properties.insurance];
	},
	setFlightData : function(formattedValue, numericValue) {
		this.formattedCosts[this.properties.flight] = formattedValue;
		this.numericCosts[this.properties.flight] = numericValue;
	},
	getFlightCost : function(isReturnNumeric) {
		return isReturnNumeric ? this.numericCosts[this.properties.flight] : this.formattedCosts[this.properties.flight];
	},
	formatCurrency : function(value) {
		return value.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
			return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
		});
	},
	getInsuranceSelected : function() {
		return this.selectedItems[this.properties.insurance];
	},
	returnIdMapping : function() {
		var idMapping = this.idMapping;
		switch(this.populateWhich) {
			case this.populateWhichTypes.booking:
				return idMapping.booking;
		}
		return null;
	},
	getNTRTotal : function(isReturnNumeric) {
		var totalCost = 0.0;
		if (this.getIsCarSelected()) {
			totalCost += this.getCarCost(true);
		}
		if (this.getIsHotelSelected()) {
			totalCost += this.getHotelCost(true);
		}
		if (this.getIsDSPSelected()) {
			totalCost += this.getDSPCost(true);
		}
		return isReturnNumeric ? totalCost : mp_util.doDisable(this.formatCurrency("$" + formatTo(totalCost, 2, 1) + ' (USD)'));
	},
	setNTRTotal : function() {
		this.numericCosts[this.properties.tripTotalsNTRCost] = this.getNTRTotal(true);
		this.formattedCosts[this.properties.tripTotalsNTRCost] = this.getNTRTotal(false);
	},
	setTotalCost : function() {
		var totalCost = this.getFlightCost(true);
		if (!this.getAdjustForCurrencyFlip()) {
			totalCost += this.getNTRTotal(true);
		}
		if (this.getInsuranceSelected()) {
			totalCost += this.getInsuranceCost(true);
		}
		this.numericCosts[this.properties.totalCost] = totalCost;
		this.formattedCosts[this.properties.totalCost] = mp_util.doDisable(this.formatCurrency(this.currencySymbol + formatTo(this.numericCosts[this.properties.totalCost], 2, 1)) + ' (' + this.currencyCode + ')');
	},
	doPopulate : function() {
		var idMapping = this.returnIdMapping();
		this.setTotalCost();
		if (exists(idMapping)) {
			setInnerHTML(idMapping.formattedHotelCostTag, (this.getIsHotelSelected() ? this.getHotelCost(false) : this.zeroFormattedValue));
			setInnerHTML(idMapping.formattedCarRentalCostTag, (this.getIsCarSelected() ? this.getCarCost(false) : this.zeroFormattedValue));
			setInnerHTML(idMapping.formattedDSPCostTag, (this.getIsDSPSelected() ? this.getDSPCost(false) : this.zeroFormattedValue));
			setInnerHTML(idMapping.formattedInsuranceTag, (this.getInsuranceSelected() ? this.getInsuranceCost(false) : this.zeroFormattedValue));
			setInnerHTML(idMapping.formattedTotalCost, this.formattedCosts[this.properties.totalCost]);
			setInnerHTML(idMapping.formattedHeaderDSPCost, this.getNTRTotal(false));
			if (this.getAdjustForCurrencyFlip()) {
				setInnerHTML(idMapping.formattedNTRTripTotalsDSPCostForConversion, this.getNTRTotal(false));
			}
		}
	},
	setAdjustForCurrencyFlip : function(value) {
		this.adjustForCurrencyFlip = value;
	},
	getAdjustForCurrencyFlip : function() {
		return this.adjustForCurrencyFlip;
	}
}



<!-- End file /edgecache/js/core_apps/ntrMerchandisingTools.js -->


