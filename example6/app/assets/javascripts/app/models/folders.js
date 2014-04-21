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
define('app/models/folders', ['app/utilities'], function(utils) {	
	function FoldersModel() {
		// page meta data
		this.title = 'Account Manager: Folders';
		this.description = 'Account Manager Folders page. Self containing web app to help with...';
		this.keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Nginx, prototype, OO';
	} // end FoldersModel
	
	FoldersModel.prototype = utils.objectHelper.newBaseModel();

	// Called during initialization of ViewModel
	function initCallback() {
		var self = arguments[0];
						
		self.model = new FoldersModel(self.config);
		
		// TODO: Add data to self.results.data
		utils.logHelper.warning('Folders View Model Initialize Not Implemented');
	} //end initCallback
			
	// Called during the saving of ViewModel
	function saveCallback() {
		var self = arguments[0];
		
		utils.logHelper.error('Folders View Model Save Not Implemented');
	} // end saveCallback
	
	
	function FoldersViewModel() {
		this.model = new FoldersModel();
		
	} // end FoldersViewModel
	
	FoldersViewModel.prototype = utils.objectHelper
		.newBaseViewModel(initCallback, saveCallback);

	var viewModel = new FoldersViewModel();
	
	return viewModel; // NOW..
}); // end define Folders View Model
