angular.module('home')
    .controller('homeCtrl', ["$scope", "$rootScope", "productSvc", "productInfo",

                             function ($scope, $rootScope, productSvc, productInfo) {
            $scope.products = productInfo;

            $scope.showDescription = function (item) {
                item.showFullDesc = !item.showFullDesc;
            };
            $scope.addToCart = function (item) {

                productSvc.addToCart(item);

                $rootScope.$broadcast("PRODUCT-ADDED", {
                    product: item
                });
            };

            /*   productSvc.getProductsFromApi()
       .then(function (response) {
           $scope.products = response;
       }).catch(function (response) {
           $scope.error = response;
       });*/
}]);
