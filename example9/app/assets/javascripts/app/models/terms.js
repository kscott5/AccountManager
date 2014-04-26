/**
	Defines a TermsViewModel module for the Account Manager Application.
	Module contains handler for specific model and view relationships,
	and data access.
	Module has the following dependencies
	
		ID			Module
		--			----------------------------------
		utilities:	javascript library for general use
		
	Returns: ViewModel
*/
define(['app/utilities'], function(utils) {	
	var TermsModel = function() {
		// page meta data
		this.title = 'Account Manager: terms';
		this.description = 'Account Manager terms page. Self containing web app to help with...';
		this.keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Ruby on Rails, prototype, OO';
		
		this.results = {};
		this.app = utils.app;
	}; 
	
	TermsModel.prototype = new Object();
	var TermsViewModel = function() {
		this.loginRequired = false;
		this.model = new TermsModel();
	};		
	TermsViewModel.prototype = new Object();
	
	TermsViewModel.prototype.loadModelData = loadModelData;
	function loadModelData() {
		this.model.results.data = {};
	} //end loadModelData
			
	// Required for use when binding to HTML elements.
	// It helps avoid the this keyword reference when
	// binding to HTML element events
	var viewModel =  new TermsViewModel();

	return viewModel; // NOW..
}); // end Terms View Model