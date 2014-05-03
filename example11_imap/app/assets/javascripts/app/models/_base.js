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
	var _Base = function() {
		// page meta data
		this.title = 'Account Manager: _base';
		this.description = 'Account Manager _base page. Self containing web app to help with...';
		this.keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Ruby on Rails, prototype, OO';
			
		this.model = {};
		this.app = utils.app;
	};

	_Base.prototype.isLoginRequired = isLoginRequired;
	function isLoginRequired() {
		return false;
	};
	
	_Base.prototype.loadModelData = loadModelData;
	function loadModelData() {
		this.model = {};
		
		// Notify observers
		$(this).trigger(globals.VIEWMODEL_LOAD_COMPLETE_LISTENER, manager.toPlainObject(this));
	};
	
	var viewModel = new _BaseModel();
	
	return viewModel; // NOW...
});