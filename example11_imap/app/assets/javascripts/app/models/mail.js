/**
	Defines a Mail View Model module for the Account Manager Application.
	Module contains handler for specific model and view relationships,
	and data access.
	Module has the following dependencies

		ID			Module
		--			----------------------------------
		utilities:	javascript library for general use
		
	Module Id: mail
	Returns: ViewModel 
*/
define(['jquery', 'app/utilities', 'app/models/modelbase'], function($, utils, modelbase) {	
	try {
		var title = "Account Manager: Mail";
		var description = 'Account Manager Mail page. Self containing web app to help with...';
		var keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Ruby on Rails, prototype, OO';
		
		var viewModel = modelbase.instance(title,description,keywords, true);
		
		// Get the identifier for the view model
		viewModel.getId = function getId() {
			var id = { 
				libraryId: manager.library.value, 
				mailbox: 'inbox', // review IMAP rfc spec
				command: 'unseen', // review IMAP rfc spec 
				messageId: null,
				toString: function() {
					return '{library: '+this.libraryId+', '+
						   'mailbox: '+this.mailbox+', '+
						   'command: '+this.command+', '+
						   'messageId: '+this.messageId+
						   '}';
				}};
			
			// This are the two formats that need parsing
			// home#mail
			// home/viewer#mail/{library}/{mailbox}/{mailboxName}/{id}
			var hashParts = document.location.hash.split('#');
			if(hashParts.length > 1) {
				mailParts = hashParts[1].split('/');
				if(mailParts.length == 5) {
					id.messageId = mailParts[4];
				}
			} // end if
			
			return id;
		}; // end getId
		
		viewModel.loadModelData = function loadModelData() {
			utils.logHelper.debug('Mail load model data');
			var self = viewModel;
			var promise = {};
			var id = self.getId();
			
			try {
				var promise = manager.library.imap.getMessages(id);
				
				promise.then(
					function(success) {
						self.model.data = success;
						
						// Notify any observers
						$(self).trigger(globals.VIEWMODEL_LOAD_COMPLETE_LISTENER, manager.toPlainObject(self));
					},
					function(error) {
						self.model.data = error;
						
						utils.logHelper.appMessage(error.error);
						
						// Notify any observers
						$(self).trigger(globals.VIEWMODEL_LOAD_COMPLETE_LISTENER, manager.toPlainObject(self));
					}
				);
			} catch(e) {
				throw new Error('Mail load model data promise error: ' + e);
			}
		}; //end loadModelData

		return viewModel; // NOW..
	} catch(e) {
		utils.logHelper.error('define(Mail) Error: '+e);
	}
}); // end define Mail View Model