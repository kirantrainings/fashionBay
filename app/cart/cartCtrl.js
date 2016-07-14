angular.module("cart")
    .controller("cartCtrl", ["$scope",
                        "productSvc",
        function ($scope, productSvc) {
            $scope.cart = productSvc.getCart();
}]);
