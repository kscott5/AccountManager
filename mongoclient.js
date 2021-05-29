const util = require('util');
const net = require('net');
const tls = require('tls');
const fs = require('fs');
const path =require('path');

let exportList = {};

//https://github.com/mongodb/specifications/blob/master/source/mongodb-handshake/handshake.rst
exportList.handshake = 
{
    hello: 1,
    helloOk: true,
    client: {
        application: {
            name: 'Mongo Client Karega Scott'
        },
        driver: {
            name: 'mongocks',
            version: '1.0.0-test'
        },
        os: {
            type: 'unknown',
            name: 'Ubuntu 20.04.2 LTS',
            architecture: 'x86_64',
            version: '20.0.4'
        }
    }
};

// File system folder
const logFile = process.env.DEAFAULT_LOGS_PATH || `${process.cwd()}/mongoclient.log`;

// create a log file and append new data
exportList.logFile = (data)=>{
	fs.appendFile(logFile,`${new Date()}: ${data}\n`,(error)=>{
		console.log(`${logFile} error: ${error}`);
	});
};
exportList.logFile(`Mongo client logging`);

// Create a new client socket
exportList.socket = new net.Socket({
	allowHalfOpen: true,
	readable: false,
	writable: true
});
exportList.socket.on('connect',()=>{
	exportList.logFile(`socket.on connect: done`);
});
exportList.socket.on('ready',()=>{
	exportList.logFile(`socket.on ready: use read/write now `);
});
exportList.socket.on('data',(data)=>{
	exportList.logFile(`socket.on data: ${data}`);
});
exportList.socket.on('error',(error)=>{
	exportList.logFile(`socket.on error: ${error}`);
});

// Self-signed cert is its own certificate authority
exportList.ca = process.env.DEFAULT_CERTICATE_AUTHORITY || 'X509 CERTICATE';
exportList.keyPEMFile = process.env.PRIVATE_CERT_PEM_FILE;
exportList.certPEMFile = process.env.PUBLIC_CERT_PEM_FILE;

if(exportList.certPEMFile && exportList.keyPEMFile) {
	try {
		// public self signed X509 certificate PEM key
		exportList.cert = fs.readFileSync(`${path.resolve(exportList.certPEMFile)}`);
		delete exportList.certPEMFile;
 
		// private certificate PEM key
		exportList.key = fs.readFileSync(`${path.resolve(exportList.keyPEMFile)}`);
		delete exportList.keyPEMFile;

		// Make the client socket more secure with TLS/SSL encryption
		exportList.secureSocket = new tls.TLSSocket(exportList.socket, {
			enableTrace: true,
			isServer: false,
			requestCert: false,
			requestOCSP: true,
			ca: exportList.ca,
			cert: exportList.cert,
			key: exportList.key
		});

		exportList.secureSocket.on('keylog',(line)=>{
			exportList.logFile(`secure socket.on keylog: ${line}`);
		});
		exportList.secureSocket.on('OCSPResponse',(response)=>{
			exportList.logFile(`secure socket.on OCSPResponse: ${response}`);
		});
		exportList.secureSocket.on('secureConnect',()=>{
			exportList.logFile(`secure socket.on secure connect: done`);
		});
		exportList.secureSocket.on('session',(session)=>{
			exportList.logFile(`secure socket.on session: ${session}`);
		});
		exportList.secureSocket.on('ready',()=>{
			exportList.logFile(`secure socket.on ready: use read/write now`);
	
			exportList.secureSocket.write(JSON.stringify(exportList.handshake)+'\r\n');
			exportList.logFile(`secure socket.on ready: client request handshake with server.`);
		});
		exportList.secureSocket.on('data',(data)=>{
			exportList.logFile(`secure socket.on data: ${data}`);
		});
		secureSocket.on('error',(error)=>{
			exportList.logFile(`secure socket.on error: ${error}`);
		});

		exportList.secureSocket = secureSocket;
	} catch(error) {
		exportList.logFile(error);

		delete exportList.ca;
		delete exportList.key
		delete exportList.cert;
		delete exportList.handshake;
		delete exportList.secureSocket;
	}
} else {
	delete exportList.ca;
	delete exportList.keyPEMFile;
	delete exportList.certPEMFile;
	delete exportList.handshake;
}

//socket.connect({hostname: localhost, port: 27017}); // open the connection
//socket.write(`{'command': {'find': {'ns': 'dbname.collectionname'}}}`); // BSON string required

module.exports = exportList;
