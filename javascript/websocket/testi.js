


function Client() {
	this.on = on;
}

function onn() {
	console.log("webclient");
}

function WebClient() {
	Client.call(this);
	/*this.on = function() {
		console.log("terve sinulle");
	}*/	
}


function on() {
	console.log("client");
};

WebClient.prototype = new Client();
var webClient = new WebClient();
webClient.on();
//webClient.hei();