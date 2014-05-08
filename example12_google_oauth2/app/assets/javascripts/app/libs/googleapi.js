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
define([globals.googleapi.requireJS.path, 'jqueryExtend', 'app/libs/imapbase', 'app/utilities'], function(ga, $, imapbase, utils) {
	try {
		// GoogleApi
		// NOTE: Google Api executes its methods asynchronously.
		function GoogleApi() {
			var self = this;
			self.name = globals.googleapi.text;
			self.value = globals.googleapi.value;
			self.description = globals.googleapi.description

			self.imapLinkName = globals.googleapi.imapLinkName;
			self.folderLinkName = globals.googleapi.folderLinkName;

			self.imapServer = globals.googleapi.imapServer;
			self.imapPort = globals.googleapi.imapPort;
			
			self.imap = imapbase.instance();
			self.toString = function() {
				return '{' +
					'name: '+this.name+', '+
					'value: '+this.value+', '+
					'description: '+this.description+', '+
					'imapLinkName: '+this.imapLinkName+', '+
					'imapServer: '+this.imapServer+', '+
					'imapPort: '+this.imapPort+
					'}';				
			} // end toString			
		};

		// Get the user basic information 
		GoogleApi.prototype.getUser = getUser;
		function getUser() {
			utils.logHelper.debug('Google API get user');
			
			// Do we have a user?
			if(typeof __googleApiUser != 'undefined' || !__googleApiLoggedIn) {
				return __googleApiUser;
			}
			
			// Review the APIs under Google Developers Console
			// methods are asynchronous 
			gapi.client.load('plus', 'v1', function() {
				utils.logHelper.debug('Google api client executing get user asynchronously');
				
				var request = gapi.client.plus.people.get( {'userId' : 'me'} );
				request.execute( function(results) {
					if (results.error) {
					  utils.logHelper.appMessage(results.error);
					  return;
					}
					
					__googleApiUser = {
						fullname: results.displayName,
						email: results.email,
						token: gapi.auth.getToken(),
						toString: function() {
							return '{fullanme: '+this.fullname+', email: '+this.email+', token: '+this.token+'}';
						}
					};
					
					__googleApiLoggedIn = true;
					
					// Notify any observers
					$(manager.library).trigger(globals.LOGIN_COMPLETE_LISTENER, [__googleApiUser]);
				});
			});
		}; // end getUser
		
		// Add as method to prevent external changes
		GoogleApi.prototype.isLoggedIn = isLoggedIn;
		function isLoggedIn() {
			return __googleApiLoggedIn;
		}; // end isLoggedIn

		GoogleApi.prototype.login = login;
		function login(token) {
		
			// https://developers.google.com/+/web/api/javascript#gapiauthauthorizeparameters_callback
			
			// check results if available
			// if not available then call gapi.auth.authorize(globals.googleapi.oauth2Config, manager.library.login);
			// if available then call gapi.auth.setToken(globals.googleapi.value, results) 
			//    and call getUser()
			// your done? maybe....
			// 
			// NOTE: OAuth 2.0 Token Object
			//
			// The OAuth 2.0 token object represents the OAuth 2.0 token and any associated data. The properties of this object include:
			//
			// access_token - type: string
			// The OAuth 2.0 token. Only present in successful responses.
			// error - type: string
			// Details about the error. Only present in error responses.
			// expires_in - type: string
			// The duration, in seconds, the token is valid for. Only present in successful responses.
			// state - type: string (globals.googleapi.oauth2Config.scope)
			// The Google API scopes related to this token.
			utils.logHelper.debug('Google API login');
					// Notify any observers
					//$(manager.library).trigger(globals.LOGOUT_COMPLETE_LISTENER);

			if(!token.type) {
				gapi.auth.setToken(token);
			} else {				
				gapi.auth.authorize(globals.googleapi.oauth2Config, manager.library.login);
			}
		}; // end login

		GoogleApi.prototype.logout = logout;
		function logout() {
			utils.logHelper.debug('Google API logout will call login per documentation')
			
			// Google API uses the same callback function initiate with
			// the signin function. 
			//
			// __googleApiLoggedIn flag is update in login()
			//
			// https://developers.google.com/+/web/signin/sign-out
			gapi.auth.signOut();
		}; // end logout	

		// Google API Docs
		// If this gets to large add to separate file
		function FoldersFiles() {
		}; // end FoldersFiles
		
		// Get the top level Docs directory 
		//
		FoldersFiles.prototype.getTopLevel = getTopLevel;
		function getTopLevel(id) {
			utils.logHelper.debug('Google API get top level');
			
			var promise = {
				id: globals.googleapi.value,
				then: function(doneCallback, errorCallback) {
					var filter = { 
						folderId: id || 'root',
						sort: 'mimeType' // THIS DOESN'T WORK!!!
					};
					
					// Must tell Google API to load the Drive v2 api
					gapi.client.load('drive', 'v2', function() {					
						gapi.client.drive.children.list(filter).execute(function(results){
							if(results && results.items) {	
								// Required for first call to api. Its used to store data 
								// references only. There is NO META DATA PRESENT YET!!!!
								var dataArr = []; 
								
								// This items are unordered. It would be nice to include sort options
								// on call to api or utilize underscore.js sortedIndex function
								var data = results.items;					
								for(var i=0; i<data.length; i++) {
									// Reset filter with file id
									filter = { fileId: data[i].id};
									
									// This is an asynchronous call
									gapi.client.drive.files.get(filter).execute(function(result) {
										dataArr.push(getFileFromResult(result));
									}); // gapi.client.drive.files.get
								} // end for
								
								// Why? execution is async
								// Check if done...
								var secsToTimeout = 0;
								var interval = setInterval(function() {
									if(dataArr.length == data.length) {
										window.clearInterval(interval);
										doneCallback(dataArr);
										return;
									} else if(secsToTimeout++ > 15)
										window.clearInterval(interval);
										errorCallback({error: 'TIMED_OUT'});
								}, 5000);
								
							} else {
								errorCallback({error: 'NO_DATA'});
							}// end if
						}); // end gapi.client.drive.children.list
					}); // end gapi.client.load
				} // end then
			}; // end promise
			
			return promise;
		}; // end getTopLevel
		
		// Get file from results
		function getFileFromResult(result) {
			// Note: This is where you would negotiate with client to determine
			// which fields to use for each library and how they map to your
			// application

			// search end of string
			var isParent = result.mimeType.match(/.folder\b/) != null;
			var link = (!isParent)? result.alternateLink : '#folders/'.concat(result.id);
			
			var item = {
				id: result.id,
				path: result.alternateLink,  
				name: result.title,	
				type: result.mimeType,
				link: link,
				click: function() { 							
					manager.navigateToView(this.link); 
					return true;
				},
				isParent: isParent
			}; // end item
			
			return item;
		}; // end getFileFromResult
		
		GoogleApi.prototype.foldersfiles = new FoldersFiles();	
		GoogleApi.prototype.imap = imapbase.instance(globals.googleapi.value);
		
		var __googleApiLoggedIn = false;
		var __googleApiUser = undefined;
		
		var googleapi = new  GoogleApi();
		
		return googleapi;
	} catch(e) {
		utils.logHelper.error('define(GoogleApi) Error: ' + e);
	}
});