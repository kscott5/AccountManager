const net = require('net');
const tls = require('tls');
const fs = require('fs');
const path =require('path');

// File system folder
const logFile = process.env.DEAFAULT_LOGS_PATH || `${process.cwd()}/mongoclient.log`;

// create a log file and append new data
console.logFile = (data)=>{
	fs.appendFile(logFile,`${new Date()}: ${data}\n`,(error)=>{
		console.log(`${logFile} error: ${error}`);
	});
};

console.logFile(`Mongo client logging`);

// Self-signed cert is its own certificate authority
const ca = process.env.DEFAULT_CERTICATE_AUTHORITY || 'X509 CERTICATE';
const keyPEMFile = path.resolve(process.env.PRIVATE_CERT_PEM_FILE || ''); console.logFile(keyPEMFile);
const certPEMFile = path.resolve(process.env.PUBLIC_CERT_PEM_FILE || '');

let cert = ''; // public self signed X509 certificate PEM key
fs.promises.readFile(`${certPEMFile}`, {encoding: 'utf8'})
	.then((data)=>{
		cert=data; // save and use data later
		console.logFile(cert);
	})
	.catch((error)=>{
		console.logFile(error);
		process.exitCode = 1; // detail reason  https://bit.ly/3fvyCbb
	});

let key = ''; // private certificate PEM key
fs.promises.readFile(`${keyPEMFile}`, {encoding: 'utf8'})
	.then((data)=>{
		key = data; // save and use the data later
	})
	.catch((error)=>{
		console.logFile(`${error}`);
		process.exitCode = 1; // detail reason  https://bit.ly/3fvyCbb
	});

// Create a new client socket
let socket = new net.Socket({
	allowHalfOpen: true,
	readable: false,
	writable: true
});
socket.on('connect',()=>{
	console.logFile(`socket.on connect: done`);
});
socket.on('ready',()=>{
	console.logFile(`socket.on ready: use read/write now `);
});
socket.on('data',(data)=>{
	console.logFile(`socket.on data: ${data}`);
});
socket.on('error',(error)=>{
	console.logFile(`socket.on error: ${error}`);
});

// Make the client socket more secure with TLS/SSL encryption
let secureSocket= new tls.TLSSocket(socket, {
	enableTrace: true,
	isServer: false,
	requestCert: false,
	requestOCSP: true,
	ca: ca,
	cert: cert,
	key: key
});

secureSocket.on('keylog',(line)=>{
	console.logFile(`secure socket.on keylog: ${line}`);
});
secureSocket.on('OCSP',(response)=>{
	console.logFile(`secure socket.on OCSP: ${response}`);
});
secureSocket.on('connect',()=>{
	console.logFile(`secure socket.on connect: done`);
});
secureSocket.on('ready',()=>{
	console.logFile(`secure socket.on ready: use read/write now `);
});
secureSocket.on('data',(data)=>{
	console.logFile(`secure socket.on data: ${data}`);
});
secureSocket.on('error',(error)=>{
	console.logFile(`secure socket.on error: ${error}`);
});


//socket.connect({hostname: localhost, port: 27017}); // open the connection
//socket.write(`{'command': {'find': {'ns': 'dbname.collectionname'}}}`); // BSON string required

module.exports = {MongoSecureClient: secureSocket, MongoClient: socket};
