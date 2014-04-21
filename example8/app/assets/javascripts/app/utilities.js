/**
	Defines module for the Account Manager Application.
	Module contains basic utility functionality.
	Module has the following dependency(s) by module id:
	
		ID			Module
		--			----------------------------------
		toastr:		logging library
	
	Module Id: utilities
	Returns: Utilities
*/
define('app/utilities', ['toastr'], function(toastr) {
	var utils = {
		app: {
			version : '1.0.0',
			name : 'Account Manager',
			contact : 'Karega Scott',
			email : 'dev_ks@outlook.com',
			url : 'http=//ksacctmgr.com'
		},
	};
	
	/***************************************************
	*		Section for Log Helper
	****************************************************/
	utils.logHelper = (function(toastr){
		var LogHelper = function() {
			toastr.options.positionClass = 'toast-bottom-right';
			toastr.options.backgroundpositionClass = 'toast-bottom-right';
		} // end Log
		
		// Inherit from object
		LogHelper.prototype = new Object();
		
		LogHelper.prototype.debug = debug;
		function debug(msg, title) {
			if('undefined' != typeof DEBUGGING) {
				console.debug(msg);
			}
		}
		
		// Attach function to display error	
		LogHelper.prototype.error = error;
		function error(msg, title) {
			if('undefined' != typeof DEBUGGING) {
				console.error(msg);
			} else {
				toastr.error(msg, title, this.overrideOption);
			}			
		} // end error
		
		// Attach function to display info	
		LogHelper.prototype.info = info;
		function info(msg, title) {
			if('undefined' != typeof DEBUGGING) {
				console.info(msg);
			} else {
				toastr.info(msg, title, this.overrideOption);
			}
		} // end info

		// Attach function to display success	
		LogHelper.prototype.success = success;
		function success(msg, title) {
			toastr.succes(msg, title, this.overrideOption);
		} // end success

		// Attach function to display error	
		LogHelper.prototype.warning = warning;
		LogHelper.prototype.warn = warning;
		function warning(msg, title) {
			if('undefined' != typeof DEBUGGING) {
				console.warn(msg);
			} else {
				toastr.warning(msg, title, this.overrideOption);
			}
		} // end warning
	
		return new LogHelper(); // NOW...
	})(toastr); // end LogHelper
	
	/***************************************************
	*		Section for Object Helper
	****************************************************/
	utils.objectHelper = (function(logHelper) { // 'var logHelper' is define previously above
	
		// User Object
		var User = function() {
			this.firstName = '';
			this.lastName = '';
			this.userName = '';
			this.email = '';
			this.password = '';
			this.passwordConfirmation = '';
			this.isAuthenticated = false;
			this.token = '';
		};
		
		// Inherit from Object
		User.prototype = new Object();
		function newUser() {
			return new User();
		}; // end newUser
		
		// Base View Model Object
		var BaseViewModel = function() {
			if(arguments.length == 0 || arguments[0].length < 2) {
				var errMsg = 'Missing the following arguments (order important): \n' +
							  '\tinitFunc: Function call during initialization\n' +
							  '\tsaveFunc: Function call during save\n';	
				throw Error(errMsg);
			} //end if
			
			// Log via toastr
			this.logHelper = logHelper;
			
			// Properties
			this.model = null;

			// Wire-up function callbacks
			var self = this;		
			var args = arguments[0];

			// NOTE: Used var here to avoid external access
			//		 Then wrap call within access method
			var initCallback = args[0];
			initCallback(self); // Should happen once
			
			// NOTE: Used var here to avoid external access
			//		 Then wrap call within access method
			var saveCallback = args[1];
			this.saveView = function() {
				saveCallback(self);
			}; // end saveView
		} // end BaseViewModel
		
		// Return a new BaseViewModel
		function newBaseViewModel() {
			return new BaseViewModel(arguments);
		}; // end newBaseViewModel
		
		// Base Model Object
		var BaseModel = function() {		
			this.title = '';
			this.description = '';
			this.keywords = '';
			this.name = '';
			
			this.user = new User();
			this.app = utils.app;
			
			this.error = new SysError();
			this.results = {}; // use hash to allow dynamic model results
		} // end BaseModel

		// Inherit from Object
		BaseModel.prototype = new Object();
		
		// Returns BaseModel to attach to current model
		function newBaseModel() {
			return new BaseModel();
		}; //end newBaseModel
		
		/***************************************************
		*		Section for common Error functions
		****************************************************/	
		// Applicatioin error object
		var SysError = function(){
			this.isPresent = false;
			this.message = '';
			this.code = '';
			this.functionName = ''
		}; // end constructor

		// Inherit from object
		SysError.prototype = new Object();			
		
		function newSysError() {
			return new SysError();
		}; // end newSysError
		
		return {
			newBaseViewModel: newBaseViewModel,
			newBaseModel: newBaseModel,
			newSysError: newSysError,
			newUser: newUser,
		} // NOW...
	})(utils.logHelper); // end Object Helper	
			
	return utils; // NOW...
}); // end define utils
