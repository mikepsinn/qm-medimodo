angular.module('qmSearchVariables')
    .controller('searchVariablesController', function ($scope, qmApiV1, $uibModal, settings, $timeout, localStorageService) {
        console.log('qmSearchVariables. searchVariablesController works');

        //this variable keeps flag to indicate do search is prefromed
        $scope.searchInProgress = false;
        //this variable keep reference to delayed search logic call
        $scope.searchTask = null;

        //this array will hold alert messages to user
        $scope.alerts = [];

        $scope.variablesPerPage = 10;

        //check for locally stored variable name
        var localStoredVariableSearchQuery = localStorageService.getItemSync('variableSearchQuery');

        //if we have locally stored variable name
        if (localStoredVariableSearchQuery !== null) {
            //use it
            $scope.variableName = localStoredVariableSearchQuery;
        } else {
            //take variable name from configuration
            //$scope.variableName = settings.variable;
            //indicate that search have been started
            $scope.searchInProgress = true;

            //schedule delayed search (give user some time to change query)
            $scope.searchTask = $timeout(function () {

                $scope.doSearch('');

            }, 1500);
        }

        var api = qmApiV1;

        $scope.doSearch = function (query) {
            //set flag that search has been started
            $scope.searchInProgress = true;

            //save query to local storage
            if (query)
                localStorageService.setItem('variableSearchQuery', query);

            //perform API call
            api.getVariables(
                {
                    name: (query) ? query : '**'    //if no query search for all variables
                }
                )
                .then (function (variablesResponse) {
                    console.debug('Get variables response:', variablesResponse);

                    var variables = variablesResponse.data;
                    //if response contain an array
                    if (variables instanceof Array) {
                        //populate scope with data
                        $scope.totalVariables = variables;

                        //add chart control to each variable
                        $scope.totalVariables.forEach(function (variable) {
                            //each variable has own timeline control
                            variable.timeLineControl = {
                                drawVariableTimeLine: function (variableName) {
                                }
                            }
                        });

                        //initiate chart displaying if only one variable found
                        if (variables.length == 1) {
                            $scope.showTimeLineFor($scope.totalVariables[0]);
                        }

                    } else {
                        $scope.totalVariables = [];
                    }

                    //populate view with data and display first page of results
                    $scope.displayPage(1);

                    $scope.searchInProgress = false;

                });

        };

        //here we watch for variable name change
        $scope.$watch('variableName', function (newValue, oldValue) {

            //if search already scheduled
            if ($scope.searchTask) {
                //we canceling it because search query have been changed
                $timeout.cancel($scope.searchTask);
            }

            doSearchWithDelay(newValue);

        });

        $scope.openVarSettingsModal = function (variable) {
            console.debug('Going to open variable setting modal for var:', variable);

            var modalInstance = $uibModal.open({
                templateUrl: '/embeddable/search-variables/templates/variable-settings-modal.html',
                controller: 'varSettingsModalController',
                resolve: {
                    variable: function () {
                        return variable;
                    },
                    units: function () {
                        return api.getUnits().then(function (unitsResponse) {
                            return unitsResponse.data;
                        });
                    },
                    userCredentials: function () {
                        return api.getCredentials().then(function (credentialsResponse) {
                            return credentialsResponse.data;
                        });
                    }
                }
            });

            modalInstance.result.then(function (params) {
                console.log('confirmed');
                if (params.updateResponse.status == 200) {
                    $scope.alerts.push({msg: 'Variable settings updated', type: 'success'});
                    $scope.doSearch(params.variableSettings.name);
                } else {
                    $scope.alerts.push({msg: 'Variable settings has not been updated', type: 'danger'});
                }
            }, function () {
                console.debug('dismissed');
            });


        };

        $scope.openAddMeasurementModal = function (variable) {
            console.debug('Going to open add measurement modal for var:', variable);

            var modalInstance = $uibModal.open({
                templateUrl: '/embeddable/search-variables/templates/add-measurement-modal.html',
                controller: 'addMeasurementModalController',
                resolve: {
                    variable: function () {
                        return variable;
                    },
                    units: function () {
                        return api.getUnits().then(function (unitsResponse) {
                            return unitsResponse.data;
                        });
                    },
                    userCredentials: function () {
                        return api.getCredentials().then(function (credentialsResponse) {
                            return credentialsResponse.data;
                        });
                    }
                }
            });

            modalInstance.result.then(function (saveResult) {
                if (!saveResult.error) {
                    $scope.alerts.push({msg: 'Variable measurement succesfully posted', type: 'success'});
                } else {
                    $scope.alerts.push({msg: 'Error occured while posting a measurement', type: 'danger'});
                }
            }, function () {
                console.debug('dismissed');
            });


        };

        $scope.getToolTipText = function (tooltipFor, variable) {

            if (tooltipFor == 'download') {
                return 'Download some data...';
            } else if (tooltipFor == 'info') {
                return "<pre>" + variable.name + "</pre>";
            }
        };

        $scope.getDataDownloadLink = function (variable) {
            return "";
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.setSearchedVariableName = function (variableName) {
            $scope.variableName = variableName;
        };

        $scope.clearVariableNameInput = function () {
            $scope.variableName = '';
            localStorageService.setItem('variableSearchQuery', '');

            doSearchWithDelay('');

        };

        $scope.showTimeLineFor = function (variable) {

            variable.showTimeLine = !variable.showTimeLine;

            if (variable.showTimeLine) {
                $timeout(function () {
                    variable.timeLineControl.drawVariableTimeLine(variable.name);
                }, 100);

            }

        };

        $scope.displayPage = function (pageNum) {
            console.debug('Switching to display page: ', pageNum);

            $scope.variables =
                $scope.totalVariables.slice(
                    (pageNum - 1) * $scope.variablesPerPage, $scope.variablesPerPage * pageNum
                );
        };

        function doSearchWithDelay(query, delay) {

            //indicate that search have been started
            $scope.searchInProgress = true;

            //schedule delayed search (give user some time to change query)
            //put timeout ID into scope variable to give capability to cancel this task from any place
            $scope.searchTask = $timeout(function () {

                $scope.doSearch(query);

            }, (delay) ? delay : 1500);

        }

    });
