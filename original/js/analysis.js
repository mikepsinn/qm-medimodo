var scatterplotChart, timeLineChart;

var inputVariableMeasurements, outputVariableMeasurements;
var inputVariableMeasurementsFromApi;
var outputVariableMeasurementsFromApi;
var xyVariableValues;

var defaultSelectSpeed = 300;
var timeShiftedValue = null;
var timeShiftPossibleValues = {
	"0" : 30 * 24 * 3600 * 1000,
	"1" : 7 * 24 * 3600 * 1000,
	"2" : 24 * 3600 * 1000,
	"3" : 3600 * 1000,
	"4" : 60 * 1000
};

var significanceMessage = "{1} correlation between {2} and {3}";
var duplicateVariablesNotificationText="You are comparing one and the same set of values, this way the correlation will be 100%";

var scatterplotOptions = {
	chart : {
		renderTo : 'scatterplot',
		type : 'scatter',
		zoomType : 'xy',
		backgroundColor : null
	},
	credits : {
		text : '',
		href : ''
	},
	exporting : {
		enabled : false
	},
	title : {text:""},
	xAxis : {
		title : {
			enabled : true
		},
		startOnTick : true,
		endOnTick : true,
		showLastLabel : true
	},
	yAxis : {
		title : {}
	},
	tooltip : {
		/*
		 * not works (why?)
		 * http://api.highcharts.com/highcharts#tooltip.valueDecimals
		 */
		valueDecimals : 2
	},
	legend : {
		layout : 'vertical',
		align : 'left',
		verticalAlign : 'top',
		x : -50,
		y : -50,
		floating : true,
		backgroundColor : '#FFFFFF',
		borderWidth : 1
	},
	plotOptions : {
		scatter : {
			marker : {
				radius : 5,
				states : {
					hover : {
						enabled : true,
						lineColor : 'rgb(100,100,100)'
					}
				}
			},
			states : {
				hover : {
					marker : {
						enabled : false
					}
				}
			}
		}
	},
	series : [ {
		color : 'rgba(223, 83, 83, .5)'
	} ]
};

var timeLineOptions = {
	chart : {
		renderTo : 'timelinechart',
		type : 'spline',
		zoomType : 'x',
		backgroundColor : null
	},
	credits : {
		text : '',
		href : ''
	},
	exporting : {
		enabled : false
	},
	title : {text:""},
	xAxis : {
		type : 'datetime',
		startOnTick : true,
		endOnTick : true,
		showLastLabel : true
	},
	yAxis : [ {
		title : {},
		endOnTick : true,
		startOnTick : true
	}, {
		opposite : true,
		title : {},
		endOnTick : true,
		startOnTick : true
	} ],
	legend : {
		layout : 'vertical',
		align : 'left',
		verticalAlign : 'top',
		floating : true,
		x : 65,
		y : 35,
		borderWidth : 1
	},
	series : [ {
		name : ''
	}, {
		name : '',
		yAxis : 1
	} ]
};

$(document).ready(function() {

	$('a.toggle-btn').bind('click', function() {
		$(this).parent().find('.graph-inner').slideToggle();
		$(this).toggleClass('isCollapsed');
		$(this).parent().find('.body-social-sharing').slideToggle();
		return false;
	}).each(function() {
	});

	$('.select-duration ul li a').click(function() {
		$('.select-duration ul li a').removeClass('active');
		$(this).addClass('active');
		$('#duration').attr('value', $(this).text());
		return false;
	});

	$(".date-from").datepicker({
		dateFormat : "M d, yy",
		showAnim : "blind",
		defaultDate : "+1w",
		changeMonth : true,
		numberOfMonths : 1,
		// gotoCurrent: true,
		setDate : new Date(),
		onClose : function(selectedDate) {
			$(".date-to").datepicker("option", "minDate", selectedDate);
		}
	});

	$(".date-to").datepicker({
		dateFormat : "M d, yy",
		showAnim : "blind",
		changeMonth : true,
		numberOfMonths : 1,
		defaultDate : new Date(),
		onClose : function(selectedDate) {
			$(".date-from").datepicker("option", "maxDate", selectedDate);
		}
	}).datepicker('setDate', new Date());
	// initializing scrollbar
	$('.notes-bottom').jScrollPane();

	applyUserVariableSettings();
	$('#help-tip1').qtip({
		content: 'Choose the category with the input data',
		show: 'mouseover',
		hide: 'mouseout',
		position: 'bottomMiddle',
		style:'qtip-dark info-tip'
	});
	$('#help-tip2').qtip({
		content: 'Aggregated input variable to<br/> track for correlations',
		show: 'mouseover',
		hide: 'mouseout',
		position: 'bottomMiddle',
		style:'qtip-dark info-tip2'
	});
	$('#help-tip3').qtip({
		content: 'Output state category that you want to track',
		show: 'mouseover',
		hide: 'mouseout',
		position: 'bottomMiddle',
		style:'qtip-dark info-tip'
	});
	$('#help-tip4').qtip({
		content: 'Choose the aggregated output<br/> state or behavior to track',
		show: 'mouseover',
		hide: 'mouseout',
		position: 'bottomMiddle',
		style:'qtip-dark info-tip2'
	});


	retrieveValuesAndDrawGraphs();
});

function applyUserVariableSettings() {

	$.when($.getJSON('/analyze/variables_settings/get', function(json) {

		userVariableSettings = json;
		if (!userVariableSettings) {
			return;
		}
		//if (userVariableSettings.startTime.iMillis > 0) {
		//	$(".date-from").datepicker('setDate', new Date(userVariableSettings.startTime.iMillis));
		//}
		//if (userVariableSettings.endTime.iMillis > 0) {
		//	$(".date-to").datepicker('setDate', new Date(userVariableSettings.endTime.iMillis));
		//}

		if (userVariableSettings.grouping) {
			$('.select-duration a').removeClass('active');
			$('.select-duration a[grouping="' + userVariableSettings.grouping.value + '"]').addClass('active');
		}

	})).done(function() {
		setupVariablesSelectors();
	});
}

function setupVariablesSelectors() {

	resetTimeShift();

	$("#input_categories_select").change(function(){
		variableCategoryChange($("#input_categories_select"), $('#input_vars_select'),"input",
				userVariableSettings ? {id : userVariableSettings.inputId, type : userVariableSettings.inputType} : undefined);
	});

	$("#output_categories_select").change(function() {
		variableCategoryChange($("#output_categories_select"), $('#output_vars_select'), "output",
				userVariableSettings ? {id : userVariableSettings.outputId, type : userVariableSettings.outputType} : undefined);
	});

	refreshCategoriesSelect($('#input_categories_select'), $('#input_vars_select'),
			userVariableSettings ? userVariableSettings.inputCategory : undefined);

	refreshCategoriesSelect($('#output_categories_select'), $('#output_vars_select'),
			userVariableSettings ? userVariableSettings.outputCategory : undefined);

	$('#input_vars_select').change(function() {
		updateValuesAndDrawGraphs();
	});

	$('#output_vars_select').change(function() {
		updateValuesAndDrawGraphs();
	});

	$('.select-duration a').click(function() {
		updateValuesAndDrawGraphs();
	});

	$('.select-date input').change(function() {
		updateValuesAndDrawGraphs();
	});

	$('#show_original').click(function() {
		resetTimeShift();
		showOriginal();
	});
	$('#show_zeroes').click(function() {
		resetTimeShift();
		fillUpByZeroes();
	});
	$('#show_avg').click(function() {
		resetTimeShift();
		fillUpByAVG();
	});
	$('#show_interpolation').click(function() {
		resetTimeShift();
		fillUpByInterpolatedValues();
	});

	$("#shift-backward").click(function() {
		if (timeShiftedValue !== null) {
			timeShiftedValue--;
		} else {
			timeShiftedValue = -1;
		}
		recalculateAndRedrawGraphs();
	});

	$("#shift-forward").click(function() {
		if (timeShiftedValue !== null) {
			timeShiftedValue++;
		} else {
			timeShiftedValue = 1;
		}
		recalculateAndRedrawGraphs();
	});
}

function refreshCategoriesSelect(categorySelect, varsSelect, selectedCategoryId) {
	categorySelect.find('option').remove();
	categorySelect.find('optgroup').remove();
	
	categorySelect.selectbox('detach');
	$.getJSON('/categories', function(json) {

		categorySelect.append(new Option("", ""));

//		categorySelect.append('<optgroup label="Public categories">');
//		$.each(json, function(key, val) {
//			if (val.global) {
//				categorySelect.append("<option global='" + val.global + "' value='" + val.id + "'>" + val.name
//						+ "</value>");
//			}
//		});
//		categorySelect.append('</optgroup>');

//		categorySelect.append('<optgroup label="Private categories">');
//		$.each(json, function(key, val) {
//			if (!val.global) {
//				categorySelect.append("<option global='" + val.global + "' value='" + val.id + "'>" + val.name
//						+ "</value>");
//			}
//		});
//		categorySelect.append('</optgroup>');
		$.each(json, function(key, val) {
			categorySelect.append("<option global='" + val.global + "' value='" + val.id + "'>" + val.name + "</value>");
		});

		if (selectedCategoryId) {
			categorySelect.val(selectedCategoryId);
			categorySelect.change();
		}
		categorySelect.selectbox({
			speed : defaultSelectSpeed
		});

		varsSelect.selectbox({
			speed : defaultSelectSpeed
		});

	});
}

function variableCategoryChange(categorySelect, varsSelect,behaviour,userSettingsInfo){

	varsSelect.find('optgroup').remove();
	varsSelect.find('option').remove();
	varsSelect.selectbox('detach');
	varsSelect.selectbox();

	var value =categorySelect.val();
	if (!value) {
		return;
	}
	$.getJSON("variables/aggregated?behaviour="+behaviour+"&category_id=" + value, function(json) {

//		var hasPublic=false;
//		$.each(json, function(key, val) {
//			if (!val.global) {
//				return;
//			}
//			if(!hasPublic){
//				varsSelect.append('<optgroup label="Public variables">');
//				hasPublic=true;
//			}
//			var name = (val.application ? val.application + " , " : "") + val.name;
//			varsSelect.append("<option global='" + val.global + "' var_type='"
//					+ val.type + "' value='" + val.id + "'>" + name + "</value>");
//		});
//		if(hasPublic){
//			varsSelect.append('</optgroup>');
//		}
//
//		var hasPrivate=false;
//		$.each(json, function(key, val) {
//			if (val.global) {
//				return;
//			}
//			if(!hasPrivate){
////				varsSelect.append('<optgroup label="Private variables">');
//				hasPrivate=true;
//			}
//			var name = (val.application ? val.application + " , " : "") + val.name;
//			varsSelect.append("<option global='" + val.global + "' var_type='"
//					+ val.type + "' value='" + val.id + "'>" + name + "</value>");
//		});
//		if(hasPrivate){
////			varsSelect.append('</optgroup>');
//		}
		$.each(json, function(key, val) {
			var name = (val.application ? val.application + " , " : "") + val.name;
			varsSelect.append("<option global='" + val.global + "' var_type='" + val.type + "' value='" + val.id + "'>" + name + "</value>");
		});

		if (userSettingsInfo) {
			varsSelect.find(
					"[value='" + userSettingsInfo.id + "'][var_type='" + userSettingsInfo.type + "']").attr("selected", "selected");
		} else if(json[0]) {
			varsSelect.val(json[0].id);
		}

		varsSelect.change();
		varsSelect.selectbox('detach');
		varsSelect.selectbox({
			speed : defaultSelectSpeed
		});
	});

}

function recalculateAndRedrawGraphs() {
	$("#shifter_time_value").html(timeShiftedValue);
	if ($('#show_zeroes').is(":checked")) {
		fillUpByZeroes();
		return;
	}
	if ($('#show_avg').is(":checked")) {
		fillUpByAVG();
		return;
	}
	if ($('#show_interpolation').is(":checked")) {
		fillUpByInterpolatedValues();
		return;
	}
	// default
	showOriginal();

}

function resetTimeShift() {
	timeShiftedValue = null;
	$("#shifter_time_value").html("0");
}

function shiftDate(grouping, date) {
	var correctedTimeShiftValue = !timeShiftedValue || timeShiftedValue === null ? 0 : timeShiftedValue;
	return Number(date) + correctedTimeShiftValue * timeShiftPossibleValues[grouping];
}

function updateValuesAndDrawGraphs() {
	// timeShiftedValue=0;
	var fromDate = $(".date-from").val();
	var toDate = $(".date-to").val();
	var grouping = $('.select-duration .active').attr('grouping');

	var groupingWidthMilliseconds = timeShiftPossibleValues[grouping];

	var inputVarType = $('#input_vars_select option:selected').attr("var_type");
	var outputVarType = $('#output_vars_select option:selected').attr("var_type");
	var inputVariableName = $('#input_vars_select option:selected').name();
	var outputVariableName = $('#output_vars_select option:selected').name();

	if (!inputVariableName || !outputVariableName) {
		return;
	}
	
	//if(inputVarId==outputVarId){
	//	App.loadMustacheTemplate("serviceTemplates.html", "warningNotificationWithText", function(template) {
	//		var html = template.render({text : duplicateVariablesNotificationText});
	//		App.makeModal(html);
//
//			$("#warningWithTextDialog").on('hidden',function() {
//				retrieveValuesAndDrawGraphs(inputVarType, inputVarId, outputVarType, outputVarId, fromDate, toDate, grouping);
//			});
//		});
//	} else{
//		retrieveValuesAndDrawGraphs(inputVarType, inputVarId, outputVarType, outputVarId, fromDate, toDate, grouping);
//	}
	
	retrieveValuesAndDrawGraphs(inputVariableName, outputVariableName, fromDate, toDate, grouping);

	
}

function retrieveValuesAndDrawGraphs(inputVariableName, outputVariableName, fromDate, toDate, grouping){
	if(!inputVariableName){
		inputVariableName = 'Overall Mood';
	}

	if(!outputVariableName){
		outputVariableName = 'Guiltiness';
	}

	if(!grouping){
		grouping = 86400;
	}

	$.when(
			$.getJSON('/api/v1/measurements/daily?variableName=' + inputVariableName + '&limit=0', function(json) {
				inputVariableMeasurementsFromApi = json;
			}),
			$.getJSON('/api/v1/measurements/daily?variableName=' + outputVariableName + '&limit=0', function(json) {
				outputVariableMeasurementsFromApi = json;
			})).done(function() {
		// $('#show_original').click();
		showOriginal();
		//saveVariableSettings(inputVarType, inputVarId, outputVarType, outputVarId/*, fromDate, toDate*/, grouping);
		resetTimeShift();
	});
}

function showOriginal() {

	if (/*inputVariableMeasurements == undefined ||*/ $.isEmptyObject(inputVariableMeasurementsFromApi)) {
		alert("You don't have data for " + $("#input_apps_select option:selected").text() + " " + $("#input_vars_select option:selected").text());
		return;
	}
	if (/*outputVariableMeasurements == undefined ||*/ $.isEmptyObject(outputVariableMeasurementsFromApi)) {
		alert("You don't have data for " + $("#output_apps_select option:selected").text() + " " + $("#output_vars_select option:selected").text());
		return;
	}

	var inputMeasurementStartTimeMillisecondsArray = [];
	var inputValuesIndexedByStartTimeMilliseconds = [];
	for (var i = 0; i < inputVariableMeasurementsFromApi.length; i++){
		inputMeasurementStartTimeMillisecondsArray.push(inputVariableMeasurementsFromApi[i].startTimeEpoch * 1000);
		inputValuesIndexedByStartTimeMilliseconds[inputVariableMeasurementsFromApi[i].startTimeEpoch * 1000] = inputVariableMeasurementsFromApi[i].value;
	}

	var outputValuesIndexedByStartTimeMilliseconds = [];
	for (i = 0; i < outputVariableMeasurementsFromApi.length; i++){
		outputValuesIndexedByStartTimeMilliseconds[outputVariableMeasurementsFromApi[i].startTimeEpoch * 1000] = outputVariableMeasurementsFromApi[i].value;
	}

	xyVariableValues = [];
	var grouping = $('.select-duration .active').attr('grouping');
	var groupingWidthMilliseconds = timeShiftPossibleValues[grouping];
	var shiftedOutputVariableValue;
	var inputValuesForTimeline = [];
	var outputValuesForTimeline = [];
	$.each(inputMeasurementStartTimeMillisecondsArray, function(idx, inputMeasurementStartTimeMilliseconds) {
		//shiftedOutputVariableValue = outputValuesIndexedByStartTimeMilliseconds[shiftDate(grouping, inputMeasurementStartTimeMilliseconds)];
		shiftedOutputVariableValue = outputValuesIndexedByStartTimeMilliseconds[inputMeasurementStartTimeMilliseconds];
		if (shiftedOutputVariableValue) {
			/*
			 * http://stackoverflow.com/questions/9453421/how-to-round-float-numbers
			 */
			xyVariableValues.push([ Number(inputValuesIndexedByStartTimeMilliseconds[inputMeasurementStartTimeMilliseconds].toFixed(2)), Number(shiftedOutputVariableValue.toFixed(2)) ]);
			inputValuesForTimeline.push(Number(inputValuesIndexedByStartTimeMilliseconds[inputMeasurementStartTimeMilliseconds].toFixed(2)));
			outputValuesForTimeline.push(Number(shiftedOutputVariableValue.toFixed(2)));
			/*
			 * not works (why?)
			 * http://api.highcharts.com/highcharts#tooltip.valueDecimals
			 */
//			xyVariableValues.push([ inputVariableMeasurements[date], outputVar ]);
		}
	});
	drawScatterplot();
	drawTimeLineChart(inputValuesForTimeline, outputValuesForTimeline);

	var pearsonCorrelationCoefficient = mathUtils.calculatePearsonsCorrelation(xyVariableValues);
	drawPearsonCoeff(pearsonCorrelationCoefficient);
}

function drawPearsonCoeff(pearsonCoeff) {
	var pearsonCoeffSignificance = mathUtils.calculatePearsonsCorrelationSignificance(pearsonCoeff);
	var customizedSigMessage = significanceMessage.replace("{1}", pearsonCoeffSignificance).replace("{2}",
		inputVariableMeasurementsFromApi[0].variableName).replace("{3}", outputVariableMeasurementsFromApi[0].variableName);
	$('.statistical-relation h4').html(customizedSigMessage + " " + Math.round(pearsonCoeff * 100) + "%");
	adjustPointer(pearsonCoeff);
}

function fillUpByZeroes() {
	fillUpByDefaultValue(0, 0);
}

function fillUpByAVG() {
	var xAverage = mathUtils.calculateAverageForObjectValues(inputValuesIndexedByStartTimeMilliseconds);
	var yAverage = mathUtils.calculateAverageForObjectValues(outputValuesIndexedByStartTimeMilliseconds);
	fillUpByDefaultValue(xAverage, yAverage);
}

function fillUpByDefaultValue(xDefaultValue, yDefaultValue) {
	var dates = $.map(inputVariableMeasurements, function(value, index) {
		return index;
	});
	var shiftedOutputVariableValues = {};
	var grouping = $('.select-duration .active').attr('grouping');
	var outputDates = $.map(outputValuesIndexedByStartTimeMilliseconds, function(value, index) {
		var shiftedDate = shiftDate(grouping, index);
		shiftedOutputVariableValues[shiftedDate] = value;
		return shiftedDate;
	});

	$.each(outputDates, function(idx, date) {
		if ($.inArray(date, dates) < 0) {
			dates.push(date);
		}
	});
	dates = dates.sort();

	xyVariableValues = [];
	var xValues = [];
	var yValues = [];
	$.each(dates, function(idx, date) {
		var inputVar = inputVariableMeasurements[date];
		inputVar = (inputVar == undefined ? xDefaultValue : inputVar);
		xValues.push([ Number(date), inputVar ]);
		var outputVar = shiftedOutputVariableValues[date];
		outputVar = (outputVar == undefined ? yDefaultValue : outputVar);
		yValues.push([ Number(date), outputVar ]);

		xyVariableValues.push([ inputVar, outputVar ]);

	});
	drawScatterplot();
	drawTimeLineChart(xValues, yValues);

	var pearsonCoeff = mathUtils.calculatePearsonsCorrelation(xyVariableValues);
	drawPearsonCoeff(pearsonCoeff);
}

function fillUpByInterpolatedValues() {
	var dates = $.map(inputVariableMeasurements, function(value, index) {
		return index;
	});
	var shiftedOutputVariableValues = {};
	var grouping = $('.select-duration .active').attr('grouping');
	var outputDates = $.map(outputValuesIndexedByStartTimeMilliseconds, function(value, index) {
		var shiftedDate = shiftDate(grouping, index);
		shiftedOutputVariableValues[shiftedDate] = value;
		return shiftedDate;
	});

	$.each(outputDates, function(idx, date) {
		if ($.inArray(date, dates) < 0) {
			dates.push(date);
		}
	});
	dates.sort();

	var xValues = [];
	var yValues = [];
	xyVariableValues = [];

	var inputStart, inputEnd;
	var outputValuesForBlankInput = [];
	var outputStart, outputEnd;
	var inputValuesForBlankOutput = [];

	var inputDatesCache = [];
	var outputDatesCache = [];

	$.each(dates, function(idx, date) {
		var addToXy = true;
		var inputVar = inputVariableMeasurements[date];
		var outputVar = shiftedOutputVariableValues[date];
		var avg;

		if (inputVar === undefined && outputVar !== undefined) {
			outputValuesForBlankInput.push(outputVar);
			inputDatesCache.push(date);
			addToXy = false;
		}

		if (outputVar === undefined && inputVar !== undefined) {
			inputValuesForBlankOutput.push(inputVar);
			outputDatesCache.push(date);
			addToXy = false;
		}

		if (inputVar === undefined && inputStart === undefined) {
			inputStart = 0;
		} else if (inputVar !== undefined && (inputStart === undefined || outputValuesForBlankInput.length === 0)) {
			inputStart = inputVar;
		}
		if (inputVar !== undefined) {
			inputEnd = inputVar;
			xValues.push([ Number(date), inputVar ]);
		}

		if (outputVar === undefined && outputStart === undefined) {
			outputStart = 0;
		} else if (outputVar !== undefined && (outputStart === undefined || inputValuesForBlankOutput.length === 0)) {
			outputStart = outputVar;
		}

		if (outputVar !== undefined) {
			outputEnd = outputVar;
			yValues.push([ Number(date), outputVar ]);
		}

		if (addToXy) {
			xyVariableValues.push([ inputVar, outputVar ]);
		}

		if (outputValuesForBlankInput.length > 0) {
			if (inputStart !== undefined && inputEnd !== undefined) {
				avg = (inputStart + inputEnd) / 2;
				for ( var i = 0; i < outputValuesForBlankInput.length; i++) {
					xyVariableValues.push([ avg, outputValuesForBlankInput[i] ]);
					xValues.push([ Number(inputDatesCache[i]), avg ]);
				}
				outputValuesForBlankInput = [];
				inputDatesCache = [];
				inputStart = inputEnd;
				inputEnd = undefined;
			}
			return;
		}

		if (inputValuesForBlankOutput.length > 0) {
			if (outputStart !== undefined && outputEnd !== undefined) {
				avg = (outputStart + outputEnd) / 2;
				for ( var i = 0; i < inputValuesForBlankOutput.length; i++) {
					xyVariableValues.push([ inputValuesForBlankOutput[i], avg ]);
					yValues.push([ Number(outputDatesCache[i]), avg ]);
				}
				inputValuesForBlankOutput = [];
				outputDatesCache = [];
				outputStart = outputEnd;
				outputEnd = undefined;
			}

		}

	});

	inputEnd = 0;
	if (outputValuesForBlankInput.length > 0) {
		if (inputStart !== undefined && inputEnd !== undefined) {
			avg = (inputStart + inputEnd) / 2;
			for ( i = 0; i < outputValuesForBlankInput.length; i++) {
				xyVariableValues.push([ avg, outputValuesForBlankInput[i] ]);
				xValues.push([ Number(inputDatesCache[i]), avg ]);
			}

			outputValuesForBlankInput = [];
			inputDatesCache = [];
			inputStart = inputEnd;
			inputEnd = undefined;
		}
	}
	outputEnd = 0;
	if (inputValuesForBlankOutput.length > 0) {
		if (outputStart !== undefined && outputEnd !== undefined) {
			avg = (outputStart + outputEnd) / 2;
			for ( i = 0; i < inputValuesForBlankOutput.length; i++) {
				xyVariableValues.push([ inputValuesForBlankOutput[i], avg ]);
				yValues.push([ Number(outputDatesCache[i]), avg ]);
			}

			inputValuesForBlankOutput = [];
			outputDatesCache = [];
			outputStart = outputEnd;
			outputEnd = undefined;
		}
	}

	drawScatterplot();
	xValues.sort(function(a, b) {
		return a[0] > b[0] ? 1 : (a[0] === b[0] ? 0 : -1);
	});
	yValues.sort(function(a, b) {
		return a[0] > b[0] ? 1 : (a[0] === b[0] ? 0 : -1);
	});

	drawTimeLineChart(xValues, yValues);

	var pearsonCoeff = mathUtils.calculatePearsonsCorrelation(xyVariableValues);
	drawPearsonCoeff(pearsonCoeff);
}

// initialize variable settings saving process
function saveVariableSettings(inputVarType, inputVarId, outputVarType, outputVarId/*, fromDate, toDate*/, grouping) {
	$.ajax({
		url : '/analyze/variables_settings/save',
		type : 'POST',
		data : {
			"input_id" : inputVarId,
			"input_type" : inputVarType,
			"output_id" : outputVarId,
			"output_type" : outputVarType,
			/*"from" : fromDate,*/
			/*"to" : toDate,*/
			"grouping" : grouping
		}
	});
}

function drawTimeLineChart(xValues, yValues) {
	if (timeShiftedValue === null) {
		timeLineOptions.series[0].name = inputVariableMeasurementsFromApi[0].variableName + ", " + inputVariableMeasurementsFromApi[0].unitAbbreviatedName;
		timeLineOptions.series[0].data = xValues;
		timeLineOptions.series[1].name = outputVariableMeasurementsFromApi[0].variableName + ", " + outputVariableMeasurementsFromApi[0].unitAbbreviatedName;
		timeLineOptions.series[1].data = yValues;

		timeLineOptions.yAxis[0].title.text = inputVariableMeasurementsFromApi[0].variableName;
		timeLineOptions.yAxis[1].title.text = outputVariableMeasurementsFromApi[0].variableName;
		timeLineChart = new Highcharts.Chart(timeLineOptions);
	} else {
		for ( var i = 0; i < timeLineChart.series[0].data.length; i++) {
			timeLineChart.series[0].data[i].update([ xValues[i][0], xValues[i][1] ], false);
		}
		for ( var i = 0; i < timeLineChart.series[1].data.length; i++) {
			timeLineChart.series[1].data[i].update([ yValues[i][0], yValues[i][1] ], false);
		}

		timeLineChart.redraw();
	}
}

function drawScatterplot() {
	scatterplotOptions.series[0].name = $('.select-duration .active').html() + " grouping";
	scatterplotOptions.series[0].data = xyVariableValues;
	scatterplotOptions.xAxis.title.text = inputVariableMeasurementsFromApi[0].variableName;
	scatterplotOptions.yAxis.title.text = outputVariableMeasurementsFromApi[0].variableName;
	scatterplotOptions.tooltip.formatter = function() {
		return '' + this.x + ' ' + inputVariableMeasurementsFromApi[0].unitAbbreviatedName + ', ' + this.y + ' ' +
			outputVariableMeasurementsFromApi[0].unitAbbreviatedName;
	};
	scatterplotChart = new Highcharts.Chart(scatterplotOptions);

	$('#correlations .graph-inner').css('background',
			'/imgs/correlation-scatterplot-container.png no-repeat scroll left top transparent');
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
