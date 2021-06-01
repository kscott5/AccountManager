console.debugger = (console.debugger instanceof Function)? console.debugger: (data)=>console.debug(data);

window.manager = {
	template: function(text) {
		let pattern = /(\{\{)([a-zA-Z0-9._]+)(\}\})/g // template. use a combination of string.match(pattern), string.replace() and eval()
		let items = text.match(pattern);
		for(let index=0; index<items.length; index++) {
			let variable = items[index];
			let expression = variable.replace(`{{`,``).replace(`}}`,``);
			
			text = text.replace(variable, eval(expression));
		}

		return text;
	},

	activeApi: 'Select',
	apis: {},
};

// This script block called after the DOM load is complete.
window.onload = function() {
	let appName = document.querySelector('#appName');
	let library = document.querySelector('#library');
	let access = document.querySelector('#access');
	let main = document.querySelector('#main');

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
