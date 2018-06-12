angular.module('qmCommon')

    .factory('localStorageService', function (settings) {

        return {
            setItem: function (key, value) {
                var key_identifier = settings.storage.prefix;
                if (window.chrome && chrome.runtime && chrome.runtime.id) {
                    // Code running in a Chrome extension (content script, background page, etc.)
                    var obj = {};
                    obj[key_identifier + key] = value;
                    chrome.storage.local.set(obj);

                } else {
                    localStorage.setItem(key_identifier + key, value);
                }
            },

            getItemSync: function (key) {
                return localStorage.getItem(settings.storage.prefix + key);
            },

            clear: function () {
                if (window.chrome && chrome.runtime && chrome.runtime.id) {
                    chrome.storage.local.clear();
                } else {
                    localStorage.clear();
                }
            }
        }
    });
