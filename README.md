Introduction
------------

This node.js server acts as proxy, it asks for contents from serveral backend servers, then assembles them according to the specified rule. 

The following pages acts as backend content provider servers:
* http://localhost:3000/left
* http://localhost:3000/products
* http://localhost:3000/users

The base part of the page is provided through:
* http://localhost:3000/index

The rule must be configured as follows:

* the 'basePart' specifies where the basic page is, the page contains some placeholder which will be replaced by other contents later  

* the 'subParts' specifies where to ask for the contents, after all the components are loaded, they will be combined and inserted into the base page.

	{
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
	}

When you visit http://localhost:3000/template/:template (here the param can be 'default' or 'another'), the proxy server will assembles the page and render it to the client.