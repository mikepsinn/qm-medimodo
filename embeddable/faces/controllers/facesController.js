angular.module('qmFaces')
    .controller('facesController', function ($scope, settings, qmApiV2, variable) {
        console.log('qmFacesApp. facesController works');

        console.debug('Plugin is set up to work with following variable:', variable);

        //prepare API
        var api = new qmApiV2;
        api.setToken(settings.accessToken);

        $scope.settings = settings;
        $scope.alerts = [];
        //$scope.settings.negative = true;

        $scope.postMeasurement = function (value) {
            console.debug('Face clicked to post measurement value:', value);

            var measurementObject = {
                variable_id: variable.id,
                source_name: "Embeddable QM",
                unit_id: variable.default_unit_id,
                measurements: [
                    {
                        start_time: moment().format(),
                        value: value,
                        note: ""
                    }
                ]
            };

            console.debug('Going to post following object:', measurementObject);

            api.postMeasurements({body: measurementObject}).then(function (successResp) {

                if (successResp.success) {
                    console.debug('Measurement succesfully posted. Response:', successResp);
                    $scope.alerts.push({msg: 'Measurement successfully posted!', type: 'success'});
                } else {
                    console.warn('Succesfull response, but success field is not true', successResp);
                    $scope.alerts.push({msg: 'Measurement have not been posted', type: 'warning'});
                }


            }, function (errorResp) {
                console.error('Measurement have not been posted. Response:', errorResp);
                $scope.alerts.push({msg: 'Measurement have not been posted', type: 'danger'});
            })

        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

    });

