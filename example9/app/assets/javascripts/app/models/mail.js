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
		
		this.loginRequired = true;
		
		this.model = {
			description: manager.library.imap.description
		};
		this.app = utils.app;		
	}; 
	
	Mail.prototype = new Object();
	Mail.prototype.loadModelData = loadModelData;
	function loadModelData() {		
		this.model = {};
	}; //end loadModelData
			
	var viewModel =  new Mail();

	return viewModel; // NOW..
}); // end define Mail View Model
