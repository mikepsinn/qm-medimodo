angular.module('qmCommon', [])

    //configure networking
    .config(function ($httpProvider) {
        //this interceptor will decorate API requests and add accessToken
        $httpProvider.interceptors.push('requestsInterceptor');
    })

    //configure application routing mode
    .config(function ($locationProvider) {
        //such configuration gives capability to parse URLs easily
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });
    });

