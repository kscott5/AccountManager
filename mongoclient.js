const net = require('net');
const tls = require('tls');
const fs = require('fs');

// File system folder
const logFile = process.env.DEAFAULT_LOGS_PATH || `${process.cwd()}/mongoclient.log`;

// create a log file and append its writer on console
console.logFile = fs.createWriteStream(`${logFile}`, {flags:'a'}).write;
console.logFile(`Mongo client logging`);

// Self-signed cert is its own certificate authority
const ca = process.env.DEFAULT_CERTICATE_AUTHORITY || 'X509 CERTICATE';
const keyPEMFile = process.env.PRIVATE_CERT_PEM_FILE || '';
const certPEMFile = process.env.PUBLIC_CERT_PEM_FILE || '';

let cert = ''; // public self signed X509 certificate PEM key
fs.readFile(`${certspath}/${certPEMFile}`, {encoding: 'utf8'}, (err,data)=>{
	let callback = ()=>cert=data; // save and use data later
	if(error) {
		console.logFile(`${error}`);
		callback = ()=>process.exitCode = 1; // detail reason  https://bit.ly/3fvyCbb
	}

	process.nextTick(callback);
});

let key = ''; // private certificate PEM key
fs.readFile(`${certspath}/${keyPEMFile}`, {encoding: 'utf8'}, (err,data)=>{
	let callback = ()=> key = data; // save and use the data later

	if(error) {
		console.logFile(`${error}`);
		callback = () => process.exitCode = 1; // detail reason  https://bit.ly/3fvyCbb
	}
	process.nextTick(callback);
});

// Create a new client socket
let socket = new net.Socket({
	allowHalfOpen: true,
	readable: false,
	writable: true
});
socket.on('connect',()=>{
	console.logFile(`on connect: done`);
});
socket.on('ready',()=>{
	console.logFile(`on ready: use read/write now `);
});
socket.on('data',(data)=>{
	console.logFile(`on data: ${data}`);
});
socket.on('error',(error)=>{
	console.logFile(`on error: ${error}`);
});

// Make the client socket more secure with TLS/SSL encryption
let secureSocket= new tls.Socket(socket, {
	enableTrace: true,
	isServer: false,
	requestCert: false,
	requestOCSP: true,
	ca: ca,
	cert: cert,
	key: key
});

secureSocket.on('keylog',(line)=>{
	console.logFile(`on keylog: ${line}`);
});
secureSocket.on('OCSP',(response)=>{
	console.logFile(`on OCSP: ${response}`);
});

//secureSocket.connect({hostname: localhost, port: 27017}); // open the connection

module.exports = {MongoClient: secureSocket};
