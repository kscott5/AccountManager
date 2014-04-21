// RequireJS Configuration
// 
var globals = {};

// RequireRJ helper
globals.require = (function(){
	return {
		config: {
			baseUrl: '/scripts/',
			paths: {
				jquery: 'lib/jquery-1.11.0.min',
				ko: 'lib/knockout-3.1.0',
				toastr: 'lib/toastr', 
				text: 'lib/plugins/text',
				
				views: '../app/views',
				
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
				//		text!app/views/header.html
				//
				header: 'header.html',
				footer: 'footer.html',
				navigation: 'navigation.html',
				
				manager: '/app/manager',
				utilities: '/app/utilities',
				viewmodels: '/app/viewmodels',
			},
		}
	};	
})(); // end require
