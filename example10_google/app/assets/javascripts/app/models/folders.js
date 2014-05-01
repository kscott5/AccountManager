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
		var self = this;
		
		// page meta data
		self.title = 'Account Manager: Folders';
		self.description = 'Account Manager Folders page. Self containing web app to help with...';
		self.keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Ruby on Rails, prototype, OO';
		self.app = utils.app;
		
		self.model = {};		
	} // end Folders

	Folders.prototype.getId = getId;
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
		
		manager.library.foldersfiles.getTopLevel(this
		
			// Notify observers 
			// NOTE: This occur within getTopLevel because api asynchronous
			//$(this).trigger(globals.VIEWMODEL_LOAD_COMPLETE_LISTENER, manager.toPlainObject(this));

		);		
	}; //end loadModelData
	
	// Required for use when binding to HTML elements.
	// It helps avoid the this keyword reference when
	// binding to HTML element events
	var viewModel = new Folders();
	
	return viewModel; // NOW..
}); // end define Folders View Model
