angular.module('qmSideEffects')
    .service('QuantiModoSideEffectSearchService', function ($http, $q, settings) {
        this.getData = function (url, p, f) {
            $http.get(url, {params: p}).then(function (response) {
                f(response.data);
            });
        };
        this.searchSideEffectsByName = function (request) {
            var endPoint;
                endPoint = 'api/public/variables/search/' + encodeURIComponent(request.term);
                endPoint = endPoint + '?publicEffectOrCause=cause';
            return $http.get(settings.apiHost + endPoint);
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
            return $http.get(requestUrl);
        };
        this.searchSideEffectCorrelations = function (cause) {
            var requestUrl = settings.apiHost;
            requestUrl += 'api/v1/aggregatedCorrelations?';
            if (cause) {
                requestUrl += 'cause=' + cause + '&correlationCoefficient=(gt)0';
            }
            return $http.get(requestUrl);
        };
        this.vote = function (correlation, vote, callback) {
            $http.post(settings.apiHost + "api/v1/votes", {
                causeVariableName: correlation.causeVariableName,
                correlation: correlation.correlationCoefficient,
                effectVariableName: correlation.effectVariableName,
                vote: vote
            }).then(function (response) {
                callback(response.data);
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
                });
        };
        this.getUnits = function (callback) {
            $http.get(settings.apiHost + 'api/v1/units').then(function (response) {
                callback(response.data);
            })
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