/**
	Defines a Register View Model module for the Account Manager Application.
	Module contains handler for specific model and view relationships,
	and data access.
	Module has the following dependencies

		ID			Module
		--			----------------------------------
		utilities:	javascript library for general use
		
	Module Id: register
	Returns: ViewModel
*/
define('model/register', ['app/utilities'], function(utils) {	
	var RegisterModel = function() {
		// page meta data
		this.title = "Account Manager: Register";
		this.description = 'Account Manager Registration page. Self containing web app to help with...';
		this.keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Nginx, prototype, OO';		
	};
	
	RegisterModel.prototype = new utils.objectHelper.newBaseModel();
	
	var RegisterViewModel = function() {
	}; 

	// Called during initialization of ViewModel
	function initCallback() {
		var self = arguments[0];
						
		self.model = new RegisterModel(self.config);
		
		self.model.results.data = {};
	} //end initCallback
			
	// Called during the saving of ViewModel
	function saveCallback() {
		var self = arguments[0];
		
		utils.logHelper.error('Register View Model Save Not Implemented');
	} // end saveCallback

	var RegisterViewModel = function() {
	};		

	RegisterViewModel.prototype = utils.objectHelper
		.newBaseViewModel(initCallback, saveCallback);
	
	var viewModel =  new RegisterViewModel();
	
	return viewModels; // NOW...
}); // end define Register View Model