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

	if(home(req,res)) return;
	if(favicon(req,res)) return;

	res.statusCode = 404;
	res.setHeader('Content-Type', 'text/html');
	res.end(pagenotfound);
});

function home(req,res) {
	if( req.url != '/index' && req.url != '/') return false;

	res.setHeader('Content-Type', 'text/html');

	let file = path.join(publicFolder, '/index.html');
	readFileContent(res,file);

	return true;
}

function readFileContent(res, file) {
	fs.promises.readFile(file, {encoding: 'utf8'})
		.then((data) => {
			res.statusCode = 200;
			res.end(data);
		})
		.catch((err) => {
			res.statusCode = 404;
			res.end(pagenotfound);
		});
}

function staticContent(req,res) {
	let file = path.join(publicFolder, req.url);
	let extname = path.extname(file);

	let contentType =  'text/plain';
	switch(extname) {
		case '.js':
			contentType = 'text/javascript';
			break;

		default:
			 return false;
	}

	fs.promises.access(file, fs.constants.F_OK)
		.then((data) => {
			fs.promises.readFile(file, {encoding: 'utf8'})
				.then((data) => {
					res.statusCode = 200;
					res.setHeader('Content-Type', contentType);
					readFileContent(res,file);					
				})
				.catch((err) => {
					res.setHeader('Content-Type', 'text/html');
					res.end(pagenotfound);
				});	
		})
		.catch((err) => {
			res.setHeader('Content-Type', 'text/html');
			res.end(pagenotfound);
		});
}

function services(req,res) {
	let apiName = req.url;
	let apiMethod = req.method;

	if(apiName != '/callback' && apiMethod != 'POST') return false;

	return true;
}

function favicon(req,res) {
	res.statusCode = 200;
//	res.setHeader('Content-Type', 'image/x-icon');
	res.end('');

	return true;
}

server.listen(port, hostname, () => {
	console.log(`Account Manager Server running on http://${hostname}:${port}`);
});
