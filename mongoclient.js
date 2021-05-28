const util = require('util');
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
const keyPEMFile = path.resolve(process.env.PRIVATE_CERT_PEM_FILE || '');
const certPEMFile = path.resolve(process.env.PUBLIC_CERT_PEM_FILE || '');

// public self signed X509 certificate PEM key
let cert = fs.readFileSync(`${certPEMFile}`);
if(!cert) console.logFile('Error reading public certificate. Secure socket not ready.');

// private certificate PEM key
let key = fs.readFileSync(`${keyPEMFile}`);
if(!key) console.logFile('Error reading private certificate. Secure socket not ready.');

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
secureSocket.on('OCSPResponse',(response)=>{
	console.logFile(`secure socket.on OCSPResponse: ${response}`);
});
secureSocket.on('secureConnect',()=>{
	console.logFile(`secure socket.on secure connect: done`);
});
secureSocket.on('session',(session)=>{
	console.logFile(`secure socket.on session: ${session}`);
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
