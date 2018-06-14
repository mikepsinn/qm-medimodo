angular.module('qmCommon').service('htmlHelper', function () {
        this.createTimeLineTooltip = function (dataForToolTip) {
            var htmlString = "<div class='time-line-tooltip'>";
            htmlString += "<strong>Date: </strong>" + "<span>" + moment(dataForToolTip.date).format('ll') + "</span><br>";
            if (dataForToolTip.outcomeMeasurementForDate) {
                htmlString += "<strong>" + dataForToolTip.outcome.name + ": </strong>" +
                    "<span>" + dataForToolTip.outcomeMeasurementForDate.value + " (" + dataForToolTip.outcome.unitAbbreviatedName + ")</span><br>";
            }
            if (dataForToolTip.predictorMeasurementForDate) {
                htmlString += "<strong>" + dataForToolTip.predictor.name + ": </strong>" +
                    "<span>" + dataForToolTip.predictorMeasurementForDate.value + " (" + dataForToolTip.predictor.unitAbbreviatedName + ")</span><br>";
            }
            return htmlString + "</div>";
        };
        this.createCorrelationInfoTooltip = function (correlation) {
            var htmlString = "<table>";
            if(correlation.timestamp){htmlString += "<tr><td>Timestamp</td>" + "<td>" + correlation.timestamp + "</td></tr>";}
            htmlString += "<tr><td>Forward Pearson Correlation Coefficient</td>" + "<td>" + correlation.correlationCoefficient + "</td></tr>";
            htmlString += "<tr><td>Onset Delay</td>" + "<td>" + correlation.onsetDelay + "</td></tr>";
            htmlString += "<tr><td>Duration Of Action</td>" + "<td>" + correlation.durationOfAction + "</td></tr>";
            htmlString += "<tr><td>Number Of Pairs</td>" + "<td>" + correlation.numberOfPairs + "</td></tr>";
            htmlString += "<tr><td>Value Predicting High Outcome</td>" + "<td>" + correlation.valuePredictingHighOutcome + "</td></tr>";
            htmlString += "<tr><td>Value Predicting Low Outcome</td>" + "<td>" + correlation.valuePredictingLowOutcome + "</td></tr>";
            htmlString += "<tr><td>Cause Changes</td>" + "<td>" + correlation.causeChanges + "</td></tr>";
            htmlString += "<tr><td>Effect Changes</td>" + "<td>" + correlation.effectChanges + "</td></tr>";
            if(correlation.qmScore){htmlString += "<tr><td>QM Score</td>" + "<td>" + correlation.qmScore + "</td></tr>";}
            htmlString += "<tr><td>Statistical Significance</td>" + "<td>" + correlation.statisticalSignificance + "</td></tr>";
            htmlString += "<tr><td>Reverse Pearson Correlation Coefficient</td>" + "<td>" + correlation.reversePearsonCorrelationCoefficient + "</td></tr>";
            htmlString += "<tr><td>Predictive Pearson Correlation Coefficient</td>" + "<td>" + correlation.predictivePearsonCorrelationCoefficient + "</td></tr>";
            htmlString += "<tr><td>Predicts High Effect Change</td>" + "<td>" + correlation.predictsHighEffectChange + "</td></tr>";
            htmlString += "<tr><td>Predicts Low Effect Change</td>" + "<td>" + correlation.predictsLowEffectChange + "</td></tr>";
            htmlString += "<tr><td>P Value</td>" + "<td>" + correlation.pValue + "</td></tr>";
            htmlString += "<tr><td>T Value</td>" + "<td>" + correlation.tValue + "</td></tr>";
            htmlString += "<tr><td>Critical T Value</td>" + "<td>" + correlation.criticalTValue + "</td></tr>";
            htmlString += "<tr><td>Confidence Interval</td>" + "<td>" + correlation.confidenceInterval + "</td></tr>";
            htmlString += "</table>";
            return htmlString;
        };
    })
    .filter('htmlId', function () {
        return function (input) {
            input = input || '';
            return input.replace(/[(0-9) _+-.,!@#$%^&*();\/|<>"']/g, "");
        };
    });
