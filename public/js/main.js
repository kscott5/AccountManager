console.debugger = (console.debugger instanceof Function)? console.debugger: (data)=>console.debug(data);

window.manager = {
	template: function(text) {
		let pattern = /*this regular expression*/  /(\{\{)([a-zA-Z0-9._]+)(\}\})/g;
		let items = /*the array from */ text.match(pattern);

		for(let index=0; index<items.length; index++) {
			let variable = items[index]; // an inline {{template}} 
			let expression = variable.replace(/*open token*/ `{{`, /*with empty string*/ `}}`)
					.replace(/*close token*/ `}}`, /*with empty string*/ ``);
			
			// NOTE: Expects the variable template between `{{` and `}}` is within block scope, var or let.
			text = text.replace(/*inline {{template}}*/ variable, /*with*/ eval(/*of*/ expression /*. example: 2 = eval(``)*/));
		}

		return text /*with updates*/;
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
