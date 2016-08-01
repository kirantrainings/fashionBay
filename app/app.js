angular.module("fashionBay", ["register", "home", "components", "login", "products", "cart", 'ui.router', "myApp"]);

angular.module("fashionBay")
    .config(["$stateProvider", "$urlRouterProvider", "gameProvider", "APP_CONSTANTS",
             function ($stateProvider, $urlRouterProvider, gameProvider, APP_CONSTANTS) {
            gameProvider.setType("WarZone");
            console.log(APP_CONSTANTS.version);
            //defining the routers.
            var login = {
                templateUrl: "app/login/login.tpl.html",
                controller: "loginCtrl as loginvm"
            };
            var register = {
                templateUrl: "app/register/register.tpl.html",
                controller: "registerCtrl"
            };
            var home = {
                templateUrl: "app/home/home.tpl.html",
                controller: "homeCtrl",
                resolve: {
                    productInfo: function ($timeout, $q) {
                        var dfd = $q.defer();
                        $timeout(function () {
                            var data = [
                                {
                                    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJLr9uWKGkyjpZlV0buePwoxD7CvYcV8nL0Bc2hwFwYsxeK3UuFw",
                                    description: "Men's Tshirt",
                                    price: 1200,
                                    model: "Polo Neck T",
                                    category: "Men"
            },
                                {
                                    imageUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSkxUxxgNhuaATrMH2iuXEbxa3qmKmwhQScmRTk8b0OLMktcOxsZA",
                                    description: "Men's Tshirt liked by girls",
                                    price: 2000,
                                    model: "V Neck T",
                                    category: "Men"
            },
                                {
                                    imageUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTuJt-fGuNTYRhvj4EcjJb3YErTrPWTG8Fwi_TouwVO3twvEaFN2g",
                                    description: "Men's Tshirt",
                                    price: 300,
                                    model: "fullSeeve Neck T",
                                    category: "Men"
            },
                                {
                                    imageUrl: "https://fashionbuzzer.com/media/catalog/product/cache/1/small_image/295x295/9df78eab33525d08d6e5fb8d27136e95/d/n/dn.49396_1.jpg",
                                    description: "For my cute sweet daughter",
                                    price: 4000,
                                    model: "EthnicWear ",
                                    category: "Girls"
            },
                                {
                                    imageUrl: "http://4.imimg.com/data4/VQ/SM/MY-335323/indian-bridal-wear-suits-250x250.jpg",
                                    description: "For my cute sweet daughter",
                                    price: 5000,
                                    model: "EthnicWear ",
                                    category: "Girls"
            },

                                {
                                    category: "Men",
                                    price: "2000",
                                    discount: "20%",
                                    imageUrl: "http://static2.jassets.com/p/Lee-Navy-Blue-Solid-Regular-Fit-Jeans-28Macky29-7403-5339391-1-catalog_s.jpg",
                                    description: "Nice Tshirt"
        },
                                {
                                    category: "Women",
                                    price: "40000",
                                    discount: "10%",
                                    imageUrl: "http://static3.jassets.com/p/Rain-26-Rainbow-Yellow-Printed-Anarkali-4559-3257612-1-catalog_s.jpg",
                                    description: "Ethnic wear"
        },
                                {
                                    category: "Women",
                                    price: "50000",
                                    discount: "30%",
                                    imageUrl: "http://static1.jassets.com/p/Nayo-Multicoloured-Printed-Anarkali-4105-0666002-1-catalog_s.jpg",
                                    description: "Awesome dress"
        }];
                            dfd.resolve(data);

                        }, 10000)
                        return dfd.promise;
                    }
                }
            };

            //state registration.
            $stateProvider.state("register", register);
            $stateProvider.state("login", login);
            $stateProvider.state("home", home);
            console.log(gameProvider.$get().title);
    }]);

angular.module("fashionBay")
    .run(["$rootScope", "authenticateSvc", "$state",
          function ($rootScope, authenticateSvc, $state) {

            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams, options) {
                if (toState.name == "login") {

                } else {
                    var security = authenticateSvc.authenciateDetails();
                    if (!security.isAuthenticated) {
                        event.preventDefault();
                    }
                }
            });

            function checkUserStatus() {
                var security = authenticateSvc.authenciateDetails();
                if (security.isAuthenticated) {
                    $state.go("home");
                } else {
                    $state.go("login");
                }
            }

            checkUserStatus();


}]);

angular.module("fashionBay")
    .constant("APP_CONSTANTS", {
        version: "1.0.0"
    });

angular.module("fashionBay")
    .value("APP_VALUES", {
        version: "1.0.0"
    });

angular.module("fashionBay")
    .controller("mainCtrl", ["$scope", "authenticateSvc",
                             function ($scope, authenticateSvc) {

            $scope.headerTemplate = "app/common/header.tpl.html";
            $scope.templateUrl = "app/login/login.tpl.html";
            $scope.appName = "FashionBay";
            $scope.navbar = "app/common/navbar.tpl.html";
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
                    $scope.templateUrl = "app/register/register.tpl.html";
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
            };

    }]);
