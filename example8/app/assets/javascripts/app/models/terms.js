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
define('model/terms', ['app/utilities'], function(utils) {	
	/**********************************************
	*	Defines terms View Model
	**********************************************/
	(function() {
		var TermsModel = function() {
			// page meta data
			this.title = 'Account Manager: terms';
			this.description = 'Account Manager terms page. Self containing web app to help with...';
			this.keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Nginx, prototype, OO';
		};

		// DO NOT: Attach additional methods to HomeModel.
		//         Its job is to bind data to/from ui ONLY!
				
		// Inherit from BaseModel object
		TermsModel.prototype = utils.objectHelper.newBaseModel();
		
		// Called during initialization of ViewModel
		function initCallback() {
			var self = arguments[0];
							
			self.model = new TermsModel(self.config);
			
			var data = getServerData();

			// TODO: Add functionality if needed
			
			self.model.results.data = data;
		} //end initCallback
				
		// Called during the saving of ViewModel
		function saveCallback() {
			var self = arguments[0];
			
			utils.logHelper.error('Terms View Model Save Not Implemented');
		} // end saveCallback
		
		/***************************************************
		*		Section for data services functions
		****************************************************/
		// Private function
		function getServerData() {
			var data = {};
			return data;
		} // end getServerData
	
		var TermsViewModel = function() {
		};
		
		// Inherit from BaseViewModel
		TermsViewModel.prototype = utils.objectHelper.
			newBaseViewModel(initCallback, saveCallback);

		// Used to attach to ViewModels later
		var viewModel = new TermsViewModel();

		return viewModel; // NOW...
	})(); // end Terms View Model
});