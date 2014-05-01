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
	var Terms = function() {
		// page meta data
		this.title = 'Account Manager: terms';
		this.description = 'Account Manager terms page. Self containing web app to help with...';
		this.keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Ruby on Rails, prototype, OO';
		
		this.model = {};
		this.app = utils.app;
	}; 
	
	Terms.prototype.isLoginRequired = isLoginRequired;
	function isLoginRequired() {
		return false;
	};
	
	Terms.prototype.loadModelData = loadModelData;
	function loadModelData() {
		this.model = {};
		
		// Notify observers
		$(this).trigger(globals.VIEWMODEL_LOAD_COMPLETE_LISTENER, manager.toPlainObject(this));
	} //end loadModelData
			
	var viewModel =  new Terms();

	return viewModel; // NOW..
}); // end Terms View Model