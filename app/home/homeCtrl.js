angular.module('home')
    .controller('homeCtrl', ["$scope", "$rootScope", "productSvc",
                             function ($scope, $rootScope, productSvc) {
            // $scope.products = productSvc.getProducts();

            $scope.showDescription = function (item) {
                item.showFullDesc = !item.showFullDesc;
            };
            $scope.addToCart = function (item) {

                productSvc.addToCart(item);

                $rootScope.$broadcast("PRODUCT-ADDED", {
                    product: item
                });
            };

            productSvc.getProductsFromApi()
                .then(function (response) {
                    $scope.products = response;
                }).catch(function (response) {
                    $scope.error = response;
                });
}]);
