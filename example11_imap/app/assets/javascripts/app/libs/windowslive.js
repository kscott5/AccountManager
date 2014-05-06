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
					// Available values success.first_name, success.last_name
					toString: function() {
						return 'user {fullanme: '+this.fullname+', email: '+this.email+'}';
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
		var isLoggedIn = WL.getSession() != null;
		
		if(isLoggedIn && __windowsLiveUser == null) {
			manager.library.getUser();
		}
		
		return isLoggedIn;
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
		utils.logHelper.appMessage('Logging out - FIX THE DELAY: <span id="timer" name="timer" count="0"></span>');
		
		var interval = setInterval("eval(\"var count = parseInt($('#timer').attr('count'))+1; $('#timer').attr('count', count); $('#timer').html(count);\")", 1000);
		
		// Must be call before other WL.{method} calls
		WL.init(globals.windowslive.initConfig);
		
		// HUGE delay when execute this Promise, 10+ seconds
		WL.logout()
			.then(
				function(success) {
					utils.logHelper.debug('WindowsLive logout complete');
		
					__windowsLiveUser = null;
					
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

	var IMAP = function() {
		// NOTE: Windows Live javascript library doesn't support Outlook IMAP
		//       We must implement our own REST api to provide a basic 
		//       feature set for list, read and send new message(s)
	};

	// Returns the all unread Outlook message using JSON
	//  mailbox: string for mailbox to review. INBOX (default)
	//  command: string or array of strings. ALL, SEEN, RECENT, UNSEEN (default)
	//
	// NOTE: Thought to use jsonp but felt it wasn't any need 
	// considering IMAP service is what I created. But you never know...
	IMAP.prototype.getMessages = getMessages;
	function getMessages(id) {
		utils.logHelper.debug('WindowsLive getMessages({'+id.mailbox+','+id.command+'})');
		var url = '/'+globals.windowslive.value+'/mailbox/'+id.mailbox+'/'+id.command;
		
		if(id.messageId != null)
			return;
			
		promise = {
			id: id,
			then: function(doneCallback, errorCallback) {	
				$.getJSON(url, function(response) {
					var results = createMessageResults([], response.error);

					if(response && response.length > 0) {
						for(var i=0; i<response.length; i++) {
							msg = createMessageFromResponse(id, response[i]);
							results.messages.push(msg);
						} // end for	
						
						utils.logHelper.debug('WindowsLive getMessages done: '+results.messages.length+' emails');
						
						doneCallback(results);
					} else {		
						utils.logHelper.debug('WindowsLive getMessages error: '+results);
						
						errorCallback(results);
					} // end if
				}); // end $.getJSON
			} // end then
		}; // end promise
		
		return promise;
	}; // end getMessages
	
	// Get single email message from server
	IMAP.prototype.getMessage = getMessage;
	function getMessage(id) {
		if(id.messageId == null)
			return null;
			
		utils.logHelper.debug('WindowsLive get message');
		var promise = {
			then: function(doneCallback, errorCallback) {							
		
				if(!id || !id.messageId || id.libraryId != globals.windowslive.value) {
					utils.logHelper.debug('WindowsLive get message id: ' + id);
					errorCallback({viewMessages: false, message: undefined, error: 'Invalid parameter for get message'});
					return;
				}

				// REST call /windowslive/:name/view/:id
				var url = '/'+globals.windowslive.value+'/'+id.mailbox+'/view/'+id.messageId;
				utils.logHelper.debug('Windows Live get message url ' + url);
				
				$.getJSON(url, function(response) {
					var msg = createMessageFromResponse(id, response[0]); // message needs to be in an array
					var results = createMessageResults(msg, response.error);				
										
					if(!results.error) {
						doneCallback(results);
					} else {					
						errorCallback(results);
					}
				}); // end $.getJSON
			} // end then
		}; // end promise
		
		return promise;
	}; // end getMessage

	// Package the results for view binding
	function createMessageResults(data, error) {
		var results = {
			error: (typeof error == 'undefined')? null: error
		};
		
		if($.isArray(data)) {
			results.messages = data;
		} else {
			results.message = data;
		}

		return results;
	}; // end createMessageResults
	
	// Create a hash map of message from the server response
	function createMessageFromResponse(id, response) {
		if(!response || !response.attr) return {};
		
		var seqno = response.seqno;
		var attr = response.attr;
		var date = new Date(attr.ENVELOPE.date);
		var msg = {
			senderName: attr.ENVELOPE.sender[0].name,
			senderEmail: attr.ENVELOPE.sender[0].mailbox+'@'+
						 attr.ENVELOPE.sender[0].host,
			subject: attr.ENVELOPE.subject,
			date: date.toDateString(),
			id: attr.ENVELOPE.message_id,
			
			// controller = home, action: viewer 
			// #mail/{controller}/:name/view/:messageid => ex. controller windowslive
			link: 'home/viewer#mail.viewer/'+globals.windowslive.value+'/'+id.mailbox+'/view/'+seqno,
			click: function() {
				var title = 'Account Manager EMail: '+ this.link;
				manager.navigateToViewer(title, this.link);
				return false;
			}, // end click
			body: attr['BODY[]'] || ''
		}; // end msg
		
		return msg;
	}; // end createMessageFromResponse
		
	WindowsLive.prototype.foldersfiles = new FoldersFiles();
	WindowsLive.prototype.imap = new IMAP();

	var __windowsLiveUser = null;
	
	var windowslive = new  WindowsLive();
	
	return windowslive;
});
