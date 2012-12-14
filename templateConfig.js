exports.default={
	basePart:{
		host: '127.0.0.1',
		port: 3000,
		path: '/index'
	},
	subParts:{
		left:{
			placeholder:'<!-- left -->',
			components:[
			{	
				host: '127.0.0.1',
				port: 3000,
				path: '/left',
				timeout:2000
			}]
		},
		main:{
			placeholder:'<!-- main -->',
			components:[{
				host: '127.0.0.1',
				port: 3000,
				path: '/users'
			},
			{
				host: '127.0.0.1',
				port: 3000,
				path: '/products'
			}]
		}
	}
};

exports.another={
	basePart:{
		host: '127.0.0.1',
		port: 3000,
		path: '/index'
	},
	subParts:{
		left:{
			placeholder:'<!-- left -->',
			components:[
			{	
				host: '127.0.0.1',
				port: 3000,
				path: '/left'
			},
			{	
				host: '127.0.0.1',
				port: 3000,
				path: '/left'
			}]
		},
		main:{
			placeholder:'<!-- main -->',
			components:[{
				host: '127.0.0.1',
				port: 3000,
				path: '/users'
			}]
		}
	}
};




