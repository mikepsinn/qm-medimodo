angular.module('qmSearchRelationships')
    .directive('qmScatterPlot', function ($q, QuantimodoSearchService, htmlHelper, $timeout) {

        return {
            restrict: 'E',
            scope: {
                predictorVariableName: '@predictor',
                outcomeVariableName: '@outcome',
                control: '='
            },
            templateUrl: 'search-relationships/templates/scatter-plot.html',
            controller: function ($scope) {
                console.log('Scatter chart directive controller works');

                $scope.internalControlObject = $scope.control || {};
                $scope.internalControlObject.draw = drawChart;

                function drawChart() {

                    console.debug('Draw Chart method of scatter directive called');

                    //reset values before start
                    var outcome = null;
                    var predictor = null;
                    var measurementRange = null;

                    $scope.internalControlObject.chartIsLoading = false;  //hide loading animation

                    //check for presense of both variables
                    if ($scope.outcomeVariableName && $scope.predictorVariableName) {

                        //set flag that chart is loading. template will show/hide elements
                        $scope.internalControlObject.chartIsLoading = true;

                        //fetch details for each variable
                        //fetch measurements range
                        $q.all([
                            QuantimodoSearchService.getVariableByName($scope.outcomeVariableName),
                            QuantimodoSearchService.getVariableByName($scope.predictorVariableName),
                            QuantimodoSearchService.getMeasurementsRange()
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
                                data.addColumn('number', predictor.name);
                                data.addColumn('number', outcome.name);
                                data.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});

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

                                    if
                                    ((outcomeMeasurementForDate && typeof outcomeMeasurementForDate.value === 'number') &&
                                        (predictorMeasurementForDate && typeof predictorMeasurementForDate.value === 'number')) {

                                        data.addRows([
                                            [
                                                predictorMeasurementForDate.value,
                                                outcomeMeasurementForDate.value,
                                                htmlHelper.createTimeLineTooltip({
                                                    date: measurementDate,
                                                    outcome: outcome,
                                                    predictor: predictor,
                                                    outcomeMeasurementForDate: outcomeMeasurementForDate,
                                                    predictorMeasurementForDate: predictorMeasurementForDate
                                                })

                                            ]
                                        ])
                                    }

                                });

                                var minOutcome = _.min(outcomeMeasurements, function (measurement) {
                                    return measurement.value;
                                });

                                var minPredictor = _.min(predictorMeasurements, function (measurement) {
                                    return measurement.value;
                                });


                                // Set chart options
                                var options = {
                                    title: predictor.name + ' vs ' + outcome.name + ' Scatterplot',
                                    width: '100%',
                                    height: 300,
                                    interpolateNulls: true,
                                    pointSize: 5,
                                    pointShape: 'diamond',
                                    tooltip: {isHtml: true},
                                    legend: {
                                        position: 'none'
                                    },
                                    animation: {
                                        startup: true,
                                        duration: 1000,
                                        easing: 'out'
                                    },
                                    vAxis: {
                                        title: outcome.name + ' (' + outcome.unitAbbreviatedName + ')',
                                        viewWindow: {
                                            min: minOutcome
                                        },
                                        minorGridlines: {
                                            count: 5
                                        }
                                    },
                                    hAxis: {
                                        title: predictor.name + ' (' + predictor.unitAbbreviatedName + ')',
                                        viewWindow: {min: minPredictor},
                                        minorGridlines: {
                                            count: 5
                                        }
                                    }
                                };

                                //hide loading animation
                                $scope.internalControlObject.chartIsLoading = false;

                                //timeout is needed because directive change their visibility too fast
                                //and div width doesn't reach 100% when chart is drawn
                                $timeout(function () {
                                    //inject chart into page
                                    var chartTimeLine = new google.visualization.ScatterChart(document.getElementById('qm-scatter-chart'));
                                    //draw data
                                    chartTimeLine.draw(data, options);
                                }, 50);

                            });

                        });

                    } else {

                        $scope.internalControlObject.chartIsLoading = false;

                    }
                }

            }
        }

    });
