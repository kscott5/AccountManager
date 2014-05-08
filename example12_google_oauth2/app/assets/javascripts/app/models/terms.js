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
define(['jqueryExtend','app/utilities', 'app/models/modelbase'], function($, utils, modelbase) {	
	try {
		var title = 'Account Manager: terms';
		var description = 'Account Manager terms page. Self containing web app to help with...';
		var keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Ruby on Rails, prototype, OO';
		
		var viewModel = modelbase.instance(title,description,keywords,false);
		
		viewModel.loadModelData = function loadModelData() {
			var self = viewModel;
			self.model = {};
			
			// Notify observers
			$(self).trigger(globals.VIEWMODEL_LOAD_COMPLETE_LISTENER, manager.toPlainObject(self));
		} //end loadModelData
				
		return viewModel; // NOW..
	} catch(e) {
		utils.logHelper.error('define(Terms) Error: ' + e);
	}
}); // end Terms View Model