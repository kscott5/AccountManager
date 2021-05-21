import http from 'http';
import fs from 'fs';

const hostname = '127.0.0.1';
const port = 1270;

const server = http.createServer((req,res) => {
	console.log(`${req.method.toUpperCase()}: ${req.url}`);

	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Account Mananger Available');
});

server.listen(port, hostname, () => {
	console.log(`Account Manager Server running on http://${hostname}:${port}`);
});
