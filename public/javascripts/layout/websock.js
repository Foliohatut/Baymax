
function webSocketConnection() {
	var socket = new WebSocket("ws://"+ location.hostname +"/", "baymax-www");
	
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
}