/**
	Defines a _baseViewModel module for the Account Manager Application.
	Module contains handler for specific model and view relationships,
	and data access.
	Module has the following dependencies
	
		ID			Module
		--			----------------------------------
		utilities:	javascript library for general use
		
	Returns: ViewModel
*/
define('model/_base', ['app/utilities'], function(utils) {	
	/**********************************************
	*	Defines _base View Model
	**********************************************/
	(function() {
		var _BaseModel = function() {
			// page meta data
			this.title = 'Account Manager: _base';
			this.description = 'Account Manager _base page. Self containing web app to help with...';
			this.keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Nginx, prototype, OO';
		};

		// DO NOT: Attach additional methods to HomeModel.
		//         Its job is to bind data to/from ui ONLY!
				
		// Inherit from BaseModel object
		_BaseModel.prototype = utils.objectHelper.newBaseModel();
		
		// Called during initialization of ViewModel
		function initCallback() {
			var self = arguments[0];
							
			self.model = new _BaseModel(self.config);
			
			var data = getServerData();

			// TODO: Add functionality if needed
			
			self.model.results.data = data;
		} //end initCallback
				
		// Called during the saving of ViewModel
		function saveCallback() {
			var self = arguments[0];
			
			utils.logHelper.error('_Base View Model Save Not Implemented');
		} // end saveCallback
		
		/***************************************************
		*		Section for data services functions
		****************************************************/
		// Private function
		function getServerData() {
			var data = [ 
				{name: '/scripts/requireJS', description: 'javascript library that provides dynamic loading of server file to client'},
				{name: '/scripts/lib/plugins/text', description: 'javascript plugin to RequireJS help helps load templates'},
				{name: '/scripts/lib/knockout', description: 'javscript library that providesd data bindding between server and client'},
				{name: '/scripts/lib/toastr', description: 'library for global configuration '},
			];
			
			return data;
		} // end getServerData
	
		var _BaseViewModel = function() {
		};
		
		// Inherit from BaseViewModel
		_BaseViewModel.prototype = utils.objectHelper.
			newBaseViewModel(initCallback, saveCallback);

		// Used to attach to ViewModels later
		var viewModel = new _BaseViewModel();

		return viewModel; // NOW...
	})(); // end _Base View Model
});