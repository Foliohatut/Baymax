var WebSocketServer = require('websocket').server;
var Service = require('../../javascript/websocket/service.js');
var Client = require('../../javascript/websocket/client.js');


function WsServer(server, api) {
	var serviceConnection;
	var wsServer;
	var clients = [];
	
	wsServer = new WebSocketServer({
    	httpServer: server,
    	autoAcceptConnections: false
	});
	wsServer.on('request', function (request) {
		if (request.origin !== undefined) {
			if (request.origin.split('//')[1] == "baymax") {				
				//if (api.isServiceConnected() !== undefined && api.isServiceConnected() !==  false) {
					var service = new Service(request.accept(), api);
					serviceConnection = service;
					serviceConnection.onSetted(function(data) {
						clients.forEach(function(e) {
							e.sendSetted(data);
						}, this);
					});
				//} else {
				//	request.reject();
				//}
			} else {
				var client = Client(request.accept(), api);
				client.on('setvalue', function(sender, message) {
					if (serviceConnection !== undefined) {
						serviceConnection.sendSetCommand(message.id, message.value);
					}
				});
				clients.push(client);
			}
		}
	});
	
}

module.exports = WsServer;