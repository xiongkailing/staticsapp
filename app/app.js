const http = require('http');
const url=require('url');
const fs=require('fs');
const path = require("path");
var redis = require('redis');


var redisConfig={host:'10.1.5.110',port:'6379',''}
var client=redis.createClient('6379','10.1.5.110');

client.on('error',function(err){
	console.log(err);
});

var mime=require('./mime').types;

const hostname = '127.0.0.1';
const port = 1337;

http.createServer(function(req, res) {
	var pathname=url.parse(req.url).pathname;
	if(pathname!='/data'){
		pathname=pathname||'/index.html';
		pathname="."+pathname;
		var ext=path.extname(pathname);
		ext=ext?ext.slice(1):'unkown';
		fs.exists(pathname,function(exists){
			if(!exists){
				res.writeHead(404, {'Content-Type': 'text/plain'});
				res.write("This request URL " + pathname + " was not found on this server.");
				res.end();
			}else{
				fs.readFile(pathname,function(err,file){
					var contentType=mime[ext]||"text/plain";
					if(err){
						res.writeHead(500, {'Content-Type': 'text/plain'});
						res.end(err);
					}else{
						res.writeHead(200, {'Content-Type': contentType });
						res.write(file);
						res.end();
					}
				});
			}
		});
	}else{
		res.writeHead(200,{'Content-Type':'application/json'});
		var data=[{name:'xiongkl'},{name:'yufa'},{name:'liuyin'}];
		res.write(JSON.stringify(data));
		res.end();
	}
}).listen(port, hostname, function() {
  console.log('Server running at http://'+hostname+':'+port);
});
