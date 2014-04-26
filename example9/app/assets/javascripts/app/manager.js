/**
	Defines module for the Account Manager Application.
	Module contains basic application functionality.
	Module has the following dependency(s) by module id:
	
		ID			Module
		--			----------------------------------
		ko			library for binding model and view
		wl:			library for windows live api
		utilities:	library for general functionality
	
	Module Id: manager
	Returns: Manager
*/
define(['jquery', 'ko', 'app/utilities', 'app/libs/windowslive'], 
	function($,ko,utils,defaultLibrary) {
	
	// rootNode to document root <HTML></HTML>. This allows me to
	// provide UI binding throughout the entire xml document
	var rootNode = window.document.documentElement;
	
	// Get dependencies array for requireJS
	function getDependenciesArray(viewName) {
		// Create list of dependencies to dynamically
		// load view html and script via requireJS
		return  [
			'text!app/views/{0}.html'.replace('{0}', viewName),// parameter mapping = viewHtml 
			'text!app/helpers/{0}.js'.replace('{0}', viewName), // parameter mapping = viewHelper 
			'app/models/{0}'.replace('{0}', viewName) // parameter mapping = viewModel
		];
	}; // end getDependenciesArray
	
	// Defines Manager as function
	var Manager = function() {
		this.app = utils.app;
		this.logHelper = utils.logHelper;
		this.library = defaultLibrary; // windowslive
	} // end Manager Constructor

	Manager.prototype = new Object();
	
	// Attach methods
	Manager.prototype.navigateToView = navigateToView;
	
	Manager.prototype.initialize = initialize;
	function initialize() {
		manager.logHelper.debug('Manager initialize');		
		
		// NOTE: DO NOT ADD ANY jquery .bind() calls here
		//       add to applyDOMBindings()
		
		$('#library').empty();
		var selected = false;
		$(globals.libraries).each(function() {
			var option = document.createElement('option');
			option.text = this.text; 
			option.value = this.value;
			$(option).attr('selected', (!selected)? selected=true: false);
			$('#library').append(option);
		});
		
		// Use the hash in case the page was bookmarked
		manager.navigateToView(document.location.hash);
	};
		
	Manager.prototype.login = login;
	function login() {
		utils.logHelper.debug('Manager login');
		if(manager.library.login()) {
			manager.navigateToView(document.href.hash);
		}
	};
	
	Manager.prototype.logout = logout;
	function logout() {
		utils.logHelper.debug('Manager logout');
		if(manager.library.logout()) {
			manager.navigateToView(document.href.hash);
		}
	};
	
	Manager.prototype.libraryChanged = libraryChanged;
	function libraryChanged() {	
		var libName = $(this).val();
		var dep = 'app/libs/{0}'.replace('{0}', libName);
		
		manager.logHelper.debug('Manager library changed - ' + libName);
				
		require( [dep], function(library) {
			manager.library = library;
			manager.navigateToView(document.location.hash);
		});
	};
	
	function refreshView() {
	};
	
	// NOTE: When ko.clearNode is called it removes ALL
	//       bindings. This function was created to ensure 
	//       jquery bindings are apply at correct time
	function applyDOMBindings() {
		ko.cleanNode(rootNode); // clear it

		$('.navigationItem').bind('click', function() {	
			manager.navigateToView($(this).attr('href'));
			return true;
		});
	
		$('a[href=#mail]').text(manager.library.imap.name);
		$('a[href=#folders]').text(manager.library.foldersfiles.name);
		
		// NOTE: be carefully not to attach the actual function,
		//       manager.libraryChanged() will cause infinite loop
		$('#library').bind('change', manager.libraryChanged);
				
		if(manager.library.isConnected) {
			var user = manager.library.getUser();
			
			$('#header #session #user').html(
				'Welcome back <span id=\"fullname\" name=\"fullname\">{0}</span>!'
				.replace('{0}', user.fullname));
			
			$('#header #session #status').html('Logout');
			$('#header #session #status').bind('click', manager.logout);
		} else {
			$('#header #session #user').html('')
			$('#header #session #status').html('Login');
			$('#header #session #status').bind('click', manager.login);
		}
	};
	
	// 1) Determines which view to show
	// 2) Locates all its dependencies:
	//      header, footer, navigation, etc..
	// 3) Injects the dependencies into shell
	// 4) Then binds data results to everything
	//
	// REMEMBER: Convention over 
	//					Configuration
	function navigateToView(hash) {
		manager.logHelper.clear();
	
		var viewName = (hash || 'home').replace('#','').trim();
		manager.logHelper.debug('Manager navigateToView('+viewName+')');
		
		// TODO: WHY AM I DOING THIS?????
		//
		// At this point server should have pick up the
		// Windows Live API Verification Code
		// http://msdn.microsoft.com/en-us/library/ff749592.aspx
		viewName = (viewName == 
			globals.windowslive.wl_callback_hash)? 'home' : viewName;
			
		applyDOMBindings();
		
		var deps = getDependenciesArray(viewName);
		
		// Reset the internal loader's state
		for(var i=0; i<deps.length; i++) {
			try { require.undef(deps[i]);} catch(e) {manager.logHelper.error(e);}
		}
		
		// Use requireJS to load the view's dependencies
		// This is load asyc, so you can predict when it
		// with call the callback function. But it will...
		//
		// Review /scripts/globals.js to understand what html, helper and model
		//
		// NOTES: http://requirejs.org/docs/1.0/docs/api.html#jsfiles
		//    If you want  to load some JavaScript files, use the require() API.
		//    If there is already a require() in the page, you can use the requireJS()
		//    THIS IS BS cause they both reference the same object.
		//    to access the RequireJS API for the loading scripts
		require(deps, 
			function(viewHtml, viewHelper, viewModel) {
				// Load html content into there containers
				$("#content").html(viewHtml);
				
				if(viewModel.loginRequired && !manager.library.isConnected) {
					manager.logHelper.appMessage('Login required');
				} else {
					viewModel.loadModelData();
				}
				
				// Get model from arguments
				var model = viewModel.model;
								
				// Make results observable
				model.results = serializeResults(model.results);
						
				// bind mappedData to view NOW...
				ko.applyBindings(model ,rootNode);
				
				// Execute the scripts for the 
				eval(viewHelper);
			},
			function(err) {
				// This would be a good place to notify system administrator 
				// of view that don't exists but are requested frequently...
				$("#content").html('<h1>The view you requested doesn\'t exists</h1>');
				var failedId = err.requireModules && err.requireModules[0];
				manager.logHelper.appMessage('Unable to navigate to requested view.');
		});
	}; // end navigateToView
	
	// Converts the data into Knockout observable object
	// data: JSON object 
	function serializeResults() {
		if(arguments.length == 0) {
			var errMsg = 'Missing parameter data (JSON)';
			throw new Error(errMsg);
		}
		
		return arguments[0];
		//return ko.mapping.fromJS(data);
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
	
	// Required for use when binding to HTML elements.
	// It helps avoid the this keyword reference when
	// binding to HTML element events
	var manager = new Manager();
	
	// Create new Manager
	return manager; // NOW...
}); // end Manager module
