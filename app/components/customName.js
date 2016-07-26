angular.module("components")
    .directive("customName", ["$compile", function ($compile) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var template;

                scope.type = "text";
                scope.name = "Kiran"
                if (scope.type == "image") {
                    scope.source = "../../images/hillside.jpg"
                    template = '<img src="../../images/hillside.jpg">'
                }
                if (scope.type == "text") {
                    template = "<h1>{{name}}<h1>"
                }
                //var temp = angular.element(myHtml);
                var result = $compile(template)(scope);
                element.append(result);
            }
        }
}]);
