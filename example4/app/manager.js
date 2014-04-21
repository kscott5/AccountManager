/**
	Defines module for the Account Manager Application.
	Module contains basic application functionality.
	Module has the following dependency(s) by module id:
	
		ID			Module
		--			----------------------------------
		ko			library for binding model and view
		utilities:	library for general functionality
	
	Module Id: manager
	Returns: Manager
*/
define('app/manager', ['jquery','ko','app/utilities'], 
	function($,ko,utils) {
	// rootNode to document root <HTML></HTML>. This allows me to
	// provide UI binding throughout the entire xml document
	var rootNode = window.document.documentElement;
	var currentViewModel = {};
	
	// Get dependencies array for requireJS
	function getDependenciesArray(viewName) {
		// Create list of dependencies to dynamically
		// load view html and script via requireJS
		return  [
			'text!view/header.html', // parameter mapping = headerHtml 
			'text!helper/header.js', // parameter mapping = headerScript
			'text!view/footer.html', // parameter mapping = footerHtml 
			'text!helper/footer.js', // parameter mapping = footerScript
			'text!view/navigation.html', // parameter mapping = navHtml 
			'text!helper/navigation.js', // parameter mapping = navScript
			'text!view/{0}.html'.replace('{0}', viewName),// parameter mapping = viewHtml 
			'text!helper/{0}.js'.replace('{0}', viewName), // parameter mapping = viewHelper 
			'model/{0}'.replace('{0}', viewName) // parameter mapping = viewModel
		];
	}; // end getDependenciesArray
	
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
	
	// 1) Determines which view to show
	// 2) Locates all its dependencies:
	//      header, footer, navigation, etc..
	// 3) Injects the dependencies into shell
	// 4) Then binds data results to everything
	//
	// REMEMBER: Convention over 
	//					Configuration
	function navigateToView() {		
		var viewName = (arguments[0] || 'home').replace('#','').trim();
		
		ko.cleanNode(rootNode); // clear it
		currentViewModel = {}; // clear it
		
		// Get the configuration to use
		var cfg = globals.require.config;
		var deps = getDependenciesArray(viewName);
		
		// Use requireJS to load the view's dependencies
		// This is load asyc, so you can predict when it
		// with call the callback function. But it will...
		//
		// Review /scripts/globals.js to understand what html, helper and model
		requirejs(cfg, deps,  function(headerHtml, headerHelper, footerHtml, 
			footerHelper, navHtml, navHelper, viewHtml, viewHelper, viewModel) {			
									
				// Load html content into there containers
				$("#header").html(headerHtml);
				$("#navigation").html(navHtml);
				$("#footer").html(footerHtml);
				$("#content").html(viewHtml);

				currentViewModel = viewModel;
				
				// load view results else default to home
				loadViewResults();
				
				// Execute the scripts for the 
				eval(headerHelper);
				eval(footerHelper);
				eval(navHelper);
				eval(viewHelper);
		});
	}; // end navigateToView

	function login() {
		manager.logHelper.warning("Login Not Implement");
	}; // end login
	
	function register() {
		manager.navigateToView('register');
	};
	
	
	// Loads the with view with model using the following parameters:
	// model: type of BaseModel (REQUIRED)
	function loadViewResults() {		
		// Get model from arguments
		var model = currentViewModel.model;
						
		// Make results observable
		model.results = serializeResults(model.results);
		
		//**********************************//
		//     MOVE TO SEPERATE FUNCTION    // 
		//**********************************//
		model.user.userName = ko.observable();
		model.user.password = ko.observable();
		model.user.passwordConfirm = ko.observable();
		model.user.firstName = ko.observable();
		model.user.lastName = ko.observable();
		
		model.user.login = login;
		model.user.register = register;
		//**********************************//
		
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
