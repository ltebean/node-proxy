Introduction
------------

This node.js server acts as proxy, it asks for contents from serveral backend servers, then assembles them according to the specified rule. The server has been deployed on [cloudfoundry](http://node-proxy-server.cloudfoundry.com).

The following pages act as backend content provider servers:
* http://node-proxy-server.cloudfoundry.com/left
* http://node-proxy-server.cloudfoundry.com/products
* http://node-proxy-server.cloudfoundry.com/users

When you visit http://node-proxy-server.cloudfoundry.com/template/:template (here the param can be 'default' or 'another'), the proxy server will assembles the page and render it to the client.

Rule configuration
------------------

The assembling rule must be configured as follows:
* the 'basePart' specifies where the basic page is, this page contains some placeholder which will be replaced by other contents later.  
* the 'subParts' specifies where to ask for the contents, after all the components are loaded, they will be combined and inserted into the base page. You can define as much subPart as you want, just define a key in the 'subParts' object, and specifies its placeholder and where to find its components.

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

