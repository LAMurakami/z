Manager.addMethods( {
	Cookie : new Module('Cookie', 'This module handles browser cookies')
});

USN.Cookie.getAsObj = function() {
	cookieObject = {}
	var cookies = document.cookie.split(";");
	$A(cookies).each( function(cookie) {
		var pair = cookie.split("=")
		if (pair.length == 2) {		cookieObject[pair[0].strip()] = pair[1].strip(); } //protects against badly formed cookies
	});
	return cookieObject
}
