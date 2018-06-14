angular.module('qmSearchRelationships')
    .directive('autoComplete', function (QuantimodoSearchService, localStorageService) {
        return {
            require: 'ngModel',

            link: function (scope, element, attrs, ngModel) {
                console.log("Auto-complete attributes effectOrCause are" + JSON.stringify(attrs.effectOrCause));
                // init jqueryUi auto-complete
                element.autocomplete({

                    minLength: 0,

                    source: function (request, response) {

                        //do not show results list while searching
                        scope.showResults = false;

                        if (request.term.length >= 3) {

                            request.effectOrCause = attrs.effectOrCause;

                            QuantimodoSearchService.searchVariablesByName(request)
                                .then(function (searchResponse) {
                                    if (Array.isArray(searchResponse.data)) {
                                        response(
                                            jQuery.map(searchResponse.data, function (result) {
                                                console.debug(result);
                                                return {
                                                    label: result.name,
                                                    value: result.name
                                                }
                                            }));
                                    } else {
                                        response(null);
                                    }

                                });

                        } else if (request.term.length == 0) {
                            scope.showCorrelations();
                        }


                    },

                    select: function (event, ui) {
                        ngModel.$setViewValue(ui.item.value);
                        scope.$apply();
                        scope.showCorrelations();
                    }

                });
            }
        };
    })

    .directive('dateTimePicker', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (/*scope, element, attrs, ngModelCtrl*/) {
                /*jQuery(function () {
                 element.datetimepicker({
                 dayOfWeekStart: 1,
                 lang: 'en',
                 startDate: '1986/01/05',
                 format: 'M j, Y h:i A',
                 step: 10,
                 onChangeDateTime: function (date) {
                 ngModelCtrl.$setViewValue(moment(date).format('lll'));
                 scope.$apply();
                 }
                 });
                 });*/
            }
        };
    });
