window.manager = {
	activeApi: 'Select',
	apis: {},
	activateSelection: function() {
		window.activeDialog.close();

		let api = window.manager.apis[window.manager.activeApi];
		api.me((data)=>{

			let main = document.querySelector('#main');
			let el = document.createElement('div');

			el.innerHTML = JSON.stringify(data);
			main.appendChild(el);
		});
	}
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
		if(!api.ready()) {
			api.login();
		}
	};
}
