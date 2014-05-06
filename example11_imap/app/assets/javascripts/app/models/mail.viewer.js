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
define(['jquery', 'app/utilities', 'app/models/modelbase', 'app/models/mail'], function($, utils, modelbase, mail) {	
	try {
		var title = "Account Manager: Mail Viewer";
		var description = 'Account Manager Mail page. Self containing web app to help with...';
		var keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Ruby on Rails, prototype, OO';
		
		var viewModel = modelbase.instance(title,description,keywords,true);
		
		// Mail Viewer shares these methods with Mail.
		viewModel.getId = mail.getId;
		
		viewModel.loadModelData = function loadModelData() {
			utils.logHelper.debug('MailViewer load model data');
			var self = this;
			var promise = {};
			var id = self.getId();
			
			var promise = manager.library.imap.getMessage(id);
			
			promise.then(
				function(success) {
					self.model.data = success;
					
					// Notify any observers
					$(self).trigger(globals.VIEWMODEL_LOAD_COMPLETE_LISTENER, manager.toPlainObject(self));
				},
				function(error) {
					self.model.data = error;
					
					utils.logHelper.appMessage(error.error);
					
					// Notify any observers
					$(self).trigger(globals.VIEWMODEL_LOAD_COMPLETE_LISTENER, manager.toPlainObject(self));
				}
			);
		}; //end loadModelData
		
		return viewModel; // NOW..
	} catch(e) {
		utils.logHelper.error('define(Mail.Viewer) Error: '+e);
	}
}); // end define Mail View Model