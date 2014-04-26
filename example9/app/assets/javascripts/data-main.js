/**
	Main entry point into Account Manager Application
	
	KEEP in /scripts folder to help hide /app/views folder.
	You could still see network traffic with good browser plugin.
*/

// Initialize RequireJS with correct configuration, WHY reassign????
require = require.config(globals.require.config);

var manager = {};

// NOTES: http://requirejs.org/docs/1.0/docs/api.html#jsfiles
//    If you want  to load some JavaScript files, use the require() API.
//    If there is already a require() in the page, you can use the requireJS()
//    to access the RequireJS API for the loading scripts
//
// This doesn't appear to apply in the main entry point... WHY????
require(['app/manager'], function(mgr) {
	manager = mgr;
	manager.initialize();
});

