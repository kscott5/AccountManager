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
	// NOTE: Microsoft executes its methods asynchronously.
	function WindowsLive() {		
		this.name = 'WindowsLive';
		this.description = 'Windows Live API for Outlook and OneDrive';
		this.isConnected = false;		
	};
	
	// Inherit from object
	WindowsLive.prototype = new Object();

	// Refresh the status of the 
	WindowsLive.prototype.refresh = refresh;
	function refresh() {		
	   utils.logHelper.debug('WindowsLive refresh');
	   
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
	
	// Sign the current user into Windows Live
	WindowsLive.prototype.login = login;
	function login() {
		utils.logHelper.debug('WindowsLive login');
		// Must be call before other WL.{method} calls
		WL.init(globals.windowslive.initConfig);
		
		utils.logHelper.appMessage('Attempting to sign you in...');
		WL.login(
			// scope is required but defaults to WL.init for values
		).then(
			function (success) {				
				utils.logHelper.clear('');
				// Manager is global and the only way to 
				// update the isConnected property				
				manager.library.isConnected = true;				
				manager.library.refresh();
				
				// Document.location.hash allows use to return
				// to the requested view when login was requested
				manager.navigateToView(document.location.hash); 
			},
			function (failure)	{
				console.debug(failure);
				utils.logHelper.appMessage('Sign-in attempt failed...');
			} // end failure
		);				
	}; // end login

	// Sign the current user out of Windows Live
	WindowsLive.prototype.logout = logout;
	function logout() {
		utils.logHelper.debug('WindowsLive logout');
				
		// Must be call before other WL.{method} calls
		WL.init(globals.windowslive.initConfig);

		// HUGE delay when execute this Promise, 10+ seconds
		WL.logout()
			.then(
				function(success) {
					utils.logHelper.debug('WindowsLive logout complete');
		
					// Manager is global and the only way to 
					// update the isConnected property
					manager.library.isConnected = false;
										
					manager.navigateToView();	// GO HOME...
				},
				function(failure) {
					// TODO: send admin message
				}
		); // end		
	}; // end logout	

	// Get the user basic information 
	WindowsLive.prototype.getUser = getUser;
	function getUser() {
		utils.logHelper.debug('WindowsLive get user');
		// Must be call before other WL.{method} calls
		WL.init(globals.windowslive.initConfig);

		WL.api({
                path: "me",
                method: "GET"
        }).then(
                function (success) {
					// Available values success.first_name, success.last_name
					
					$('#header #session #user').html(
						'Welcome back <span id=\"fullname\" name=\"fullname\">{0}</span>!'
						.replace('{0}', success.name|| success.emails.preferred));			
                },
                function (failed) {
					// TODO: send admin message
                }
        );
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
	// The WL.api executes async, so we need to 
	// provide load the viewModel with data
	FoldersFiles.prototype.getTopLevel = getTopLevel;
	function getTopLevel(viewModel) {
		utils.logHelper.debug('WindowsLive get top level folders and files');
		
		// Must be call before other WL.{method} calls
		WL.init(globals.windowslive.initConfig);

		var path = (viewModel && viewModel.pathId)? viewModel.pathId : 'me/skydrive';
		WL.api({
			path: path + '/files', // Gets all items associated with this path id
			method: 'GET'
		})
		.then(
			function(success) {
				dataArr = [];
				
				var data = success.data;
				for(var i=0; i<data.length; i++) {
					var isParent = (data[i].type == 'folder') ||
								   (data[i].type == 'album');
					
					var link = (!isParent)? data[i].link : '#folders/'.concat(data[i].id);
					
					var item = {
						id: data[i].id,
						path: data[i].path,
						name: data[i].name,	
						type: data[i].type,
						link: link,
						click: function() { 							
							manager.navigateToView(this.link); 
							return true;
						},
						isParent: isParent
					};
					
					dataArr.push(item);
				} // end for

				viewModel.model.data = dataArr;
				viewModel.asyncLoadComplete = true; // Must be set to void reload when calling navigateToView
				
				// Pass the data now that we have...
				manager.navigateToView(document.location.hash, viewModel);
			}, // end success
			function(failure) {
				utils.logHelper.appMessage('Error getTopLevel', failure);
			} // end failure
		);	
	}; // end getTopLevel
		
	WindowsLive.prototype.foldersfiles = new FoldersFiles();
	
	function IMAP() {
		this.name = 'Outlook';
		this.description = 'Windows Live - Outlook';
	};
	IMAP.prototype = new Object();
	
	WindowsLive.prototype.imap = new IMAP();
	
	var windowslive = new  WindowsLive();
	return windowslive;
});