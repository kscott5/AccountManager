/**
	Defines module for the Account Manager Application.
	Module contains basic application functionality.
	
	Module Id: am
	Returns: AppManager
*/
define([], function() {
	// Defines AppManager as function
	var AppManager = function() {
		this.version = "1.0.0";
		this.name = "Account Manager";
		this.contact = "Karega Scott";
		this.email = "dev_ks@outlook.com";
		this.url = "http=//www.acctmgr.com";
	} // end AppManager Constructor
	
	// Attach methods
	AppManager.prototype.getBaseViewModel = getBaseViewModel;
	AppManager.prototype.getBaseModel = getBaseModel;
	
	// Create new AppManager
	var appMgr = new AppManager();
	
	/***************************************************
	*		Section for Base View Model functions
	****************************************************/
	// Base View Model Object
	var BaseViewModel = function() {
		if(arguments.length == 0 || arguments[0].length < 3) {
			var errMsg = "Missing the following arguments (order important): \n" +
						  "\tinitFunc: Function call during initialization\n";
						  "\tloadFunc: Function call during view load\n" +	
						  "\tsaveFunc: Function call during save\n";	
			throw Error(errMsg);
		} //end if
		
		// rootNode to document root <HTML></HTML>. This allows me to
		// provide UI binding throughout the entire xml document
		this.rootNode = window.document.documentElement;
		
		// Properties
		this.model = null;

		// Wire-up function callbacks
		var self = this;		
		var args = arguments[0];

		var initCallback = args[0];
		var loadCallback = args[1];
		var saveCallback = args[2];
				
		// Bind the model to view
		this.loadView = function() {			
			initCallback(self); // Should happen once
			loadCallback(self);
		}; // end load call back
		
		// Save the view data
		this.saveView = function() {
			saveCallback(self);
		}; // end saveView
	} // end BaseViewModel
		
	// Return a new BaseViewModel
	function getBaseViewModel() {
		return new BaseViewModel(arguments);
	}; // end getBaseViewModel
	
	/***************************************************
	*		Section for Base Model functions
	****************************************************/
	// Base Model Object
	//
	// NOTE: results is defined as a hash
	var BaseModel = function() {		
		this.title = "";
		this.description = "";
		this.keywords = "";
		this.name = "";
		
		this.appUrl = appMgr.url;
		this.appName = appMgr.name;
		this.appVersion = appMgr.version;
		this.appContact = appMgr.contact;
		this.appEmail = appMgr.email;

		this.error = new AppError();
		this.results = { data: {} }; // use hash to allow dynamic model results
	} // end BaseModel

	// Inherit from Object
	BaseModel.prototype = new Object();
	
	// Returns BaseModel to attach to current model
	// Remarks: private function
	function getBaseModel() {
		return new BaseModel();
	}; //end getBaseModel

	/***************************************************
	*		Section for common Error functions
	****************************************************/	
	// Applicatioin error object
	var AppError = function(){
		this.isPresent = false;
		this.message = "";
		this.code = "";
		this.functionName = ""
	}; // end constructor

	// Inherit from object
	AppError.prototype = new Object();
	
	if('undefined' != typeof define && 
	   'undefined' == typeof define["am"]) {
		define["am"] = appMgr;
	}
	
	return appMgr;
}); // end AppManager module
