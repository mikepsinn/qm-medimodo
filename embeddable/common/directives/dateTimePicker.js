angular.module('qmCommon')
    .directive('dateTimePicker', function ($timeout, $parse) {
        return {
            link: function ($scope, element, $attrs) {
                return $timeout(function () {
                    var ngModelGetter = $parse($attrs['ngModel']);

                    return $(element).datetimepicker(
                        {
                            allowInputToggle: true,
                            showTodayButton: true,
                            showClose: true,
                            format: "LLL",
                            maxDate: moment()
                        }
                    ).on('dp.change', function (event) {
                        $scope.$apply(function () {
                            return ngModelGetter.assign($scope, event.target.value);
                        });
                    });
                });
            }
        };
    });