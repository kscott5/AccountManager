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
define(['jquery','app/utilities', 'app/models/modelbase'], function($, utils, modelbase) {
	try {
		var title = 'Account Manager: Home';
		var description = 'Account Manager Home page. Self containing web app to help with...';
		var keywords = 'KnockoutJS, MVVM, requiredJS, javascript, jQuery, Ruby on Rails, prototype, OO';

		var viewModel = modelbase.instance(title,description,keywords,false);
		
		viewModel.loadModelData = function loadModelData() {
			var model = {};
			model.data = getServerData();
			model.moreData = [ 
				{name: 'app/utilities', description: 'javascript library that provides basic app functionality'},
				{name: 'app/manager', description: 'javascript library that controls navigation'},
				{name: 'app/viewmodels', description: 'javscript library that creates model for the view using REST api and KnockoutJS'},
				{name: 'app/views', description: 'folder that contains your convention over configuration'},
			];
			
			var self = viewModel;
			self.model = model;
			
			// Notify observers
			$(self).trigger(globals.VIEWMODEL_LOAD_COMPLETE_LISTENER, manager.toPlainObject(self));
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
		
		return viewModel; // NOW..
	} catch(e) {
		utils.logHelper.error('define(Home) Error: ' + e);
	}
}); // end define Home View Model