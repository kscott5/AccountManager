const http = require('http');
const path = require('path');
const fs = require('fs');

const publicFolder = path.join(process.cwd(), 'public');

const hostname = '127.0.0.1';
const port = 1270;

const pagenotfound = '<html><body><h1>Account Manager page not found.</body></html>';

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

	let body = [];

	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/json');
	
	req.on('data', (chuck) => { body.push(chuck); });
	req.on('end', () => { 
		body = JSON.parse(Buffer.concat(body).toString()); 

		// request body now available.

		res.end(JSON.stringify({msg: 'found callback', body: body}));
	});
	req.on('error', (err) => { res.end(JSON.stringify({err: err})); });
	
	return true;
}

server.listen(port, hostname, () => {
	console.log(`Account Manager Server running on http://${hostname}:${port}`);
});
