var fs = require('fs');
var protobuf = require('protocol-buffers');
var messages = protobuf(fs.readFileSync('CommandBuff.proto'));
var serverBufMessages = protobuf(fs.readFileSync('proto/ServerCommandBuff.proto'));

function Service(connection, api) {
	var onSettedCallback;
	var events = {};
	
	connection.on('message', function(message) {
		var data = serverBufMessages.ServerCommandBuff.decode(message.binaryData);
		if (data.valueSettedSubCommand !== undefined) {
			//console.log("new value "+ JSON.stringify(data));
			api.insertNewOtherValue(data.valueSettedSubCommand.id, data.valueSettedSubCommand.iValue, function(response) {
				console.log(JSON.stringify(response));
			});
			
			raiseOnSetted(data.valueSettedSubCommand);
		}
		
	});
	
	
	
	function on(e, fn) {
		events[e] = fn;
	}
	
	function raiseOnSetted(data) {
		if (onSettedCallback !== undefined) {
			onSettedCallback(data);
		}
	}
	
	function onSetted(fn) {
		onSettedCallback = fn;
	}
	
	var sendSetCommand = function(id, value) {
		console.log("sending set command");
		var message = messages.CommandBuff.encode({
			setValueSubCommand: {
				id: id,
				iValue: value,
				userId: 5
			}
		});
		connection.sendBytes(message);
	}
	
	return {
		sendSetCommand: sendSetCommand,
		on: on,
		onSetted: onSetted
	}
}

module.exports = Service;