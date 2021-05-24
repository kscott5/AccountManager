const http = require('http');
const querystring = require('querystring');
const path = require('path');
const fs = require('fs');

// This server uses these environment variables.
//
// AM_CLIENT_ID='7c0c6428-b652-45b4-b4e5-6d9c7941cd74'
// AM_CLIENT_SECRET=<Azure Portal Application Registration - Certificate and Secrets>
// AM_CORS_ORIGINS='<Comma seperated list of urls or * where * is allow all. default: http://localhost>'
// AM_CORS_METHODS='<Comma seperated list of http verbs. defaults: GET, POST>'
// AM_CORS_HEADERS='<Comma seperated list of request headers>'
//
// AM_DEFAULT_PAGE='index'. default
// AM_DEFAULT_EXTENSION='.html' default
//
// command-line option
//
// AM_CLIENT_ID='<?>' AM_CLIENT_SECRET='<?>' AM_CORS_ORIGINS='<?>' node [inspect] server.js
//
// NOTE: command-line needs administrator privileges. 
//
// linux:   this is sudo, su or group prossible.
// windows: this is 'Run As'
const origins = process.env.AM_CORS_ORIGINS || 'http://localhost';
const methods = process.env.AM_CORS_METHODS || 'POST, GET';
	
const defaultpage = process.env.AM_DEFAULT_PAGE || 'index';
const defaultext = process.env.AM_DEFAULT_EXTENSION || '.html';

const publicFolder = path.join(process.cwd(), 'public');
const hostname = 'localhost'; // Development standard 127.0.0.1
const port = 80; // HTTP standard

const pagenotfound = '<html><body><h1>Account Manager page not found.</body></html>';

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
 * Controls view access of a cross-origin CORS request or different url endpoint.
 *
 * NOTE: possible error message
 *
 * Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://...
 * (Reason: CORS header ‘Access-Control-Allow-Origin’ missing)
 *  
 * https://mzl.la/3fgVL0S
 */
function crossSiteService(httpRequest,httpResponse) {
	if(httpRequest.method != 'OPTIONS' && methods.match(httpRequest.method) == null) return;

	if(typeof origins != 'string') return;

	const origin = httpRequest.headers.origin || '';
	if(origins.match('[*]') == null /*asterisk, a wildcard of any, not found*/ && origins.match(origin) == null  /*origin not found*/) return;

	httpResponse.statusCode = 200;
	httpResponse.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
	httpResponse.setHeader('Access-Control-Allow-Headers', 'Access-Token, Content-Type');
	httpResponse.setHeader('Access-Control-Allow-Origin', origin);
}

/*
 * Callback service used with Microsoft Graph API. 
 *
 * Javascript console example. F12 button on browser.
 * NOTE: Fiddler, JSFiddle and Postman are the same. 
 *
 * clear();
 * fetch('http://localhost/callback', {
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
	if(httpRequest.url != '/microsoft/callback' /*|| httpRequest.method != 'POST'*/) return false;

	httpRequest.body = [];

	httpResponse.statusCode = 200;
	httpResponse.setHeader('Content-Type', 'text/html');

	httpRequest.on('data', (chuck) => { httpRequest.body.push(chuck); });
	httpRequest.on('end', () => { 
		httpRequest.body = Buffer.concat(httpRequest.body).toString();
		httpRequest.body = querystring.parse(httpRequest.body);

		httpResponse.setHeader('set-cookie',[`access_token=${httpRequest.body.access_token}; SameSite=Strict`]);
		httpResponse.end(`<!DOCTYPE html><html lang='en lang='en'>
<body><script>(()=>{opener.callback.close();})();</script></body></html>`);

	});
	httpRequest.on('error', (err) => { httpResponse.end(JSON.stringify({err: err})); });
	
	return true;
}

/*
 * Controls view access on images, javascripts, stylesheets content.
 */
function staticFileService(httpRequest,httpResponse) {
	if(httpRequest.method != 'GET') return;

	let file = path.join(publicFolder,httpRequest.url);
	let extname = path.extname(file);

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

		case '': // Control access to a directory home page			
			file = (/*what if*/ file.endsWith('/public/'))? /*then*/
				file.concat(defaultpage).concat(defaultext)  : /*else*/
					file.concat(defaultext);
	
			fs.promises.realpath(file)
				.then(()=>{
					readFileContent(httpResponse,file,'text/html');
				})
				.catch((error)=>{
					console.log(error.message);
				});
			break;

		default:
			return false;
	}

	return true;
}

// Create a new http server
const server = http.createServer({});

// Server answers all client request
server.on('request', (request,response) => {
	console.log(`${request.method.toUpperCase()}: ${request.url}`);

	debugger; // https://bit.ly/2SdN0eY

	crossSiteService(request,response); // preflight secures this server services from XSS... -> https://mzl.la/3oJbVmZ

	if(staticFileService(request,response)) return;
	if(microsoftCallbackService(request,response)) return;
	
	// Page not found
	response.statusCode = 404;
	response.setHeader('Content-Type', 'text/html');
	response.end(pagenotfound);
});

// Starts the Account Manager simple web portal server
server.listen(port, hostname, () => {
	console.log(`Account Manager Server running on http://${hostname}:${port}`);
});
