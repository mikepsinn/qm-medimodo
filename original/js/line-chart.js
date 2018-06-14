var scatterplotChart, timeLineChart;

var inputVariableMeasurements;
var inputVariableMeasurementsFromApi;
var outputVariableMeasurementsFromApi;
var xyVariableValues;

var defaultSelectSpeed = 300;

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

function retrieveValuesAndDrawGraphs(inputVariableName, outputVariableName, fromDate, toDate, grouping){
	if(!inputVariableName){inputVariableName = 'Overall Mood';}
	if(!outputVariableName){outputVariableName = 'Guiltiness';}
	if(!grouping){grouping = 86400;}
	$.when(
		$.getJSON('/api/v1/measurements/daily?variableName=' + inputVariableName + '&limit=0', function(json) {
			inputVariableMeasurementsFromApi = json;
		}),
		$.getJSON('/api/v1/measurements/daily?variableName=' + outputVariableName + '&limit=0', function(json) {
			outputVariableMeasurementsFromApi = json;
		})
	).done(function() {
		showOriginal();
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
	var inputValuesForTimeline =[];
	var outputValuesForTimeline = [];
	for (var i = 0; i < inputVariableMeasurementsFromApi.length; i++){
        inputValuesForTimeline.push([inputVariableMeasurementsFromApi[i].startTimeEpoch * 1000, inputVariableMeasurementsFromApi[i].value]);
	}
	for (i = 0; i < outputVariableMeasurementsFromApi.length; i++){
        outputValuesForTimeline.push([outputVariableMeasurementsFromApi[i].startTimeEpoch * 1000, outputVariableMeasurementsFromApi[i].value]);
	}
	var grouping = $('.select-duration .active').attr('grouping');
	drawTimeLineChart(inputValuesForTimeline, outputValuesForTimeline);
}

function drawTimeLineChart(inputValuesForTimeline, outputValuesForTimeline) {
		timeLineOptions.series[0].name = inputVariableMeasurementsFromApi[0].variableName + ", " + inputVariableMeasurementsFromApi[0].unitAbbreviatedName;
		timeLineOptions.series[0].data = inputValuesForTimeline;
		timeLineOptions.series[1].name = outputVariableMeasurementsFromApi[0].variableName + ", " + outputVariableMeasurementsFromApi[0].unitAbbreviatedName;
		timeLineOptions.series[1].data = outputValuesForTimeline;
		timeLineOptions.yAxis[0].title.text = inputVariableMeasurementsFromApi[0].variableName;
		timeLineOptions.yAxis[1].title.text = outputVariableMeasurementsFromApi[0].variableName;
		console.log(timeLineOptions);
		timeLineChart = new Highcharts.Chart(timeLineOptions);
}