
function Newchartmodal() {
	var chartType;
	var axelData
	var chooseTablePropertiesContainer = document.getElementById("tablePropertiesContainer");
	chooseTablePropertiesContainer.disabled = true;
	$("#chooseCoordinateChartButton").click(function() {
		chartType = 'coordinate';
		document.getElementById("currentChartText").innerHTML = "Koordinaatisto";
	});
	
	$("#chooseTableChartButton").click(function() {
		chartType = 'table';
		document.getElementById("currentChartText").innerHTML = "Taulukko";
	});
}