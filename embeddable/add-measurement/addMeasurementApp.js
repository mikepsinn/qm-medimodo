// Define application module and list all required modules
angular.module('qmAddMeasurement', ['ui.bootstrap'])

    .config(function ($stateProvider) {

        $stateProvider
            .state('add-measurement', {
                templateUrl: 'add-measurement/templates/main.html',
                controller: 'addMeasurementCtrl'

            })
    });