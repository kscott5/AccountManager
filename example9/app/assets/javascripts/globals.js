// RequireJS Configuration
// 
var globals = {};

// Remove comment for app console information
var DEBUGGING = true; // Comment for production

globals.libraries = [];

// Configuration of Windows Live API
globals.windowslive = (function(){
	globals.libraries.push({value: 'windowslive', text: 'Microsoft'}); //Convention over configuration - Key represent javascript file windowslive.js
	
	return {
		initConfig : {
			logging: true,
			client_id : '0000000048117D67', 
			//redirect_uri : 'https://login.live.com/oauth20_desktop.srf', // Implicit
			//response_type : 'token', // Implicit
			
			redirect_uri : (DEBUGGING)? 'http://ksacctmgr.com/windowslive/callback': 'https://your_account_manager_real_url/windowslive/callback', 
			response_type : "token", 
			scope : [ 'wl.signin', 'wl.basic', 'wl.emails', 'wl.skydrive', 'wl.imap'],
		},
		requireJS: {
			path: (DEBUGGING)? '/assets/libs/wl.debug' : 'https://js.live.net/v5.0/wl.js',
		}, // end requireJS
	}; // return windowslive NOW...
})(); // end globals.windowslive

globals.googleapi = (function(){
	globals.libraries.push({value: 'googleapi', text: 'Google'}); //Convention over configuration - Key represent javascript file googleapi.js
	return {
		initConfig : {
			client_id : '0000000000000000'
		},
		requireJS: {
			path: (DEBUGGING)? '' : '',
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
				jquery: (DEBUGGING)? 'libs/jquery-1.11.0': 'https://some_cdn_url/jquery-1.11.0.js',
				ko: (DEBUGGING)? 'libs/knockout-3.1.0.debug': 'https://some_cdn_url/knockout-3.1.0.js', 
				toastr: (DEBUGGING)? 'libs/toastr': 'https://some_cdn_url/toastr.min.js', 
								
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
				text: (DEBUGGING)? 'libs/plugins/text': 'https://some_cdn_url/text.js',

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
