angular.module('qmCommon')

    .factory('requestsInterceptor',
        function (settings, localStorageService) {
            return {
                'request': function (config) {


                    //if this network request is to the API server
                    if ((config.url.indexOf(settings.apiHost) > -1)) {

                        //try to get access token or from config or from local storage
                        var accessToken = settings.accessToken || localStorageService.getItemSync('accessToken');

                        //if token is defined
                        if (accessToken) {
                            //add it to request header
                            config.headers['Authorization'] = 'Bearer ' + accessToken;

                        }

                    }

                    return config;

                }
            }
        });
