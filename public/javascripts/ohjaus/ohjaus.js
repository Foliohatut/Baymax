/*function documentReady() {
    alert("abc");
    
}*/

$(document).ready(function() {
	var kori = Kori(document.getElementById('carBodyImg'), document.getElementById('setSuspensionLowButton'), 
					document.getElementById('setSuspensionNormalButton'), 
					document.getElementById('setSuspensionHighButton'));
	window.api.on('suspension', function(value) {
		if (value === 0) {
			kori.suspensionModeLow();
		} else if (value === 1) {
			kori.suspensionModeNormal();
		} else if (value === 2) {
			kori.suspensionModeHigh();
		}
	});
	
	$("#setSuspensionLowButton").click(function() {
		kori.suspensionModeLow();
		api.send('suspension', 0);
		
	});
	
	$("#setSuspensionNormalButton").click(function() {
		kori.suspensionModeNormal();
		api.send('suspension', 1);
	});
	
	$("#setSuspensionHighButton").click(function() {
		kori.suspensionModeHigh();
		api.send('suspension', 2);
		$("#setSuspensionHighButton").css("background-color", "red");
	});
});