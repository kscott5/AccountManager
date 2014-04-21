/**
	Defines a viewmodels module for the Account Manager Application.
	Module contains handler for specific model and view relationships.
	Module has the following dependencies
	
		ID			Module
		--			----------------------------------
		utilities:	javascript library for general use
		
	Module Id: viewmodels
	Returns: ViewModels
*/
define('viewmodels', ['utilities'], function(utils) {	
	var viewModels = {};
	
	/**********************************************
	*	Defines Home View Model
	**********************************************/
	(function() {
		var HomeViewModel = function() {
		};
		
		// Inherit from BaseViewModel
		HomeViewModel.prototype = utils.objectHelper.
			newBaseViewModel(initCallback, saveViewCallback);

		// Used to attach to ViewModels later
		var viewModel = new HomeViewModel();
		
		// Called during initialization of ViewModel
		function initCallback() {
			var self = arguments[0];
							
			var HomeModel = function() {
				this.title = 'Account Manager: Home';
				this.description = 'Self containing web app to help me understanding...';
				this.keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Nginx, prototype, OO';
			};

			// DO NOT: Attach additional methods to HomeModel.
			//         Its job is to bind data to/from ui ONLY!
					
			// Inherit from BaseModel object
			HomeModel.prototype = utils.objectHelper.newBaseModel();
			
			self.model = new HomeModel(self.config);
			
			var data = getServerData();
			var moreData = [ 
				{name: 'app/utilies', description: 'javascript library that provides basic app functionality'},
				{name: 'app/manager', description: 'javascript library that controls navigation'},
				{name: 'app/viewmodels', description: 'javscript library that creates model for the view using REST api and KnockoutJS'},
				{name: 'app/views', description: 'folder that contains your convention over configuration'},
			];
			
			self.model.results.data = data;
			self.model.results.moreData = moreData;			 
		} //end initCallback
				
		// Called during the saving of ViewModel
		function saveViewCallback() {
			var self = arguments[0];
			
			throw new Error('HomeViewModel.save() not implemented');
		} // end saveViewCallback
		
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
	
		// Attach to ViewModels collection
		viewModels.homeViewModel = viewModel;
	})(); // end HomeViewModel
	
	/**********************************************
	*	TODO: Create another ViewModel
	**********************************************/
	
	
	return viewModels; // NOW...
}); // end define View Models