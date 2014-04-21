/**
	Defines a viewmodels module for the Account Manager Application.
	Module contains handler for specific model and view relationships.
	Module has the following dependencies by module id:
	
		ID		Module Name
		--		----------------------------
		ko:		KnockoutJS
		am: 	Account Manager (manager.js)
	
	Module Id: vms
	Returns: ViewModels
*/
define(["ko", "am"], function(ko, am) {	
	var viewModels = {};
	
	/**********************************************
	*	Defines Some View Model
	**********************************************/
	(function(ko, am) {
		// Specific ViewModel
		var SomeViewModel = function() {
		};
		
		// Inherit from BaseViewModel
		SomeViewModel.prototype = am.getBaseViewModel(initCallback, loadViewCallback, saveViewCallback);

		// Used to attach to ViewModels later
		var viewModel = new SomeViewModel();
		
		// Called during initialization of ViewModel
		function initCallback() {
			var self = arguments[0];
							
			var SomeModel = function() {
				this.title = "Account Manager: Start";
				this.description = "Self containing web app to help me understanding...";
				this.keywords = "KnockoutJS, MVVM, requiredJS, javascript, jQuery, Nginx, prototype, OO";
			};

			// DO NOT: Attach additional methods to SomeModel.
			//         Its job is to bind data to/from ui ONLY!
					
			// Inherit from BaseModel object
			SomeModel.prototype = am.getBaseModel();
			
			self.model = new SomeModel(self.config);
			
			var data = getModelData();
			var moreData = [ 
				{name: 'name1', description: 'description1'},
				{name: 'name2', description: 'description2'},
				{name: 'name3', description: 'description3'},
			];
			
			self.model.results = { 
				data: data, 
				moreData: moreData
			};
		} //end initCallback
		
		// Called during the loading of the view
		function loadViewCallback() {
			var self = arguments[0];
			ko.applyBindings(self.model, self.rootNode);
		}; // end loadViewCallback
		
		// Called during the saving of ViewModel
		function saveViewCallback() {
			var self = arguments[0];
			
			//TODO: Access the self.model.data
			
			throw new Error("SomeViewModel.save() not implemented");
		} // end saveViewCallback
		
		/***************************************************
		*		Section for data services functions
		****************************************************/
		// Remarks: private function
		function getModelData() {
			var data = ko.observableArray([
				{name: "name1", description: "description1"},
				{name: "name2", description: "description2"},
				{name: "name3", description: "description3"}
			]);
			
			return data;
		} // end getModelData
	
		// Attach to ViewModels collection
		viewModels.someViewModel = viewModel;
	})(ko, am); // end SomeViewModel
	
	/**********************************************
	*	TODO: Create another ViewModel
	**********************************************/
	
	
	/**********************************************
	*		THIS SECTION IS LAST THING IN MODULE
	**********************************************/
	if('undefined' != typeof define && 
	   'undefined' == define["vms"]) {
		define["vms"] = viewModels;
	}

	return viewModels;
});