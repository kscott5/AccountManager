/*	Telnet and redisclient.js are similar. Both send simple commands that redis understands.
	
	https://redis.io/commands

	**Copy and Paste, below is the actual redis connection.**

	const net = require('net');

	let socket = new net.Socket({
		allowHalfOpen: true,
		readable: false,
		writable: true
	});

	socket.setEncoding('utf8');	
	socket.connect({port: 6379}); // opens the connection

	socket.on('data',(data)=>{
		//save information in data after socket.write.
	});
	socket.on('error',(error)=>{
		//report what happens after error with socket.write.
	});

	socket.write(`set 'redis' 'client'\r\n`);	// Writes requires both carriage returns \r and linefeeds \n with redis.
	socket.write(`get 'redis'\r\n`);
	socket.write(`cleint nfo\r\n`);
	
	// possible slow connection. call next line manually
	// socket.end(`\r\n`); // socket.connect

	**yank and paste, above is the actual redis connection.**
*/

const net = require('net');
const fs = require('fs');

// File system folder
const logFile = process.env.DEAFAULT_LOGS_PATH || `${process.cwd()}/redisclient.log`;

// create a log file and append new data
console.logFile = (data)=>{
	fs.appendFile(logFile,`${new Date()}: ${data}\n`,(error)=>{
		console.log(`${logFile} error: ${error}`);
	});
};

fs.createWriteStream(`${logFile}`, {flags:'a'}).write;
console.logFile(`Redis client logging`);

/**
 * Creates new redis client with net.Socket
 */
function RedisClient(options) {
	if(!this instanceof RedisClient) {
		return new RedisClient(options);
	}

	options = options || {}; //fixes undefined 
	
	/* yank and paste, below is the actual redis connection. */ 
	this.socket = new net.Socket({
		allowHalfOpen: options.allowHalfOpen || true,
		readable: options.readable || false,
		writable: options.writable || true
	});

	this.hostname = options.hostname || 'localhost';
	this.port = options.port || 6379;

	RedisClient.prototype.send = send;
}
	
/**
 * Send redis the command with net.Socket.write.
 */
function send(command, callback) {
	if(!command) return false;

	callback = (callback instanceof Function)? callback : 
		(error,data) => {console.logFile(`Send: ${error||data}`);};

	// regular expression finds carriage returns \r and line feeds \n
	if(!command.match(`(\\r\\n|\\n\\r)`) /*not found*/) 
		command = command.concat('\r\n');
	
	this.socket.setEncoding('utf8');	
	this.socket.connect({hostname: this.hostname, port: this.port}); // opens the connection with specific port

	this.socket.on('data', (data) => {
		callback(null,data);
	});
	this.socket.on('error', (error) => {
		callback(error,null);
	});

	this.socket.end(command); // is this.socket.write then this.socket.end.
}

module.exports = { Client: RedisClient }
