var fs = require('fs');
//var protobuf = require('protocol-buffers');
//var messages = protobuf(fs.readFileSync('./proto/ServerCommandBuff.proto'))

function Client(connection, api) {
	var id;
	this.user;
	this.passwd;
	var events = {};
	var authenticated = false;
	
	console.log("uusi client");
	connection.on('message', function(message) {
		if (message.type === 'utf8') {
			var messageObject = JSON.parse(message.utf8Data);
			console.log('uusi vieesti ' + message.utf8Data);			
			handleUtf8Message(messageObject);
		} else if(message.type === 'binary') {
			//var messageObject = JSON.parse(message.binaryData);
			//handleByteMessages(messageObject);
		}
	});
	
	function handleByteMessages(message) {
		var obj = messages.ServerCommandBuff.decode(message);
		handleMessage(obj);
	}
	
	function handleUtf8Message(message) {
		if (!authenticated) {
			console.log("not authenticated");
			if (message.Credentials !== undefined) {
				api.checkCredentials(message.Credentials, function(result) {
					if (result.credentials_ok) {
						var response = {}
						response.credentials_ok = true;
						connection.sendUTF(JSON.stringify(response));
						console.log("authenticated");
						authenticated = true;
					} else {
						connection.sendUTF("Access denided");
						connection.close();						
					}
				}) 
			} else {
				connection.sendUTF("Access denided");
				connection.close();					
			}
		}
	}
	
	function handleMessage(message, callback) {
		if (!authenticated) {
			console.log("not authenticated");
			if (message.Credentials !== undefined) {
				api.checkCredentials(message.Credentials, function(result) {
					if (result.success) {
						authenticated = true;
					} else {
						connection.sendBytes("Access denided");
						connection.close();						
					}
				}) 
			}
		} else {
			if (message.getResources !== undefined) {
				if (message.getResources.type !== undefined) {
					if (message.getResources.type === 'other_values') {
						if (message.getResources.valueId !== undefined) {
							
						} else if (message.getResources.valueName !== undefined) {
							if (message.getResources.limit === undefined) message.getResources.limit = 10;
							api.getOtherValuesBydName(message.getResources.valueName, 0, message.getResources.limit, function (response) {
								callback(response);
							});							
						}
					}
				}
			}
		}
		if (message.Credentials)
		
				var data = JSON.parse(message.utf8Data);
		if (data.subMessageType !== undefined) {
			if (data.subMessageType === 'setvalue') {		
					if ('setvalue' in events) {
						if (data.subMessage !== undefined) {
							events['setvalue'](this, data.subMessage);								
						}							
					}
			}
		}
	}
		
	function on(e, fn) {
		events[e] = fn;
	}
	
	function isUserAuth(callback) {
		callback(true);
	}
	
	function getClientId () {
		
	}
	
	function handleSetCommand(message) {
		
	}
	
	function handleGetResource(message) {
		
	}
	
	function sendSetted(data) {
		var msg = {};
		msg.type = "valuesetted";
		api.getValueDetailName(data.id, function(response) {
			if (response.query_success) {
				msg.id = response.name;
				msg.value = data.iValue;
				connection.sendUTF(JSON.stringify(msg));
			}
		});
	}
	
	return {
		on:on,
		getClientId: getClientId,
		sendSetted: sendSetted
	}
}



module.exports = Client;