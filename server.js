// https://nodejs.org/docs/latest-v15.x/api/http2.html
const http = require('http');
const querystring = require('querystring');
const path = require('path');
const fs = require('fs');

const publicFolder = path.join(process.cwd(), 'public');

const hostname = 'localhost'; // Development standard 127.0.0.1
const port = 80; // HTTP standard

const pagenotfound = '<html><body><h1>Account Manager page not found.</body></html>';

// This server uses these environment variables.
//
// AM_TENANT_ID='8c584db7-3fe3-4098-8651-2b14363c5f43'
// AM_CLIENT_ID='7c0c6428-b652-45b4-b4e5-6d9c7941cd74'
// AM_CLIENT_SECRET=<Azure Portal Application Registration - Certificate and Secrets>
//
// command-line option
//
// AM_TENANT_ID='<?>' AM_CLIENT_ID='<?>' AM_CLIENT_SECRET='<?>' node [inspect] webserver.js
//
const server = http.createServer((request,response) => {
	console.log(`${request.method.toUpperCase()}: ${request.url}`);

	debugger; // https://bit.ly/2SdN0eY

	if(indexService(request,response)) return;
	if(mircosoftCallbackService(request,response)) return;
	if(staticFileService(request,response)) return;

	response.statusCode = 404;
	response.setHeader('Content-Type', 'text/html');
	response.end(pagenotfound);
});

/*
 * Contents of the file are sent to the client.
 */
function readFileContent(httpResponse,file,contentType) {
	httpResponse.setHeader('Content-Type', contentType);

	fs.promises.readFile(file, {encoding: 'utf8'})
		.then((data) => {
			httpResponse.statusCode = 200;
			httpResponse.end(data);
		})
		.catch((err) => {
			httpResponse.statusCode = 404;
			httpResponse.end();
		});
}

/*
 * Controls view access on images, javascripts, stylesheets content.
 */
function staticFileService(httpRequest,httpResponse) {
	let file = path.join(publicFolder,httpRequest.url);
	let extname = path.extname(file);

	let contentType =  'text/plain';
	switch(extname) {
		case '.js':
			readFileContent(httpResponse,file,'text/javascript');
			break;

		case '.ico':
			readFileContent(httpResponse,file,'image/x-icon');
			break;

		case '.png':
			readFileContent(httpResponse,file,'image/png');
			break;

		case '.css':
			readFileContent(httpResponse,file,'text/css');
			break;

		default:
			 return false;
	}

	return true;
}

/*
 * Controls view access on home page.
 */
function indexService(httpRequest,httpResponse) {
	if(httpRequest.url != '/'  && httpRequest.url != '/index') return false;

	let file = path.join(publicFolder,'/index.html');
	readFileContent(httpResponse,file,'text/html');

	return true;
}

/*
 * Callback service used with Microsoft Graph API. 
 *
 * Javascript console example. F12 button on browser.
 * NOTE: Fiddler, JSFiddle and Postman are the same. 
 *
 * clear();
 * fetch('http://localhost:1270/callback', {
 * 		method: 'POST',
 * 		headers: { 
 * 			'Content-Type': 'application/json'
 * 		},
 * 		body: JSON.stringify({'name': 'Karega K Scott'})
 * })
 * .then(response => response.json())
 * .then((data) => { console.log(data);})
 */
function microsoftCallbackService(httpRequest,httpResponse) {
	if(httpRequest.url != '/microsoft/callback' || httpRequest.method != 'POST') return false;

	httpRequest.body = [];

	httpResponse.statusCode = 200;
	httpResponse.setHeader('Content-Type', 'text/json');
	
	httpRequest.on('data', (chuck) => { httpRequest.body.push(chuck); });
	httpRequest.on('end', () => { 
		httpRequest.body = Buffer.concat(httpRequest.body).toString();
		httpRequest.body = querystring.parse(httpRequest.body);

		microsoftAccessTokenService(httpResponse,httpRequest.body.code);
	});
	httpRequest.on('error', (err) => { httpResponse.end(JSON.stringify({err: err})); });
	
	return true;
}

/*
 * Gets a token used to access the Microsoft Graph API.
 */
function microsoftAccessTokenService(httpResponse,code) {
	const redirectUri = querystring.escape(`${process.env.AM_SCHEMA}://${hostname}:${port}/microsft/callback`);

	const formData = querystring.stringify({
		client_id: `${process.env.AM_CLIENT_ID}`,
		scope: 'user.read%20mail.read',
		code: `${code}`,
		redirect_uri: `${redirectUri}`,
		grant_type: 'authorization_code',
		client_secret: `${process.env.AM_CLIENT_SECRET}`
	});

	const httpRequest = http.request({
		host: 'login.microsoftonline.com',
		method: 'POST',
		path: `/${process.env.AM_TENANT_ID}/oauth2/v2.0/token`,
		headers: {
	 		'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(formData)
		}});

	httpRequest.on('response', (response) => {
		// send client the response data
		httpResponse.end(JSON.stringify(response));
	});

	httpRequest.end(formData);
}

// Starts the Account Manager simple web portal 
server.listen(port, hostname, () => {
	console.log(`Account Manager Server running on http://${hostname}:${port}`);
});
