// Remove comment for app console information
var DEBUGGING = true; // Comment for production

var manager = {};
var globals = {};

// add listener constants
globals.ACCOUNT_MANAGER_CHANGED_LISTENER = 'change.am_libary';
globals.ACCOUNT_MANAGER_CLICK_LISTENER = 'click.am_status';
globals.LOGIN_COMPLETE_LISTENER = 'complete.am_login';
globals.LOGOUT_COMPLETE_LISTENER = 'complete.am_logout';
globals.VIEWMODEL_LOAD_COMPLETE_LISTENER = 'complete.am_viewmodel';

if(DEBUGGING) {
	globals.host_uri = 'http://ksacctmgr.com';
} else {
	globals.host_uri = 'http://ksacctmgr.com';
}

// Configuration for Windows Live API
globals.windowslive = (function(){
	return {
		description: 'Microsoft Windows Live API for access Profile, OneDrive and Mail',
		text: 'Microsoft',
		value: 'windowslive',
		folderLinkName: 'OneDrive',
		imapLinkName: 'Outlook',
		
		initConfig : {
			logging: true,
			client_id : '0000000048117D67', 			
			redirect_uri : globals.host_uri+'/windowslive/callback', 
			// RESPONSE_TYPE should be 'code' but it only works with token. WHY? when 
			// http://msdn.microsoft.com/en-us/library/hh826543.aspx say otherwise.
			// Should work the same in all cases.
			response_type : 'token',  
			scope : [ // http://msdn.microsoft.com/en-us/library/dn631845.aspx
				'wl.signin', // Single sign-in behavior. With single sign-in, users who are already signed in to their Microsoft account are also signed in to your website.
				'wl.basic',  // read access to basic profile information
				'wl.emails',  // Read access to a user's personal, preferred, and business email addresses.
				'wl.skydrive', // Read access to a user's files stored in OneDrive.
				 'wl.imap'], // Read and write access to a user's email using IMAP, and send access using SMTP.
		},
		requireJS: {
			path: (DEBUGGING)? '/assets/libs/wl.debug' : 'https://js.live.net/v5.0/wl.js',
		}, // end requireJS
	}; // return windowslive NOW...
})(); // end globals.windowslive

// Configuration for Google+ API
globals.googleapi = (function(){	
	return {
		description: 'Google API for accessing Profile, Drive and Mail',
		text: 'Google',
		value: 'googleapi',
		folderLinkName: 'Drive',
		imapLinkName: 'GMail',
		
		initConfig : { //https://developers.google.com/+/web/signin/reference#signin-tag-attributes
			'clientid': '1082334669557-rlki04e4u64eg249mvirs8vsgl4ug99h.apps.googleusercontent.com',
			'cookiepolicy': globals.host_uri,
			'scope': [ // https://developers.google.com/accounts/docs/OAuth2Login#scope-param
				'openid profile email',
				'https://www.googleapis.com/auth/plus.login', // This is the recommended login scope providing access to social features. This scope implicitly includes the profile scope
				'https://www.googleapis.com/auth/drive.readonly' // Allows read-only access to file metadata and file content
			].join(' '),
			'callback': 'manager.library.login'
		},
		requireJS: { // TODO:
			path: (DEBUGGING)? '/assets/libs/gapi.client.plusone' : 'https://apis.google.com/js/client:plusone.js',
		}, // end requireJS
	}; // return windowslive NOW...
})(); // end globals.windowslive

// Library available for selection
globals.libraries = [];
globals.libraries.push({value: globals.windowslive.value, text: globals.windowslive.text}); //Convention over configuration - Key represent javascript file windowslive.js
globals.libraries.push({value: globals.googleapi.value, text: globals.googleapi.text}); //Convention over configuration - Key represent javascript file googleapi.js


// RequireRJ helper
globals.require = (function(){
	return {
		config: { // Review RequiresJS API - Configuration Option for details
			context: 'Account Manager',
			baseUrl: '/assets/',
			paths: {
				jquery: (DEBUGGING)? 'libs/jquery-1.11.0': 'https://some_cdn_url/jquery-1.11.0.js',
				jqueryUI: (DEBUGGING)? 'libs/jquery-ui-1.10.4.custom' : 'libs/jquery-ui-1.10.4.custom.min',
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
				//		text!app/models/home.js
				//
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

