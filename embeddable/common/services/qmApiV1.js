angular.module('qmCommon')
    .service('qmApiV1', function ($http, $q, settings) {
        function getQmUrl(path){
            var url = settings.apiHost + path;
            var accessToken = qm.auth.getAccessTokenFromUrlUserOrStorage();
            if(accessToken){url += '?accessToken='+accessToken;}
            return url;
        }
        this.getData = function (url, p, f) {
            var accessToken = qm.auth.getAccessTokenFromUrlUserOrStorage();
            if(accessToken){p.accessToken = accessToken;}
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
            var def = $q.defer();
            var endPoint;
            if (settings.commonOrUser == 'user') {
                endPoint = 'api/variables/search/' + encodeURIComponent(request.term);
                if(request.effectOrCause == 'cause' || request.effectOrCause == 'effect'){
                    console.log("user effect or cause is " + request.effectOrCause);
                    endPoint = endPoint + '?effectOrCause=' + request.effectOrCause;
                }
            } else if (settings.commonOrUser == 'common') {
                endPoint = 'api/public/variables/search/' + encodeURIComponent(request.term);
                if(request.effectOrCause == 'effect' || request.effectOrCause == 'cause'){
                    console.log("public effect or cause is " + request.effectOrCause);
                    endPoint = endPoint + '?publicEffectOrCause=' + request.effectOrCause;
                }
            } else {
                console.error('endpoint type (common or public) is not specified');
            }
            $http.get(getQmUrl(endPoint)).then(function (response) {
                console.debug('Search variables response', response);
                def.resolve(response.data);
            });
            return def.promise;
        };
        //this method to simulate v2 functionality
        this.getVariables = function (params) {
            return $http.get(getQmUrl('api/variables/search/' + encodeURIComponent(params.name)));
        };
        this.getUnits = function () {
            return $http.get(getQmUrl('api/v1/units'));
        };
        this.searchCorrelations = function (cause, effect) {
            var requestUrl = settings.apiHost;
            if (settings.commonOrUser == 'user') {
                requestUrl += 'api/v1/correlations?';
                if (cause) {
                    requestUrl += 'cause=' + encodeURIComponent(cause) + '&';
                }
                if (effect) {
                    requestUrl += 'effect=' + encodeURIComponent(effect);
                }
            } else if (settings.commonOrUser == 'common') {
                requestUrl += 'api/v1/public/correlations/search/';
                if (cause && !effect) {
                    requestUrl += encodeURIComponent(cause) + "?effectOrCause=cause"
                } else {
                    requestUrl += encodeURIComponent(effect) + "?effectOrCause=effect"
                }
            } else {
                console.error('endpoint type (common or public) is not specified');
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
        this.getVariableByName = function (varName, callback) {
            return $http.get(getQmUrl('api/v1/variables?name=' + encodeURIComponent(varName)));
        };
        this.postMeasurement = function (measurement) {
            console.debug('Going to post this measurement:', measurement);
            return $http.post(settings.apiHost + 'api/v1/measurements', measurement);
        };
        this.getUnitsForVariableByName = function (variableName, callback) {
            $http.get(getQmUrl('api/v1/unitsVariable?variable=' + encodeURIComponent(variableName)))
                .then(function (response) {
                    callback(response);
                }, function(response){
                    errorHandler(response);
                });
        };
        this.setVariableSettings = function (variableSettings) {
            return $http.post(settings.apiHost + 'api/v1/userVariables', variableSettings);
        };
        this.getCurrentUserData = function (callback) {
            $http.get(getQmUrl('api/v1/user/me')).then(function (response) {
                callback(response.data);
            });
        };
        this.getMeasurementsRange = function () {
            return $http.get(getQmUrl('api/v1/measurementsRange'));
        };
        this.getDailyMeasurements = function (variableName, startTime, endTime) {
            var deferred = $q.defer();
            var measurements = [];
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
                    if (response.data.length) {
                        for (var i = 0; i < response.data.length; i++) {
                            measurements.push(response.data[i]);
                        }
                        return getLooping(measurements.length);
                    } else {
                        deferred.resolve(measurements);
                    }
                })
            }
            getLooping(0);
            return deferred.promise;
        };
        this.getCredentials = function () {
            var url = settings.apiHost + 'api/v1/user/me';
            var accessToken = localStorage.getItem('accessToken');
            if(accessToken){url += '?accessToken='+accessToken;}
            return $http.get(url);
        };
        this.fetchAccessToken = function (authorizationCode, redirectUri) {
            var url = settings.apiHost + "api/oauth2/token";
            // make request
            var request = {
                method: 'POST',
                url: url,
                responseType: 'json',
                headers: {
                    'Content-Type': "application/json"
                },
                data: {
                    client_id: settings.client,
                    client_secret: settings.secret,
                    grant_type: 'authorization_code',
                    code: authorizationCode,
                    redirect_uri: redirectUri
                }
            };
            return $http(request);
        }
        this.refreshAccessToken = function (refreshToken) {
            var url = settings.apiHost + "api/oauth2/token";
            return $http.post(url, {
                client_id: settings.client,
                client_secret: settings.secret,
                refresh_token: refreshToken,
                grant_type: 'refresh_token'
            });
        }
    });