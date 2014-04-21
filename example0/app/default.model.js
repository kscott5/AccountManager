/* model: extend server-supplied metadata with client-side entity model members */
default.factory('model', function () {

    var datacontext;
    
    var model = {
        init: init
    };
    
    return model;
  
    //#region private members
    function init(context) {
        datacontext = context;
        //var store = datacontext.metadataStore;
        //store.registerEntityTypeCtor("ChildObject", null, initChildObject);
        //store.registerEntityTypeCtor("ParentObject", ParentObject, initParentObject);
    } // end init
    
    function initChildObject(childObject) {
        childObject.errorMessage = "";
    }

    function initParentObject(parentObject) {
        parentObject.errorMessage = "";
        parentObject.newTodoTitle = "";
        parentObject.isEditingListTitle = false;
    }    
});