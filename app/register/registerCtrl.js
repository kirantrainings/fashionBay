angular.module("register")
    .controller("registerCtrl", ["$scope", function ($scope) {
        $scope.user = {};
        $scope.registerUser = function () {
            console.log($scope.user);
        };

}]);
