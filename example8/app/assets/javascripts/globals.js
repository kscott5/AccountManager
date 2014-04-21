// RequireJS Configuration
// 
var globals = {};

// Remove comment for app console information
var DEBUGGING = true; // Comment for production

// Configuration of Windows Live API
globals.windowslive = (function(){
	return {
		initConfig : {
			logging: true,
			client_id : '0000000048117D67', 
			//redirect_uri : 'https://login.live.com/oauth20_desktop.srf', // Implicit
			//response_type : 'token', // Implicit
			
			redirect_uri : 'http://ksacctmgr.com/home/wlcbk', 
			response_type : "token", 
			scope : [ 'wl.signin', 'wl.basic', 'wl.emails', 'wl.skydrive', 'wl.imap'],
		},
		requireJS: {
			path: 'https://js.live.net/v5.0/wl.debug.js',
		}, // end requireJS
	}; // return windowslive NOW...
})(); // end globals.windowslive

// RequireRJ helper
globals.require = (function(){
	return {
		config: { // Review RequiresJS API - Configuration Option for details
			context: 'Account Manager',
			baseUrl: '/assets/',
			paths: {
				jquery: 'libs/jquery-1.11.0',
				ko: 'libs/knockout-3.1.0.debug', 
				toastr: 'libs/toastr', 
								
				// These modules use the text.js plugin
				// to access some basic html page
				// components.
				//
				// For example to access the following html:
				//
				//     http://localhost:93/assets/app/views/header.html
				//
				// requireJS uses the paths to construct the
				// following string view the html page content
				//
				//		text!app/views/home.html
				//		text!app/helpers/home.js
				//		text!app/models/home.js
				//
				// NOTE: Header, Footer and Navigation could support
				//	     this same structure, but at this time there
				//		 was no need. They DO NOT have a helper or model
				text: 'libs/plugins/text',

				// Directory for .js application manager file
				// which provides dynamic loading of views,
				// models and helpers
				app: 'app',			
				
				// Directory for .html templates used to
				// provide structure to the .html shell
				views: 'app/views', 

				// Directory for .js template. They provide
				// additional functionality that the templates 
				// (.html) may need
				helpers: 'app/helpers', 
				
				// Directory for .js data and model access.
				// This is the data provide to the views.
				models: 'app/models', 
				
				// Directory for .js scripts that wrap
				// third party APIs such as Windows Live API
				libs: 'app/libs',
			}, // end paths
		} // end config
	};	// return NOW...
	
})(); // end require
