angular.module('qmAboutApp', [])

    .config(function ($stateProvider) {

        $stateProvider
            .state('about', {
                templateUrl: 'about/templates/index.html',
                controller: 'aboutController'
            })
    });
