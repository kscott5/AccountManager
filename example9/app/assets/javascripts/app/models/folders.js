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
	function FoldersModel() {
		// page meta data
		this.title = 'Account Manager: Folders';
		this.description = 'Account Manager Folders page. Self containing web app to help with...';
		this.keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Ruby on Rails, prototype, OO';
		
		this.results = {
			description: manager.library.foldersfiles.description,
		};
		this.app = utils.app;
	} // end FoldersModel
	FoldersModel.prototype = new Object();
	
	function FoldersViewModel() {
		this.loginRequired = true;
		this.model = new FoldersModel();
	} // end FoldersViewModel
	
	FoldersViewModel.prototype = new Object();
	FoldersViewModel.prototype.loadModelData = loadModelData;
	function loadModelData() {		
		// Manager is already loaded 
		var data = manager.library.foldersfiles.getTopLevel();
		
		this.model.results.data	= data;
	} //end loadModelData
	
	// Required for use when binding to HTML elements.
	// It helps avoid the this keyword reference when
	// binding to HTML element events
	var viewModel = new FoldersViewModel();
	
	return viewModel; // NOW..
}); // end define Folders View Model
