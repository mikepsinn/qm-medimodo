angular.module('qmSearchRelationships')

    .controller('voteModalInstanceController',
        function ($scope, $uibModalInstance, confirmationOptions) {

            console.log(confirmationOptions);

            $scope.opts = confirmationOptions;

            $scope.ok = function () {
                $uibModalInstance.close('confirm');
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        })

    .controller('addMeasurementModalInstanceController',
        function ($scope, $uibModalInstance, variable, units) {

            $scope.variable = variable;
            $scope.units = units;

            $scope.mgmtVal = variable.mostCommonValueInCommonUnit;

            $scope.mgmtDate = moment().format('lll');

            $scope.ok = function () {
                $uibModalInstance.close({
                    variable: variable,
                    value: $scope.mgmtVal,
                    date: $scope.mgmtDate
                });
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        })

    .controller('varSettingsModalInstanceController',
        function ($scope, $uibModalInstance, variable, varUnits, qmApiV1) {

            $scope.varUnits = varUnits;
            $scope.variable = angular.copy(variable);


            $scope.variable.onsetDelayH = Math.floor($scope.variable.onsetDelay / (60 * 60));
            $scope.variable.durationOfActionH = Math.floor($scope.variable.durationOfAction / (60 * 60));

            if ($scope.variable.experimentStartTime) {
                $scope.variable.experimentStartTime = moment($scope.variable.experimentStartTime).format('L');
            }

            if ($scope.variable.experimentEndTime) {
                $scope.variable.experimentEndTime = moment($scope.variable.experimentEndTime).format('L');
            }

            if (!$scope.variable.fillingValue) {
                $scope.assumeMissing = 'true';
            }

            $scope.experimentEndTimePickerOpen = false;
            $scope.experimentStartTimePickerOpen = false;

            $scope.ok = function () {

                if ($scope.assumeMissing === 'true') {
                    $scope.variable.fillingValue = null;
                }

                qmApiV1.getCurrentUserData(function (userData) {

                    var variableSettings = [{
                        user: userData.id,
                        variable: variable.name,
                        name: $scope.variable.name,
                        durationOfAction: parseInt($scope.variable.durationOfActionH) * 60 * 60,
                        fillingValue: (parseInt($scope.variable.fillingValue)) ? parseInt($scope.variable.fillingValue) : $scope.variable.fillingValue,
                        maximumAllowedValueInCommonUnit: $scope.variable.maximumAllowedValueInCommonUnit,
                        minimumAllowedValueInCommonUnit: $scope.variable.minimumAllowedValueInCommonUnit,
                        onsetDelay: parseInt($scope.variable.onsetDelayH) * 60 * 60,
                        unit: $scope.variable.unitAbbreviatedName,
                        experimentStartTime: ($scope.variable.experimentStartTime) ? moment($scope.variable.experimentStartTime).format() : null,
                        experimentEndTime: ($scope.variable.experimentEndTime) ? moment($scope.variable.experimentEndTime).format() : null
                    }];

                    console.debug('Posting variable settings:', variableSettings);

                    qmApiV1.setVariableSettings(variableSettings).then(
                        function (response) {
                            console.debug('Variable settings posted. Server response:', response);

                            $uibModalInstance.close({
                                variable: $scope.variable,
                            });

                        },
                        function (error) {
                            console.error('Error while saving variable settings:', error);
                        });

                });
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        });
