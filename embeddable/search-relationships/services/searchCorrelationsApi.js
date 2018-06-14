angular.module('qmSearchRelationships')

    .service('QuantimodoSearchService', function ($http, $q, settings) {

        this.getData = function (url, p, f) {
            $http.get(url, {params: p}).then(function (response) {
                f(response.data);
            });
        };

        var errorHandler = function(response, doNotSendToLogin){
            if(response.status === 401){
                if(doNotSendToLogin){
                    return;
                } else {
                    console.warn('QuantiModo.errorHandler: Sending to login because we got 401 with request ' +
                        JSON.stringify(response));
                    var loginUrl = window.location.origin + "/api/v2/auth/register";
                    var win = window.open(loginUrl, '_blank');
                    win.focus();
                    return;
                }
            }
        };

        this.searchVariablesByName = function (request) {

            var endPoint;
            var params;

            if (settings.commonOrUser == 'user') {
                endPoint = 'api/variables/search/' + encodeURIComponent(request.term);
                if(request.effectOrCause == 'effect'){
                    params = {'numberOfUserCorrelationsAsEffect' : '(gt)1'};
                    console.log("user effect or cause is " + request.effectOrCause);
                }
                if(request.effectOrCause == 'cause'){
                    params = {'numberOfUserCorrelationsAsCause' : '(gt)1'};
                    console.log("user effect or cause is " + request.effectOrCause);
                }
            } else if (settings.commonOrUser == 'common') {

                endPoint = 'api/public/variables/search/' + encodeURIComponent(request.term);
                if(request.effectOrCause == 'effect'){
                    params = {'numberOfAggregateCorrelationsAsEffect' : '(gt)1'};
                    console.log("public effect or cause is " + request.effectOrCause);
                }
                if(request.effectOrCause == 'cause'){
                    params = {'numberOfAggregateCorrelationsAsCause' : '(gt)1'};
                    console.log("public effect or cause is " + request.effectOrCause);
                }
            } else {
                console.error('endpoint type (common or public) is not specified');
            }

            var config = {params: params};
            return $http.get(settings.apiHost + endPoint, config);
        };

        this.searchCorrelations = function (cause, effect) {

            var requestUrl = settings.apiHost;

            if (settings.commonOrUser == 'user') {
                requestUrl += 'api/v1/correlations?';
            } else if (settings.commonOrUser == 'common') {
                requestUrl += 'api/v1/aggregatedCorrelations?';
            } else {
                console.error('endpoint type (common or public) is not specified');
            }

            if (cause) {
                requestUrl += 'cause=' + cause + '&';
            }

            if (effect) {
                requestUrl += 'effect=' + effect;
            }

            var response = $http.get(requestUrl);

            return response;

        };

        this.vote = function (correlation, vote, callback) {
            $http.post(settings.apiHost + "api/v1/votes", {
                causeVariableName: correlation.causeVariableName,
                correlation: correlation.correlationCoefficient,
                effectVariableName: correlation.effectVariableName,
                vote: vote
            }).then(function (response) {
                callback(response.data);
            }, function(response){
                errorHandler(response);
            });
        };

        this.deleteVote = function (correlation, callback) {
            $http.post(settings.apiHost + 'api/v1/votes/delete', {
                causeVariableName: correlation.causeVariableName,
                effectVariableName: correlation.effectVariableName
            }).then(function (response) {
                callback(response.data);
            })
        };

        this.getVariableByName = function (varName) {
            if (settings.commonOrUser == 'user') {
                return $http.get(settings.apiHost + 'api/v1/variables?name=' + encodeURIComponent(varName));
            } else if (settings.commonOrUser = 'common') {
                return $http.get(settings.apiHost + 'api/v1/public/variables/search/' + encodeURIComponent(varName));
            }
        };

        this.addMeasurement = function (measurement, callback) {
            console.log('Going to post this measurement:');
            console.log(measurement);

            $http.post(settings.apiHost + 'api/v1/measurements', measurement, function (result) {
                callback(result);
            });
        };

        this.getUnitsForVariableByName = function (variableName, callback) {
            $http.get(settings.apiHost + 'api/v1/unitsVariable?variable=' + encodeURIComponent(variableName))
                .then(function (response) {
                    callback(response);
                }, function(response){
                    errorHandler(response);
                });
        };

        this.getUnits = function (callback) {
            $http.get(settings.apiHost + 'api/v1/units')
                .then(function (response) {
                    callback(response.data);
                }, function(response){
                    errorHandler(response);
                });
        };

        this.setVariableSettings = function (variableSettings, callback) {
            $http.post(settings.apiHost + 'api/v1/userVariables', variableSettings, function (response) {
                callback(response.data);
            });
        };

        this.getCurrentUserData = function (callback) {
            $http.get(settings.apiHost + 'api/v1/user/me').then(function (response) {
                callback(response.data);
            });
        };

        this.getMeasurementsRange = function () {
            return $http.get(settings.apiHost + 'api/v1/measurementsRange');
        };

        this.getDailyMeasurements = function (variableName, startTime, endTime) {

            var deferred = $q.defer();
            var measurements = [];

            var loopingOffset = 0;

            function getLooping(offset) {

                return $http({
                    url: settings.apiHost + 'api/v1/measurements/daily',
                    method: "GET",
                    params: {
                        variableName: variableName,
                        startTime: startTime,
                        endTime: endTime,
                        limit: 200,
                        offset: offset
                    }
                }).then(function (response) {

                    if ((response.data instanceof Array) && (response.data.length)) {
                        for (var i = 0; i < response.data.length; i++) {
                            measurements.push(response.data[i]);
                        }
                        loopingOffset += 200;
                        return getLooping(loopingOffset);
                    } else {
                        deferred.resolve(measurements);
                    }

                })

            }

            getLooping(loopingOffset);

            return deferred.promise;
        }

    });
