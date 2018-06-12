angular.module('qmSearchRelationships')
    .directive('qmStudy', function ($q, QuantimodoSearchService, htmlHelper, $timeout) {

        return {
            restrict: 'E',
            scope: {
                correlation: '=',
            },
            templateUrl: 'search-relationships/templates/study.html',
            controller: function ($scope) {
                console.log('Study directive controller works');

                console.debug('Correlation in study directive:', $scope.correlation);

            }
        }

    });
