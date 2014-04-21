// RequireJS Configuration
// 
var globals = {};

// Configuration of Windows Live API
globals.windowslive = (function(){
	return {
		callback_hash_id: '#wlcbk',
		init : {
			logging: true,
			client_id : '0000000040118C8D', 
			redirect_uri : 'http://localhost:96/home.html#wlcbk', 
			response_type : "token", // require access token fro OAuth
		},
		requireJS: {
			path: 'http://js.live.net/v5.0/wl.debug.js',
		}, // end requireJS
	}; // return windowslive NOW...
})(); // end globals.windowslive

// RequireRJ helper
globals.require = (function(){
	return {
		config: { // Review RequiresJS API - Configuration Option for details
			context: 'Account Manager',
			baseUrl: 'scripts/',
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
				//     http://localhost:93/app/views/header.html
				//
				// requireJS uses the paths to construct the
				// following string view the html page content
				//
				//		text!view/home.html
				//		text!helper/home.js
				//		text!model/home.js
				//
				// NOTE: Header, Footer and Navigation could support
				//	     this same structure, but at this time there
				//		 was no need. They DO NOT have a helper or model
				text: 'libs/plugins/text',

				// Directory for .js application manager file
				// which provides dynamic loading of views,
				// models and helpers
				app: '../app',			
				
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
