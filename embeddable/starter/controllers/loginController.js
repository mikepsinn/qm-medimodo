angular.module('qmStarterApp')
    .controller('loginController', function ($scope, $q, $location, $state, $cookies, settings, authService, qmApiV1) {
        console.log('loginController of starterApp works');
        //check the data with which user came here
        $scope.getParams = $location.search();
        console.debug('Hello stranger. You are here with following GET:', $scope.getParams);
        if ($scope.getParams.plugin == "search-relationships" &&
            $scope.getParams.commonOrUser == "common") {
            settings.setApplicationFromGet($scope.getParams);
            return switchToPlugin(settings.plugin);
        }
        function authSuccessHandler(){
            //use GET to setup application values
            settings.setApplicationFromGet($scope.getParams);
            //switch to required plugin
            switchToPlugin(settings.plugin);
        }
        if(qm.auth.getAccessTokenFromUrlUserOrStorage()){
            authSuccessHandler();
            return;
        }
        //first check if we can fetch user credentials (maybe user is already logged in)
        qmApiV1.getCredentials()
            .then(
                function (credentialsResp) {
                    //successfully fetched data from credentials endpoint
                    console.debug('Successfully fetched data from credentials endpoint', credentialsResp);
                    authSuccessHandler();
                },
                function (unAuthResp) {
                    //can't fetch credentials. will start authorization process
                    console.debug("can't fetch credentials. will start authorization process", unAuthResp);
                    // user is not authenticated yet
                    //if user came here with code param in get - we consider it like after auth
                    if ($scope.getParams.code) {
                        console.debug('I see your bring the code. We will use it...', $scope.getParams.code);
                        //if state is available
                        if ($scope.getParams.state) {
                            //setup application accordingly to state string (we need to get clientId and secret from there)
                            settings.setApplicationFromState($scope.getParams.state);
                        }
                        authService.getAccessTokenUsingCode($scope.getParams.code)
                            .then(function (response) {
                                authService.updateAccessToken(response);
                                authSuccessHandler();
                            });
                    } else {
                        console.debug('No code lets try to setup application from GET');
                        //use GET to setup application values
                        settings.setApplicationFromGet($scope.getParams);
                        //check maybe user is already logged in
                        authService.getAccessToken()
                            .then(function (accessToken) {
                                    console.debug('Seems user already logged in with token:', accessToken);
                                    authSuccessHandler();
                                },
                                function () {
                                    //if not logged in - we are redirecting to authorization
                                    authService.redirectToAuth();
                                })
                    }
                });
        function switchToPlugin(pluginName) {
            if ($state.get(pluginName)) {
                console.debug('Switching to plugin: ', pluginName);
                $state.go(pluginName);
            } else {
                console.warn('Plugin with name ' + pluginName + ' is not found. Switching to list with configured plugins');
                $state.go('about');
            }
        }
    });