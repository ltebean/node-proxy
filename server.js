var express = require('express') ;
var http = require('http'); 
var templateConfig = require('./templateConfig');
var processor=require('./pageProcessor').processor;

var app=express();
app.configure(function () {
	app.use('/public', express.static(__dirname + '/public'));
	app.use(function errorHandler(err, req, res, next) {
		res.status(500);
		res.render('error', { error: err });
	});
});

app.get('/index', function(req,res){
	res.sendfile(__dirname+'/public/index.html');
});

app.get('/left', function(req,res){
	res.sendfile(__dirname+'/public/left.html');
});

app.get('/users', function(req,res){
	res.sendfile(__dirname+'/public/users.html');
});

app.get('/products', function(req,res){
	res.sendfile(__dirname+'/public/products.html');
});


app.get('/', function(req,res){
	var params={id:1};
	processor.processPage(templateConfig.default, params, function (body){
		res.send(body);
	})
});


http.createServer(app).listen(3000); 
console.log("server listening on port 3000");