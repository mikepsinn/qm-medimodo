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
        if (currentDomainWithoutPort.indexOf('staging') !== -1) {  //if app hosted on staging
            settingsProvider.setSettings({apiHost: 'https://staging.quantimo.do/'});
        }
        if (currentDomainWithoutPort.indexOf('local') !== -1) {  //if app in development
            settingsProvider.setSettings({apiHost: 'https://local.quantimo.do/'});
        }
    });