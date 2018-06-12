angular.module('qmSearchVariablesModalControllers', [])

    .controller('varSettingsModalController',
        function ($scope, $uibModalInstance, variable, units, userCredentials, qmApiV2, qmApiV1) {
            console.debug('Variable settings modal for variable search');
            //var api = new qmApiV2;
            var api = qmApiV1;

            $scope.varUnits = units;
            $scope.variable = angular.copy(variable);

            if ($scope.variable.fillingValue == null) {
                $scope.assumeMissing = 'true';
            }

            $scope.variable.onsetDelayH = Math.floor($scope.variable.onsetDelay / (60 * 60));
            $scope.variable.durationOfActionH = Math.floor($scope.variable.durationOfAction / (60 * 60));

            $scope.ok = function () {

                if ($scope.assumeMissing === 'true') {
                    $scope.variable.fillingValue = null;
                }

                var variableSettings = {
                    user: userCredentials.id,
                    variable: variable.name,
                    name: $scope.variable.name,
                    durationOfAction: parseInt($scope.variable.durationOfActionH) * 60 * 60,
                    fillingValue: (parseInt($scope.variable.fillingValue)) ? parseInt($scope.variable.fillingValue) : $scope.variable.fillingValue,
                    maximumValue: $scope.variable.maximumValue,
                    minimumValue: $scope.variable.minimumValue,
                    onsetDelay: parseInt($scope.variable.onsetDelayH) * 60 * 60,
                    unit: $scope.variable.unitAbbreviatedName
                };

                api.setVariableSettings(variableSettings).then(function (response) {
                    console.log('variable update response:', response);
                    $uibModalInstance.close({variableSettings: variableSettings, updateResponse: response});
                });


            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        })

    .controller('addMeasurementModalController', function ($scope, $uibModalInstance, variable, units, qmApiV1) {
        console.debug('addMeasurementModalController works');

        $scope.variable = variable;
        $scope.units = units;

        $scope.mgmtVal = variable.mostCommonValueInCommonUnit;

        $scope.mgmtDate = moment().format('LLL');

        $scope.ok = function () {
            console.debug('Posting measurement');

            var measurementData = [{
                measurements: [{
                    value: $scope.mgmtVal,
                    timestamp: moment(new Date($scope.mgmtDate)).unix()
                }],
                name: variable.name,
                source: 'QuantiModo',
                category: variable.variableCategoryName,
                combinationOperation: variable.combinationOperation,
                unit: variable.unitAbbreviatedName
            }];

            qmApiV1.postMeasurement(measurementData).then(function (response) {
                console.debug('Measurement posted. Here is response:', response);
                $uibModalInstance.close(response);

            }, function (error) {
                console.error('Error while posting measurement:', error);
                $uibModalInstance.close(error);
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    });
