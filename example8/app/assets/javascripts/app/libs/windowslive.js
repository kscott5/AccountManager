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
	var LOG_IN_REQUIRED_ERROR = 'Login required';
	
	// jQyuery object
	var hdrSessionUserCtrl, hdrSessionStatusCtrl, isConnected;
	
	// WindowsLive
	function WindowsLive() {
		utils.logHelper.debug('Initialize WindowsLive: constructor');
		// initialize
		WL.init(globals.windowslive.initConfig);
		
		hdrSessionUserCtrl = $('#header #session #user');
		hdrSessionStatusCtrl = $('#header #session #status');
		
		isConnected = false;
	};
	
	// Inherit from object
	WindowsLive.prototype = new Object();
	
	// private
	function login() {
		utils.logHelper.debug('WL.login called');
		
		// initialize
		WL.init(globals.windowslive.initConfig);
				
		WL.login(
			// scope is required but defaults to WL.init for values
		).then(
			function (success) {
				isConnected = true;
				loginStatus();
			},
			function (failure)	{
				// failure = { error: '', error_description: '' }
				utils.logHelper.debug(failure.error_description);
				utils.logHelper.appMessage('Error signing in: ' + failure);
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
		if(!isConnected) {
			utils.logHelper.appMessage(LOG_IN_REQUIRED_ERROR);
			return;
		}
		
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
				utils.logHelper.appMessage('Error getMe: ', failure);				
			} 
		); 		
	};
	
	WindowsLive.prototype.isConnected = getIsConnected;
	function getIsConnected() {
		return isConnected;
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
						isConnected = true;
						hdrSessionStatusCtrl.html('Logout');
						hdrSessionStatusCtrl.bind('click', logout);
						break;
					
					case 'notConnected':
					case 'unknown':
					default:
						isConnected = false;
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
	//
	// http://msdn.microsoft.com/en-us/library/live/hh243648.aspx#folder
	function FoldersFiles() {
		//Add additional properties here...
	}; // end FoldersFiles

	FoldersFiles.prototype = new Object();
	
	// Get the top level OneDrive directory 
	//
	// Assumption: WL.api will construct the REST Url with
	//   the access_token...
	FoldersFiles.prototype.getTopLevel = getTopLevel;
	function getTopLevel() {
		utils.logHelper.debug('Getting Top Level OneDrive info');
		var results = [];

		WL.api({
			path: 'me/skydrive/files', // Gets all folders, albums, files and photos
			method: 'GET'
		})
		.then(
			function(success) {
				utils.logHelper.debug('Looping over OneDrive Info');
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
	
	var windowslive = new  WindowsLive();
	return windowslive;
});