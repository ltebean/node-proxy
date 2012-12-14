
var proxy=require('./proxy').proxy;
var Step=require('step');

Page=function(config,basePart,callback){
	this.config=config;
	this.callback=callback;
	this.basePart=basePart;
	this.leftPart=[];
	this.mainPart=[];

}


Page.prototype.leftPartLoaded=function(index,body){
	this.leftPart[index]=body;
	this.checkFinished();
};

Page.prototype.mainPartLoaded=function(index,body){
	this.mainPart[index]=body;
	this.checkFinished();
};

Page.prototype.checkFinished=function(){
	if(this.leftPart.length==this.config.leftPart.length && this.mainPart.length==this.config.mainPart.length){
		this.basePart=this.basePart.replace('<!-- left -->',this.leftPart.join(''));
		this.basePart=this.basePart.replace('<!-- main -->',this.mainPart.join(''));
		this.callback(this.basePart);
	}
}

function processPage(config,params,callback){
	Step(
		function loadBasePart(){
			processOptionsWithParams(config.basePart,params);
			proxy.proxyRequest(config.basePart,this);
		},
		function buildPage(basePart) {
			var page=new Page(config,basePart,callback);
			config.mainPart.forEach(function(options,index){
				processOptionsWithParams(options,params);
				proxy.proxyRequest(options,function(body){
					page.mainPartLoaded(index,body);
				});
			});
			config.leftPart.forEach(function(options,index){
				processOptionsWithParams(options,params);
				proxy.proxyRequest(options,function(body){
					page.leftPartLoaded(index,body);
				});
			});
		});
}

function processOptionsWithParams(options,params){
	var paramString='?';
	for(var key in params) {
		if(params.hasOwnProperty(key)){
			paramString+=key+'='+params[key]+'&';
		}
	}
	options.path+=paramString;
}



exports.processor={
	processPage:processPage
}
