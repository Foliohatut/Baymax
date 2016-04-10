/*function documentReady() {
    alert("abc");
    
}*/

$(document).ready(function() {
	var kori = Kori(document.getElementById('carBodyImg'), document.getElementById('setSuspensionLowButton'), 
					document.getElementById('setSuspensionNormalButton'), 
					document.getElementById('setSuspensionHighButton'));
	window.api.onSetted('suspension', function(value) {
		if (value === 0) {
			kori.suspensionModeLow();
		} else if (value === 1) {
			kori.suspensionModeNormal();
		} else if (value === 2) {
			kori.suspensionModeHigh();
		}
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