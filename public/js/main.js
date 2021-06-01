console.debugger = (console.debugger instanceof Function)? console.debugger: (data)=>console.debug(data);

window.manager = {
	activeApi: 'Select',
	apis: {},
	activateSelection: function() {
		console.clear();

		if(window.activeDialog)
			window.activeDialog.close();
		let main = document.querySelector('#main');
		
		let api = window.manager.apis[window.manager.activeApi];
		api.me((data)=>{
			console.log("Profile data:");
			console.log(data);

			let html = parseData(data);
			main.appendChild(html);
		});			
		api.mail((data)=>{
			console.log("Mail folders:");
			console.log(data);

			let html = parseData(data);
			main.appendChild(html);
		});
		
		alert("Detail api JSON view in developer console press F12 key.");
	}
};

function parseData(data) {
	let div = document.createElement('div');

	for(var key in data) {
		let label = document.createElement('label');
		
		label.textContent = key.concat(':');

		let html
		if(data[key] instanceof Object) {
			html = parseData(data[key]);
		} else {
			html = document.createElement('span');
			html.textContent = data[key];
		}

		div.appendChild(label);
		div.appendChild(html);
	}

	return div;
}

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
			window.manager.activateSelection();
		else
			api.login();
	};
}
