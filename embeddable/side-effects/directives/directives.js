angular.module('qmSideEffects')
    .directive('sideEffectAutoComplete', function (QuantiModoSideEffectSearchService, localStorageService) {
        return {
            require: 'ngModel',

            link: function (scope, element, attrs, ngModel) {
                console.log("Auto-complete attributes effectOrCause are" + JSON.stringify(attrs.effectOrCause));
                // init jqueryUi auto-complete
                element.autocomplete({

                    minLength: 2,

                    source: function (request, response) {

                        //do not show results list while searching
                        scope.showResults = false;

                        if (request.term.length >= 3) {

                            request.effectOrCause = 'cause';

                            QuantiModoSideEffectSearchService.searchSideEffectsByName(request)
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

    });
