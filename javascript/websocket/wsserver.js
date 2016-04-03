var WebSocketServer = require('websocket').server;

var baymaxConnection;
var clientConnections = new Array();
	
var wsServer;
var apiModule;

module.exports = function(server, api) {
	apiModule = api;
	wsServer = new WebSocketServer({
    	httpServer: server,
    	autoAcceptConnections: false
	});
	wsServer.on('request', function(request) {
		console.log("new connection origin " + request.origin);
		var connection = request.accept();
		if (request.origin !== undefined) {
			if (request.origin.split('//')[1] == "baymax") {
				baymaxConnection = connection;
				connection.on('message', handleBaymaxMessages);
				connection.on('close', function(reasonCode, description) {
					baymaxConnection = null;
				});
			} else {
				clientConnections.push(connection);	
				connection.on('message', handleClientMessages);
				connection.on('close', function(reasonCode, description) {
					var i = clientConnections.indexOf(connection);
					if(i != -1) {
						clientConnections.splice(i, 1);
					}
				});
			
			}
		}
	});
}

function handleBaymaxMessages(message) {
	var clientMessage = {};
	apiModule.getValueDetailName(message.utf8Data.charCodeAt(1), function(response) {
		if (response.id_is_set) {
			if (response.query_success) {
				if (response.name !== undefined) {
					apiModule.insertNewOtherValue(message.utf8Data.charCodeAt(1), message.utf8Data.charCodeAt(2), function() {
						console.log(JSON.stringify(response));
					});
					clientMessage.cmdType = response.name;
					clientMessage.value = message.utf8Data.charCodeAt(2);
					clientConnections.forEach(function(element) {
						element.sendUTF(JSON.stringify(clientMessage));
					}, this);			
				}
			}
		}		
	});
}

function handleClientMessages(message) {
	clientConnections.forEach(function(element) {
			element.sendUTF(message.utf8Data);
	}, this);
	
	
}