function WindowsLive(clientId, tenantId) {
	this.clientId = clientId;
	this.tenantId = tenantId;
	this.loginUri = `https://url_to_windows_live_sdk/${tenantId}/`;
}

let wl_login_url = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code
&redirect_uri=${redirectUri}&response_mode=query&&scope=offline_access%20user.read%20mail.read&state=0123456789`;

WindowsLive.prototype.login = function() {
	let dialog = window.open(
}

WindowsLive.prototype.logout = function() {
}

WindowsLive.prototype.me = function() {
}
