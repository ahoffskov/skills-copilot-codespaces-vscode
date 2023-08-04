// Create web server
// Run: node comment.js
// Test: curl http://localhost:3000/comments
// Test: curl -X POST -d "comment=Hello" http://localhost:3000/comments
// Test: curl -X DELETE http://localhost:3000/comments/0
// Test: curl -X PUT -d "comment=Hello" http://localhost:3000/comments/0
// Test: curl -X PATCH -d "comment=Hello" http://localhost:3000/comments/0
// Test: curl http://localhost:3000/comments/0
// Test: curl http://localhost:3000/comments/1

var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function(req, res){
	switch (req.method) {
		case 'POST':
			var item = '';
			req.setEncoding('utf8');
			req.on('data', function(chunk){
				item += chunk;
			});
			req.on('end', function(){
				items.push(item);
				res.end('OK\n');
			});
			break;
		case 'GET':
			var body = items.map(function(item, i){
				return i + ') ' + item;
			}).join('\n');
			res.setHeader('Content-Length', Buffer.byteLength(body));
			res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
			res.end(body);
			break;
		case 'DELETE':
			var path = url.parse(req.url).pathname;
			var i = parseInt(path.slice(1), 10);
			if (isNaN(i)) {
				res.statusCode = 400;
				res.end('Invalid item id');
			} else if (!items[i]) {
				res.statusCode = 404;
				res.end('Item not found');
			} else {
				items.splice(i, 1);
				res.end('OK\n');
			}
			break;
		case 'PUT':
			var path = url.parse(req.url).pathname;
			var i = parseInt(path.slice(1), 10);
			if (isNaN(i)) {
				res.statusCode = 400;
				res.end('Invalid item id');
			} else if (!items[i]) {
				res.statusCode = 404;
				res.end('Item not found');
			} else {
				var item = '';
				req.setEncoding('utf8');
				req.on('
