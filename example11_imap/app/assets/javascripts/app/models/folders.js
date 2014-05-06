/**
	Defines a Folders View Model module for the Account Manager Application.
	Module contains handler for specific model and view relationships,
	and data access.
	Module has the following dependencies

		ID			Module
		--			----------------------------------
		utilities:	javascript library for general use
		
	Module Id: folder
	Returns: ViewModel
*/
define(['jquery', 'app/utilities', 'app/models/modelbase'], function($, utils, modelbase) {	
	try {
		var title = 'Account Manager: Folders';
		var description = 'Account Manager Folders page. Self containing web app to help with...';
		var keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Ruby on Rails, prototype, OO';

		var viewModel = modelbase.instance(title,description,keywords,true);
		
		function getId() {
			// Determine if we are pulling data root or a subfolder
			var hashParts = document.location.hash.replace('#','').trim().split('/');
			if(hashParts.length > 1)
				return hashParts[hashParts.length-1]; // Subfolder id
			else
				return '';		
		};
			
		viewModel.loadModelData = function loadModelData() {
			utils.logHelper.debug('Folders loading model data');
			var self = this;
					
			var promise = manager.library.foldersfiles.getTopLevel(getId())
			promise.then(
				function(success) {
					self.model.data = success;
					
					$(self).trigger(globals.VIEWMODEL_LOAD_COMPLETE_LISTENER, manager.toPlainObject(self));
				},
				function(failure) {
					// DO NOTHING
				}
			); // end promise then
		}; //end loadModelData
			
		return viewModel; // NOW..
	} catch(e) {
		utils.logHelper.error('define(Folders) Error: '+e);
	}
}); // end define Folders View Model
