function MicrosoftGraph(appName,clientId) {
	if(!this instanceof MicrosoftGraph) {
		return new MicrosoftGraph(name,clientId);
	}

	this.clientId = clientId;
	this.appName = appName || 'Account Manager';
	this.resourceUrl = 'https://graph.microsoft.com/v1.0/me';
}

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

MicrosoftGraph.prototype.logout = function() {
}

MicrosoftGraph.prototype.me = function() {
	let client = new XMLHHttpRequest();
	client.onreadystatechange = () => {
		if(client.readyState == XMLHttpRequest.DONE && client.status == 200) {
			let data = JSON.parse(client.responseText);
			console.log(data);
		}
	};

	let url = `${this.resourceUrl}`;
	client.open('GET', url);
	client.setHeader('Authorization', `Bearer ${document.cookie}`);
	client.setHeader('Content-Type', 'application/json');
	client.send();
}
