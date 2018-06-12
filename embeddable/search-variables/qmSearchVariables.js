// Define application module and list all required modules
angular.module('qmSearchVariables', ['ui.bootstrap', 'qmSearchVariablesModalControllers'])

    .config(function ($stateProvider) {

        $stateProvider
            .state('search-variables', {
                templateUrl: 'search-variables/templates/main.html',
                controller: 'searchVariablesController'

            })
    });





