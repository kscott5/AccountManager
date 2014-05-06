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
define(['jquery', 'app/utilities', 'app/models/modelbase'], function($, utils, modelbase) {	
	try {
		var title = 'Account Manager: _Base';
		var description = 'Account Manager _base page. Self containing web app to help with...';
		var keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Ruby on Rails, prototype, OO';
				
		var viewModel = modelbase.instance(title,description,keywords,/*isLoginRequired*/false );
		viewModel.loadModelData = function loadModelData() {
			var model = {};
			
			var self = viewModel;
			self.model = model;
			
			// Notify observers
			$(self).trigger(globals.VIEWMODEL_LOAD_COMPLETE_LISTENER, manager.toPlainObject(self));
		};
		
		return viewModel; // NOW...
	} catch(e) {
		utils.logHelper.error('define(_Base) Error: '+e);
	}
});