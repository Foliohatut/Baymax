function Fan(container, blowerFrameImg, blowerImg) {
 	var blowerFrame;
	var blower;
	var dummy;
	
	blowerFrame = document.createElement("IMG");
	blower = document.createElement("IMG");
	dummy = document.createElement("DIV");
	
	container.className = "dash";
	blowerFrame.className = "blowerFrame";
	blower.className = "blower";
	dummy.className = "dummy";

	
	if (blowerFrameImg != undefined) blowerFrame.src = blowerFrameImg;
	if (blowerImg != undefined) blower.src = blowerImg;
	
	container.appendChild(blowerFrame);
	container.appendChild(blower);
	container.appendChild(dummy);
	
	
	
	
 	function blowerSpeed1(blowerRotation) {
		blower.style.animation ="4s rotate360 infinite linear";
 	}
	 
	function blowerSpeed2(blowerRotation) {
		blower.style.animation ="3s rotate360 infinite linear";
 	}
	 
	function blowerSpeed3(blowerRotation) {
		blower.style.animation ="2s rotate360 infinite linear";
 	} 
	 
	function blowerSpeed4(blowerRotation) {
		blower.style.animation ="1s rotate360 infinite linear";
 	}

	 
	 return {
		 blowerSpeed1: blowerSpeed1,
		 blowerSpeed2: blowerSpeed2,
		 blowerSpeed3: blowerSpeed3,
		 blowerSpeed4: blowerSpeed4
	 }
	
}