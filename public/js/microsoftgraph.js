var cookieOptions = `;domain=${document.location.hostname};path=/;samesite=strict;secure=false;httponly=false;max-age=600`; 

function MicrosoftGraph(appName,clientId) {
	if(!this instanceof MicrosoftGraph) {
		return new MicrosoftGraph(name,clientId);
	}

	this.clientId = clientId;
	this.appName = appName || 'Account Manager';
	this.resourceUrl = 'https://graph.microsoft.com/v1.0';
}

MicrosoftGraph.prototype.ready = function() { 
	return (document.cookie.split("=")[0] || '') == 'access_token';
}

MicrosoftGraph.prototype.accesstoken = function(){
	return (this.ready)? document.cookie.split("=")[1]:'';
}

MicrosoftGraph.prototype.activateSelection = function() {
		if(window.manager.activeDialog)
			window.manager.activeDialog.close();

		this.me().mail();
		
		alert("Detail api JSON view in developer console press F12 key.");
	}
/**
 * Login with application conscent from person on website.
 */
MicrosoftGraph.prototype.login = function(options) {
	options = (typeof options != "object") || {};

	let responseType = 'token';
	let responseMode = 'form_post';
	let scopes = encodeURIComponent('openid offline_access user.read https://graph.microsoft.com/mail.read');
	let redirectUri = encodeURIComponent(`${document.location.origin}/microsoft/callback`);

	let url = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?
			client_id=${this.clientId}&response_type=${responseType}&
			response_mode=${responseMode}&redirect_uri=${redirectUri}&
			scope=${scopes}&state=12345`;

	let features = "menubar=no,location=yes,resizable=no,scrollbars=yes,status=yes";
	window.manager.activeDialog = window.open(url, options.title || this.appName, features);

	return this;
}

/**
 * Logout revokes the login session.
 *
 * https://bit.ly/3hMzv0F
 */
MicrosoftGraph.prototype.logout = function(options) {
	options = (typeof options != "object") || {};
	
	let client = new XMLHttpRequest();
	client.onreadystatechange = () => {
		if(client.readyState = XMLHttpRequest.DONE && client.status == 204) {
			let data = client.responseText;
	
			(options.target instanceof Function)? 
				options.target(data): console.log(`${data} on ${this.appName}`);
		}
	};

	let url = `${this.resourceUrl}/me/revokeSignInSessions`;
	client.open('POST', url);
	client.setRequestHeader('Authorization', `Bearer ${this.accesstoken()}`);
	client.send();

	return this;
}

/**
 * Deletes all user application permissions.
 *
 * https://bit.ly/3ugekGL
 */
MicrosoftGraph.prototype.deletePermissions = function(options) {
	options = (typeof options != "object") || {};

	let client = new XMLHttpRequest();
	client.onreadystatechange = () => {
		if(client.readyState = XMLHttpRequest.DONE && client.status == 204) {
			let data = client.responseText;

			(options.target instanceof Function)? 
				options.target(data): console.log(`${data} on ${this.appName}`);
		}
	};

	let url = `${this.resourceUrl}/oauth2PermissionGrant/user.read`;
	client.open('DELETE', url);
	client.setRequestHeader('Authorization', `Bearer ${this.accesstoken()}`);
	client.send();

	return this;
}

function listProfileOfMe(data) {
	console.debugger(`listProfileOfMe: ${JSON.stringify(data)}`);
	document.cookie = `microsoft:profile:me=${data['@odata.context']}${cookieOptions}`;

	let container = document.createElement('div');
	let anchor = document.createElement('a');

	anchor.href = `${data.id}`;
	anchor.setAttribute('email', data.mail);
	anchor.textContent = `Hello ${data.givename || data.displayName || data.mail}`;
	
	container.appendChild(anchor);
	return container;
}

MicrosoftGraph.prototype.me = function(options) {
	console.debugger(`graph me`);
	options = (typeof options != "object") || {};

	let client = new XMLHttpRequest();
	client.onreadystatechange = () => {
		if(client.readyState == XMLHttpRequest.DONE && client.status == 200) {
			let data = JSON.parse(client.responseText);

			if(options.target instanceof Function) {
				options.target(data);
			} else {
				let main = document.querySelector('#main');
				main.appendChild(listProfileOfMe(data));
			}
		}
	};

	let url = `${this.resourceUrl}/me`;
	client.open('GET', url);
	client.setRequestHeader('Authorization', `Bearer ${this.accesstoken()}`);
	client.setRequestHeader('Content-Type', 'application/json');
	client.send();

	return this;
}

function listMailFolders(data) {
	console.debugger(`listMailFolderis`);

	document.cookie = `microsoft:mail:folders=${data['@odata.context']}${cookieOptions}`;

	let container = document.createElement('div');
	for(let index=0; index<data.value.length; index++) {
		let folder = data.value[index];
		console.debugger(folder);

		let anchor = document.createElement('a');
		anchor.href = `${folder.id}`;
		anchor.textContent = `${folder.displayName} ${folder.unreadItemCount}`;
		container.appendChild(anchor);
	}

	return container;
}

function listMailFolderItems(folder, data) {
	console.debugger(`listMailFolderItems: ${folder}`);
	document.cookie = `microsoft:mail:${folder}=${data['@odata.content']}${cookieOptions}`;
	
	let container = document.createElement('div');
	for(let index=0; index<data.value.length; index++) {
		console.debugger(data.value[item]);

		let item = data.value[index];
		let anchor = document.createElement('a');

		anchor.href = `${item.id}`;
		anchor.setAttribute('itemid',item['@odata.etag']);

		anchor.textContent = item.subject;
		container.appendChild(anchor);
	}

	return container;
}

MicrosoftGraph.prototype.mail = function(options) {
	console.debugger(`graph mail`);
	options = (typeof options != "object") || {};

	let client = new XMLHttpRequest();
	client.onreadystatechange = () => {
		if(client.readyState == XMLHttpRequest.DONE && client.status == 200) {
			let data = JSON.parse(client.responseText);

			if(options.target instanceof Function) {
				options.target(data);
			} else {
				let main = document.querySelector('#main');
				main.appendChild(listMailFolders(data));
			}
		}
	};

	let filters = options.filters || {};
	let url = `${this.resourceUrl}/me/mailFolders`;
	client.open('GET', url);
	client.setRequestHeader('Authorization', `Bearer ${this.accesstoken()}`);
	client.setRequestHeader('Content-Type', 'application/json');
	client.send();

	return this;
}
