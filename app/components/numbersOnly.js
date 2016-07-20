angular.module("components")
    .directive("numbersOnly", [function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var numberOnly = function (evt) {
                    if (!(evt.keyCode >= 48 && evt.keyCode <= 57))
                        evt.preventDefault();
                }
                element.bind("keypress", numberOnly);
            }
        }
    }])
