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
		this.name = 'Google API';
		this.description = 'Google API for Gmail and Drive';
		this.isConnected = false;
	};
	
	// Inherit from object
	GoogleApi.prototype = new Object();

	// Refresh the status of the 
	GoogleApi.prototype.refresh = refresh;
	function refresh() {
		utils.logHelper.debug('Google API refresh');
		
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
		utils.logHelper.debug('Google API login');
		var authResults = arguments[0] || {};
		if(typeof authResults['status'] != 'undefined' && authResults['status']['signed_in']) {
			utils.logHelper.clear('');

			// Manager is global and the only way to 
			// update the isConnected property				
			manager.library.isConnected = true;				
			manager.library.refresh();
			
			// Document.location.hash allows use to return
			// to the requested view when login was requested
			manager.navigateToView(document.location.hash); 
		} else if(typeof authResults['error'] != 'undefined' || typeof authResults.message != 'undefined') {
			console.debug(authResults['error'] || authResults.message);
			utils.logHelper.appMessage('Sign-in attempt failed...');
		} else {
			// Need to add callback first
			globals.googleapi.initConfig.callback = manager.library.login;
			gapi.auth.signIn(globals.googleapi.initConfig);
		}
	}; // end login

	GoogleApi.prototype.logout = logout;
	function logout() {
		utils.logHelper.debug('Google API logout')
		
		// Google API uses the same callback function initiate with
		// the signin function...
		//
		// https://developers.google.com/+/web/signin/sign-out
		gapi.auth.signOut();
	}; // end logout	

	GoogleApi.prototype.getUser = getUser;
	function getUser() {
		// Review the APIs under Google Developers Console
		// methods are asynchronous 
		gapi.client.load('plus', 'v1', function() {
			
			var request = gapi.client.plus.people.get( {'userId' : 'me'} );
			request.execute( function(results) {
				if (results.error) {
				  utils.logHelper.appMessage(results.error);
				  return;
				}
				
				$('#header #session #user').html(
					'Welcome back <span id=\"fullname\" name=\"fullname\">{0}</span>!'
					.replace('{0}', results.displayName));					
			});
		});
	}; // end getUser
	
	// Google API Docs
	// If this gets to large add to separate file
	function FoldersFiles() {
		//Add additional properties here...
		this.name = 'Drive';
		this.description = 'Google API - Drive';		
	}; // end FoldersFiles

	FoldersFiles.prototype = new Object();
	
	// Get the top level Docs directory 
	//
	// Assumption: WL.api will construct the REST Url with
	//   the access_token...
	FoldersFiles.prototype.getTopLevel = getTopLevel;
	function getTopLevel(viewModel) {
		var results = [];
		
		utils.logHelper.error('Google API get top level not implemented')
		
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