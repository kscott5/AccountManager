/**
	Provides base namespace and common functionality
	used by the account manager application.
	
*/
window.AcctMgrApp = (function() {	
	// Constructor
	var AcctMgrApp = {
		APP_VERSION : "1.0.0",
		APP_NAME : "Account Manager",
		APP_CONTACT : "Karega Scott",
		APP_EMAIL : "dev_ks@outlook.com",
		APP_URL : "http://www.acctmgr.com",

		getBaseModel : getBaseModel,		
		bindModelToContext : bindModelToContext,				
		newConfig : getNewConfig,

		Logger : app.logger,
	}; // end AcctMgrApp

	/***************************************************
	*		Section for Configuration functions
	****************************************************/	
	// Desc: Config Object
	var Config = function() {
		this.title = arguments[0] || "Title: undefined";
		this.description = arguments[1] || "Description: undefined";
		this.keywords = arguments[2] || "Keywords: undefined";
	}; // end Config

	// Desc: Inherit from Object
	Config.prototype = new Object();
									
	// Desc: Returns a new configuration object 
	// Args: title, description, keywords
	//
	// Remarks: private function
	function getNewConfig() {
		if(arguments.length < 3) {
			var errMsg = "Missing paramaters: title, description and keywords";
			throw new Error(errMsg);
		}

		return new Config(arguments[0], arguments[1], arguments[2]);
	}; // end getNewConfig

	/***************************************************
	*		Section for Base Model functions
	****************************************************/
	// Desc: BaseModel Object
	// Args: Config object
	//
	// Remarks: Get new config from AcctMgrApp.getNewConfig()
	var BaseModel = function() {
		// arguments allow the function to dynamically accept
		// multiple function parameters or 0..n parameters
		if(arguments.length == 0) {
			var msg = "Invalid parameter for BaseModel(config).\n\r" +
					   "Initializing with generic values.";
			console.debug(msg);
		} //end if
		
		var config = arguments[0];
		this.title = config.title;
		this.description = config.description ;
		this.keywords = config.keywords;
	
		this.appUrl = AcctMgrApp.APP_URL;
		this.appName = AcctMgrApp.APP_NAME;
		this.appVersion = AcctMgrApp.APP_VERSION;
		this.appContact = AcctMgrApp.APP_CONTACT;
		this.appEmail = AcctMgrApp.APP_EMAIL;

		this.error = new error();
		this.results = {}; // use hash to allow dynamic model results
	} // end BaseModel

	// Desc: Inherit from Object
	BaseModel.prototype = new Object();
	
	// Desc: Returns BaseModel to attach to current model
	// 
	// Ex: Assume config is already create
	//
	//	   var Model = function() {};
	//
	// 	   Model.prototype = 
	//			AcctMgrApp.getBaseModel(config);
	//
	// Remarks: private function
	function getBaseModel() {
		if(arguments.length < 1) {
			var errMsg = "Missing config parameters. Call AcctMgr.GetNewConfig()\n\r";
			throw new Error(errMsg);
		} //end if
		
		return new BaseModel(arguments[0]);
	}; //end getBaseModel

	// Desc: Binds Model to context for HTML rendering
	// Args: Model inherited from BaseModel
	// Ex: Review getBaseModel();
	//
	// Remarks: private function
	function bindModelToContext() {
		if(arguments.length == 0 || 'undefined' == typeof arguments[0]) {
			var errMsg = "AcctMgrApp.bindModelToContext: \n\r" +
						 "Model not defined. Review getBaseModel()\n\r" +
						 "located in AcctMgr for help";
			throw new Error(errMsg);
		} // end if
		
		// bind to document root <HTML></HTML>. This allows me to
		// provide UI binding throughout the entire xml document
		ko.applyBindings(arguments[0], window.document.documentElement);
	}; // end bindViewModelToContext

	/***************************************************
	*		Section for common Error functions
	****************************************************/	
	// Desc: error object 
	var error = function(){
		this.isPresent = ko.observable(false);
		this.message = ko.observable("");
		this.code = ko.observable("");
		this.methodExecuted = ko.observable("");
	}; // end constructor

	// Inherit from object
	error.prototype = new Object();
	
	return AcctMgrApp; // NOW...
})(ko); // end AcctMgrApp
