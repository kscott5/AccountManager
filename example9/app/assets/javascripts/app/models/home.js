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
define(['app/utilities'], function(utils) {
	
	var HomeModel = function() {
		// page meta data
		this.title = 'Account Manager: Home';
		this.description = 'Account Manager Home page. Self containing web app to help with...';
		this.keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Ruby on Rails, prototype, OO';
		
		this.results = {};
		this.app = utils.app;
	};

	// Inherit from BaseModel object
	HomeModel.prototype = new Object();
	var HomeViewModel = function() {
		this.loginRequired = false;
		this.model = new HomeModel();
	};
	
	// Inherit from object
	HomeViewModel.prototype = new Object();

	HomeViewModel.prototype.loadModelData = loadModelData;
	function loadModelData() {
		var results = {};		
		results.data = getServerData();
		results.moreData = [ 
			{name: 'app/utilities', description: 'javascript library that provides basic app functionality'},
			{name: 'app/manager', description: 'javascript library that controls navigation'},
			{name: 'app/viewmodels', description: 'javscript library that creates model for the view using REST api and KnockoutJS'},
			{name: 'app/views', description: 'folder that contains your convention over configuration'},
		];
				
		this.model.results = results;
	} //end loadModelData
	
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

	// Required for use when binding to HTML elements.
	// It helps avoid the this keyword reference when
	// binding to HTML element events	
	var viewModel = new HomeViewModel();
	
	return viewModel; // NOW..
}); // end define Home View Model