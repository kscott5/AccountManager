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
		self.loginRequired = true;
		self.pathId = '';
		self.asyncLoadComplete = false;
		self.model = {		
			description: manager.library.foldersfiles.description,
		};
		
		// Observe change
		manager.addListener('library', 'changed', function() {
			utils.logHelper.debug('Folders recieved library changed event');
			self.model = {
				description: manager.library.foldersfiles.description,
			}
			self.asynLoadComplete = false;
			self.pathId = '';
		});
	} // end Folders
	
	Folders.prototype = new Object();
	Folders.prototype.loadModelData = loadModelData;
	function loadModelData() {
		if(!this.asyncLoadComplete) {
			// Determine if we are pulling data for a sub folder
			var hashParts = document.location.hash.replace('#','').trim().split('/');
			this.pathId = '';
			if(hashParts.length > 1) {
				// Subfolder identifier
				this.pathId = hashParts[hashParts.length-1];
			}
			manager.library.foldersfiles.getTopLevel(this);
			return;
		} 
		
		this.asyncLoadComplete = false;
		this.pathId = '';
	} //end loadModelData
	
	// Required for use when binding to HTML elements.
	// It helps avoid the this keyword reference when
	// binding to HTML element events
	var viewModel = new Folders();
	
	return viewModel; // NOW..
}); // end define Folders View Model