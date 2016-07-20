angular.module("fashionBay")
    .controller("mainCtrl", ["$scope", "authenticateSvc",
                             function ($scope, authenticateSvc) {

            $scope.headerTemplate = "app/common/header.tpl.html";
            $scope.templateUrl = "app/login/login.tpl.html";
            $scope.appName = "FashionBay";
            $scope.loadPage = function (pageType) {
                $scope.security = authenticateSvc.authenciateDetails();

                if ($scope.security.isAuthenticated) {
                    if (pageType == 'login') {
                        $scope.templateUrl = "app/login/login.tpl.html";
                    } else if (pageType == 'cart') {
                        $scope.templateUrl = "app/cart/cart.tpl.html";
                    } else if (pageType == "home")
                        $scope.templateUrl = "app/home/home.tpl.html";
                } else {
                    $scope.templateUrl = "app/login/login.tpl.html";
                }
                if (pageType == 'register') {
                    $scope.templateUrl = "app/register/register.tpl.html"
                }
            };
            $scope.cartItems = [];

            $scope.$on("PRODUCT-ADDED", function (event, args) {
                console.log(args);
                $scope.cartItems.push(args.product);
            });

            $scope.$on("USER-LOGGEDIN", function (event, args) {
                $scope.loadPage("home");
            });

            $scope.logOut = function () {
                authenticateSvc.logOut();
                $scope.loadPage("login");
            }

    }]);
