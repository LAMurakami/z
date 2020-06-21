/*Event.observe(window,'load', function(){
    var timeoutinterval = 12 * 3600 * 1000; //hrs * secs/hr * ms/s
	var cookiesEnabled = false;
	var seenAd = false;
	var stitial = new ItemStorage('stitial', {persist:timeoutinterval} );
	stitial.addItem('cookiesEnabled', true);
	if (document.cookie.match('stitial')) {
		cookiesEnabled = true;
	}
	seenAd = stitial.getItem('seenAdWithinHour');
	if(!cookiesEnabled || seenAd) {
		flash('visible');
		return;
	}
	flash('hidden');
	var frame = new Element('iframe', { 'src': 'http://www.usnews.com/special/welcome', 'marginheight': 0, 'marginwidth': 0 });
	var closeButton = new Element('a', { href:'javascript:closeStitial()' }).update('Skip This Ad &raquo;');
	var pageDimensions = $$('html')[0].getDimensions();
	var frame_holder = new Element('div', { 'id': 'interstitial','style':'width:' + pageDimensions.width + 'px; height:' + pageDimensions.height + 'px;' });
	frame_holder.appendChild(closeButton);
	frame_holder.appendChild(frame);
	
	document.body.appendChild(frame_holder);
	window.setTimeout(function(){ closeStitial(); }, 18000);
	stitial.addItem('seenAdWithinHour', true);
	
});

function closeStitial() {
	flash('visible');
	$('interstitial').remove();
}

function flash(action){ //Variable being passed should either be 'hidden' or 'visible'
	var objects = document.getElementsByTagName("object");
	for (i = 0; i < objects.length; i++) {
		objects[i].style.visibility = action;
	}
	var embeds = document.getElementsByTagName("embed");
	for (i = 0; i < embeds.length; i++) {
		embeds[i].style.visibility = action;
	}
}*/
