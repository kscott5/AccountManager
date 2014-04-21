/* Defines the "todo view" controller
 * Constructor function relies on Ng injector to provide:
 *     $scope - context variable for the view to which the view binds
 *     breeze - breeze is a "module" known to the injectory thanks to main.js
 *     datacontext - injected data and model access component (todo.datacontext.js)
 *     logger - records notable events during the session (about.logger.js)
 */
default.controller('DefaultController',
    ['$scope', 'breeze', 'datacontext', 'logger',
    function ($scope, breeze, datacontext, logger) {

        logger.log("creating DefaultController");
        var removeList = breeze.core.arrayRemoveItem;

        $scope.response = [];
        $scope.error = "";
		$scope.stub = stub;
        $scope.clearErrMsg = clearErrorMsg;

        // initialize immediately 
        $scope.init();		

        // private
        function init() {
			$scope.response = new DefaultResponse();
        } // end init

		// private
		function DefaultResponse() {
			this.metaData = datacontext.metaData;
			this.data = {};
		}
		
		// private
        function stub(obj) { 
			var element = $(obj);
			$scope.error = "Create click action for " + element.id + " " + element.innerText;
			logger.log(msg);			
		} //end stub

		// private
        function clearErrorMsg(obj) {
            if (obj && obj.errorMessage) {
                obj.errorMessage = null;
            }
        } // end clearErrorMsg
    }]
);