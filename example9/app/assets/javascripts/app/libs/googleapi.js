/**
	Defines a _baseViewModel module for the Account Manager Application.
	Module contains handler for specific model and view relationships,
	and data access.
	Module has the following dependencies
	
		ID			Module
		--			----------------------------------
		WL:			Windows Live API (URL)
		utilities:	javascript library for general use
	http://msdn.microsoft.com/en-us/library/live/hh826543.aspx#javascript
	Returns: GoogleApi
*/
define([globals.googleapi.requireJS.path, 'jquery', 'app/utilities'], function(ga, $, utils) {
	// Google
	function GoogleApi() {		
		this.name = 'GoogleApi';
		this.description = 'Google API for Gmail and Google Docs';
		this.isConnected = false;		
	};
	
	// Inherit from object
	GoogleApi.prototype = new Object();

	// Refresh the status of the 
	GoogleApi.prototype.refresh = refresh;
	function refresh() {
		utils.logHelper.debug('GoogleApi refresh');
		
		// Switch button status
		$('#header #session #user').html(''); // Clear welcoming message
		$('#header #session #status').html('Login');
		$('#header #session #status').bind('click', manager.library.login);
		
		if(manager.library.isConnected) {		
			// Switch button status
			manager.library.getUser(); // provide the welcoming message		
			$('#header #session #status').html('Logout');
			$('#header #session #status').bind('click', manager.library.logout);
		}
	};

	GoogleApi.prototype.login = login;
	function login() {
		utils.logHelper.error('GoogleApi login not implemented')

	}; // end login

	GoogleApi.prototype.logout = logout;
	function logout() {
		utils.logHelper.error('GoogleApi logout not implemented')

	}; // end logout	

	GoogleApi.prototype.getUser = getUser;
	function getUser() {		
		utils.logHelper.error('GoogleApi get user not implemented')

	}; // end getUser
	
	// Google API Docs
	// If this gets to large add to separate file
	function FoldersFiles() {
		//Add additional properties here...
		this.name = 'Docs';
		this.description = 'Google - Docs';
	}; // end FoldersFiles

	FoldersFiles.prototype = new Object();
	
	// Get the top level Docs directory 
	//
	// Assumption: WL.api will construct the REST Url with
	//   the access_token...
	FoldersFiles.prototype.getTopLevel = getTopLevel;
	function getTopLevel(viewModel) {
		var results = [];
		
		utils.logHelper.error('GoogleApi get top level not implemented')
		
		viewModel.model.data = dataArr;
		viewModel.asyncLoadComplete = true; // Must be set to void reload when calling navigateToView
				
		// Pass the data now that we have...
		manager.navigateToView(document.location.hash, viewModel);

		return results;
	}; // end getTopLevel
	
	GoogleApi.prototype.foldersfiles = new FoldersFiles();
	
	var IMAP = function() {
		this.name = 'GMail';
		this.description = 'Google - Mail';
	};
	IMAP.prototype = new Object();
	
	GoogleApi.prototype.imap = new IMAP();
	
	var googleapi = new  GoogleApi();
	return googleapi;
});