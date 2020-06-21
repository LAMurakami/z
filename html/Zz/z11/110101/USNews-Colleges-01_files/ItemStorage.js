ItemStorage = Class.create({
	
	//This class offers a very generalized and basic persistence mechanism: 
	//it manages a hash of items and stores a JSON-serialized version 
	//of that hash in a cookie.
	// It fires the following events: ItemStore:add, ItemStore:remove and ItemStore:error
	// Version 1.1
	/* 
	$> store = new ItemStorage('mycookie');
	$> store.addItem('thing', [1,2,3,4,5]);
	$> store.count();
	1
	$> store.getItem('thing');
	[1,2,3,4,5]
	$> store.removeItem('thing');
	$> store.count();
	0	
	*/
	
	initialize: function(cookieName, options) {
		/*
		* @param cookieName  the name of the cookie. If that cookie aleady exists, it's data will be loaded into the ItemStorage instance
		* @param options 	 overrides defaults, including max_items, which sets an upper bound on the number of items that can be stored in the 
		*					 hash (default is 5) and persist, which is the amount of time until the cookie expires (default is 24 hours).
		*/
		this.options = {
			'cookie_name': cookieName,
			'max_items': 5,
			'persist': 86400000 //86400000msec. = 24 hours
		};
		//override defaults:
		$H(options).each(function(option){
			this.options[option.key] = option.value;
		}, this); 
		
		try {	//make sure USN.cookies module is loaded.
			var cookies = $H(USN.Cookie.getAsObj());
		}
		catch(error) {
			(!Object.isUndefined(console) && console.log("Cookie module not loaded."));
			return;
		}
		var cookie = cookies.get(this.options.cookie_name);
		if (Object.isUndefined(cookie)) { //cookie does not exist yet, make one
			this.storedItems = $H();
		}
		else { //cookie exists, decodeURI and eval as JSON
			try {
				cookie = decodeURI(cookie);
				this.storedItems = $H(cookie.evalJSON());
			}
			catch(error) {
				(!Object.isUndefined(console) && console.log("Cookie value is not JSON."));
				return
			}
		}
	},
	saveToCookie: function() {
		// private method
		var cookieValue = encodeURI($H(this.storedItems).toJSON());
		var date = new Date();
		date.setTime(date.getTime() + this.options.persist);
		var expires = date.toString();
		var cookieString = new Template('#{cokie_name}=#{cookieValue}; expires=#{expires}; path=/');
		document.cookie = cookieString.evaluate({
			'cokie_name': this.options.cookie_name,
			'cookieValue': cookieValue, 
			'expires': expires});
	},
	getItem: function(id) {
		/* 	
		* @param id   key of value to get from the hash
		* @returns    value corresponding to key
		*/
            return this.storedItems.get(id);
        },

    addItem: function(id, obj) {
		/*    
		* @param id    key of value to store
		* @param obj   value to store
		*/
		if (this.storedItems.keys().include(id)) { 
			document.fire("ItemStore:error", {'error': "Item already added."});
		}
		else if (this.storedItems.keys().length == this.options.max_items) {
			document.fire("ItemStore:error", {'error': "Maximum number of allowed items is " + this.options.max_items + ". Please remove an item before adding another."});
		}
		else {
			this.storedItems.set(id, obj);
			this.saveToCookie();
			document.fire("ItemStore:add", {'message': "Item " + id + " added." });			
		}
	},
	removeItem: function(id) {
		// @param id    key of value to delete	
		this.storedItems.unset(id);
		this.saveToCookie();
		document.fire("ItemStore:remove", {'message': "Item " + id + " removed." });
	},
	
	count: function() {
		return this.storedItems.keys().length;
	}
});
