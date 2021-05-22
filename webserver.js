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

	if(dynamicContent(req,res,['/','/index'],'GET')) return;
	if(dynamicContent(req,res,['/callback'],'POST')) return;
	if(staticContent(req,res)) return;

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

function staticContent(req,res) {
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

function dynamicContent(req,res,urls,method) {
	if(!urls.includes(req.url)) return false;
	if(req.method != method) return false;

	if(req.url == '/'  || req.url == '/index') {
		let file = path.join(publicFolder, '/index.html');
		readFileContent(res, file, 'text/html');
		return true;
	}

	switch(method) {
		case 'GET':
	}

	return false;
}


server.listen(port, hostname, () => {
	console.log(`Account Manager Server running on http://${hostname}:${port}`);
});
