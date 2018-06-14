// Define application module and list all required modules
angular.module('qmFaces', ['ui.bootstrap'])

    .config(function ($stateProvider) {

        $stateProvider
            .state('faces', {
                templateUrl: 'faces/templates/faces.html',
                controller: 'facesController',
                resolve: {

                    variable: function (settings, qmApiV2) {

                        //prepare API
                        var api = new qmApiV2;
                        api.setToken(settings.accessToken);

                        return api
                            .getVariables({name: settings.variable})
                            .then(function (varDetailsResponse) {
                                return varDetailsResponse.data[0];   //take first one from array
                            });

                    }
                }
            })
    });