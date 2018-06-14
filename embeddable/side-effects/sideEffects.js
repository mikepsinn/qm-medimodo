// Define application module and list all required modules
angular.module('qmSideEffects', ['ui.bootstrap'])

    .config(function ($stateProvider) {

        $stateProvider
            .state('side-effects', {
                templateUrl: 'side-effects/templates/list-correlations.html',
                controller: 'sideEffectsController'
            })
    });





