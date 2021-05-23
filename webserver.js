// https://nodejs.org/docs/latest-v15.x/api/http2.html
const http = require('http');

const querystring = require('querystring');

const path = require('path');
const fs = require('fs');

const publicFolder = path.join(process.cwd(), 'public');

const hostname = '127.0.0.1';
const port = 1270;

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
const server = http.createServer((req,res) => {
	console.log(`${req.method.toUpperCase()}: ${req.url}`);

	debugger; // https://bit.ly/2SdN0eY

	if(indexService(req,res)) return;
	if(callbackService(req,res)) return;
	if(staticFileService(req,res)) return;

	res.statusCode = 404;
	res.setHeader('Content-Type', 'text/html');
	res.end(pagenotfound);
});

function readFileContent(res, file, contentType) {
	res.setHeader('Content-Type', contentType);

	fs.promises.readFile(file, {encoding: 'utf8'})
		.then((data) => {
			res.statusCode = 200;
			res.end(data);
		})
		.catch((err) => {
			res.statusCode = 404;
			res.end();
		});
}

function staticFileService(req,res) {
	let file = path.join(publicFolder, req.url);
	let extname = path.extname(file);

	let contentType =  'text/plain';
	switch(extname) {
		case '.js':
			readFileContent(res,file,'text/javascript');
			break;

		case '.ico':
			readFileContent(res, file, 'image/x-icon');
			break;

		case '.png':
			readFileContent(res, file, 'image/png');
			break;

		case '.css':
			readFileContent(res, file, 'text/css');
			break;

		default:
			 return false;
	}

	return true;
}

function indexService(req,res) {
	if(req.url != '/'  && req.url != '/index') return false;

	let file = path.join(publicFolder, '/index.html');
	readFileContent(res, file, 'text/html');
	return true;
}

/*
	Javascript console example. F12 button.

	clear();
	fetch('http://localhost:1270/callback', {
  		method: 'POST',
  		headers: { 
  			'Content-Type': 'application/json'
  		},
  		body: JSON.stringify({'name': 'Karega K Scott'})
	})
	.then(response => response.json())
	.then((data) => { console.log(data);})
*/
function callbackService(req,res) {
	if(req.url != '/callback' || req.method != 'POST') return false;

	req.body = [];

	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/json');
const formData = querystring.stringify({
        client_id: `${process.env.AM_CLIENT_ID}`,
        scope: 'user.read%20mail.read',
        code: `${req.body.code}`,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
        client_secret: `${process.env.AM_CLIENT_SECRET}`
    });
	
	req.on('data', (chuck) => { req.body.push(chuck); });
	req.on('end', () => { 
		req.body = querystring.parse(Buffer.concat(req.body).toString()); 

		microsoftTokenRequest(req,res);
	});
	req.on('error', (err) => { res.end(JSON.stringify({err: err})); });
	
	return true;
}

function microsoftTokenRequest(req,res) {
	const redirectUri = querystring.escape(`${process.env.AM_SCHEMA}://${hostname}:${port}/callback`);

	const formData = querystring.stringify({
		client_id: `${process.env.AM_CLIENT_ID}`,
		scope: 'user.read%20mail.read',
		code: `${req.body.code}`,
		redirect_uri: redirectUri,
		grant_type: 'authorization_code',
		client_secret: `${process.env.AM_CLIENT_SECRET}`
	});

	const client = http.request({
		host: 'https://login.microsoftonline.com',
		method: 'POST',
		path: `/${process.env.AM_TENANT_ID}/oauth2/v2.0/token`,
		header: {
	 		'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(formData)
		}});

	client.end(formData);

	req.socket.on('data', (chuck) => { req.token = chuck.toString()});
	req.socket.on('end', () => {
		res.end(JSON.stringify(req.token));
	});
}

server.listen(port, hostname, () => {
	console.log(`Account Manager Server running on http://${hostname}:${port}`);
});
