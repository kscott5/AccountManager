/* datacontext: data access and model management layer */

// create and add datacontext to the Ng injector
// constructor function relies on Ng injector
// to provide service dependencies
default.factory('datacontext',
    ['breeze', 'Q', 'model', 'logger', '$timeout',
    function (breeze, Q, model, logger, $timeout) {

        logger.log("creating datacontext");

        configBreeze();
		
        // TODO: Create a manager from new breeze.EntityManager("api/Default");
        //		 Then call manager.enableSaveQueuing(true);

        var datacontext = {
			metaData : new MetaData(),
            getData: getData
			// TODO: Add more methods here
        };
		
        return datacontext;

		// private
		function MetaData() {
			this.developer = "Karega Scott";
			this.description = "First Angular/Breeze application";
			this.email = "dev_ks@outlook.com";
			this.state = "Data context stubbed only";
			this.todo = "Contact breeze.EntityManager to some data source (ie. REST API)";		
		} // end MetaData

		function init
		// private
        function getData(forceRefresh) {
			// TODO: Create a query from breeze.EntityQuery object.
			//       Use the fluent method calls to from, expand,
			//		 orderby, etc.
			//		 
			//		 var query = breeze.EntityQuery
			//			.from("SomeObject").expand("AnotherObject)
			//			.orderby("FieldObject");
			
		
			// TODO: Then return the query result from calling the 
			//		 manager's executed query method. Use the fluent 
			//		 method call to then to handle successfully
			//		 execution of query.
			//
			//		 return manager.executeQuery(query)
            //    		.then(getSucceeded); // caller to handle failure
        }

		// private
        function configBreeze() {
            // configure to use the model library for Angular
            breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);

            // configure to use camelCase
            breeze.NamingConvention.camelCase.setAsDefault();

            // configure to resist CSRF attack
            var antiForgeryToken = $("#antiForgeryToken").val();
            if (antiForgeryToken) {
                // get the current default Breeze AJAX adapter & add header
                var ajaxAdapter = breeze.config.getAdapterInstance("ajax");
                ajaxAdapter.defaultSettings = {
                    headers: {
                        'RequestVerificationToken': antiForgeryToken
                    },
                };
            }
        } // end configBreeze
        
    }]);