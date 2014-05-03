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
	function getId() {
		var hashParts = document.location.hash.replace("#",'').split('/');
		if(hashParts > 1) {
			// Id for library message
			return { libraryId: hashParts[1], messageId: hashParts[2] };
		}
		
		// Get library messages
		return { libraryId: manager.library.value, messageId: ''};
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
		
		if(!id.messageId) {		
			promise = manager.library.imap.getMessages();
		} else {
			promise = manager.library.imap.getMessage();
		}
		
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