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
		self.loginRequired = true;
		
		self.model = {
			description: manager.library.imap.description
		};
		
		// Observe change
		manager.addListener('library', 'changed', function() {
			utils.logHelper.debug('Mail recieved library changed event');
			self.model = {
				description: manager.library.imap.description,
			};
		});
	}; 
	
	Mail.prototype = new Object();
	Mail.prototype.loadModelData = loadModelData;
	function loadModelData() {		
		manager.library.imap.getMessage();
	}; //end loadModelData
			
	var viewModel =  new Mail();

	return viewModel; // NOW..
}); // end define Mail View Model
