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
	
	// Show a modal dialog. Useful when executing
	// asynchronous javascript method
	Manager.prototype.openDialog = openDialog;
	function openDialog(title, html) {
		manager.logHelper.debug('Openning dialog...');
		$('#dialog').html(html);
		$('#dialog').dialog(
			{
				title: title,
				modal: true,
				resizable: false,
				width: 200,
				height: 200,
				position : { my: 'center', at: 'center', of: window}
			}
		);
	};
	
	// Close a modal dialog
	Manager.prototype.closeDialog = closeDialog;
	function closeDialog() {
		manager.logHelper.debug('Closing dialog...');
		$('#dialog').html('');
		$('#dialog').dialog().close();
	};
	
	// Attach methods
	Manager.prototype.navigateToView = navigateToView;
	
	Manager.prototype.initialize = initialize;
	function initialize() {
		manager.logHelper.debug('Manager initialize');		
		
		// NOTE: DO NOT ADD ANY jquery .bind() calls here
		//       add to applyDOMBindingsFirst()
		
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
	
	// Change the user library
	Manager.prototype.libraryChanged = libraryChanged;
	function libraryChanged() {	
		var libName = $(this).val();
		var dep = 'app/libs/{0}'.replace('{0}', libName);
		var cfg = globals.require.config;
		
		manager.logHelper.debug('Manager library changed - ' + libName);
				
		require(cfg, [dep], function(library) {
			manager.library = library;
			manager.navigateToView(document.location.hash);
		});
	};
	
	// NOTE: When ko.clearNode is called it removes ALL
	//       bindings. This function was created to ensure 
	//       jquery bindings are apply at correct time
	function applyDOMBindingsFirst() {
		ko.cleanNode(rootNode); // clear it

		manager.library.refresh();
		
		$('.navigationItem').bind('click', function() {	
			manager.navigateToView($(this).attr('href'));
			return true;
		});
	
		$('a[href=#mail]').text(manager.library.imap.name);
		$('a[href=#folders]').text(manager.library.foldersfiles.name);
		
		// NOTE: be carefully not to attach the actual function,
		//       manager.libraryChanged() will cause infinite loop
		$('#library').bind('change', manager.libraryChanged);
	};
	
	// 1) Determines which view to show
	// 2) Injects the dependencies into shell
	// 3) Then binds data results to everything
	//
	// REMEMBER: Convention over 
	//					Configuration
	function navigateToView(hash, optionalViewModel) {
		manager.logHelper.clear();
	
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
					applyDOMBindingsFirst();
			
					// Optional View Model used for async javascript execution
					// It has a property called asyncLoadComplete when set
					// to true prevents loading the data again
					// This happens internal to the optional view model and
					// the library it used to pull the data it needs.
					viewModel = optionalViewModel || viewModel;
					
					// Load html content into there containers
					$("#content").html(viewHtml);
					
					if(viewModel.loginRequired && !manager.library.isConnected) {
						manager.logHelper.appMessage('Login required');
					} else {
						viewModel.loadModelData();
					}
									
					// Make results observable
					var koModelBinding = serializeResults(viewModel);
							
					// bind mappedData to view NOW...
					ko.applyBindings(koModelBinding ,rootNode);
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
