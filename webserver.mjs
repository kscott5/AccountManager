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

	let file = path.join(publicFolder, '/index.html');
	fs.readFile(file, {encoding: 'utf8'}, (err,data) => {
		if(err) console.log(`${err}`);

		res.statusCode = (err)? 404: 200;
		res.setHeader('Content-Type', 'text/html');
		res.write((err)? pagenotfound : data);
		res.end();
	});

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
