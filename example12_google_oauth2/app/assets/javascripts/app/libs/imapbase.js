define(['jqueryExtend', 'app/utilities'], function($, utils) {
	try {
		function IMAPBASE() {
		}; // end IMAPBASE
		
		IMAPBASE.prototype.instance = instance		
		function instance() {
			return new ImapInstance();
		};
		
		function ImapInstance() {
			var self = this;			
		};

		// Returns the all unread Outlook message using JSON
		//  mailbox: string for mailbox to review. INBOX (default)
		//  command: string or array of strings. ALL, SEEN, RECENT, UNSEEN (default)
		//
		// NOTE: Thought to use jsonp but felt it wasn't any need 
		// considering IMAP service is what I created. But you never know...
		ImapInstance.prototype.getMessages = getMessages;
		function getMessages(id) {
			var url = '/'+id.library+'/mailbox/'+id.mailbox+'/'+id.command;
			utils.logHelper.debug('IMAP getMessages('+id+')');
			
			if(id.messageId != null)
				return;

			var data = {
				server: id.server,
				port: id.port,
				email: id.email,
				token: id.token,
				authenticity_token: $('meta[name=csrf-token]').attr('content')
			};
			
			promise = {
				then: function(doneCallback, errorCallback) {	
					$.postJSON(url, data, function(response) {
						var results = createMessageResults([], response.error);

						if(response && response.length > 0) {
							for(var i=0; i<response.length; i++) {
								msg = createMessageFromResponse(id, response[i]);
								results.messages.push(msg);
							} // end for	
							
							utils.logHelper.debug('IMAP getMessages('+id+') done: '+results.messages.length+' emails');
							
							doneCallback(results);
						} else {		
							utils.logHelper.debug('IMAP getMessages('+id+') error');
							
							errorCallback(results);
						} // end if
					}); // end $.postJSON
				} // end then
			}; // end promise
			
			return promise;
		}; // end getMessages
		
		// Get single email message from server
		ImapInstance.prototype.getMessage = getMessage;
		function getMessage(id) {
			if(id.messageId == null)
				return null;
			
			var promise = {
				then: function(doneCallback, errorCallback) {							
					// REST call /{libraryId}/:name/view/:id
					var url = '/'+id.library+'/'+id.mailbox+'/view/'+id.messageId;
					utils.logHelper.debug('IMAP getMessage('+id+')');
					
					if(!id || !id.messageId) {
						errorCallback({viewMessages: false, message: undefined, error: 'Invalid parameter for get message'});
						return;
					}

					var data = {
						server: id.server,
						port: id.port,
						email: id.email,
						token: id.token,
						authenticity_token: $('meta[name=csrf-token]').attr('content')
					};

					$.postJSON(url, data, function(response) {
						var msg = createMessageFromResponse(id, response[0]); // message needs to be in an array
						var results = createMessageResults(msg, response.error);				
											
						if(!results.error) {
							utils.logHelper.debug('IMAP getMessage('+id+') done');
							doneCallback(results);
						} else {
							utils.logHelper.debug('IMAP getMessage('+id+') error');
							errorCallback(results);
						}
					}); // end $.postJSON
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
				// #mail/{libraryId}/:name/view/:messageid => ex. controller windowslive
				link: 'home/viewer#mail.viewer/'+id.library+'/'+id.mailbox+'/view/'+seqno,
				click: function() {
					var title = 'Account Manager Email: '+ this.link;
					manager.navigateToViewer(title, this.link);
					return false;
				}, // end click
				// TODO: Determine correct IMAP RFC body structure to use
				body:  attr['BODY[]'] || '' // (attr['BODY[]'])? window.atob(attr['BODY[]']) : ''
			}; // end msg
			
			return msg;
		}; // end createMessageFromResponse
		var imapBase = new IMAPBASE();
		
		return imapBase;
	} catch(e) {
		utils.logHelper.error('define(IMAPBASE) Error: ' + e);
	}
}); // end IMAP