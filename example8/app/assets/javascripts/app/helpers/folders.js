/**
	Base javascript file 
*/

//  Use requires if you need to load some
//  dependencies to do work. But you shouldn't 
//  have to.
requirejs(globals.require.config, ['jquery', 'app/manager'], 
	function($, manager) {

	manager.logHelper.info("TODO: Made it to folders");	
	
});