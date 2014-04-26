/**
	Defines a PrivacyViewModel module for the Account Manager Application.
	Module contains handler for specific model and view relationships,
	and data access.
	Module has the following dependencies
	
		ID			Module
		--			----------------------------------
		utilities:	javascript library for general use
		
	Returns: ViewModel
*/
define(['app/utilities'], function(utils) {	
	var PrivacyModel = function() {
		// page meta data
		this.title = 'Account Manager: privacy';
		this.description = 'Account Manager privacy page. Self containing web app to help with...';
		this.keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Ruby on Rails, prototype, OO';
		
		this.results = {};
		this.app = utils.app;
	}; 
	
	PrivacyModel.prototype = new Object();
	var PrivacyViewModel = function() {
		this.loginRequired = false;
		this.model = new PrivacyModel();
	};		
	PrivacyViewModel.prototype = new Object();
	
	PrivacyViewModel.prototype.loadModelData = loadModelData;
	function loadModelData() {
		this.model.results.data = {};
	} //end loadModelData
			
	// Required for use when binding to HTML elements.
	// It helps avoid the this keyword reference when
	// binding to HTML element events
	var viewModel =  new PrivacyViewModel();

	return viewModel; // NOW..
});// end Privacy View Model