var http = require('http');

var proxyRequest=function(options,callback){
	http.get(options, function(res) {
		var html='';
		res.on("data", function(chunk) {
			html+=chunk;
		}).on("end", function() {
			//console.log(options.host+options.path+'-'+res.statusCode);
			if(res.statusCode==200){
				callback(html);
			}else{
				callback('');
			}	
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
};

exports.proxy={
	proxyRequest:proxyRequest
};