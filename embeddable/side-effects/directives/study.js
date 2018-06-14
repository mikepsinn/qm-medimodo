angular.module('qmSideEffects')
    .directive('qmStudy', function ($q, QuantiModoSideEffectSearchService, htmlHelper, $timeout) {

        return {
            restrict: 'E',
            scope: {
                correlation: '=',
            },
            templateUrl: 'side-effects/templates/study.html',
            controller: function ($scope) {
                console.log('Study directive controller works');

                console.debug('Correlation in study directive:', $scope.correlation);

            }
        }

    });
