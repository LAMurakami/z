var Manager = Class.create({
	VERSION: "2.0",
	
	initialize: function(debug) {
		this.debug = !!debug;
                this.debug = false;
                try{
			if (!Object.isUndefined(console)) {
				window.alert = console.log;
			}
                        else { 
                            alert('debug is false');
                            this.debug = false; 
                        }
		}
		catch (e) {
			this.debug = false;
		}
		this.modules =  [];
		this.contentLoaded = false;
		this.windowLoaded = false;
		
		Event.observe(window, 'load', function(context) { 
				context.windowLoaded = true;
			}.bind('', this) 
		);
		var siteTag = $$('meta').find( function(tag) { return tag.name == 'site'; });
		this.site = (Object.isUndefined(siteTag) || siteTag.name == "") ? 'Uncategorized' : siteTag.content
		var zoneTag = $$('meta').find( function(tag) { return tag.name == 'zone'; });
		this.zone = (Object.isUndefined(zoneTag) || zoneTag.name == "") ? 'Uncategorized' : zoneTag.content
	},
	/*************** PRIVATE FUNCTIONS *****************************************/	
	_set: function(event, context, property, value) {
		context[property] = value;
		if (context.debug) { alert(property + ' is ' + value); }
	},

	
	_writeModule: function(context, moduleName) {
		context.modules.push(moduleName)
		var includes = {
				ads: "ads",
				printing: "print",
				socialBookmarking: "shareLinks",
				striping: "stripe",
				tabs: "tabs",
				slider: "slide",
				effects: "effects",
				analytics: "analytics", 
				analyticsExtensions: "analyticsCustom",
				windows: "window",
				technorati: "technorati",
				gallery: 'ibox'
			}
		if (includes[moduleName]){ //handle old-style module includes
			document.write('<script type="text/javascript" src="http://www.usnews.com/usnews/v3/scripts/' + includes[moduleName] +'.js"></script>');
		}
		else {
			document.write('<script type="text/javascript" src="http://static.usnews.com/scripts/' + moduleName + '.js"></script>');
		}
		return moduleName;
	},
	/*************** PUBLIC FUNCTIONS *****************************************/
	load: function(modules) {
		var options = (arguments[1])? arguments[1] : {};
		var isExternal = options['type'] === 'external';
		
		if (typeof(modules) == typeof("")) {
			modules = modules.split(', ');
		}
		if (this.windowLoaded) {
			//#FIXME: This should raise an exception.
			throw 'HTML document already loaded, cannot load ' + modules.join(", ") + ' module(s).';
			return false;
		}
		if (isExternal) {
			for (var i = 0; i < modules.length; i++) {
				modules[i] = "lib/" + modules[i];
			}
		}
		$A(modules).each( this._writeModule.bind('', this) )
	},
	
	onLoad: Event.observe.curry(window, 'load')
	
});

var Module = Class.create({
	
	IS_MODULE: true,
	
	initialize: function(name, description) {
		this.name = name;
		if (!Object.isUndefined(description)) {
			//description is an optional argument
			this.description = description;
		}
		// Automagically creates a DOM element method make{Module Name} for this module.
		// The first argument of this method is the (string) name of the module method 
		// being called on an DOM element. Further arguments are passed to the module method itself.
		var elementObject = {}
		elementObject['make' + this.name] = this.make.bind('', this);
		Element.addMethods(elementObject);
	},
	_safeDOMstring: function(string) {
		//Convinience function: fix DOM node names
		return string.toLowerCase().strip();
	},

	_checkElement: function(DO, name) {
		//Convinience function: verifies that a DOM object is a particular tag type
		// returns TRUE if DOM object DO is an instance of tag tagName.
		//>>>_checkElement(document.getElementsByTagName('p')[0], 'p')
		//True
		return (this._safeDOMstring(DO.nodeName) == name)
	},
	/*************** PUBLIC FUNCTIONS *****************************************/
	
	make: function(context, element, method, optArg) {
		if (Object.isUndefined(context[method])) {
			//#FIXME: This should raise an exception.			
			alert('the method ' +  method + ' is not available in this module. Module description: ' + context.description);
		}
		return context[method](context, element, optArg);
	}


});