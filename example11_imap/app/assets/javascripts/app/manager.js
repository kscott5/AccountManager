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
define(['jquery', 'jqueryUI', 'ko', 'app/utilities'], 
	function($, jQueryUI, ko,utils) {	
	// rootNode to document root <HTML></HTML>. This allows me to
	// provide UI binding throughout the entire xml document
	var rootNode = window.document.documentElement;

	// Handler for login complete
	function loginComplete(event, data) {
		manager.logHelper.debug('Manager received login complete');
		manager.navigateToView(document.location.hash);
	}; // end loginComplete
	
	// Change to the user selected library
	function setUserSelectLibrary(libraryName) {	
		var dep = 'app/libs/{0}'.replace('{0}', libraryName);
		var cfg = globals.require.config;
		
		if(typeof manager.library != 'undefined' && manager.library.value != libraryName) {
			manager.logHelper.debug('Manager library changing to ' + libraryName);
			// Prevents manager from observing multiple libraries
			manager.removeListener(manager.library, globals.LOGIN_COMPLETE_LISTENER);
			manager.removeListener(manager.library, globals.LOGOUT_COMPLETE_LISTENER);
		} // end if
		
		require(cfg, [dep], function(library) {
			manager.library = library;

			// Allows manager to observe changes in library
			manager.addListener(manager.library, globals.LOGIN_COMPLETE_LISTENER, loginComplete);
			manager.addListener(manager.library, globals.LOGOUT_COMPLETE_LISTENER, logoutComplete);	
			
			manager.navigateToView(document.location.hash);
		}); // end require
	}; // end setUserSelectLibrary

	// Handler for logout complete
	function logoutComplete(event) {
		manager.navigateToView(document.location.hash);
	}; // end logoutComplete
	
	// Get dependencies array for requireJS
	function getDependenciesArray(viewName) {
		// Create list of dependencies to dynamically
		// load view html and script via requireJS
		return  [
			'text!app/views/{0}.html'.replace('{0}', viewName),// parameter mapping = viewHtml 
			'app/models/{0}'.replace('{0}', viewName) // parameter mapping = viewModel
		];
	}; // end getDependenciesArray

	// NOTE: When ko.clearNode is called it removes ALL
	//       bindings. This function was created to ensure 
	//       jquery bindings are apply at correct time
	function applyDOMBindings() {
		manager.logHelper.debug('Manager apply DOM bindings');
		ko.cleanNode(rootNode); // clear it

		// turn change off and on
		$('#library').off(globals.ACCOUNT_MANAGER_CHANGED_LISTENER);
		$('#library').on(globals.ACCOUNT_MANAGER_CHANGED_LISTENER, manager.libraryChanged);
		
		// turn clicks off before on
		$('.navigationItem').off(globals.ACCOUNT_MANAGER_CLICK_LISTENER);
		$('.navigationItem').on(globals.ACCOUNT_MANAGER_CLICK_LISTENER, function() {	
			manager.navigateToView($(this).attr('href'));
			return true;
		});
		
		// update the links using library
		$('a[href=#mail]').text(manager.library.imapLinkName);
		$('a[href=#folders]').text(manager.library.folderLinkName);
	
		// turn click off before on
		$('#header #session #status').off('click');
		if(manager.library.isLoggedIn()) {
			var data = manager.library.getUser();
			$('#header #session #user').html(
				'Welcome back <span id=\"fullname\" name=\"fullname\">{0}</span>!'
				.replace('{0}', data.fullname || data.email));

			$('#header #session #status').html('Logout');
			$('#header #session #status').on(globals.ACCOUNT_MANAGER_CLICK_LISTENER, manager.library.logout);
		} else {
			$('#header #session #user').html('');
			
			$('#header #session #status').html('Login');
			$('#header #session #status').on(globals.ACCOUNT_MANAGER_CLICK_LISTENER, manager.library.login);
		} // end is connected check
	}; // end applyBindings
		
	// Defines Manager as function
	var Manager = function() {		
		this.app = utils.app;
		this.logHelper = utils.logHelper;
		this.library = undefined;
	} // end Manager Constructor	
	
	// Initialize manager 
	Manager.prototype.initialize = initialize;
	function initialize() {
		// One time initialization of libraries
		$('#library').empty();
		$(globals.libraries).each(function() {
			var option = document.createElement('option');
			option.text = this.text; 
			option.value = this.value;
			$(option).attr('selected', globals.windowslive.value == this.value);
			$('#library').append(option);
		});
			
		// default to windows live library
		setUserSelectLibrary(globals.windowslive.value);
	};
	
	// FUN STUFF... Design Patterns observable
	// Adds listener
	Manager.prototype.addListener = addListener;
	function addListener(listener, listenerName, callback) {
	
		switch(listenerName) {
			case globals.ACCOUNT_MANAGER_CLICK_LISTENER:
			case globals.LOGIN_COMPLETE_LISTENER:
			case globals.LOGOUT_COMPLETE_LISTENER:
			case globals.VIEWMODEL_LOAD_COMPLETE_LISTENER:
				$(listener).on(listenerName, callback);
				break;
				
			default:
				throw new Error('Manager add listener doesn\'t support ' + listenerName);
		} // end switch
		
	}; // end addListener
	
	// Removes listener
	Manager.prototype.removeListener = removeListener;
	function removeListener(listener, listenerName, callback) {
	
		switch(listenerName) {
			case globals.ACCOUNT_MANAGER_CLICK_LISTENER:
			case globals.LOGIN_COMPLETE_LISTENER:
			case globals.LOGOUT_COMPLETE_LISTENER:
			case globals.VIEWMODEL_LOAD_COMPLETE_LISTENER:
				$(listener).off(listenerName, callback);
				break;
				
			default:
				throw new Error('Manager remove listener doesn\'t support ' + listenerName);
		} // end switch

	}; // end removeListener
	
	// Change the user library
	Manager.prototype.libraryChanged = libraryChanged;
	function libraryChanged() {	
		// Facade or wrap required to allow event handling
		setUserSelectLibrary($(this).val());
	};
	
	// 1) Determines which view to show
	// 2) Injects the dependencies into shell
	// 3) Then binds data results to everything
	//
	// REMEMBER: Convention over 
	//					Configuration
	Manager.prototype.navigateToView = navigateToView;
	function navigateToView(hash) {
		manager.logHelper.clear();
		
		// Must be first to ensure bindings aren't overwritten
		// when we call ko.applyBindings below...
		applyDOMBindings();

		// extract only the value of hash
		// Ex. viewName = folder for the following expression
		//     #folder/1235-dffgs-546gf-hkldkvfk
		var viewName = (hash || 'home').replace('#','').trim().split('/')[0];
		manager.logHelper.debug('Manager navigateToView('+viewName+')');
		
		// Get the configuration to use and dependencies to load
		var cfg = globals.require.config;
		var deps = getDependenciesArray(viewName);
		
		// Use requireJS to load the view's dependencies
		// This is load asyc, so you can predict when it
		// with call the callback function. But it will...
		//
		// NOTES: http://requirejs.org/docs/1.0/docs/api.html#jsfiles
		//    If you want  to load some JavaScript files, use the require() API.
		//    If there is already a require() in the page, you can use the requireJS()
		//    THIS IS BS cause they both reference the same object.
		//    to access the RequireJS API for the loading scripts
		require(cfg, deps, function(viewHtml, viewModel) {
			$(function() {
					// Prevent loading model data if login required
					if(viewModel.isLoginRequired() && !manager.library.isLoggedIn()) {
						manager.logHelper.appMessage('Login required');
						$('#content').html('<h1>Login required</h1>');
					} else {
					
						// Observer the viewModel
						manager.addListener(viewModel, globals.VIEWMODEL_LOAD_COMPLETE_LISTENER, function(event, data) {

							manager.logHelper.debug('Manager received viewmodel load complete');
							
							// Load html content into there containers
							$("#content").html(viewHtml);
												
							// bind mappedData to view NOW...
							ko.applyBindings(viewModel ,rootNode);
						
							// Stop observing this viewModel to prevent multiple listeners
							manager.removeListener(viewModel, globals.VIEWMODEL_LOAD_COMPLETE_LISTENER);
						});
						
						viewModel.loadModelData();
					} // end if
		
				});
			},
			function(err) {
				// This would be a good place to notify system administrator 
				// of view that don't exists but are requested frequently...
				$("#content").html('<h1>The view you requested doesn\'t exists</h1>');
				var failedId = err.requireModules && err.requireModules[0];
				manager.logHelper.appMessage('Unable to navigate to requested view.' + (failedId || ''));
		});
	}; // end navigateToView
	
	// Use knockout to convert the object to json
	// before creating a jQuery plain object
	Manager.prototype.toPlainObject = toPlainObject;
	function toPlainObject(o) {		
		if(typeof o == 'undefined' && typeof o != 'object' && typeof o != 'boolean' && typeof o != 'string') {
			throw new Error('Manager can not create event for  o typeof ' + typeof o);
		}
				
		return ko.toJS(o);
	}; // end toPlainObject
	
	// Required for use when binding to HTML elements.
	// It helps avoid the this keyword reference when
	// binding to HTML element events
	var manager = new Manager();
	
	// Create new Manager
	return manager; // NOW...
}); // end Manager module
