angular.module('qmCommon')
    .directive('qmTimeLine', function ($q, QuantimodoSearchService, htmlHelper, $timeout) {

        return {
            restrict: 'E',
            scope: {
                predictorVariableName: '@predictor',
                outcomeVariableName: '@outcome',
                chartContainerId: '@chartContainerId',
                control: '='
            },
            templateUrl: 'common/templates/timeLine.html',
            controller: function ($scope) {
                console.log('Chart directive controller works');

                $scope.internalControlObject = $scope.control || {};
                $scope.internalControlObject.draw = drawRelationshipsChart;
                $scope.internalControlObject.drawVariableTimeLine = drawSingleVariableChart;

                function drawRelationshipsChart() {

                    console.debug('Draw Chart method of timeline directive called');

                    //reset values before start
                    var outcome = null;
                    var predictor = null;
                    var measurementRange = null;

                    $scope.internalControlObject.chartIsLoading = false;  //hide loading animation

                    //check for presense of both variables  //TODO it should be any number of variables
                    if ($scope.outcomeVariableName && $scope.predictorVariableName) {

                        //set flag that chart is loading. template will show/hide elements
                        $scope.internalControlObject.chartIsLoading = true;

                        //fetch details for each variable
                        $q.all([
                            QuantimodoSearchService.getVariableByName($scope.outcomeVariableName),
                            QuantimodoSearchService.getVariableByName($scope.predictorVariableName),
                        ]).then(function (values) {
                            //when everything is fetched - assign values
                            outcome = values[0].data[0];
                            predictor = values[1].data[0];

                            //get measurements for all variables
                            $q.all(
                                [
                                    QuantimodoSearchService.getDailyMeasurements(
                                        outcome.name,
                                        _.max([outcome.earliestFillingTime, predictor.earliestFillingTime]),
                                        _.min([outcome.latestFillingTime, predictor.latestFillingTime])),
                                    QuantimodoSearchService.getDailyMeasurements(
                                        predictor.name,
                                        _.max([outcome.earliestFillingTime, predictor.earliestFillingTime]),
                                        _.min([outcome.latestFillingTime, predictor.latestFillingTime])
                                    )
                                ]
                            ).then(function (values) {

                                //create google chart data object
                                var data = new google.visualization.DataTable();
                                //setup columns
                                data.addColumn('datetime', 'Day');
                                data.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
                                data.addColumn('number', outcome.name);
                                data.addColumn({type: 'string', role: 'annotation'});
                                data.addColumn('number', predictor.name);
                                data.addColumn({type: 'string', role: 'annotation'});

                                var outcomeMeasurements = values[0];
                                var predictorMeasurements = values[1];

                                //get moments with predictor measurements
                                var pMeasurementDates = _.map(predictorMeasurements, function (pMeasurement) {
                                    return pMeasurement.startTime;
                                });
                                //get moments with outcome measurements
                                var oMeasurementDates = _.map(outcomeMeasurements, function (oMeasurement) {
                                    return oMeasurement.startTime;
                                });
                                //merge moments into single array
                                var allDates = _.union(pMeasurementDates, oMeasurementDates);
                                //sort merged moments
                                allDates.sort();

                                //for each moment
                                allDates.forEach(function (measurementDate) {
                                    //try to get outcome value
                                    var outcomeMeasurementForDate = _.findWhere(outcomeMeasurements, {startTime: measurementDate});
                                    //try to get predictor value
                                    var predictorMeasurementForDate = _.findWhere(predictorMeasurements, {startTime: measurementDate});
                                    //add row to chart data table
                                    data.addRows([
                                        [
                                            new Date(measurementDate),
                                            htmlHelper.createTimeLineTooltip({
                                                date: measurementDate,
                                                outcome: outcome,
                                                predictor: predictor,
                                                outcomeMeasurementForDate: outcomeMeasurementForDate,
                                                predictorMeasurementForDate: predictorMeasurementForDate
                                            }),
                                            (outcomeMeasurementForDate) ? outcomeMeasurementForDate.value : undefined,
                                            getAnnotationForDate(outcome, measurementDate),
                                            (predictorMeasurementForDate) ? predictorMeasurementForDate.value : undefined,
                                            getAnnotationForDate(predictor, measurementDate),
                                        ]
                                    ])
                                });

                                var minOutcome = _.min(outcomeMeasurements, function (measurement) {
                                    return measurement.value;
                                });

                                var minPredictor = _.min(predictorMeasurements, function (measurement) {
                                    return measurement.value;
                                });

                                // Set chart options
                                var options = {
                                    'title': predictor.name + ' and ' + outcome.name + ' Over Time',
                                    'width': '100%',
                                    'height': 300,
                                    series: {
                                        0: {targetAxisIndex: 0},
                                        1: {targetAxisIndex: 1}
                                    },
                                    vAxes: {
                                        0: {title: outcome.name + ' (' + outcome.unitAbbreviatedName + ')'},
                                        1: {title: predictor.name + ' (' + predictor.unitAbbreviatedName + ')'}
                                    },
                                    animation: {
                                        startup: true,
                                        duration: 1000,
                                        easing: 'inAndOut'
                                    },
                                    interpolateNulls: true,
                                    pointSize: 3,
                                    curveType: 'function',
                                    tooltip: {isHtml: true},
                                    focusTarget: 'category',
                                    vAxis: {
                                        viewWindow: {
                                            min: minOutcome
                                        }
                                    },
                                    hAxis: {
                                        minorGridlines: {
                                            count: 30
                                        }
                                    }
                                };

                                //hide loading animation
                                $scope.internalControlObject.chartIsLoading = false;

                                //timeout is needed because directive change their visibility too fast
                                //and div width doesn't reach 100% when chart is drawn
                                $timeout(function () {
                                    //inject chart into page
                                    var chartTimeLine = new google.visualization.LineChart(document.getElementById('qm-time-line-chart'));
                                    //draw data
                                    chartTimeLine.draw(data, options);
                                }, 50);

                            });

                        });

                    } else {

                        $scope.internalControlObject.chartIsLoading = false;

                    }
                }

                function drawSingleVariableChart(variableName) {
                    console.debug('drawSingleVariableChart of qmTimeLine directive called to draw chart for:', variableName);

                    $scope.internalControlObject.chartIsLoading = false;  //hide loading animation

                    //check if variable name is available
                    if (variableName) {

                        //set flag that chart is loading. template will show/hide elements
                        $scope.internalControlObject.chartIsLoading = true;

                        //fetch variable details
                        QuantimodoSearchService.getVariableByName(variableName).then(function (variableDetailsResp) {

                            //endpoint returns an array, we taking first object
                            var variable = variableDetailsResp.data[0];

                            //get measurements for variable
                            QuantimodoSearchService
                                .getDailyMeasurements(variable.name, variable.earliestFillingTime, variable.latestFillingTime)
                                .then(function (variableMeasurementsResp) {

                                    //create google chart data object
                                    var data = new google.visualization.DataTable();

                                    //setup columns
                                    data.addColumn('date', 'Day');
                                    //data.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});

                                    data.addColumn('number', variable.name);

                                    //add values to data object
                                    variableMeasurementsResp.forEach(function (measurement) {

                                        var rowData = [
                                            new Date(measurement.startTime),
                                            measurement.value
                                        ];

                                        data.addRows([rowData]);

                                    });

                                    // Set chart options
                                    var options = {
                                        'title': variable.name + ' Over Time',
                                        'width': '100%',
                                        'height': 300,
                                        'legend': {
                                            'position': 'none'
                                        },
                                        animation: {
                                            startup: true,
                                            duration: 1000,
                                            easing: 'inAndOut'
                                        },
                                        series: {
                                            0: {color: '#E65100'},
                                        },
                                        interpolateNulls: true,
                                        pointSize: 3,
                                        //curveType: 'function',
                                        //tooltip: {isHtml: true},
                                        focusTarget: 'category',
                                        vAxis: {
                                            viewWindow: {
                                                //min: minOutcome
                                            }
                                        },
                                        hAxis: {
                                            minorGridlines: {
                                                count: 30
                                            }
                                        }
                                    };

                                    //hide loading animation
                                    $scope.internalControlObject.chartIsLoading = false;


                                    //timeout is needed because directive change their visibility too fast
                                    //and div width doesn't reach 100% when chart is drawn
                                    $timeout(function () {
                                        //inject chart into page

                                        var chartTimeLine;

                                        if ($scope.chartContainerId) {
                                            chartTimeLine = new google.visualization.LineChart(document.getElementById($scope.chartContainerId));
                                        } else {
                                            chartTimeLine = new google.visualization.LineChart(document.getElementById('qm-time-line-chart'));
                                        }

                                        //draw data
                                        chartTimeLine.draw(data, options);
                                    }, 50);

                                })

                        })

                    } else {
                        console.warn('addVariableToChart of qmTimeLine directive called without variable name!');
                        $scope.internalControlObject.chartIsLoading = false;
                    }

                }

                function getAnnotationForDate(variable, date) {
                    if (variable.experimentStartTime || variable.experimentEndTime) {

                        if (moment(variable.experimentStartTime).isSame(date, 'day')) {
                            return 'Experiment Start Time';
                        }

                        if (moment(variable.experimentEndTime).isSame(date, 'day')) {
                            return 'Experiment End Time';
                        }

                    }
                }

            }
        }

    });
