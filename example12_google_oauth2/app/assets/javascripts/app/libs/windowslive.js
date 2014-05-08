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

define([globals.windowslive.requireJS.path, 'jqueryExtend', 'app/libs/imapbase', 'app/utilities'], function(wl, $, imapbase, utils) {	
	try {
		// WindowsLive
		// NOTE: Microsoft executes its methods asynchronously.
		function WindowsLive() {
			var self = this;
			self.name = globals.windowslive.text;
			self.value = globals.windowslive.value;
			self.description = globals.windowslive.description
			
			self.imapLinkName = globals.windowslive.imapLinkName;
			self.folderLinkName = globals.windowslive.folderLinkName;
			
			self.imapServer = globals.windowslive.imapServer;
			self.imapPort = globals.windowslive.imapPort;
			self.smtpServer = globals.windowslive.smtpServer;
			self.smtpPort = globals.windowslive.smtpPort;

			self.imap = imapbase.instance();
			self.toString = function() {
				return '{' +
					'name: '+this.name+', '+
					'value: '+this.value+', '+
					'description: '+this.description+', '+
					'imapLinkName: '+this.imapLinkName+', '+
					'imapServer: '+this.imapServer+', '+
					'imapPort: '+this.imapPort+', '+
					'smtpServer: '+this.smtpServer+', '+
					'smtpPort: '+this.smtpPort+
					'}';				
			} // end toString
		};

		// Get the user basic information 
		WindowsLive.prototype.getUser = getUser;
		function getUser() {
			utils.logHelper.debug('WindowsLive get user');
			
			if(__windowsLiveUser != null) {
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
						token: WL.getSession().access_token,						
						toString: function() {
							return '{fullanme: '+this.fullname+', email: '+this.email+', token: '+this.token+'}';
						}
					};
					
					// Notify any observers
					$(manager.library).trigger(globals.LOGIN_COMPLETE_LISTENER, __windowsLiveUser);
				},
				function (failed) {
					// Notify any observers
					$(manager.library).trigger(globals.LOGIN_COMPLETE_LISTENER, __windowsLiveUser);
				}
			);
		}; // end getUser

		// Add as method to prevent external changes
		WindowsLive.prototype.isLoggedIn = isLoggedIn;
		function isLoggedIn() {
			WL.init(globals.windowslive.initConfig);
			
			// Removed call to get user
			
			return WL.getSession() != null;
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
			
			// Must be call before other WL.{method} calls
			WL.init(globals.windowslive.initConfig);
			
			// DO NOT USE THE .then() METHOD ON logout()
			// VERY POOR PERFORMANCE
			// THIS IS BETTER!!!!!
			WL.logout();
			
			__windowsLiveUser = null;
						
			// Notify any observers
			$(manager.library).trigger(globals.LOGOUT_COMPLETE_LISTENER);
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
		function getTopLevel(id) {
			utils.logHelper.debug('WindowsLive get top level folders and files');

			// Custom promise to format results for view
			var promise = {
				id: globals.windowslive.value,
				then: function(doneCallback, errorCallback) {
				
					// Must be call before other WL.{method} calls
					WL.init(globals.windowslive.initConfig);

					var path = id || 'me/skydrive';
					
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
					
							// Return success results to caller
							doneCallback(dataArr);						
						}, // end success
						function(failure) {
							utils.logHelper.appMessage('Error getTopLevel', failure);
							errorCallback(failure);
						} // end failure
					);	
				} // end then
			}; // end promise
			
			return promise;
		}; // end getTopLevel

			
		WindowsLive.prototype.foldersfiles = new FoldersFiles();
		
		var __windowsLiveUser = null;
		
		var windowslive = new  WindowsLive();
		
		return windowslive;
	} catch(e) {
		utils.logHelper.error('define(WindowsLive) Error: ' + e);
	}
});
