/**
	Main entry point into Account Manager Application
	
	KEEP in /scripts folder to help hide /app/views folder.
	You could still see network traffic with good browser plugin.
*/
requirejs(globals.require.config, ['app/manager'], 
	function(manager) {
		manager.navigateToView();
});
