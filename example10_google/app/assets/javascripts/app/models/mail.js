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
		var self = this;
		
		// page meta data
		self.title = "Account Manager: Mail";
		self.description = 'Account Manager Mail page. Self containing web app to help with...';
		self.keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Ruby on Rails, prototype, OO';
		self.app = utils.app;
				
		self.model = {};				
	}; 

	Mail.prototype.isLoginRequired = isLoginRequired;
	function isLoginRequired() {
		return true;
	};
		
	Mail.prototype.loadModelData = loadModelData;
	function loadModelData() {
	
		manager.library.imap.getMessage(
			// Notify observers 
			// NOTE: This should occur within getMessage IIF api asynchronous
			//$(this).trigger(globals.VIEWMODEL_LOAD_COMPLETE_LISTENER, manager.toPlainObject(this));
		);
		
	}; //end loadModelData
			
	var viewModel =  new Mail();

	return viewModel; // NOW..
}); // end define Mail View Model
