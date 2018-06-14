// Define application module and list all required modules
angular.module('qmSearchRelationships', ['ui.bootstrap'])

    .config(function ($stateProvider) {

        $stateProvider
            .state('search-relationships', {
                templateUrl: 'search-relationships/templates/list-correlations.html',
                controller: 'searchRelationshipsController'
            });
    });





