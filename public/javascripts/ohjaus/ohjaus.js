/*function documentReady() {
    alert("abc");
    
}*/

$(document).ready(function() {
	var mersu = Mersu(document.getElementById('chassisContainer'), "/images/mersu/chassis.png", "/images/mersu/tireFront.png", "/images/mersu/tireRear.png", "/images/mersu/spoiler.png", "/images/mersu/brakeFront.png", "/images/mersu/brakeRear.png");
	var fan = Fan(document.getElementById('fanContainer'), "/images/fan/blowerFrame.png", "/images/fan/blower.png");
	mersu.tireFrontMode(0.1);
	mersu.tireRearMode(0.5);
	window.api.onSetted('suspension', function(value) {
		mersu.carChassisMode(value);
	});
	
	window.api.onSetted('fanspeed', function(value) {
		switch(value) {
			case 1:
				fan.blowerSpeed1();
			break;
			case 2:
				fan.blowerSpeed2();
			break;
			case 3:
				fan.blowerSpeed3();
			break;
			case 4:
				fan.blowerSpeed4();
			break;
		}
	});
	
	$("#setFanSpeed1Button").click(function() {
		api.Setted('fanspeed', 1, function() {
			
		});
	});
	$("#setFanSpeed2Button").click(function() {
		api.Setted('fanspeed', 2, function() {
			
		});		
	});
	$("#setFanSpeed3Button").click(function() {
		api.Setted('fanspeed', 3, function() {
			
		});		
	});
	$("#setFanSpeed4Button").click(function() {
		api.Setted('fanspeed', 4, function() {
			
		});		
	});
	
	$("#setSuspensionLowButton").click(function() {
		//kori.suspensionModeLow();
		api.Setted('suspension', 0, function() {
			
		});
		
	});
	
	$("#setSuspensionNormalButton").click(function() {
		//kori.suspensionModeNormal();
		api.Setted('suspension', 1, function() {
			
		});
	});
	
	$("#setSuspensionHighButton").click(function() {
		//kori.suspensionModeHigh();
		api.Setted('suspension', 2, function() {
			
		});
		//$("#setSuspensionHighButton").css("background-color", "red");
	});
});