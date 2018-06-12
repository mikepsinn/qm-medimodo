angular.module('qmSideEffects')
    .controller('sideEffectsController', function ($scope, QuantiModoSideEffectSearchService, $uibModal,
                                                                                              correlationsVoteHelper, settings, $anchorScroll, htmlHelper,
                                                                                              $timeout, localStorageService, htmlIdFilter) {
    console.log('qmSideEffects controller works');

    $scope.showResults = false;
    $scope.showLoading = true;

    $scope.correlations = [];
    $scope.totalCorrelations = [];

    $scope.maxSize = 10;
    $scope.itemsPerPage = 10;

    $scope.countAndTime = '';

    $scope.showCharts = settings.commonOrUser !== 'common';  //do not show charts when in common(public) mode

    console.debug('Local predictor name:', localStorageService.getItemSync('predictorVariableName'));

    //check for locally stored variable names
    var localStoredPredictorName = localStorageService.getItemSync('predictorVariableName');

    if (localStoredPredictorName !== null) {

        $scope.predictorVariableName = localStoredPredictorName;
        $scope.showLoading = false;

    } else {
        //if outcome is set in configuration

        $scope.predictorVariableName = null || settings.predictor;
        $scope.showLoading = false;

    }


    $scope.displayPage = function (pageNumber, shouldScroll) {
        $scope.correlations =
            $scope.totalCorrelations.slice(
                (pageNumber - 1) * $scope.itemsPerPage, $scope.itemsPerPage * pageNumber
            );

        if (shouldScroll) {
            $anchorScroll('qm-app-top');
        }

    };

    $scope.showCorrelations = function () {

        if ($scope.predictorVariableName) {

            //same for predictor
            if ($scope.predictorVariableName) {
                localStorageService.setItem('predictorVariableName', $scope.predictorVariableName);
            } else {
                localStorageService.setItem('predictorVariableName', "");
            }

            $scope.showResults = false;
            $scope.showLoading = true;

            QuantiModoSideEffectSearchService.searchSideEffectCorrelations($scope.predictorVariableName)
                .then(function (correlations) {

                    console.debug('Correlations fetching response:', correlations);

                    if ($scope.predictorVariableName) {
                        //only predictor is set
                        $scope.totalCorrelations = jQuery.map(correlations.data, function (correlation) {

                            //correlation.percentOfPatients = Math.round(100 * correlation.correlationCoefficient);

                            correlation.percentOfPatients = (100 * correlation.correlationCoefficient).toFixed(3);

                            return {
                                variableName: correlation.effectName || correlation.effectVariableName,
                                variableCategory: correlation.effectVariableCategoryName,
                                explanation: correlation.predictorExplanation,  //TODO do predictor always here?
                                correlation: correlation
                            };
                        });
                    }

                    $scope.displayPage(1);

                    $scope.showResults = true;
                    $scope.showLoading = false;

                });

        } else {
            //both fields are empty. we will hide results
            $scope.showResults = false;
            $scope.showLoading = false;
        }
    };

    $scope.setVariableFromListAndShowCorrelation = function (variableName) {

        //check which variable (outcome or predictor) to fill
        if (!$scope.predictorVariableName) {
            $scope.predictorVariableName = variableName;
        }

        //both variables should be filled - let's show correlations
        $scope.showCorrelations();
        $anchorScroll('qm-app-top');

    };


    $scope.getToolTipText = function (toolTipFor, correlation) {

        var message = 'Help us improve our algorithms! ';

        if (toolTipFor === 'thumbUp') {

            message += "Up vote if you think it's plausible " +
                "that " + correlation.causeVariableName +
                " could affect " + correlation.effectVariableName + ".";

        } else if (toolTipFor === 'thumbDown') {

            message += "Down vote if you don't think it's plausible " +
                "that " + correlation.causeVariableName + " could affect " + correlation.effectVariableName + ".";

        } else if (toolTipFor == 'download') {

            message = "Download data related to correlation between " + correlation.causeVariableName + " and " + correlation.effectVariableName;

        } else if (toolTipFor === 'correlationDetails') {

            message = htmlHelper.createCorrelationInfoTooltip(correlation);

        }

        return message;

    };
    $scope.clearAndSearch = function (modelName) {
        $scope[modelName] = '';
        $scope.showCorrelations();
    };

    if ($scope.predictorVariableName ) {
        $scope.showCorrelations();
    }

});
