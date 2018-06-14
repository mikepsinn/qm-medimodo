$(document).ready(function() {

	drawPearsonCoeff(-0.7);

});


function drawPearsonCoeff(pearsonCoeff) {
	var pearsonCoeffSignificance = mathUtils.calculatePearsonsCorrelationSignificance(pearsonCoeff);
	var customizedSigMessage = pearsonCoeffSignificance + ' Relationship';
	$('.statistical-relationship-gauge h4').html(customizedSigMessage);
	adjustPointer(pearsonCoeff);
}

function adjustPointer(calculatedPearsonCoeff) {
	var canvas = document.getElementById('pointer');
	var ctx1 = canvas.getContext('2d');
	var pointerImage = new Image();
	pointerImage.onload = function() {
		var minVal = -1;
		var maxVal = 1;
		// regular rotation about center
		var xpos = 35;
		var ypos = 35;
		ctx1.clearRect(0, 0, 70, 70);
		var pointerValue;
		if (calculatedPearsonCoeff) {
			if (calculatedPearsonCoeff > maxVal) {
				pointerValue = maxVal;
			} else if (calculatedPearsonCoeff < minVal) {
				pointerValue = minVal;
			} else {
				pointerValue = calculatedPearsonCoeff;
			}
		} else {
			pointerValue = 0;
		}

		ctx1.save();
		ctx1.translate(35, 48);
		ctx1.rotate(pointerValue * Math.PI / 2.0);
		ctx1.drawImage(pointerImage, -12, -33);
		ctx1.rotate(-pointerValue * Math.PI / 2.0);
		ctx1.translate(-xpos - 12, -ypos - 33);
		ctx1.restore();
	};
	pointerImage.src = '/original/imgs/pointer-image.png';
}
