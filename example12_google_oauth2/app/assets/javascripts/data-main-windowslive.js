/**
	Main entry point into Account Manager Application
	
	KEEP in /scripts folder to help hide /app/views folder.
	You could still see network traffic with good browser plugin.
	
	http://requirejs.org/docs/api.html#jsfiles
*/	
// NOTES: http://requirejs.org/docs/1.0/docs/api.html#jsfiles
//    If you want  to load some JavaScript files, use the require() API.
//    If there is already a require() in the page, you can use the requireJS()
//    to access the RequireJS API for the loading scripts
//
// This doesn't appear to apply in the main entry point... WHY????
requirejs(globals.require.config, ['app/manager'], function(mgr) {
	manager = mgr;
	manager.loadUserSelectLibrary(globals.windowslive.value, false /* DO NOT FORCE NAVIGATION */);
});