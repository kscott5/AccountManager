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
define('app/libs/windowslive', [globals.windowslive.requireJS.path, 'jquery', 'app/utilities'], function(wl, $, utils) {
	// jQyuery object
	var hdrSessionUserCtrl, hdrSessionStatusCtrl, errorInfoCtrl;
	
	// WindowsLive
	function WindowsLive() {
		utils.logHelper.debug('Initialize WindowsLive: constructor');
		// initialize
		WL.init(globals.windowslive.initConfig);
		
		hdrSessionUserCtrl = $('#header #session #user');
		hdrSessionStatusCtrl = $('#header #session #status');
		errorInfoCtrl = $('#errorInfo');
	};
	
	// Inherit from object
	WindowsLive.prototype = new Object();
	
	// Private method to display error
	function displayError(msgPrefix, errObj) {
		var msg = msgPrefix + ('undefined' !== typeof errObj)? 
				errObj.error_description: '';
		
		utils.logHelper.error(msg);
		errorInfoCtrl.html(msg);
	}; // end display Response Error
	
	// private
	function login() {
		utils.logHelper.debug('WL.login called');
		
		// initialize
		WL.init(globals.windowslive.initConfig);
				
		WL.login(
		).then(
			function (success) {
				loginStatus();
			},
			function (failure)	{
				displayError('Error signing in: ' + failure);
			} // end failure
		);
	}; // end login

	// private
	function logout() {	
		utils.logHelper.debug('Logging out');
		
		WL.logout();
		loginStatus();
	}; // end logout

	// private
	function getMe() {
		utils.logHelper.debug('getMe: Getting user basic information');		
		hdrSessionUserCtrl.html('');

		WL.api({
				path: 'me',
				method: 'GET'
			})
		.then(
			function (success) {
				utils.logHelper.debug('getMe: Getting user basic information (succeeded)');
				var html = "Welcome back <span id='fullName' name='fullName'>{0} {1}</span>!" +
					   "<span id='email' name='email'>{2}</span>"	
					   .replace('{0}', success.first_name || '')
					   .replace('{1}', success.last_name || '')
					   .replace('{2}', success.emails.preferred); // use email on server side				
			    hdrSessionUserCtrl.html(html);
			},
			function (failure) {
				displayError('Error getMe: ', failure);				
			} 
		); 		
	};
	
	WindowsLive.prototype.initialize = initialize;
	function initialize() {
		loginStatus();
	}; // end initialize
	
	WindowsLive.prototype.loginStatus = loginStatus;
	function loginStatus() {
		utils.logHelper.debug('Login Status');
		
		WL.getLoginStatus( 
			function(success) {				
				utils.logHelper.debug('Login Status response (async): ' + success.status);
				
				switch(success.status) {
					case 'connected': 					
						hdrSessionStatusCtrl.html('Logout');
						hdrSessionStatusCtrl.bind('click', logout);
						break;
					
					case 'notConnected':
					case 'unknown':
					default:
						hdrSessionStatusCtrl.html('Login');
						hdrSessionStatusCtrl.bind('click', login);			
						break;
						
				} // end switch	

				getMe();
			},
			true // Force library to call server
		);
	}; // end loginStatus
	
	// Windows Live API OneDrive
	// If this gets to large add to separate file
	WindowsLive.prototype.foldersfiles = (function(){
		function FoldersFiles() {
			//Add additional properties here...
		}; // end FoldersFiles

		FoldersFiles.prototype = new Object();
		
		// Get the top level OneDrive directory 
		//
		// Assumption: WL.api will construct the REST Url with
		//   the access_token...
		FolderFiles.prototype.getTopLevel = getTopLevel;
		function getTopLevel() {
			utils.logHelper.debug('Getting Top Level OneDrive info');
			WL.api({
				path: 'me/skydrive', 
				method: 'GET',
				body: {}, // NOTHING
			})
			.then(
				function(success) {
					utils.logHelper.debug('Looping over OneDrive Info');
				}, // end success
				function(failure) {
					displayError('Error getTopLevel', failure);
				}, // end failure
			);
		};
		
		FoldersFiles.prototype.downloadFileDigalog = downloadFileDigalog;
		function downloadFileDigalog() {
			var wlfd = WL.fileDialog({
				mode: 'open',
				select: 'multi'
			}).then( 
				function(success) { // Success
					downloadData(success.data);
				},
				function(failure) { // Failure
					displayError('Error with the file dialog: ', failure);
				}
			); // end WL.fileDialog			
		}; // end downloadFileDialog
		
		// private
		function downloadData(data) {			
			// Loop over files first
			for(var i=0; i<data.files.length; i++) {
				WL.download({
					path: data.files[i].id
				}).then( function(failure) {
					displayError('Error downloading file: ', failure);
				});
			} // end for
			
			// Loop over folders now..
			for(var i=0; i<data.folders.length; i++) {
				// Recursive call to self
				downloadData(data.folders[i]);	
			} // end for
		}; //end download data
		
		return new FoldersFiles();
	}); // end folders and files
	
	var windowslive = new  WindowsLive();
	return windowslive;
});