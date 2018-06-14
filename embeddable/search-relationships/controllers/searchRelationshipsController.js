angular.module('qmSearchRelationships').controller('searchRelationshipsController', function ($scope, QuantimodoSearchService, $uibModal,
                                                                                              correlationsVoteHelper, settings, $anchorScroll, htmlHelper,
                                                                                              $timeout, localStorageService, htmlIdFilter,
                                                                                              wikipediaFactory) {
    console.log('qmSearchRelationships controller works');
    $scope.showResults = false;
    $scope.showLoading = true;
    $scope.correlations = [];
    $scope.totalCorrelations = [];
    $scope.maxSize = 10;
    $scope.itemsPerPage = 10;
    $scope.countAndTime = '';
    $scope.commonOrUser = settings.commonOrUser;
    $scope.showCharts = settings.commonOrUser !== 'common';  //do not show charts when in common(public) mode
    $scope.hideSearchBoxes = settings.hideSearchBoxes;
    //timeLine directive can add methods to this object, giving capability to control timeLine from this controller
    //http://stackoverflow.com/questions/16881478/how-to-call-a-method-defined-in-an-angularjs-directive
    $scope.timeLineControl = {draw: function () {}};
    $scope.scatterControl = {draw: function () {}};
    console.debug('Local outcome name: ', localStorageService.getItemSync('outcomeVariableName'));
    console.debug('Local predictor name: ', localStorageService.getItemSync('predictorVariableName'));
    //check for locally stored variable names
    var localStoredOutcomeName = localStorageService.getItemSync('outcomeVariableName');
    var localStoredPredictorName = localStorageService.getItemSync('predictorVariableName');
    if (localStoredOutcomeName !== null) {$scope.outcomeVariableName = localStoredOutcomeName;}
    if (localStoredPredictorName !== null) {$scope.predictorVariableName = localStoredPredictorName;}
    if (settings.outcome) {
        $scope.outcomeVariableName = settings.outcome;
    } else {
        //if no outcome at configuration - we will use default variable
        $scope.outcomeVariableName = settings.variable;
    }
    if (settings.predictor) {$scope.predictorVariableName = settings.predictor;}
    $scope.displayPage = function (pageNumber, shouldScroll) {
        $scope.correlations = $scope.totalCorrelations.slice((pageNumber - 1) * $scope.itemsPerPage, $scope.itemsPerPage * pageNumber);
        if (shouldScroll) {$anchorScroll('qm-app-top');}
    };
    $scope.showCorrelations = function () {
        if ($scope.outcomeVariableName || $scope.predictorVariableName) {
            //save searched variables for future
            //if outcome has value
            if ($scope.outcomeVariableName) {
                //save it to local storage
                localStorageService.setItem('outcomeVariableName', $scope.outcomeVariableName);
            } else {
                //if no value - consider that user erased it explicitly and save empty string
                localStorageService.setItem('outcomeVariableName', "");
            }
            //same for predictor
            if ($scope.predictorVariableName) {
                localStorageService.setItem('predictorVariableName', $scope.predictorVariableName);
            } else {
                localStorageService.setItem('predictorVariableName', "");
            }
            $scope.showResults = false;
            $scope.showLoading = true;
            var timeSearchStarted = new Date();
            QuantimodoSearchService.searchCorrelations($scope.predictorVariableName, $scope.outcomeVariableName)
                .then(function (correlations) {
                    var timeSearchEnded = new Date();
                    $scope.timeTakenForSearch = Math.ceil((timeSearchEnded - timeSearchStarted) / 1000);
                    console.debug('Correlations fetching response:', correlations);
                    if ($scope.outcomeVariableName && !$scope.predictorVariableName) {
                        //only outcome is set
                        $scope.totalCorrelations = jQuery.map(correlations.data, function (correlation) {
                            return {
                                variableName: correlation.causeName || correlation.causeVariableName,
                                variableCategory: correlation.causeVariableCategoryName,
                                explanation: correlation.predictorExplanation,  //TODO do predictor always here?
                                correlation: correlation
                            };

                        });

                    } else if ($scope.predictorVariableName && !$scope.outcomeVariableName) {
                        //only predictor is set
                        $scope.totalCorrelations = jQuery.map(correlations.data, function (correlation) {

                            return {
                                variableName: correlation.effectVariableNameName || correlation.effectVariableName,
                                variableCategory: correlation.effectVariableCategoryName,
                                explanation: correlation.predictorExplanation,  //TODO do predictor always here?
                                correlation: correlation
                            };

                        });

                    } else if ($scope.outcomeVariableName && $scope.predictorVariableName) {
                        //both: predictor and outcome  are set
                        $scope.totalCorrelations = jQuery.map(correlations.data, function (correlation) {

                            return {
                                variableName: correlation.causeName || correlation.causeVariableName,
                                variableCategory: correlation.causeVariableCategoryName,
                                explanation: correlation.causeExplanation || correlation.predictorExplanation,  //TODO do predictor always here?
                                correlation: correlation
                            };

                        });

                    }

                    //if only one correlation found
                    if ($scope.totalCorrelations.length === 1) {
                        addWikipediaInfo();
                        //draw chart for it
                        $timeout(function () {
                            //timeout to wait while directive will be instantiated
                            $scope.timeLineControl.draw();
                            $scope.scatterControl.draw();

                        }, 1000);

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

    function addWikipediaInfo() {
        $scope.causeWikiEntry = null;
        $scope.causeWikiImage = null;
        $scope.effectWikiEntry = null;
        $scope.effectWikiImage = null;

        var causeSearchTerm = $scope.totalCorrelations[0].correlation.causeVariableCommonAlias;
        if(!causeSearchTerm){
            causeSearchTerm = $scope.predictorVariableName;
        }
        
        wikipediaFactory.searchArticlesByTitle({
            term: causeSearchTerm, // Searchterm
            //lang: '<LANGUAGE>', // (optional) default: 'en'
            //gsrlimit: '<GS_LIMIT>', // (optional) default: 10. valid values: 0-500
            pithumbsize: '200', // (optional) default: 400
            //pilimit: '<PAGE_IMAGES_LIMIT>', // (optional) 'max': images for all articles, otherwise only for the first
            exlimit: '1', // (optional) 'max': extracts for all articles, otherwise only for the first
            exintro: '1', // (optional) '1': if we just want the intro, otherwise it shows all sections
        }).then(function (causeData) {
            if(causeData.data.query) {
                $scope.causeWikiEntry = causeData.data.query.pages[0].extract;
                //$scope.correlationObject.studyBackground = $scope.correlationObject.studyBackground + '<br>' + $scope.causeWikiEntry;
                if(causeData.data.query.pages[0].thumbnail){
                    $scope.causeWikiImage = causeData.data.query.pages[0].thumbnail.source;
                }
                //on success
            } else {
                var error = 'Wiki not found for ' + $scope.predictorVariableName;
                if (typeof Bugsnag !== "undefined") { Bugsnag.notify(error, error, {}, "error"); }
                console.error(error);
            }
        }).catch(function (error) {
            console.error(error);
            //on error
        });

        var effectSearchTerm = $scope.totalCorrelations[0].correlation.effectVariableCommonAlias;
        if(!effectSearchTerm){
            effectSearchTerm = $scope.outcomeVariableName;
        }

        wikipediaFactory.searchArticlesByTitle({
            term: effectSearchTerm, // Searchterm
            //lang: '<LANGUAGE>', // (optional) default: 'en'
            //gsrlimit: '<GS_LIMIT>', // (optional) default: 10. valid values: 0-500
            pithumbsize: '200', // (optional) default: 400
            //pilimit: '<PAGE_IMAGES_LIMIT>', // (optional) 'max': images for all articles, otherwise only for the first
            exlimit: '1', // (optional) 'max': extracts for all articles, otherwise only for the first
            exintro: '1', // (optional) '1': if we just want the intro, otherwise it shows all sections
        }).then(function (effectData) {
            if(effectData.data.query){
                $scope.effectWikiEntry = effectData.data.query.pages[0].extract;
                //$scope.correlationObject.studyBackground = $scope.correlationObject.studyBackground + '<br>' + $scope.effectWikiEntry;
                if(effectData.data.query.pages[0].thumbnail){
                    $scope.effectWikiImage = effectData.data.query.pages[0].thumbnail.source;
                }
            } else {
                var error = 'Wiki not found for ' + $scope.outcomeVariableName;
                if (typeof Bugsnag !== "undefined") { Bugsnag.notify(error, error, {}, "error"); }
                console.error(error);
            }

            //on success
        }).catch(function (error) {
            console.error(error);
            //on error
        });
    }

    $scope.setVariableFromListAndShowCorrelation = function (variableName) {

        //check which variable (outcome or predictor) to fill
        if (!$scope.predictorVariableName) {
            $scope.predictorVariableName = variableName;
        } else if (!$scope.outcomeVariableName) {
            $scope.outcomeVariableName = variableName;
        } else if ($scope.predictorVariableName && $scope.outcomeVariableName) {
            $scope.predictorVariableName = variableName;
        } else {
            $scope.outcomeVariableName = variableName;
        }

        addWikipediaInfo();

        //both variables should be filled - let's show correlations
        $scope.showCorrelations();
        $anchorScroll('qm-app-top');

    };

    $scope.goToAmazon = function (variableName) {
        var url = "http://www.amazon.com/gp/search/ref=as_li_qf_sp_sr_tl?ie=UTF8&camp=1789&creative=9325&index=aps&keywords=" + variableName + "&linkCode=ur2&tag=quant08-20";
        var win = window.open(url, '_blank');
        win.focus();
    };

    $scope.vote = function (correlationSet, likeValue) {

        //check if user have previously voted for this correlation
        var prevVoted = correlationsVoteHelper.getPreviouslyVoted(correlationSet.correlation);

        //if previous vote is same as currently - it means un-vote
        if (prevVoted === likeValue) {
            likeValue = 'null';
        }

        //if user un-voting
        if (likeValue === 'null') {
            //post un-vote without confirmation

            QuantimodoSearchService.deleteVote(correlationSet.correlation, function (resp) {

                correlationsVoteHelper.saveVotedCorrelation(correlationSet.correlation, likeValue);

                correlationSet.correlation.userVote = likeValue;

            });

        } else {
            //scroll to the top to ensure dialog is visible
            $anchorScroll('qm-app-top');

            //open confirmation modal
            var modalInstance = $uibModal.open({
                templateUrl: '/embeddable/search-relationships/templates/vote-confirm-modal.html',
                controller: 'voteModalInstanceController',
                resolve: {
                    confirmationOptions: function () {
                        return {
                            correlation: correlationSet.correlation,
                            likeValue: likeValue
                        }
                    }
                }
            });

            modalInstance.result.then(function () {
                //confirmed

                if (likeValue !== 'null') {
                    QuantimodoSearchService.vote(correlationSet.correlation, likeValue, function (resp) {

                        correlationsVoteHelper.saveVotedCorrelation(correlationSet.correlation, likeValue);

                        correlationSet.correlation.userVote = likeValue;

                    });
                } else {
                    QuantimodoSearchService.deleteVote(correlationSet.correlation, function (resp) {

                        correlationsVoteHelper.saveVotedCorrelation(correlationSet.correlation, likeValue);

                        correlationSet.correlation.userVote = likeValue;

                    });
                }

                $anchorScroll(htmlIdFilter(correlationSet.variableName));

            }, function () {
                console.debug('Vote modal dismissed');
                $anchorScroll(htmlIdFilter(correlationSet.variableName));
            });
        }

    };

    $scope.addMeasurement = function (variableName) {

        $anchorScroll('qm-app-top');

        var variable = variableName;
        console.log('Going to add measurement for variable: ', variable);
        QuantimodoSearchService.getVariableByName(variable).then(
            function (response) {

                var varDetails = response.data[0];

                QuantimodoSearchService.getUnits(function (units) {

                    var modalInstance = $uibModal.open({
                        templateUrl: '/embeddable/search-relationships/templates/add-measurement-modal.html',
                        controller: 'addMeasurementModalInstanceController',
                        resolve: {
                            variable: function () {
                                return varDetails;
                            },
                            units: function () {
                                return units;
                            }
                        }
                    });

                    modalInstance.result.then(function (measurement) {
                        //confirmed
                        QuantimodoSearchService.addMeasurement(
                            [{
                                measurements: [{
                                    value: measurement.value,
                                    timestamp: moment(new Date(measurement.date)).unix()
                                }],
                                name: measurement.variable.name,
                                source: 'QuantiModo',
                                category: measurement.variable.variableCategoryName,
                                combinationOperation: measurement.variable.combinationOperation,
                                unit: measurement.variable.unitAbbreviatedName
                            }],
                            function (result) {
                                console.log(result);
                            });
                        $anchorScroll(htmlIdFilter(variableName));
                    }, function () {
                        console.debug('dismissed');
                        $anchorScroll(htmlIdFilter(variableName));
                    });

                });
            });

    };

    $scope.openVarSettingsModal = function (variableName) {

        $anchorScroll('qm-app-top');

        var variable = variableName;
        console.log('Going change setting for variable: ', variable);
        QuantimodoSearchService.getVariableByName(variable)
            .then(function (response) {

                var varDetails = response.data[0];

                QuantimodoSearchService.getUnitsForVariableByName(varDetails.name, function (units) {

                    console.log('Variable details:', varDetails);

                    var modalInstance = $uibModal.open({
                        templateUrl: '/embeddable/search-relationships/templates/variable-settings-modal.html',
                        controller: 'varSettingsModalInstanceController',
                        resolve: {
                            variable: function () {
                                return varDetails;
                            },
                            varUnits: function () {
                                return units.data;
                            }
                        }
                    });

                    modalInstance.result.then(function () {
                        console.log('confirmed');
                        //when modal confirmed
                        //if there is only one correlation
                        if ($scope.totalCorrelations.length === 1) {
                            addWikipediaInfo();
                            //we should redraw chart
                            $scope.timeLineControl.draw();
                            $scope.scatterControl.draw();
                        } else {
                            $anchorScroll(htmlIdFilter(variable));
                        }

                    }, function () {
                        console.debug('dismissed');
                        $anchorScroll(htmlIdFilter(variable));
                    });

                });
            });

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

        } else if (toolTipFor === 'download') {

            message = "Download data related to correlation between " + correlation.causeVariableName + " and " + correlation.effectVariableName;

        } else if (toolTipFor === 'correlationDetails') {

            message = htmlHelper.createCorrelationInfoTooltip(correlation);

        }

        return message;

    };

    $scope.getDataDownloadLink = function (correlation) {

        var link = "";

        link += settings.apiHost + 'api/pairsCsv';
        link += '?effectVariableName=' + correlation.effectVariableName;
        link += '&causeVariableName=' + correlation.causeVariableName;

        return encodeURI(link);

    };

    $scope.clearAndSearch = function (modelName) {
        $scope[modelName] = '';
        $scope.showCorrelations();
    };

    if ($scope.predictorVariableName || $scope.outcomeVariableName) {
        $scope.showCorrelations();
    }

});
