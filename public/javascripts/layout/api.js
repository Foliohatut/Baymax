
var Api = function() {
	var socket = new WebSocket("ws://"+ location.hostname +"/", "baymax-www");
	var events = new Map();
	
	socket.onopen = function()
	{
		var indicator = document.getElementById("socketConnectionIndicator");
		indicator.innerHTML = "Connected";
		indicator.className = "btn-success";
	};
	
	socket.onclose = function() {
		var indicator = document.getElementById("socketConnectionIndicator");
		indicator.innerHTML = "Disconnected";
		indicator.className = "btn-danger";
	}
	
	socket.onmessage = function(evt) {
		var message = JSON.parse(evt.data);
		//alert(message.cmdType);
		var event = events.get(message.cmdType);
		if (event !== undefined) {
			event.forEach(function(element) {
				element(message.value);
			}, this);
		}
	}
	
	var on = function(cmdType, callback) {
		var event = events.get(cmdType);
		if (event === undefined) {
			event = [];
		}
		event.push(callback);
		events.set(cmdType, event);
	}
	
	var send = function(cmdType, value, callback) {
		var msg = {};
		msg.cmdType = cmdType;
		msg.value = value;
		socket.send(JSON.stringify(msg));
		if (callback !== undefined) {
			callback();
		}
	}
	
	return {
		on,
		send
	};	
}

window.api = Api();