/*
	Defines base model with overrall structure. Begin with _base as your starting point.
*/
define(['jqueryExtend', 'app/utilities'], function($, utils) {
	try {
		function MODELBASE() {
		}; // end ModelBase
		
		MODELBASE.prototype.instance = modelbaseInstance;
		function modelbaseInstance(title, description, keywords, isRequired) {
			var self = {			
				title: title,
				description: description,
				keywords: keywords,
				app: utils.app,				
				model: {},
			
				isLoginRequired: function() { return isRequired; }
			};
			
			return self;
		};
			
		var modelbase = new MODELBASE();
		
		return modelbase;
	} catch(e) {
		utils.logHelper.error('define(MODELBASE) Error: ' + e);
	}
}); // end define Model Base