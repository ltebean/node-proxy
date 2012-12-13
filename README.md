Introduction
------------

This node.js server acts as proxy, it asks for contents from serveral backend servers, then assembles them according to the specified rule. 

The following pages acts as backend content provider servers:
* http://localhost:3000/left
* http://localhost:3000/products
* http://localhost:3000/users

The main page is provided through:
* http://localhost:3000/index

The rule can be configured like this

	{
		basePartOptions:{
			host: '127.0.0.1',
			port: 3000,
			path: '/index'
		},
		leftPartOptions:[
		{	
			host: '127.0.0.1',
			port: 3000,
			path: '/left'
		}],
		mainPartOptions:[
		{
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

When you visit http://localhost:3000/, the proxy server will assembles the page and render it to the client.