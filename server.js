const http = require('http');
const querystring = require('querystring');
const path = require('path');
const fs = require('fs');

const clientid = process.env.AM_CLIENT_ID || '7c0c6428-b652-45b4-b4e5-6d9c7941cd74';

const origins = process.env.AM_CORS_ALLOW_ORIGINS || 'http://localhost';
const methods = process.env.AM_CORS_ALLOW_METHODS || 'POST, GET';
const headers = process.env.AM_CORS_ALLOW_HEADERS || 'Content-Type';

const defaultpage = process.env.AM_DEFAULT_PAGE || 'index';
const defaultext = process.env.AM_DEFAULT_EXTENSION || '.html';

const publicFolder = path.join(process.cwd(), 'public');
const hostname = 'localhost'; // Development standard 127.0.0.1
const port = 80; // HTTP standard

const pagenotfound = '<html><body><h2>Account Manager page not found.</h2></body></html>';
const pagecallback = `
<!DOCTYPE html>
<html lang='en lang='en'>
<head>
<script language='javascript'>
	(function(){
		opener.window.manager.activeSelection();
	})();
</script>
</head>
<body>
	<h2>Account Manager redirecting to Home Page. Closing window...
</body>
</html>`;

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
	if(origin == '' || origin == /*?*/ 'null' /*not set on server owns request?*/) return;
	if(origins.match('[*]') == null /*asterisk, a wildcard of any, not found*/ && origins.match(origin) == null  /*origin not found*/) {
		console.log(`AM_CORS_ALLOW_ORIGINS: ${origin} not available.`);
		return;
	}

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
 * fetch('http://localhost/microsoft/callback', {
 * 		method: 'POST',
 * 		headers: { 
 * 			'Content-Type': 'application/json'
 * 		},
 * 		body: JSON.stringify({'name': 'Karega K Scott'})
 * })
 * .then(response => response.text())
 * .then((data) => { console.log(data);})
 */
function microsoftCallbackService(httpRequest,httpResponse) {
	if(httpRequest.url != '/microsoft/callback') return false;

	httpResponse.statusCode = 200;
	if(httpRequest.method != 'POST') {
		httpResponse.setHeader('Content-Type', 'text/json');
		httpResponse.end(JSON.stringify({ok:false, msg: `${httpRequest.method} not valid.`}));
		return true;
	}

httpRequest.body = [];

	httpResponse.statusCode = 200;
	httpResponse.setHeader('Content-Type', 'text/html');

	httpRequest.on('data', (chuck) => { httpRequest.body.push(chuck); });
	httpRequest.on('end', () => { 
		httpRequest.body = Buffer.concat(httpRequest.body).toString();
		httpRequest.body = querystring.parse(httpRequest.body);
		
		httpResponse.setHeader('set-cookie',[`access_token=${httpRequest.body.access_token}; Path=/; SameSite=Strict;`]);
		httpResponse.end(pagecallback);

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
	console.log(`\x1b[32m${request.method.toUpperCase()}:\x1b[0m ${request.url}`);

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
	console.log(`\x1b[32mserver.listen(port, hostname, () => \{\x1b[0m`);
	console.log(`  \x1b[34mAccount Manager\x1b[0m server running on http://${hostname}:${port})\n`);

	// AM_CLIENT_ID='<?>' AM_CORS_ALLOW_ORIGINS='<?>' node [inspect] server.js
	//
	// NOTE: command-line needs administrator privileges. 
	//
	// linux:   this is sudo, su or group prossible.
	// windows: this is 'Run As'

	console.log(`  \x1b[34mEnvironment variables\x1b[0m: Application out of process.`);
	console.log(`\t\x1b[34mAM_CLIENT_ID\x1b[0m=${clientid || 'Microsoft Azure Applciation Client Id in Application Registration'}\n`);
	console.log(`\t\x1b[34mAM_CORS_ALLOW_ORIGINS\x1b[0m=${origins || '<Comma seperated list of urls or * where * is allow all> DEFAULT: http://localhost'}`);
	console.log(`\t\x1b[34mAM_CORS_ALLOW_METHODS\x1b[0m=${methods || '<Comma seperated list of http verbs> DEFAULT: GET, POST>'}`);
	console.log(`\t\x1b[34mAM_CORS_ALLOW_HEADERS\x1b[0m=${headers || '<Comma seperated list of request headers> DEFAULT: Content-Type'}\n`);
	console.log(`\t\x1b[34mAM_DEFAULT_PAGE\x1b[0m=${defaultpage || 'DEFAULT: index'}`);
	console.log(`\t\x1b[34mAM_DEFAULT_EXTENSION\x1b[0m=${defaultext || 'DEFAULT: .html'}`);
	console.log(`\x1b[32m\}\);\x1b[0m\n`);
});

// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
//
// Reset = "\x1b[0m"
// Bright = "\x1b[1m"
// Dim = "\x1b[2m"
// Underscore = "\x1b[4m"
// Blink = "\x1b[5m"
// Reverse = "\x1b[7m"
// Hidden = "\x1b[8m"
//
// FgBlack = "\x1b[30m"
// FgRed = "\x1b[31m"
// FgGreen = "\x1b[32m"
// FgYellow = "\x1b[33m"
// FgBlue = "\x1b[34m"
// FgMagenta = "\x1b[35m"
// FgCyan = "\x1b[36m"
// FgWhite = "\x1b[37m"
//
// BgBlack = "\x1b[40m"
// BgRed = "\x1b[41m"
// BgGreen = "\x1b[42m"
// BgYellow = "\x1b[43m"
// BgBlue = "\x1b[44m"
// BgMagenta = "\x1b[45m"
// BgCyan = "\x1b[46m"
// BgWhite = "\x1b[47m"


