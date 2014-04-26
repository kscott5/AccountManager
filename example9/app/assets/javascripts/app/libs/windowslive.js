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
	Returns: WindowsLive
*/
define([globals.windowslive.requireJS.path, 'jquery', 'app/utilities'], function(wl, $, utils) {
	// WindowsLive
	function WindowsLive() {		
		WL.init(globals.windowslive.initConfig);
		this.name = 'WindowsLive';
		this.description = 'Windows Live API for Outlook and OneDrive';
		this.isConnected = false;		
	};
	
	// Inherit from object
	WindowsLive.prototype = new Object();

	WindowsLive.prototype.login = login;
	function login() {
		// initialize
		WL.init(globals.windowslive.initConfig);
				
		WL.login(
			// scope is required but defaults to WL.init for values
		).then(
			function (success) {
				// Manager is global and the only way to 
				// update the isConnected property
				manager.library.isConnected = true;
			},
			function (failure)	{
			console.debug(failure);
				utils.logHelper.appMessage('Error signing in: ' + failure.error_description);
			} // end failure
		);		
		
		// Manager is called for consistency
		return manager.library.isConnected;
	}; // end login

	WindowsLive.prototype.logout = logout;
	function logout() {
		WL.logout()
			.then(
				function(success) {
					// Manager is global and the only way to 
					// update the isConnected property
					manager.library.isConnected = false;					
				},
				function(failure) {
					// DO NOTHING
				}
		); // end
		
		// Manager is called for consistency
		return !manager.library.isConnected;
	}; // end logout	

	WindowsLive.prototype.getUser = getUser;
	function getUser() {
		var promise = WL.api({
                path: "me",
                method: "GET"
            }).then(
                function (response) {
					this.user = {};
					user.name = response.name;
					user.first_name = response.first_name;
					user.last_name = response.last_name;
					user.email = response.emails.preferred;
                },
                function (responseFailed) {
					this.user = {};
                }
            );
			
		return promise.user;
	}; // end getUser
	
	// Windows Live API OneDrive
	// If this gets to large add to separate file
	//
	// http://msdn.microsoft.com/en-us/library/live/hh243648.aspx#folder
	function FoldersFiles() {
		//Add additional properties here...
		this.name = 'OneDrive';
		this.description = 'Windows Live - OneDrive';
	}; // end FoldersFiles

	FoldersFiles.prototype = new Object();
	
	// Get the top level OneDrive directory 
	//
	// Assumption: WL.api will construct the REST Url with
	//   the access_token...
	FoldersFiles.prototype.getTopLevel = getTopLevel;
	function getTopLevel() {
		var results = [];

		WL.api({
			path: 'me/skydrive/files', // Gets all folders, albums, files and photos
			method: 'GET'
		})
		.then(
			function(success) {
				var data = success.data;
				for(var i=0; i<data.length; i++) {
					var isParent = (data[i].type == 'folder') ||
								   (data[i].type == 'album');
								   
					// TODO: Move this structue to utilities if you plan to include
					// other library such Google Docs
					var rd = {
						id: data[i].id,
						path: data[i].path,
						name: data[i].name,	
						type: data[i].type,
						link: data[i].link,
						isParent: isParent							
					};
					
					results.push(rd);
				} // end for				
			}, // end success
			function(failure) {
				utils.logHelper.appMessage('Error getTopLevel', failure);
			} // end failure
		);	

		utils.logHelper.debug('Found: {0} results'.replace('{0}', results.length));

		return results;
	}; // end getTopLevel
	
	WindowsLive.prototype.foldersfiles = new FoldersFiles();
	
	var IMAP = function() {
		this.name = 'Outlook';
		this.description = 'Windows Live - Outlook';
	};
	IMAP.prototype = new Object();
	
	WindowsLive.prototype.imap = new IMAP();
	
	var windowslive = new  WindowsLive();
	return windowslive;
});