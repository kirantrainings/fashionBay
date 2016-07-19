angular.module("components")
    .controller("navBarCtrl", [
        function () {

            var vm = this;
            vm.message = "Welcome to the Angularjs Directives";

        }]);

angular.module("components")
    .directive("navBar", [function () {
        return {
            //template: "<h1>Welcome</h1>"
            templateUrl: "app/components/navbar/navbar.html",
            restrict: "C,A,E",
            controller: "navBarCtrl",
            controllerAs: "vm"
        };

}]);
