function Mersu(container, carChassisImg, tireFrontImg, tireRearImg, spoilerImg, brakeFrontImg, brakeRearImg) {
 	var spoiler;
	var tireFront;
 	var tireRear;
 	var carChassis;
	var brakeFront;
	var brakeRear;
	var dummy;
	
	carChassis = document.createElement("IMG");
	spoiler = document.createElement("IMG");
	tireFront = document.createElement("IMG");
	tireRear = document.createElement("IMG");
	brakeFront = document.createElement("IMG");
	brakeRear = document.createElement("IMG");
	dummy = document.createElement("DIV");
	
	container.className = "car";
	spoiler.className = "spoiler";
	carChassis.className = "carChassis";
	tireFront.className = "carTireFront";
	tireRear.className = "carTireRear";
	brakeFront.className = "brakeFront";
	brakeRear.className = "brakeRear";
	dummy.className = "dummy";

	
	if (carChassisImg != undefined) carChassis.src = carChassisImg;
	if (spoilerImg != undefined) spoiler.src = spoilerImg;
	if (tireFrontImg != undefined) tireFront.src = tireFrontImg;
	if (tireRearImg != undefined) tireRear.src = tireRearImg;
	if (brakeFrontImg != undefined) brakeFront.src = brakeFrontImg;
	if (brakeRearImg != undefined) brakeRear.src = brakeRearImg;
	
	container.appendChild(carChassis);
	container.appendChild(spoiler);
	container.appendChild(tireFront);
	container.appendChild(tireRear);
	container.appendChild(brakeFront);
	container.appendChild(brakeRear);
	container.appendChild(dummy);
	
	
	function setChassisImg(src) {
		carChassis.src = src;
	}
	
	function setTireFrontImg(src) {
		tireFront.src = src;
	}
	
	function setTireRearImg(src) {
		tireRear.src = src;
	}
	
	function setSpoilerImg(src) {
		spoiler.src = src;
	}
	
	 
 	function spoilerMode(mode) {
	 
 	}
 	function tireFrontMode(tireRotation) {
		tireFront.style.animation = tireRotation + "s rotate360 infinite linear";
 	}
	 
 	function tireRearMode(tireRotation) {
		tireRear.style.animation = tireRotation + "s rotate360 infinite linear";
	}
	
	function carChassisMode(height) {
		 switch(height) {
			case 0:
				$(carChassis).animate({
					top: "4%"
					}, 500,
					function() {
					
				});
				$(spoiler).animate({
					top: "13%"
					}, 500,
					function() {
					
				});				
			break;
			case 1:
				$(carChassis).animate({
					top: "0%"
					}, 500,
					function() {
					
				});
				$(spoiler).animate({
					top: "9%"
					}, 500,
					function() {
					
				});	
			break;
			case 2:
				$(carChassis).animate({
					top: "-4%"
					}, 500,
					function() {
					
				});	
				$(spoiler).animate({
					top: "5%"
					}, 500,
					function() {
					
				});			
			break;
			
		 }
	}
	function setBrakeFrontImg(src) {
		
	}
	function setBrakeRearImg(src) {
		
	}
	
	 
	 return {
		 spoilerMode: spoilerMode,
		 setChassisImg: setChassisImg,
		 setTireFrontImg: setTireFrontImg,
		 setTireRearImg: setTireRearImg,
		 setBrakeFrontImg: setBrakeFrontImg,
		 setBrakeRearImg: setBrakeRearImg,
		 setSpoilerImg: setSpoilerImg,
		 carChassisMode: carChassisMode,
		 tireFrontMode: tireFrontMode,
		 tireRearMode: tireRearMode
	 }
	
}
