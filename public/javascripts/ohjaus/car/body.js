
function Kori(autonKori) {
	var tire1
	var tire2
	var currentMode = 1;
	var suspensionModeHigh = function() {
		$(autonKori).animate({
			top: "-50px"
		},
			500,
			function() {
				
		});
	}
	
	var suspensionModeNormal = function() {
		$(autonKori).animate({
			top: "0px"
		},
			500,
			function() {
				
		});
	}
	
	var suspensionModeLow = function() {
		$(autonKori).animate({
			top: "50px"
		},
			500,
			function() {
				
		});
	}
	
	return {
		suspensionModeHigh,
		suspensionModeNormal,
		suspensionModeLow
	};
	
}