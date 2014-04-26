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
	var MailModel = function() {
		// page meta data
		this.title = "Account Manager: Mail";
		this.description = 'Account Manager Mail page. Self containing web app to help with...';
		this.keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Ruby on Rails, prototype, OO';
		
		this.results = {
			description: manager.library.imap.description
		};
		this.app = utils.app;		
	}; 
	
	MailModel.prototype = new Object();
	var MailViewModel = function() {
		this.loginRequired = true;
		this.model = new MailModel();
	};		
	MailViewModel.prototype = new Object();
	
	MailViewModel.prototype.loadModelData = loadModelData;
	function loadModelData() {		
		var data = {};
		
		this.model.results.data = data;
	} //end loadModelData
			
	// Required for use when binding to HTML elements.
	// It helps avoid the this keyword reference when
	// binding to HTML element events
	var viewModel =  new MailViewModel();

	return viewModel; // NOW..
}); // end define Mail View Model
