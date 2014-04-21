
/**
	All AccountManager methods and functions are defined inside of this namespace. 

	You can also use the shorthand `AcctMgr` instead of `AccountManager`.

	The core Runtime framework is based on the jQuery API with a number of
	performance optimizations.

	@class AccountManager
	@static
	@version 1.0.0
*/
(function() {
	// Create the manager if it doesn't exists
	if('undefined' === typeof AccountManager) {
		console.debug("Creating AccountManager");
		AccountManager = {};
		
		// Attach the manager to window object
		if('undefined' !== typeof window) {
			console.debug("Attaching AccountManager to the window DOM");
			window.AcctMgr = window.AccountManager = AcctMgr = AccountManager;
		}
	} // end if
	
	// Manager properties
	AccountManager.VERSION = "1.0.0";
	AccountManager.DEVELOPER = "dev_ks@outlook.com";
	
	AccountManager.toString = function() {
		return "AccountManager\n\r" +
			   "\tDEVELOPER: " + AccountManager.DEVELOPER + "\n\r" +
			   "\tVERSION: " + AccountManager.VERSION + "\n\r";
	} // end toString	
})(); 

		
/**
	Subclass for interacting with the Windows Live API
*/
(function() {
	if('undefined' === typeof AccountManager.WL) {
		AccountManager.WL = {};
	}
	
	AccountManager.WL.init = function(config) {
		console.debug("AccountManager.WL.init executing");
		
		this.config.update(config);
		
		if('undefined' === typeof WL) return;
		
		WL.Event.subscribe("auth.login", onLogin);
		WL.init({
			client_id: this.config.app_client_id, 
			redirect_uri: this.config.redirect_url,
			scope: this.config.scope, 
			response_type: this.config.response_type 
		});
		WL.ui({
			name: this.config.ui_name, 
			element: this.config.ui_element
		});			
	}; // end init
	
	// Windows Live api response object
	var apiResponse = AccountManager.WL.apiResponse = new ApiResponse();
	
	apiResponse.create = function() {
		return new ApiResponse();
	} // end create
	
	function ApiResponse() {
		this.message = "";
		this.firstName = "";
		this.lastName = "";
		this.preferredEmail = "";
	
		this.toString = function() {
			return "message: " + this.message + "\n\r" +
				   "firstName: " + this.firstName + "\n\r" +
				   "lastName: " + this.lastName + "\n\r" +
				   "preferredEmail: " + this.preferredEmail + "\n\r";
		}; // end ApiResponse
	} //end ApiResponse
	
	// Windows Live configuration object
	var config = AccountManager.WL.config = new Config();
	
	config.create = function() {
		return new Config();
	} // end create
	
	function Config() {
		this.app_client_id = "00000000000000";
		this.redirect_url = "callback.html";
		this.ui_name = "signin";
		this.ui_element = "signin";
		this.scope = ["wl.signin", "wl.basic", "wl.birthday", "wl.emails"];
		this.response_type = "token";
	
		this.toString = function() {
			return  "app_client_id: " + this.app_client_id + "\r\n" +
					"redirect_url: " + this.redirect_url + "\r\n" +
					"ui_name: " + this.ui_name + "\r\n" +
					"ui_element: " + this.ui_element + "\r\n" +
					"scope: " + this.scope + "\r\n" +
					"response_type: " + this.response_type + "\r\n";	
		}; // end toString
	} // end Config
		
	config.update = function (config) {
		if(config) {			
			this.app_client_id = config.app_client_id;
			this.redirect_url = config.redirect_url;
			this.ui_name = config.ui_name;
			this.ui_element = config.ui_element;
			this.scope = config.scope;
			this.response_type = config.response_type;
		} //end if
	} // end update
	
	// private 
	function onLogin(session) {
		this.apiResponse.message = "";
		
		if(!session.error) {
			 WL.login({
				scope: this.config.scope 
			 }).then(
				function (response) {
					WL.api({
						path: "me",
						method: "GET"
					}).then(
						function (response) {
							this.apiResponse.firstName = response.first_name;
							this.apiResponse.lastName = response.last_name;
							this.apiResponse.preferredEmail = response.emails.preferred;
						},
						function (responseFailed) {
							this.apiResponse.message = "Error calling API: " + responseFailed.error.message;
						}
					);
				}, 
				function (responseFailed)
				{
					this.apiResponse.message = "Error signing in: " + responseFailed.error_description;
				}
			); // end then
		} else { 
			this.apiResponse.message = "Error signing in: " + session.error_description;
		} // end if
	} // end onLogin
})(); 

