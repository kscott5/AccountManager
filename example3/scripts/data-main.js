/**
	Main entry point into Account Manager Application
	
	KEEP in /scripts folder to help hide /app/views folder.
	You could still see network traffic with good browser plugin.
*/
// Configures requireJS with global informaton
requirejs.config(globals.require.config);

require(['jquery', 'manager', 'text!views/header.html', 'text!views/footer.html',
		'text!views/navigation.html', 'text!views/home.html'], 
	function($, manager, header, footer, navigation, content) {
		
		// Just load the module content 
		// into the html using jQuery...
		$("#header").html(header);
		$("#navigation").html(navigation);
		$("#footer").html(footer);
		$("#content").html(content);
		
		manager.navigateToView(); // RIGHT NOW...
});