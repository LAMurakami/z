CollegeCompare09 = Class.create();
CollegeCompare09.prototype = {
	DISCIPLINE : document.location.href.match(/best-colleges\/([a-zA-Z\-]+)/)[1],
	COOKIE_PREFIX : "college_compare",
	PERSIST : 86400000, //86400000msec. = 24 hours
	
	initialize: function() {
		// first 4 lines used on compare page only
		var removeLinks = document.getElementsByClassName('remove');
		for (var i=0;i<removeLinks.length;i++) {
			removeLinks[i].observe('click', this.removeFromCookies.bindAsEventListener(null, this, true));
		}
		this.compareQueue = this.getCookieSchools();
		var currentIDs = this.compareQueue.keys();
		// Toggle .hover class for IE 6 on <div id="compare-list-container">
		var compareListContainer = $('compare-list-container');
		if (!compareListContainer) {
			return; //if nothing found, exit nicely.
		}
		compareListContainer.mouseover  = function() { $('compare-list-container').addClassName('hover'); }
		compareListContainer.mouseout =  function() { $('compare-list-container').removeClassName('hover'); }
		this.compareList = $('compare-list');
		if (this.compareQueue) {
			this.updateList();
		}
		this.compareForm = $('table_holder')
		this.compareForm.reset();
		$A(this.compareForm['compare.items:list']).each( function(input) {
			if (currentIDs.length != 0 && currentIDs.indexOf(input.value) != -1) {
				input.checked = true;	
			}
			if (input.observe) {
				input.observe('click', this.toggle.bindAsEventListener(null, this));
			}
			else {
				input.onclick = this.toggle.bindAsEventListener(null, this)
			}
		}, this);
		
		var submit = $$('.compareSubmit');
		for (var i=0; i<submit.length; i++) {
			submit[i].observe('click', this.submit.bindAsEventListener(null, this)); 
		}
	},


        mapDiscipline: function () {
                switch (this.DISCIPLINE) {
                        case 'top-business-schools':
                                return 'MBA';
                        case 'top-education-schools':
                                return 'EDU';
                        case 'top-engineering-schools':
                                return 'ENG';
                        case 'top-law-schools':
                                return 'LAW';
                        case 'top-medical-schools':
                                return 'MED';
                        default: 
                                return ''; 
                } 
        }, 

	getCookieSchools: function() {
		var cookieName = this.COOKIE_PREFIX + '_' + this.mapDiscipline();
		var cookies = $A(document.cookie.split(';'));
		try {
			grad_cookie = cookies.grep(RegExp(cookieName))[0].match(RegExp(cookieName + "=(.*)"))[1];
		}
		catch (e) {
			return $H({});
		}
		var JSON  = $H(grad_cookie.evalJSON());
		return (JSON) ? JSON : $H({});
	},
	
	setCookieSchools: function(schoolObject) {
	// {'02077': 'Massachusetts Institute of Technology (Cambridge, MA)', '02020': 'Stanford University (Stanford, CA)'}
		var cookieValue = $H(schoolObject).toJSON();
		var date = new Date();
		date.setTime(date.getTime() + this.PERSIST);
		var expires = date.toString();
		var cookieString = new Template('#{cokie_prefix}_#{discipline}=#{cookieValue}; expires=#{expires}; path=/');
		document.cookie = cookieString.evaluate({
			'cokie_prefix': this.COOKIE_PREFIX,
			'discipline': this.mapDiscipline(), 
			'cookieValue': cookieValue, 
			'expires': expires});
	},
	
	updateList: function() {
                if($('compare-list') == null) {
                        return;
                }
		this.compareList.innerHTML = "";
		if (this.compareQueue.keys().length == 0) {
			this.compareList.appendChild(new Element('li').update('Click on the checkbox by a school to add it to your compare list.'));
			return;
		}
		this.compareQueue.each(function(school) {
			var id = school.key
			var name = school.value
			var del = this.getDeleteElement(id);
			var li = new Element('li').update(name + "&nbsp;&nbsp;");
			li.appendChild(del);
			this.compareList.appendChild(li)
		}, this);	
	},
	
	updateInputs: function() {
		var currentIDs = this.compareQueue.keys();
		$A(this.compareForm['compare.items:list']).each( function(input) {
			if (currentIDs.length != 0 && currentIDs.indexOf(input.value) != -1) {
				input.checked = true;	
			}
			else {
				input.checked = false;
			}
		}, this);	
	
	},
	
	getDeleteElement: function(id) {
		var a = new Element('a', {'class': id, 'href': '#'}).update('remove');
		a.observe('click', this.removeFromList.bindAsEventListener(null, this, true));
		var span = new Element.wrap(a, 'span');
		span.insert(')');
		span.insert({'top': '('});
		return span;
	},
	//Event Handlers
	toggle: function(event, self) {
		var f;
		if (event.element) {
			f = (event.element().checked) ? self.addToList : self.removeFromList;
		}
		else { //branch for IE. 
			var el = (event.target)?event.target:event.srcElement;
			f = (el.checked) ? self.addToList : self.removeFromList;
		}
		f(event, self, false);
	},

	removeFromList: function(event, self, stopEvent) {
		if (stopEvent) { event.stop(); }
		var el;
		if (event.element) {
			el = event.element();
		}
		else { //branch for IE.
			el = (event.target)?event.target:event.srcElement;
		}
		var id = (el.readAttribute('class')) ? el.readAttribute('class') : el.readAttribute('value');
                if(typeof USN.MySchools != "undefined" && USN.MySchools.hasCCookie()) {
                        USN.MySchools._remove(id);
                }
		self.compareQueue.unset(id);
		self.setCookieSchools(self.compareQueue);
		self.updateList();
		self.updateInputs();
	},

	removeFromCookies: function(event, self, stopEvent) {
                Event.stop(event);
		if (stopEvent) { event.stop(); }
		var el;
		if (event.element) {
			el = event.element();
		}
		else { //branch for IE.
			el = (event.target)?event.target:event.srcElement;
		}
		var id = el.readAttribute('id');
                //if(typeof USN.MySchools != "undefined" && USN.MySchools.hasCCookie()) {
                //        USN.MySchools._remove(id);
                //}
                self.removeFromCookiesId(self, id);
	},

        removeFromCookiesId: function(self, id) {
		self.compareQueue.unset(id);
		self.setCookieSchools(self.compareQueue);
        },

        addToListId: function(id, self, ui_update) {
                // TODO: this code is identical to the second half of
                // addToList, so addToList should just call this func
		var idEl = $(id)
		var name = idEl.innerHTML
		var state = idEl.adjacent('address')[0].innerHTML;
                self.compareQueue.set(id, name + " (" + state + ")");
                if(ui_update) {
                        var idEl = $(id)
                        var name = idEl.innerHTML
                        var state = idEl.adjacent('address')[0].innerHTML;
                        self.setCookieSchools(self.compareQueue);
                        self.updateList();
                }
        },

	addToList: function(event, self) {
		if (self.compareQueue.keys().length == 20) {
			alert('You can compare no more than 20 schools at a time.');
			event.stop();
			return;
		}
		var id;
		if (event.element) {
			id = event.element().readAttribute('value');
		}
		else { //branch for IE.
			id = (event.target)?event.target:event.srcElement;
			id = $(id).readAttribute('value');
		}
		var idEl = $(id)
		var name = idEl.innerHTML
		var state = idEl.adjacent('address')[0].innerHTML;
                if(typeof USN.MySchools != "undefined" && USN.MySchools.hasCCookie()) {
                        USN.MySchools._add(id);
                }
		self.compareQueue.set(id, name + " (" + state + ")");
		self.setCookieSchools(self.compareQueue);
		self.updateList();
	},
	
	submit: function(event, self) {
		event.stop();
		var url = self.compareForm.readAttribute('action');
		url = url.replace(/@@redirector/, '');
		url += "items";
		self.compareQueue.keys().sort().each( function(id) {
			url += "+" + id
		});
		window.location = url;
	}
}

Event.observe(window, 'load', function() { GC = new CollegeCompare09(); });