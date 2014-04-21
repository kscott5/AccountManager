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
define('app/libs/windowslive', [globals.windowslive.requireJS.path, 'jquery', 'app/utilities'], function($, utils) {
	// WindowsLive
	function WindowsLive() {
	};
	
	// Inherit from object
	WindowsLive.prototype = new Object();
	
	// Private method to display error
	function displayError(msgPrefix, errObj) {
		$('#errorInfo').html(msgPrefix + (errObj)? errObj.message: '');
	}; // end display Response Error

	// Call the WL.api routine directly
	WindowsLive.prototype.callWlApi = function(path, method, onSuccessCallback, onErrorCallback) {
		var initConfig = {
			logging: globals.windowslive.init.logging,
			client_id: globals.windowslive.init.client_id,
			redirect_uri: globals.windowslive.init.redirect_uri,
			scope: globals.widnowslive.init.scopes,
			response_type: globals.windowslive.init.response_type,			
			};
			
		// initialize
		WL.init(initConfig);
		
		WL.api({
			path: path,
			method: method
		}).then( 
			function (response) { onSuccessCallback(response); },
			function (response) { onErrorCallback(response);   }
		);		
	}; // end call WL.api directly
	
	// Invite the window's user to login
	// Accepts the following parameters:
	//
	//	scope: array of scope values to access from the WL (optional)
	//	
	WindowsLive.prototype.login = function() {		
		var initConfig = {
			logging: globals.windowslive.init.logging,
			client_id: globals.windowslive.init.client_id,
			redirect_uri: globals.windowslive.init.redirect_uri,
			scope: globals.windowslive.init.scopes,
			response_type: globals.windowslive.init.response_type,			
			};
			
		// initialize
		WL.init(initConfig);
		
		
		WL.login(
			//{scope: ['wl.signin', 'wl.basic', 'wl.birthday', 'wl.emails']}
		).then(
			function (response) {
			
				WL.api({
					path: 'me',
					method: 'GET'
				}).then(
					function (response) {
						utils.logHelper.info('Need to refresh page to update the header (Needs to show Logout)');
						utils.logHelper.info(response.first_name);
						this.apiResponse.firstName = response.first_name;
						this.apiResponse.lastName = response.last_name;
						this.apiResponse.preferredEmail = response.emails.preferred;

					},
					function (response) {
						displayError('Error calling API: ', response.error);
					} 
				);
			}, 
			function (response)
			{
				displayError('Error signing in: ' + response.error_description);
			}
		);		
	}; // end login

	WindowsLive.prototype.logout = function() {
		utils.logHelper.info('Need to refresh page to update the header (Needs to show Login)');
		WL.logout();
	}; // end logout
				
	// Windows Live API OneDrive
	// If this gets to large add to separate file
	WindowsLive.prototype.foldersfiles = (function(){
		function FoldersFiles() {
			//Add additional properties here...
		}; // end FoldersFiles

		FoldersFiles.prototype = new Object();
		
		FoldersFiles.prototype.downloadFileDigalog = function() {
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