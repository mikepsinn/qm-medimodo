angular.module('qmCommon')

    .factory('authService', function ($q, localStorageService, settings, $location, qmApiV1) {

        var authSrv = {

            // extract values from token response and saves in localstorage
            updateAccessToken: function (accessResponse) {
                console.debug('Updating access token credentials in local storage:', accessResponse);

                var accessToken = accessResponse.accessToken || accessResponse.access_token;
                var expiresIn = accessResponse.expiresIn || accessResponse.expires_in;
                var refreshToken = accessResponse.refreshToken || accessResponse.refresh_token;

                // save in localStorage
                localStorageService.setItem('accessToken', accessToken);
                localStorageService.setItem('refreshToken', refreshToken);

                // calculate expires at
                var expiresAt = new Date().getTime() + parseInt(expiresIn, 10) * 1000 - 60000;
                // save in localStorage
                localStorageService.setItem('expiresAt', expiresAt);

                return accessToken;

            },

            // retrieves access token.
            // if expired, renews it
            // if not logged in, returns rejects
            getAccessToken: function () {
                var deferred = $q.defer();

                //check if access token is already at application settings
                //it may be there if user explicitly set it in GET params
                if (settings.accessToken) {
                    //immediately resolve promises with defined token
                    deferred.resolve({accessToken: settings.accessToken});

                } else {
                    //if no token at settings

                    //get current time
                    var now = new Date().getTime();

                    //get token credentials from local storage data
                    var tokenExpiresAt = localStorageService.getItemSync('expiresAt');
                    var refreshToken = localStorageService.getItemSync('refreshToken');
                    var accessToken = localStorageService.getItemSync('accessToken');

                    //check if token is not expired
                    if (accessToken && now < tokenExpiresAt) {
                        console.debug('Current token is valid');
                        // if token is valid
                        deferred.resolve({
                            accessToken: accessToken
                        });
                    } else if (refreshToken) {
                        //if token is expired but we have refresh token
                        console.debug('Will try to use refresh token');

                        //post refreshment data to API server
                        qmApiV1.refreshAccessToken(refreshToken)
                            .success(function (data) {
                                //if server refreshed token

                                //check for errors
                                if (data.error) {
                                    //if response contains error field - reject promise
                                    console.error('Error response while refreshing token', data);
                                    deferred.reject('refresh failed');
                                } else {
                                    //if no error field
                                    console.debug('Access token refreshed');
                                    //save token to local storage
                                    var accessTokenRefreshed = authSrv.updateAccessToken(data);
                                    //and resolve promise
                                    deferred.resolve({
                                        accessToken: accessTokenRefreshed
                                    });
                                }
                            }).error(function (response) {
                            console.error("Error response while refreshing token", response);
                            // error refreshing
                            deferred.reject(response);
                        });

                    } else {
                        // if no valid token and no refresh token
                        console.warn('Token credentials data is not available in local storage or invalid');
                        deferred.reject();
                    }


                }

                return deferred.promise;
            },

            // get access token from request token
            getAccessTokenUsingCode: function (code) {
                console.debug('Requesting access token using request token:', code);

                var deferred = $q.defer();

                qmApiV1.fetchAccessToken(code, authSrv.createRedirectUri())
                    .success(function (response) {
                        console.debug('Access token received:', response);
                        deferred.resolve(response);
                    })
                    .error(function (response) {
                        console.error('Error response on getting access token from request token', response);
                        deferred.reject(response);
                    });

                return deferred.promise;
            },

            redirectToAuth: function (useV2) {

                var url = settings.apiHost;

                if (settings.client && settings.secret) {
                    //if user have client and secret - will prepare link to get token request code
                    if (useV2) {
                        url += "api/v2/oauth/authorize?";
                    } else {
                        url += "api/oauth2/authorize?";
                    }

                    url += "response_type=code";
                    url += "&client_id=" + settings.client;
                    url += "&client_secret=" + settings.secret;
                    url += "&scope=" + encodeURIComponent(settings.scope);
                    url += "&redirect_uri=" + authSrv.createRedirectUri();

                } else {
                    console.log("No client and secret - will redirect to regular login.")
                    url += "api/v2/auth/login?";
                    url += "redirect_uri=" + encodeURIComponent(window.location.href);
                }

                if (settings.state) {
                    url += "&state=" + encodeURIComponent(JSON.stringify(settings.state));
                }

                //and redirect user there for authorizing
                console.debug('AUTH redirect URL created:', url);
                console.debug('GOOD LUCK!');
                window.location.replace(url);

            },

            createRedirectUri: function () {

                var redirectUri = $location.protocol() + '://' + $location.host();
                if (settings.baseHref) {
                    redirectUri += settings.baseHref;
                }
                return encodeURIComponent(redirectUri);

            }
        };

        return authSrv;
    });
