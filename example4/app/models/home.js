/**
	Defines a Home View Model module for the Account Manager Application.
	Module contains handler for specific model and view relationships,
	and data access.
	Module has the following dependencies

		ID			Module
		--			----------------------------------
		utilities:	javascript library for general use
		
	Module Id: home
	Returns: ViewModels
*/
define('model/home', ['app/utilities'], function(utils) {	
	var HomeModel = function() {
		// page meta data
		this.title = 'Account Manager: Home';
		this.description = 'Account Manager Home page. Self containing web app to help with...';
		this.keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Nginx, prototype, OO';
	};

	// DO NOT: Attach additional methods to HomeModel.
	//         Its job is to bind data to/from ui ONLY!
			
	// Inherit from BaseModel object
	HomeModel.prototype = utils.objectHelper.newBaseModel();
	
	// Called during initialization of ViewModel
	function initCallback() {
		var self = arguments[0];
						
		self.model = new HomeModel(self.config);
		
		var data = getServerData();
		var moreData = [ 
			{name: 'app/utilities', description: 'javascript library that provides basic app functionality'},
			{name: 'app/manager', description: 'javascript library that controls navigation'},
			{name: 'app/viewmodels', description: 'javscript library that creates model for the view using REST api and KnockoutJS'},
			{name: 'app/views', description: 'folder that contains your convention over configuration'},
		];
		
		self.model.results.data = data;
		self.model.results.moreData = moreData;			 
	} //end initCallback
			
	// Called during the saving of ViewModel
	function saveCallback() {
		var self = arguments[0];
		
		utils.logHelper.error('Home View Model Save Not Implemented');
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

	var HomeViewModel = function() {
	};
	
	// Inherit from BaseViewModel
	HomeViewModel.prototype = utils.objectHelper.
		newBaseViewModel(initCallback, saveCallback);

	// Used to attach to ViewModels later
	var viewModel = new HomeViewModel();

	// Attach to ViewModels collection
	return viewModel; // NOW..
}); // end define Home View Model