/*
	Define custom module that extends the function of jQuery
*/
define(['jquery', 'jqueryUI'], function(jQuery, jQueryUI) {
	jQuery.extend({
		postJSON: function(url, data, callback) {
			return jQuery.post( url, data, callback, "json" );
		}
	});
	
	return jQuery;
}); // end Define jQuery extension