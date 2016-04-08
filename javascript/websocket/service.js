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
			if (data.valueSettedSubCommand.id !== undefined) {
				if (data.valueSettedSubCommand.dateSeconds !== undefined) {
					//console.log("mysql time " + toMysqlDate());
					var msg = {};
					msg.id = data.valueSettedSubCommand.id;
					//console.log("new value "+ JSON.stringify(data));
					if (data.valueSettedSubCommand.otherValue !== undefined) {
						console.log("other value " + data.valueSettedSubCommand.otherValue);
						api.insertNewOtherValue(data.valueSettedSubCommand.id, data.valueSettedSubCommand.otherValue, toMysqlDate(data.valueSettedSubCommand.dateSeconds), function(response) {
							console.log(JSON.stringify(response));
						});
						msg.value = data.valueSettedSubCommand.otherValue;
						raiseOnSetted(msg);
					} else if (data.valueSettedSubCommand.currentValue !== undefined) {
						console.log("current value " + data.valueSettedSubCommand.currentValue);
						api.insertNewCurrentValue(data.valueSettedSubCommand.id, data.valueSettedSubCommand.currentValue, toMysqlDate(data.valueSettedSubCommand.dateSeconds), function(response) {
							console.log(JSON.stringify(response));
						});
						msg.value = data.valueSettedSubCommand.currentValue;
						raiseOnSetted(msg);
					} else if (data.valueSettedSubCommand.voltageValue !== undefined) {
						console.log("voltage value " + data.valueSettedSubCommand.voltageValue);
						api.insertNewVoltageValue(data.valueSettedSubCommand.id, data.valueSettedSubCommand.voltageValue, toMysqlDate(data.valueSettedSubCommand.dateSeconds), function(response) {
							console.log(JSON.stringify(response));
						});
						msg.value = data.valueSettedSubCommand.voltageValue;
						raiseOnSetted(msg);
					}
				}		
			}
		}
		console.log("----------------------------------");
		
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

function toMysqlDate(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
	console.log("secs " + secs);
	console.log(t);
    return t;
}

module.exports = Service;