function MicrosoftGraph(appName,clientId) {
	if(!this instanceof MicrosoftGraph) {
		return new MicrosoftGraph(name,clientId);
	}

	this.clientId = clientId;
	this.appName = appName || 'Account Manager';
	this.resourceUrl = 'https://graph.microsoft.com/v1.0';
}

MicrosoftGraph.prototype.accesstoken = () => {
	return document.cookie.split("=")[1];
}

/*
 * Login with application conscent from person on website.
 */
MicrosoftGraph.prototype.login = function(target) {
	let responseType = 'token';
	let responseMode = 'form_post';
	let scopes = encodeURIComponent('openid offline_access user.read https://graph.microsoft.com/mail.read');
	let redirectUri = encodeURIComponent(`${document.location.origin}/microsoft/callback`);

	let url = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?
			client_id=${this.clientId}&response_type=${responseType}&
			response_mode=${responseMode}&redirect_uri=${redirectUri}&
			scope=${scopes}&state=12345`;

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
	client.onreadystatechange = () => {
		if(client.readyState = XMLHttpRequest.DONE && client.status == 204) {
			let data = client.responseText;
			console.log(`${data} on ${this.appName}`);
		}
	};

	let url = `${this.resourceUrl}/me/revokeSignInSessions`;
	client.open('POST', url);
	client.setRequestHeader('Authorization', `Bearer ${this.accesstoken()}`);
	client.send();
}

/*
 * Deletes all user application permissions.
 *
 * https://bit.ly/3ugekGL
 */
MicrosoftGraph.prototype.deletePermissions = function() {
	let client = new XMLHttpRequest();
	client.onreadystatechange = () => {
		if(client.readyState = XMLHttpRequest.DONE && client.status == 204) {
			let data = client.responseText;
			console.log(`${data} on ${this.appName}`);
		}
	};

	let url = `${this.resourceUrl}/oauth2PermissionGrant/user.read`;
	client.open('DELETE', url);
	client.setRequestHeader('Authorization', `Bearer ${this.accesstoken()}`);
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
	client.setRequestHeader('Authorization', `Bearer ${this.accesstoken()}`);
	client.setRequestHeader('Content-Type', 'application/json');
	client.send();
}
