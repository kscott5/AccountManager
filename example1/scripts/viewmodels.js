/**
	SomeViewModel is the controller for 
	retrieving model for the view.
	
	Remarks: Use this library as base for other ViewModels
*/
AcctMgrApp.SomeViewModel = (function(ko) {	
	// Desc: SomeModel object
	var SomeModel = function() {
		//TODO: Add any addition properties
	};

	// Page meta data configuration
	var config = AcctMgrApp.newConfig(
		"Account Manager: Index", "Self containing web app to help me understanding...", 
		"KnockoutJS, MVVM, Javascript, jQuery, atostr, Nginx, prototype, OO" );

	// Inherit from BaseModel object
	SomeModel.prototype = AcctMgrApp.getBaseModel(config);
	
	// Desc: Retrieves the model for SomeModel
	function getModel() {
		var model = new SomeModel();
		
		var data = getModelData();		
		model.results = {
			data: data,
			moreData: "Property that contains more info",
		};

		return model;
	} // end getModelForView	
	
	/***************************************************
	*		Section for data services functions
	****************************************************/
	// Remarks: private function
	function getModelData() {
		var data = ko.observableArray([
			{name: "name1", description: "description1"},
			{name: "name2", description: "description2"},
			{name: "name3", description: "description3"}
		]);
		
		return data;
	} // end getModelData

	return { getModel : getModel}; // NOW...
})(ko); // end SomeViewModel

