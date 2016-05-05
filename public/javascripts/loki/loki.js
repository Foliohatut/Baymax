
$(document).ready(function() {
	/*
	var ctx = document.getElementById('chartCanvas').getContext("2d");
	var myNewChart = new Chart(ctx).PolarArea([
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    },
    {
        value: 40,
        color: "#949FB1",
        highlight: "#A8B3C5",
        label: "Grey"
    },
    {
        value: 120,
        color: "#4D5360",
        highlight: "#616774",
        label: "Dark Grey"
    }		
	]);
	*/
	
	window.api.onSetted('batterycurrent', function(value) {
		document.getElementById("currentValueP").innerHTML = value;
	});
	
	window.api.onSetted('batteryvoltage', function(value) {
		document.getElementById("voltageValuep").innerHTML = value;
	});
	
	
	
	var valuedetailsdrop = Dropdown(document.getElementById("valueDetailsD"), "Valitse arvo");//
	valuedetailsdrop.onClick(function() {
		//valuedetailsdrop.Clear();
		window.api.getValueDetails();
	});
	//valuedetailsdrop.addItem("ab");
	window.api.onValueDetails(function(names) {		
		names.forEach(function(element) {
			valuedetailsdrop.addItem(element.name);
		}, this);
		valuedetailsdrop.onAnyEvent(function(name) {
			window.api.getResource(name, 20, function() {
				
			});
			window.api.onResources(name, function(values) {
				//var message = 
				document.getElementById("values").innerHTML = "";
				document.getElementById("values").innerHTML += " \
					<table class='table'> \
					<thead> \
					<tr> \
					<th>Detail</th><th>Values</th><th>Päiväys</th> \
					</tr></thead> \
					<tbody> ";
					for (var i = 0; i < values.length; i++) {
						document.getElementById("values").innerHTML += "<tr><td>" + values[i].value_details + "</td><td>" + values[i].value + "</td><td>" + values[i].date + "</td></tr>";
					}
				document.getElementById("values").innerHTML += "</tbody></table>";
			});
		});
	});
	
});