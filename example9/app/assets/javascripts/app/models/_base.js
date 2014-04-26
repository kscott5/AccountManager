/**
	Defines a _baseViewModel module for the Account Manager Application.
	Module contains handler for specific model and view relationships,
	and data access.
	Module has the following dependencies
	
		ID			Module
		--			----------------------------------
		utilities:	javascript library for general use
		
	Returns: ViewModel
*/
define('model/_base', ['app/utilities'], function(utils) {	
	var _BaseModel = function() {
		// page meta data
		this.title = 'Account Manager: _base';
		this.description = 'Account Manager _base page. Self containing web app to help with...';
		this.keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Ruby on Rails, prototype, OO';
		
		this.results = {};
		this.app = utils.app;
	};
	_BaseModel.prototype = new Object();
	
	var _BaseViewModel = function() {
		this.loginRequired = false;
		this.model = new _BaseModel();
	};
	
	_BaseViewModel.prototype = new Object();
	_BaseViewModel.prototype.loadModelData = loadModelData;
	function loadModelData() {
		this.model.results = {};
	};
	
	// Used to attach to ViewModels later
	// Required for use when binding to HTML elements.
	// It helps avoid the this keyword reference when
	// binding to HTML element events
	var viewModel = new _BaseViewModel();
	
	return viewModel; // NOW...
});