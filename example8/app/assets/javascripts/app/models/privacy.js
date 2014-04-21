/**
	Defines a PrivacyViewModel module for the Account Manager Application.
	Module contains handler for specific model and view relationships,
	and data access.
	Module has the following dependencies
	
		ID			Module
		--			----------------------------------
		utilities:	javascript library for general use
		
	Returns: ViewModel
*/
define('model/privacy', ['app/utilities'], function(utils) {	
	/**********************************************
	*	Defines privacy View Model
	**********************************************/
	(function() {
		var PrivacyModel = function() {
			// page meta data
			this.title = 'Account Manager: privacy';
			this.description = 'Account Manager privacy page. Self containing web app to help with...';
			this.keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Nginx, prototype, OO';
		};

		// DO NOT: Attach additional methods to HomeModel.
		//         Its job is to bind data to/from ui ONLY!
				
		// Inherit from BaseModel object
		PrivacyModel.prototype = utils.objectHelper.newBaseModel();
		
		// Called during initialization of ViewModel
		function initCallback() {
			var self = arguments[0];
							
			self.model = new PrivacyModel(self.config);
			
			var data = getServerData();

			// TODO: Add functionality if needed
			
			self.model.results.data = data;
		} //end initCallback
				
		// Called during the saving of ViewModel
		function saveCallback() {
			var self = arguments[0];
			
			utils.logHelper.error('Privacy View Model Save Not Implemented');
		} // end saveCallback
		
		/***************************************************
		*		Section for data services functions
		****************************************************/
		// Private function
		function getServerData() {
			var data = {};
			
			return data;
		} // end getServerData
	
		var PrivacyViewModel = function() {
		};
		
		// Inherit from BaseViewModel
		PrivacyViewModel.prototype = utils.objectHelper.
			newBaseViewModel(initCallback, saveCallback);

		// Used to attach to ViewModels later
		var viewModel = new PrivacyViewModel();

		return viewModel; // NOW...
	})(); // end Privacy View Model
});