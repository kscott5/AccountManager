console.debugger = (console.debugger instanceof Function)? console.debugger: (data)=>console.debug(data);

window.manager = {
	activeApi: 'Select',
	apis: {},
};

// This script block called after the DOM load is complete.
window.onload = function() {
	library.onchange = function() {
		let selection = library.value.split(':');
		let clientName = selection[0], clientId = selection[1];

		if(clientName == 'Microsoft') {
			window.manager.activeApi = clientName ;

			window.manager.apis[clientName] = 
				window.manager.apis[clientName] || 
				new MicrosoftGraph(appName.textContent,clientId);
		}
		
		let api = window.manager.apis[window.manager.activeApi];
		if(api.ready()) 
			api.activateSelection();
		else
			api.login();
	};
}
