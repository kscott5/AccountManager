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
		this.name = globals.windowslive.text;
		this.value = globals.windowslive.value;
		this.description = globals.windowslive.description
		
		this.imapLinkName = globals.windowslive.imapLinkName;
		this.folderLinkName = globals.windowslive.folderLinkName;
	};

	// Get the user basic information 
	WindowsLive.prototype.getUser = getUser;
	function getUser() {
		utils.logHelper.debug('WindowsLive get user');
		
		if(typeof __windowsLiveUser != 'undefined' || !__windowsLiveLoggedIn) {
			return  __windowsLiveUser;
		}
		
		// Must be call before other WL.{method} calls
		WL.init(globals.windowslive.initConfig);

		WL.api({
                path: "me",
                method: "GET"
        }).then(
			function (success) {			
				__windowsLiveUser = {
					fullname: success.name,
					email: success.emails.preferred,
					// Available values success.first_name, success.last_name
				};
				
				__windowsLiveLoggedIn = true;
				
				// Notify any observers
				$(manager.library).trigger(globals.LOGIN_COMPLETE_LISTENER, __windowsLiveUser);
			},
			function (failed) {
				// TODO: send admin message
			}
        );
	}; // end getUser

	// Add as method to prevent external changes
	WindowsLive.prototype.isLoggedIn = isLoggedIn;
	function isLoggedIn() {
		return __windowsLiveLoggedIn;
	};
	
	// Sign the current user into Windows Live
	WindowsLive.prototype.login = login;
	function login() {
		utils.logHelper.debug('WindowsLive login');
		// Must be call before other WL.{method} calls
		WL.init(globals.windowslive.initConfig);
		
		WL.login(
			// scope is required but defaults to WL.init for values
		).then(
			function (success) {
				utils.logHelper.clear('');
				__windowsLiveLoggedIn = true;				
				getUser(); // triggers login complete
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
		utils.logHelper.appMessage('Logging out - FIX THE DELAY: <span id="timer" name="timer" count="0"></span>');
		
		var interval = setInterval("eval(\"var count = parseInt($('#timer').attr('count'))+1; $('#timer').attr('count', count); $('#timer').html(count);\")", 1000);
		
		// Must be call before other WL.{method} calls
		WL.init(globals.windowslive.initConfig);
		
		// HUGE delay when execute this Promise, 10+ seconds
		WL.logout()
			.then(
				function(success) {
					utils.logHelper.debug('WindowsLive logout complete');
		
					__windowsLiveLoggedIn = false;
					manager.library.user = {};

					
					
					clearInterval(interval);
					
					// Notify any observers
					$(manager.library).trigger(globals.LOGOUT_COMPLETE_LISTENER);
				},
				function(failure) {
					// TODO: send admin message
				}
		); // end		
	}; // end logout	

	// Windows Live API OneDrive
	// If this gets to large add to separate file
	//
	// http://msdn.microsoft.com/en-us/library/live/hh243648.aspx#folder
	function FoldersFiles() {
	}; // end FoldersFiles

	// Get the top level OneDrive directory 
	// The WL.api executes async, so we need to 
	// provide load the viewModel with data
	FoldersFiles.prototype.getTopLevel = getTopLevel;
	function getTopLevel(viewModel) {
		utils.logHelper.debug('WindowsLive get top level folders and files');
		
		// Must be call before other WL.{method} calls
		WL.init(globals.windowslive.initConfig);

		var path = viewModel.getId() || 'me/skydrive';
		
		WL.api({
			path: path + '/files', // Gets all items associated with this path id
			method: 'GET'
		})
		.then(
			function(success) {
				dataArr = [];
				
				var data = success.data;
				for(var i=0; i<data.length; i++) {
					// Note: This is where you would negotiate with client to determine
					// which fields to use for each library and how they map to your
					// application
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
							// Required to allow folder traversal
							manager.navigateToView(this.link); 
							return true;
						},
						isParent: isParent
					};
					
					dataArr.push(item);
				} // end for
		
				// Add the data to the model
				viewModel.model.data = dataArr;
				
				// Notify any observers
				$(viewModel).trigger(globals.VIEWMODEL_LOAD_COMPLETE_LISTENER, manager.toPlainObject(viewModel));
			}, // end success
			function(failure) {
				utils.logHelper.appMessage('Error getTopLevel', failure);
			} // end failure
		);	
	}; // end getTopLevel

	var IMAP = function() {
	};

	IMAP.prototype.getMessage = getMessages;
	function getMessages() {
		utils.logHelper.appMessage('Windows Live - Outlook not implement');
	};
	
	WindowsLive.prototype.foldersfiles = new FoldersFiles();
	WindowsLive.prototype.imap = new IMAP();
	
	var __windowsLiveLoggedIn = false;
	var __windowsLiveUser = undefined;
	
	var windowslive = new  WindowsLive();
	
	return windowslive;
});
