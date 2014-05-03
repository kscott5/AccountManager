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
	// GoogleApi
	// NOTE: Google Api executes its methods asynchronously.
	function GoogleApi() {		
		this.name = globals.googleapi.text;
		this.value = globals.googleapi.value;
		this.description = globals.googleapi.description

		this.imapLinkName = globals.googleapi.imapLinkName;
		this.folderLinkName = globals.googleapi.folderLinkName;
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
	function login(results) {
		utils.logHelper.debug('Google API login');
		//var authResults = arguments[0] || {};
		
		if(typeof results.status != 'undefined' && results.status.signed_in) {
			utils.logHelper.clear('');
			__googleApiLoggedIn = true;
			getUser(); // triggers login complete
			return;
		} // end status signed_in
		
		if(typeof results.error != 'undefined') {
			// https://developers.google.com/+/web/signin/sign-out
			if(results.error == 'user_signed_out') {
				manager.library.user = {};
				__googleApiLoggedIn = false;
				
				// Notify any observers
				$(manager.library).trigger(globals.LOGOUT_COMPLETE_LISTENER);
			} // end user_signed_out

			utils.logHelper.debug('Google login results error: ' + results.error);
			return;
		} // end error
		
		// Need to add callback first
		globals.googleapi.initConfig.callback = manager.library.login;
		gapi.auth.signIn(globals.googleapi.initConfig);
	
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
	
	var IMAP = function() {
	};

	IMAP.prototype.getMessage = getMessages;
	function getMessages(messageType) {
		utils.logHelper.appMessage('Google - Mail not implement');
		
		var promise = {
			then: function(doneCallback, errorCallback) {
				var msgs = [];
				
				doneCallback({viewMessages: true, messages: msgs});
				
				//errorCallback({viewMessages: true, messages: msgs, error: response});
			}
		};
		
		return promise;
	};

		// Get single email message from server
	IMAP.prototype.getMessage = getMessage;
	function getMessage() {
	
		var promise = {
			then: function(doneCallback, errorCallback) {							
				$.getJSON(url, function(response) {
					var msg = {};
					
					if(!response) {
						errorCallback({viewMessages: false, message: msg});
					} else {
						errorCallback({viewMessages: false, message: msg, error: response});
					}
				}); // end $.getJSON
			} // end then
		}; // end promise
		
		return promise;
	}; // end getMessage

	GoogleApi.prototype.foldersfiles = new FoldersFiles();	
	GoogleApi.prototype.imap = new IMAP();
	
	var __googleApiLoggedIn = false;
	var __googleApiUser = undefined;
	
	var googleapi = new  GoogleApi();
	
	return googleapi;
});