// Telnet and redisclient.js are similar. Both send simple commands that redis understands.
// 
// https://redis.io/commands
//
// copy and paste this script into node.
//
// Usage: NOTE carriage returns \r and linefeeds \n commits the request.
//
// redis.write(`set 'redis' 'client'\r\n`);
// redis.data;
// redis.error;
//
// redis.write(`get 'redis'\r\n`);
// redis.data;
// redis.error;
//
// redis.write(`cleint nfo`\r\n);
// redis.data;
// redis.error;

const net = require('net');
const stream = require('stream');

const redis = new net.Socket({allowHalfOpen: true, readable: true, writable: true});

redis.on('ready', () => {
	console.log(`Connection with redis: done`);
});
redis.on('data', (data) => {
	console.log(`Save redis data: done`);
	redis.data = data.split(`\r\n`)[1];
	redis.error = '';
});
redis.on('error', (error) => {
	console.log(`Save redis error: done `);
	redis.error = error;
	redis.data = '';
});
redis.on('close', ()=> {
	console.log(`Close redis connection: done`);
});

redis.setEncoding('utf8');
redis.connect({port:6379});


