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
define(['toastr'], function(toastr) {
	try {
		var utils = {
			app: {
				version : '1.9.0',
				name : 'Account Manager',
				contact : 'Karega Scott',
				email : 'dev_ks@outlook.com',
				url : 'http://ksacctmgr.com'
			},
			isDebugging: ('undefined' != typeof DEBUGGING && 'boolean' == typeof DEBUGGING && DEBUGGING)
		};

		// TODO: Rethink log helper
		utils.logHelper = (function(toastr){
			var errInfo = document.getElementById('errorInfo');
			
			var LogHelper = function() {
				toastr.options.positionClass = 'toast-bottom-right';
				toastr.options.backgroundpositionClass = 'toast-bottom-right';
			} // end Log
			
			// Inherit from object
			LogHelper.prototype = new Object();
			
			LogHelper.prototype.clear = clear;
			function clear() {
				errorInfo.innerHTML = '';
				console.clear();
			}
			
			LogHelper.prototype.debug = debug;
			function debug(msg, title) {
				if('boolean' == typeof DEBUGGING && DEBUGGING) {
					console.debug('[AM] ' + msg);
				}
			}
			
			// Attach function to display error	
			LogHelper.prototype.error = error;
			function error(msg, title) {
				console.error(msg);
			} // end error
			
			// Attach function to display info	
			LogHelper.prototype.info = info;
			function info(msg, title) {
				if('boolean' == typeof DEBUGGING && DEBUGGING) {
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
				if('boolean' == typeof DEBUGGING && DEBUGGING) {
					console.warn(msg);
				} else {
					toastr.warning(msg, title, this.overrideOption);
				}
			} // end warning
		
			LogHelper.prototype.appMessage = appMessage;
			function appMessage(msgPrefix, msgObj) {
				clear();
				
				var msg = msgPrefix + (('undefined' !== typeof msgObj && 
						'undefined' !== typeof msgObj.error_description)? 
						msgObj.error_description: '');
				
				errorInfo.innerHTML = msg;
			}; // end appMessage
		
			return new LogHelper(); // NOW...
		})(toastr); // end LogHelper
		
		return utils; // NOW...
	} catch(e) {
		utils.logHelper.error('define(Utilities) Error: ' + e);
	}	
}); // end define utils
