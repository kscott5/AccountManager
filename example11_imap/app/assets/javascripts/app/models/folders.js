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
define(['app/utilities'], function(utils) {	
	function Folders() {		
		// page meta data
		this.title = 'Account Manager: Folders';
		this.description = 'Account Manager Folders page. Self containing web app to help with...';
		this.keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Ruby on Rails, prototype, OO';
		this.app = utils.app;
		
		this.model = {};		
	} // end Folders

	// TODO: Move this method 
	function getId() {
		// Determine if we are pulling data root or a subfolder
		var hashParts = document.location.hash.replace('#','').trim().split('/');
		if(hashParts.length > 1)
			return hashParts[hashParts.length-1]; // Subfolder id
		else
			return '';		
	};
	
	Folders.prototype.isLoginRequired = isLoginRequired;
	function isLoginRequired() {
		return true;
	};
		
	Folders.prototype.loadModelData = loadModelData;
	function loadModelData() {
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
	
	// Required for use when binding to HTML elements.
	// It helps avoid the this keyword reference when
	// binding to HTML element events
	var viewModel = new Folders();
	
	return viewModel; // NOW..
}); // end define Folders View Model
