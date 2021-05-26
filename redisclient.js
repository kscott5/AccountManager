/*	Telnet and redisclient.js are similar. Both send simple commands that redis understands.
	
	https://redis.io/commands

	**Copy and Paste, below is the actual redis connection.**

	const net = require('net');

	socket = new net.Socket({
		allowHalfOpen: true,
		readable: false,
		writable: true
	});

	socket.setEncoding('utf8');	
	socket.connect({port: options.port || 6379}); // opens the connection

	socket.on('data',(data)=>{
		//save information in data after socket.write.
	});
	socket.on('error',(error)=>{
		//report what happens after error with socket.write.
	});

	socket.setEncoding('utf8');
	socket.connect({port: 6379});

	// Writes requires both carriage returns \r and linefeeds \n with redis.
	socket.write(`set 'redis' 'client'\r\n`);
	socket.write(`get 'redis'\r\n`);
	socket.write(`cleint nfo`\r\n);

	socket.end(); // socket.connect

	**yank and paste, above is the actual redis connection.**
*/

const net = require('net');

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

	this.port = options.port || 6379;
	RedisClient.prototype.send = send;
}
	

/**
 * Send redis the command with net.Socket.write.
 */
function send(command, callback) {
	if(!command) return false;

	callback = (callback instanceof Function)? callback : 
		(error,data) => {console.log(`Send: ${error||data}`);};

	// regular expression finds carriage returns \r and line feeds \n
	if(!command.match(`(\\r\\n|\\n\\r)`) /*not found*/) 
		command = command.concat('\r\n');
	
	this.socket.setEncoding('utf8');	
	this.socket.connect({port: this.port}); // opens the connection with specific port

	this.socket.on('data', (data) => {
		callback(null,data);
	});

	this.socket.on('error', (error) => {
		callback(error,null);
	});

	this.socket.end(command); // is this.socket.write then this.socket.end.
}

module.exports = { Client: RedisClient }
