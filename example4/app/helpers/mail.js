/**
	Mail javascript file 
*/

requirejs(globals.require.config,
	['app/manager'], function(manager) {
	manager.logHelper.info("Made it to mail.js");
});