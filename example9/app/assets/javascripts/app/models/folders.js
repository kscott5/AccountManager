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
		this.loginRequired = true;
		this.pathId = '';
		this.asyncLoadComplete = false;
		
		this.model = {
			description: manager.library.foldersfiles.description,
		};
	} // end Folders
	
	Folders.prototype = new Object();
	Folders.prototype.loadModelData = loadModelData;
	function loadModelData() {
		if(!this.asyncLoadComplete) {
			// Determine if we are pulling data for a sub folder
			var hashParts = document.location.hash.replace('#','').trim().split('/');
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
