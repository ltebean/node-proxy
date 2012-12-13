var http = require('http');

var proxyRequest=function(option,callback){
	http.get(option, function(res) {
		res.on("data", function(chunk) {
			callback(chunk.toString())
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
};

exports.proxy={
	proxyRequest:proxyRequest
};