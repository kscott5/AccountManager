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
define(['app/utilities', 'app/models/mail'], function(utils, mail) {	
	var viewModel = mail;

	viewModel.loadModelData = function() {
		var self = this;
		var promise = {};
		var id = self.getId();
		utils.logHelper.debug('MailViewer id: ' + id);
		
		promise = manager.library.imap.getMessage(id);
		
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
}); // end define Mail View Model