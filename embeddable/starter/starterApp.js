angular.module('qmStarterApp',
    [
        'ngSanitize',
        'ngCookies',
        'ngRoute',
        'ui.router',
        'ngAnimate',
        'qmCommon',
        'qmAboutApp',
        'qmSearchRelationships',
        'qmFaces',
        'qmSearchVariables',
        'qmAddMeasurement',
        'jtt_wikipedia'
    ])

    //application states
    .config(function ($stateProvider) {

        $stateProvider
        //root route should navigate to main template and controller of current plugin
            .state('login', {
                templateUrl: 'starter/templates/login.html',
                controller: 'loginController'
            })
            .state('no-plugin', {
                templateUrl: 'starter/templates/no-plugin.html',
                controller: 'noPluginController'
            })
    })

    .config(function (settingsProvider) {

        var currentDomainWithPort = settingsProvider.extractDomainWithPort(window.location.href);
        var currentDomainWithoutPort = settingsProvider.stripPort(currentDomainWithPort);

        //if app hosted on staging
        if (currentDomainWithoutPort == 'staging.quantimo.do') {
            //set apiHost to call staging API
            settingsProvider.setSettings({
                apiHost: 'https://staging.quantimo.do/'
            });
        }

        //if app in development
        if (currentDomainWithoutPort == 'local.quantimo.do') {
            //set apiHost to call staging API
            settingsProvider.setSettings({
                apiHost: 'https://local.quantimo.do/'
            });
        }

    });