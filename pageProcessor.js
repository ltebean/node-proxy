
var proxy=require('./proxy').proxy;
var Step=require('step');

Page=function(config,basePart,callback){
	this.config=config;
	this.callback=callback;
	this.basePart=basePart;
	this.subPartCounter={};
	for(var subPartName in config.subParts){
		this[subPartName]=[];
		this.subPartCounter[subPartName]=0;
	}
}

Page.prototype.subPartLoaded=function(subPartName,index,body){
	this[subPartName][index]=body;
	this.subPartCounter[subPartName]++;
	this.checkFinished();
};

Page.prototype.checkFinished=function(){
	for(var subPartName in  this.config.subParts){
		if(this.subPartCounter[subPartName]<this.config.subParts[subPartName].components.length){
			return;
		}	
	}
	for(var subPartName in  this.config.subParts){
		this.basePart=this.basePart.replace(this.config.subParts[subPartName].placeholder,this[subPartName].join(''));
	}
	this.callback(this.basePart);
}

function processPage(config,params,callback){
	Step(
		function loadBasePart(){
			processOptionsWithParams(config.basePart,params);
			proxy.proxyRequest(config.basePart,this);
		},
		function buildPage(basePart) {
			var page=new Page(config,basePart,callback);
			for(var subPartName in config.subParts){
				config.subParts[subPartName].components.forEach(function(options,index){
					var name=subPartName;
					processOptionsWithParams(options,params);
					proxy.proxyRequest(options,function(body){
						page.subPartLoaded(name,index,body);
					});
				});
			}			
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
