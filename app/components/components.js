angular.module("components", []);
angular.module("components")
    .directive("customDatePicker", [function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var config = {};
                if (attrs["max"]) {
                    config.maxDate = attrs["max"];
                }
                if (attrs["min"]) {
                    config.minDate = attrs["min"];
                }

                element.datepicker(config);
            }
        }
}]);

angular.module("components")
    .directive("customSlider", [function () {
        return {
            restrict: "A",
            templateUrl: "app/components/customSlider.html",
            link: function (scope, element, attrs) {
                $(element).find(".bxslider").bxSlider();
            }
        }
            }]);
