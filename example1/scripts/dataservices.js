AcctMgrApp.DataServices = (function() {
	return {
		getData : function() {
			var msg = "The point behind MVC, MVP or MVVM is to provide a\n" +
					  "resuable patterns and frameworks for handling \n" +
					  "data access and binding to the UI via a control\n" +
					  "handler. This handler is also known as a controller in\n" +
					  "MVC pattern, presenter in the MVP pattern and,\n" +
					  "viewmodel in MVVM pattern. This is essential because we\n" +
					  "NEVER want developers by-passing the handler to access\n" +
					  "data directly via the UI. Data access is part of the \n" +
					  "handler, in this case the viewmodel. So this method\n" +
					  "is here pure for eductional purpose. \n\n\n" +
					  "--Karega Scott ;-)\n";
			AcctMgrApp.Logger.error(msg);
			alert(msg);
		},
	};
})(); // end AcctMgrApp.DataServices