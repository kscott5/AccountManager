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
define(['app/utilities'], function(utils) {	
	var Mail = function() {
		// page meta data
		this.title = "Account Manager: Mail";
		this.description = 'Account Manager Mail page. Self containing web app to help with...';
		this.keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Ruby on Rails, prototype, OO';
		this.app = utils.app;
				
		this.model = {};				
	}; 

	// Get the identifier for the view model
	Mail.prototype.getId = getId;
	function getId() {
		var id = { 
			libraryId: manager.library.value, 
			mailbox: 'inbox', // review IMAP rfc spec
			command: 'unseen', // review IMAP rfc spec 
			messageId: null,
			toString: function() {
				return 'id: {library: '+this.libraryId+', '+
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
		
		utils.logHelper.debug('Mail get id complete for ' + id );
		return id;
	}; // end getId
	
	Mail.prototype.isLoginRequired = isLoginRequired;
	function isLoginRequired() {
		return true;
	};
		
	Mail.prototype.loadModelData = loadModelData;
	function loadModelData() {
		var self = this;
		var promise = {};
		var id = getId();
		utils.logHelper.debug('Mail id: ' + id);
		
			promise = manager.library.imap.getMessages(id);
		
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
	}; //end loadModelData
			
	var viewModel =  new Mail();

	return viewModel; // NOW..
}); // end define Mail View Model