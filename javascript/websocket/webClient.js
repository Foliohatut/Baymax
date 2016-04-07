//var Client = require('./client');

function Client() {
	console.log("Client");
	return {
		on: on
	}
}

function on() {
	//console.log("Client");
}

function WebClient() {
	Client.call(this);
	return {
		on: function () {
			Client.prototype.on.call(this);
		}
	}
}

function on() {
	console.log("webclient");
};

WebClient.prototype = new Client();


module.exports = new WebClient();