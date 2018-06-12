angular.module('qmCommon')

    .provider('settings', [function () {

        //very very very default settings
        //options can be overriden by modules which uses it by passing object with same structure
        //in to the config method
        var settings = {

            plugin: "about",    //default plugin

            variable: 'Overall Mood',

            commonOrUser: 'user',

            apiHost: 'https://app.quantimo.do/',
            scope: 'writemeasurements readmeasurements',
            sourceName: "Embeddable QM",   //Quantimodo

            storage: {
                prefix: 'qm_'
            },

            baseHref: '/embeddable/',   //this should be same to base href defined at index page

            setApplicationFromState: function (stateString) {
                console.debug('State string will be used to setup application', stateString);
                var parsedState = JSON.parse(decodeURIComponent(stateString));
                console.debug('Parsed state string', parsedState);
                for (var param in parsedState) {

                    if (parsedState.hasOwnProperty(param)) {

                        //convert param names to camelCase
                        var camelCasedParamName = param.replace(/((-|_)[a-z])/g, function (g) {
                            return g[1].toUpperCase();
                        });

                        settings[camelCasedParamName] = parsedState[param]; //TODO we can be more smart here
                    }
                }
                console.debug('Now app configuration is following:', settings);
            },

            setApplicationFromGet: function (getParams) {
                console.debug('Get params will be used to setup application', getParams);
                for (var param in getParams) {

                    if (getParams.hasOwnProperty(param)) {

                        //convert param names to camelCase
                        var camelCasedParamName = param.replace(/((-|_)[a-z])/g, function (g) {
                            return g[1].toUpperCase();
                        });

                        settings[camelCasedParamName] = getParams[param]; //TODO we can be more smart here

                    }
                }
                settings.state = getParams;
                console.debug('Now app configuration is following:', settings);
            },

        };

        return {

            setSettings: function (settingsObj) {

                for (var option in settingsObj) {

                    if (settingsObj.hasOwnProperty(option)) {

                        settings[option] = settingsObj[option];

                    }

                }

            },

            $get: function () {

                return settings;

            },

            extractDomainWithPort: function (url) {
                //find & remove protocol (http, ftp, etc.) and get domain
                if (url.indexOf("://") > -1) {
                    return url.split('/')[2];
                }
                else {
                    return url.split('/')[0];
                }
            },

            stripPort: function (domainWithPort) {
                //find & remove port number
                return domainWithPort.split(':')[0];
            }

        }

    }]);