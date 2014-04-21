/**
	Home javascript file 
*/

requirejs(globals.require.config, ['app/utilities'], function(utils) {
	utils.logHelper.info("Made it to home.js");	
});