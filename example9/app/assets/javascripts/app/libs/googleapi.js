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
		WL.init(globals.windowslive.initConfig);
		this.name = 'GoogleApi';
		this.description = 'Google API for Gmail and Google Docs';
		this.isConnected = false;		
	};
	
	// Inherit from object
	GoogleApi.prototype = new Object();

	GoogleApi.prototype.login = login;
	function login() {
		utils.logHelper.error('GoogleApi login not implemented')
		return manager.library.isConnected;
	}; // end login

	GoogleApi.prototype.logout = logout;
	function logout() {
		utils.logHelper.error('GoogleApi logout not implemented')
		// Manager is called for consistency
		return !manager.library.isConnected;
	}; // end logout	

	GoogleApi.prototype.getUser = getUser;
	function getUser() {		
		var user = {};
		utils.logHelper.error('GoogleApi get user not implemented')
		return user;
	}; // end getUser
	
	// Windows Live API OneDrive
	// If this gets to large add to separate file
	//
	// http://msdn.microsoft.com/en-us/library/live/hh243648.aspx#folder
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
	function getTopLevel() {
		var results = [];
		
		utils.logHelper.error('GoogleApi get top level not implemented')
		
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