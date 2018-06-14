var mathUtils = {};
 
mathUtils.calculatePearsonsCorrelation = function(xyValues) 
{
	var length = xyValues.length;
	 
	var xy = [];
	var x2 = [];
	var y2 = [];
 
	$.each(xyValues,function(index,value){
		xy.push(value[0] * value[1]);
		x2.push(value[0] * value[0]);
		y2.push(value[1] * value[1]);
	});
	
	var sum_x = 0;
	var sum_y = 0;
	var sum_xy = 0;
	var sum_x2 = 0;
	var sum_y2 = 0;
 
	var i=0;
	$.each(xyValues,function(index,value){
		sum_x += value[0];
		sum_y += value[1];
		sum_xy += xy[i];
		sum_x2 += x2[i];
		sum_y2 += y2[i];
		i+=1;
	});
	
	var step1 = (length * sum_xy) - (sum_x * sum_y);
	var step2 = (length * sum_x2) - (sum_x * sum_x);
	var step3 = (length * sum_y2) - (sum_y * sum_y);
	var step4 = Math.sqrt(step2 * step3);
	var answer = step1 / step4;
 
	// check if answer is NaN, it can occur in the case of very small values
	return isNaN(answer) ? 0 : answer;
};


mathUtils.calculatePearsonsCorrelationSignificance=function(pearsonCoeffitient) {
	if (pearsonCoeffitient < -0.5) return "Strongly Negative";
	if (pearsonCoeffitient < -0.3) return "Moderately Negative";
	if (pearsonCoeffitient < -0.1) return "Weakly Negative";
	if (pearsonCoeffitient < 0.1) return "No";
	if (pearsonCoeffitient < 0.3) return "Weakly Positive";
	if (pearsonCoeffitient <= 0.5) return "Moderately Positive";
	if (pearsonCoeffitient > 0.5) return "Strongly Positive";
};


// objectWithValues={"a":1,"b":2,...}
// return (1+2+...)/n
mathUtils.calculateAverageForObjectValues=function(objectWithValues){
	var average=0;
	var size=0;
	$.each(objectWithValues,function(idx,value){
		average+=value;
		size++;
	});
	return average/size;
};
