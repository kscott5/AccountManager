/**
	Navigation javascript file 
*/
//  Use requires if you need to load some
//  dependencies to do work. But you shouldn't 
//  have to.
requirejs(globals.require.config, 
	['jquery', 'app/manager'], 	function($, manager) {

	manager.logHelper.info("Made it to navigation.js");	
	
	$(".navigationItem").bind("click", function() {			
		manager.navigateToView($(this).attr('href'));
		return true;
	});
});

