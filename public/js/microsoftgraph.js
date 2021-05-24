function MicrosoftGraph(appName,clientId) {
	if(!this instanceof MicrosoftGraph) {
		return new MicrosoftGraph(name,clientId);
	}

	this.clientId = clientId;
	this.appName = appName || 'Account Manager';
	this.resourceUrl = 'https://graph.microsoft.com/v1.0';
}

/*
 * Login with application conscent from person on website.
 */
MicrosoftGraph.prototype.login = function(target) {
	let responseType = 'token';
	let responseMode = 'form_post';
	let scopes = encodeURIComponent('user.read https://graph.microsoft.com/mail.read');
	let redirectUri = encodeURIComponent(`${document.location.origin}/microsoft/callback`);

	let url = `https://login.microsoftonline.com/common/oauth2/v2.0/authroize?
			client_id${this.clientId}&response_type=${responseType}&
			response_mode=${responseMode}&redirect_uri=${redirectUri}&
			scopes=${scopes}`;

	let features = "menubar=no,location=yes,resizable=no,scrollbars=yes,status=yes";
	window.activeDialog = window.open(url,target || this.appName, features);
}

/*
 * Logout revokes the login session.
 *
 * https://bit.ly/3hMzv0F
 */
MicrosoftGraph.prototype.logout = function() {
	let client = new XMLHttpRequest();
	client.onreadystatechange = () {
		if(client.readyState = XMLHttpRequest.DONE && client.status == 204) {
			let data = client.responseText;
			console.log(`${data} on ${this.appName}`);
		}
	};

	let url = `${this.resourceUrl}/me/revokeSignInSessions`;
	client.open('POST', url);
	client.setHeader('Authorization', `Bearer ${document.cookie}`);
	client.send();
}

/*
 * Deletes all user application permissions.
 *
 * https://bit.ly/3ugekGL
 */
MicrosoftGraph.prototype.deletePermissions = function() {
	let client = new XMLHttpRequest();
	client.onreadystatechange = () {
		if(client.readyState = XMLHttpRequest.DONE && client.status == 204) {
			let data = client.responseText;
			console.log(`${data} on ${this.appName}`);
		}
	};

	let url = `${this.resourceUrl}/oauth2PermissionGrant/`;
	client.open('DELETE', url);
	client.setHeader('Authorization', `Bearer ${document.cookie}`);
	client.send();
}

MicrosoftGraph.prototype.me = function() {
	let client = new XMLHttpRequest();
	client.onreadystatechange = () => {
		if(client.readyState == XMLHttpRequest.DONE && client.status == 200) {
			let data = JSON.parse(client.responseText);
			console.log(data);
		}
	};

	let url = `${this.resourceUrl}/me`;
	client.open('GET', url);
	client.setHeader('Authorization', `Bearer ${document.cookie}`);
	client.setHeader('Content-Type', 'application/json');
	client.send();
}
