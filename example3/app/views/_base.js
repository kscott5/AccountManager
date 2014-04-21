/**
	Base javascript file 
*/
// Configures requireJS with global informaton
requirejs.config(global.require.config);

requirejs(['manager'], function(manager) {
	manager.logHelper.info("Made it to _base");	
});