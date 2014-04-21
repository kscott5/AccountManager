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
define('model/mail', ['app/utilities'], function(utils) {	
	var MailModel = function() {
		// page meta data
		this.title = "Account Manager: Mail";
		this.description = 'Account Manager Mail page. Self containing web app to help with...';
		this.keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Nginx, prototype, OO';
	}; 
	
	MailModel.prototype = utils.objectHelper.newBaseModel();
	
	// Called during initialization of ViewModel
	function initCallback() {
		var self = arguments[0];
						
		self.model = new MailModel(self.config);
		
		self.model.results.data = {};
	} //end initCallback
			
	// Called during the saving of ViewModel
	function saveCallback() {
		var self = arguments[0];
		
		utils.logHelper.error('Mail View Model Save Not Implemented');
	} // end saveCallback

	var MailViewModel = function() {
	};		

	MailViewModel.prototype = utils.objectHelper
		.newBaseViewModel(initCallback, saveCallback);
	
	var viewModel =  new MailViewModel();

	return viewModel; // NOW..
}); // end define Mail View Model
