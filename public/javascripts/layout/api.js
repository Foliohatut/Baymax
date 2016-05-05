
var Api = function() {
	var url = "ws://baymax:baymax@"+ location.hostname + ":" + location.port + "/";
	var socket;
	var connectInterval;
	var valueStettedEvents = new Map(); 
	var resourcesEvents = new Map();
	var valueDetailsEvents = [];
		
	function Connect() {
		if (socket === undefined || socket.readyState !== 1) {
			try {
			socket = new WebSocket("ws://baymax:baymax@"+ location.hostname + ":" + location.port + "/");
			socket.onopen = function()
			{
				Authenticate('jokke', 'vayrynen', function (message) {
					if (message.credentials_ok) {
						var indicator = document.getElementById("socketConnectionIndicator");
						indicator.innerHTML = "Connected";
						indicator.className = "btn-success";		
					}
				});
			}
			socket.onclose = function() {
				//alert("onclose");
				socket.close();
				var indicator = document.getElementById("socketConnectionIndicator");
				indicator.innerHTML = "Disconnected";
				indicator.className = "btn-danger";
				setTimeout(Connect, 1000);
			}
			} catch(e) {
				
			}
		}
	}
	
	Connect();
	
	function Authenticate(user, passwd, callback) {
		var msg = {};
		msg.type = "auth";
		msg.Credentials = {};
		msg.Credentials.user = user;
		msg.Credentials.passwd = passwd;
		socket.onmessage = function(evt) {
			socket.onmessage = handleMessages;
			var message = JSON.parse(evt.data);
			callback(message);
		}
		socket.send(JSON.stringify(msg));	
	}
	

	
	function handleMessages(evt) {
		var message = JSON.parse(evt.data);
		//alert(message.cmdType);
		if (message.type !== undefined) {
			if (message.type === 'valuesetted') {
				var event = valueStettedEvents.get(message.id);
				if (event !== undefined) {
					event.forEach(function(element) {
						element(message.value);
					}, this);
				}
			} else if (message.type === 'resources') {
				var event = resourcesEvents.get(message.id);
				if (event !== undefined) {
					event.forEach(function(element) {
						element(message.values);
					}, this);
				}
			} else if (message.type === 'valuedetails') {
				valueDetailsEvents.forEach(function(element) {
					element(message.names);
				}, this);
			}
		}

	}
	
	function onResources(setted, callback) {
		var event = resourcesEvents.get(setted);
		if (event === undefined) {
			event = [];
		}
		event.push(callback);
		resourcesEvents.set(setted, event);
	}
	
	function onSetted(setted, callback) {
		var event = valueStettedEvents.get(setted);
		if (event === undefined) {
			event = [];
		}
		event.push(callback);
		valueStettedEvents.set(setted, event);
	}
	
	function Setted(setted, value, callback) {
		var msg = {};
		msg.type = 'setvalue';
		msg.id = setted;
		msg.value = value;
		if (socket.readyState === 1) {
			socket.send(JSON.stringify(msg));
			if (callback !== undefined) {
				callback();
			}
		}
	}
	
	function getResource(name, limit, callback) {
		var msg = {};
		msg.type = "getresource";
		msg.name = name;
		msg.limit = limit;
		if (socket.readyState === 1) {
			socket.send(JSON.stringify(msg));
			if (callback !== undefined) {
				
			}
		}
	}
	
	function onValueDetails(callback) {
		valueDetailsEvents.push(callback);
	}
	
	function getValueDetails() {
		var msg = {};
		msg.type = "getvaluedetails";
		if (socket.readyState === 1) {			
			socket.send(JSON.stringify(msg));
		}
	}
	
	//function getResource(name, )
	
	return {
		onSetted: onSetted,
		Setted: Setted,
		getResource: getResource,
		onResources: onResources,
		onValueDetails: onValueDetails,
		getValueDetails: getValueDetails
	};	
}

window.api = Api();