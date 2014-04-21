/**
	Defines a _baseViewModel module for the Account Manager Application.
	Module contains handler for specific model and view relationships,
	and data access.
	Module has the following dependencies
	
		ID			Module
		--			----------------------------------
		WL:			Windows Live API (URL)
		utilities:	javascript library for general use
	http://msdn.microsoft.com/en-us/library/live/hh826543.aspx#javascript
	Returns: WindowsLive
*/
define('app/libs/windowslive', [globals.windowslive.requireJS.path, 'app/utilities'], function(utils) {
	// WindowsLive
	function WindowsLive() {
	};
	
	// Inherit from object
	WindowsLive.prototype = new Object();
	
	// Invite the window's user to login
	// Accepts the following parameters:
	//
	//	scope: array of scope values to access from the WL (optional)
	//	
	WindowsLive.prototype.login = function() {
		// Five sec delay to ensure API is loaded
		// NOTE: Must call WL.init when subscribing to 
		//       events...
		WL.Event.subscribe("auth.login", onLoginCallback);
		
		var initConfig = {
			logging: globals.windowslive.init.logging,
			client_id: globals.windowslive.init.client_id,
			redirect_uri: globals.windowslive.init.redirect_uri,
			scope: ['wl.signin'],
			response_type: globals.windowslive.init.response_type,			
			};
			
		// initialize
		WL.init(initConfig);
		
		// html elements to bind to
		WL.ui({ 
			name: 'signin',
			element: 'signin',
		});
	};
	
	// Callback function for reading the response from 
	// Live Connect API (private)
	function onLoginCallback(session) {		
		
		if(!session.error) {
			 WL.api({
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
							utils.logHelper.error("WL.Error calling API: " + responseFailed.error.message);
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
	} // end login

	var windowslive = new  WindowsLive();
	return windowslive;

});