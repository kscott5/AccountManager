/**
	Defines module for the Account Manager Application.
	Module contains basic application functionality.
	Module has the following dependency(s) by module id:
	
		ID			Module
		--			----------------------------------
		ko			library for binding model and view
		utilities:	library for general functionality
		viewmodels:	library for view models selection
	
	Module Id: manager
	Returns: Manager
*/
define('manager', ['ko','utilities','viewmodels'], function(ko,utils,vms) {
	/***************************************************
	*		Section for Application Manager functions
	****************************************************/
	// Defines Manager as function
	var Manager = function() {
		this.app = utils.app;
		this.logHelper = utils.logHelper;
	} // end Manager Constructor
	
	// Attach methods
	Manager.prototype.navigateToView = navigateToView;
	
	// Determines which view to show 
	function navigateToView() {
		var hash = window.location.hash;
		var pathname = window.location.pathname;
		
		var viewModel;
		if(arguments.length == 0) {			
			viewModel = vms.homeViewModel;
		} else {
		} // end if
		
		loadViewResults(viewModel);
	}; // end navigateToView
	
	// Loads the with view with model using the following parameters:
	// model: type of BaseModel (REQUIRED)
	function loadViewResults(viewModel) {		
		// rootNode to document root <HTML></HTML>. This allows me to
		// provide UI binding throughout the entire xml document
		var rootNode = window.document.documentElement;
		
		// Get model from arguments
		var model = viewModel.model;
		
		model.app = utils.app;
				
		// Make results observable
		model.results = serializeResults(model.results);
		
		// bind mappedData to view NOW...
		ko.applyBindings(model ,rootNode);
	} // end loadViewResults

	// Converts the data into Knockout observable object
	// data: JSON object 
	function serializeResults() {
		if(arguments.length == 0) {
			var errMsg = 'Missing parameter data (JSON)';
			throw new Error(errMsg);
		}
		
		return arguments[0];
		return ko.mapping.fromJS(data);
	} // end serializeResults
	
	
	// Converts the data into server-side JSON
	// data: observable Knockout object 
	function deserializeResults() {
		if(arguments.length == 0) {
			var errMsg = 'Missing parameter data (JSON)';
			throw new Error(errMsg);
		}
		
		var data = arguments[0];
		return ko.mapping.toJS(data);
	} // end deserializeResults
	
	var manager = new Manager();
	
	// Create new Manager
	return manager; // NOW...
}); // end Manager module
