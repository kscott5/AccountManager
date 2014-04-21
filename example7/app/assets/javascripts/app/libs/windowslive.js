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
define('app/libs/windowslive', ['/assets/libs/wl.debug.js', 'jquery', 'app/utilities'], function(wl, $, utils) {
	var initConfig = {
		logging: true,
		client_id : '0000000048117D67', 
		//redirect_uri : 'https://login.live.com/oauth20_desktop.srf', // Implicit
		//response_type : 'token', // Implicit
		
		redirect_uri : 'http://ksacctmgr.com/home/wlcbk', 
		response_type : "token", 
		scope : [ 'wl.signin', 'wl.basic', 'wl.emails', 'wl.skydrive', 'wl.imap'],
	};

	// jQyuery object
	var hdrSessionUserCtrl, hdrSessionStatusCtrl, errorInfoCtrl;
	
	// WindowsLive
	function WindowsLive() {
		utils.logHelper.debug('Initialize WindowsLive: constructor');
		// initialize
		WL.init(initConfig);
		
		hdrSessionUserCtrl = $('#header #session #user');
		hdrSessionStatusCtrl = $('#header #session #status');
		errorInfoCtrl = $('#errorInfo');
	};
	
	// Inherit from object
	WindowsLive.prototype = new Object();
	
	// Private method to display error
	function displayError(msgPrefix, errObj) {
		errorInfoCtrl.html(msgPrefix + (errObj)? errObj.message: '');
	}; // end display Response Error

	// Call the WL.api routine directly
	WindowsLive.prototype.callWlApi = callWlApi;
	function callWlApi(path, method, onSuccessCallback, onErrorCallback) {		
		WL.api({
			path: path,
			method: method
		}).then( 
			function (response) { onSuccessCallback(response); },
			function (response) { onErrorCallback(response);   }
		);		
	}; // end call WL.api directly

	
	// private
	function login() {
		utils.logHelper.debug('WL.login called');
		
		// initialize
		WL.init(initConfig);
				
		WL.login(
		).then(
			function (response) {
				loginStatus();
			},
			function (response)	{
				displayError('Error signing in: ' + response.error_description);
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
			function (response) {
				utils.logHelper.debug('getMe: Getting user basic information (succeeded)');
				var html = "Welcome back <span id='fullName' name='fullName'>{0} {1}</span>!" +
					   "<span id='email' name='email'>{2}</span>"	
					   .replace('{0}', response.first_name || '')
					   .replace('{1}', response.last_name || '')
					   .replace('{2}', response.emails.preferred); // use email on server side				
			    hdrSessionUserCtrl.html(html);
			},
			function (response) {
				displayError('Error calling API: ', response.error_description);				
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
			function(response) {				
				utils.logHelper.debug('Login Status response (async): ' + response.status);
				
				switch(response.status) {
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
		
		FoldersFiles.prototype.downloadFileDigalog = downloadFileDigalog;
		function downloadFileDigalog() {
			var wlfd = WL.fileDialog({
				mode: 'open',
				select: 'multi'
			}).then( 
				function(response) { // Success
					downloadData(response.data);
				},
				function(response) { // Failure
					displayError('Error with the file dialog: ', response.error);
				}
			); // end WL.fileDialog			
		}; // end downloadFileDialog
		
		// private
		function downloadData(data) {			
			// Loop over files first
			for(var i=0; i<data.files.length; i++) {
				WL.download({
					path: data.files[i].id
				}).then( function(response) {
					displayError('Error downloading file: ', response.error);
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