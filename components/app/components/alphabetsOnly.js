angular.module("components")
    .directive("alphabetsOnly", [function () {
        return {
            restirct: "A",
            link: function (scope, element, attrs) {
                console.log(scope);
                console.log(element);
                console.log(attrs);
            }
        }
}]);
