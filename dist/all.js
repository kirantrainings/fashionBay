angular.module("cart", []);

angular.module("cart")
    .controller("cartCtrl", ["$scope",
                        "productSvc",
        function ($scope, productSvc) {
            $scope.cart = productSvc.getCart();
}]);

angular.module("myApp", [])
    .provider("game", function () {
        var type;
        return {
            setType: function (value) {
                type = value;
            },
            $get: function () {
                return {
                    title: type
                };
            }
        };
    });

/*app.config(function (gameProvider) {
    gameProvider.setType("War");
});*/

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

angular.module("components")
    .directive("alphabetsOnly", [function () {
        return {
            restirct: "A",
            link: function (scope, element, attrs) {
                console.log(scope);
                console.log(element);
                console.log(attrs);
                var alphabetsOnly = function (evt) {
                    if ((evt.keyCode >= 97 && evt.keyCode <= 122) || (evt.keyCode >= 65 && evt.keyCode <= 90) || evt.keyCode == 32) {
                        console.log("I am good")
                    } else {
                        evt.preventDefault();
                    }
                };
                element.bind("keypress", alphabetsOnly);

            }
        }
}]);

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

angular.module("components")
    .directive("numbersOnly", [function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var numberOnly = function (evt) {
                    if (!(evt.keyCode >= 48 && evt.keyCode <= 57))
                        evt.preventDefault();
                }
                element.bind("keypress", numberOnly);
            }
        }
    }])

angular.module("components")
    .filter("princeRange", [function () {

        return function (products, criteria) {
            console.log(products);
            console.log(criteria);
            var filteredProducts = [];
            angular.forEach(products, function (item) {
                if (item.price >= parseInt(criteria.price)) {
                    filteredProducts.push(item);
                }
            });
            if (criteria.price != undefined) {
                return filteredProducts;
            } else {
                return products;
            }
        };
            }]);

angular.module("home", []);

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

angular.module("login", []);

angular.module("login")
    .controller("loginCtrl", ["$rootScope", "authenticateSvc", "$state", "game", "APP_VALUES", function ($rootScope, authenticateSvc, $state, game, APP_VALUES) {
        console.log(game.title);
        console.log(APP_VALUES.version);
        this.loginData = {
            username: "",
            password: ""
        };
        this.loginUser = function () {
            authenticateSvc.loginUser(this.loginData)
                .then(function (response) {
                    var security = response;
                    if (security.isAuthenticated) {
                        $state.go("home");
                        // $rootScope.$broadcast("USER-LOGGEDIN");
                    } else {
                        this.showInvalidCredentials = true;
                    }
                }).catch(function (errorResponse, data) {
                    console.log(errorResponse);
                });

        };
}]);

angular.module("login")
    .factory("authenticateFact", ["$http", "$q", function ($http, $q) {
        var authenticate = function (users, user) {
            angular.forEach(users, function (item) {
                if (item.username == user.username && item.password == user.password) {
                    security.isAuthenticated = true;
                    security.userDetails.firstName = item.firstName;
                    security.userDetails.lastName = item.lastName;
                }
            });
            return security;
        };


        var security = {
            isAuthenticated: false,
            userDetails: {
                firstName: "",
                lastName: ""
            }
        };

        return {
            loginUser: function (user) {
                var dfd = $q.defer();
                $http.get("app/data/users.json")
                    .then(function (response) {
                        var security = authenticate(response.data.users, user);
                        dfd.resolve(security);
                    }).catch(function (response) {

                    })
                return dfd.promise;
            },
            logoOut: function () {
                security.isAuthenticated = false;
                security.userDetails.firstName = "";
                security.userDetails.lastName = "";
            },
            authenciateDetails: function () {
                return security;
            }
        }


}]);

angular.module("login")
    .service("authenticateSvc", ["$http", "$q", function ($http, $q) {
        var authenticate = function (users, user) {
            angular.forEach(users, function (item) {
                if (item.username == user.username && item.password == user.password) {
                    security.isAuthenticated = true;
                    security.userDetails.firstName = item.firstName;
                    security.userDetails.lastName = item.lastName;
                }
            });
            return security;
        };


        var security = {
            isAuthenticated: false,
            userDetails: {
                firstName: "",
                lastName: ""
            }
        };

        this.loginUser = function (user) {
            var dfd = $q.defer();
            $http.get("app/data/users.json")
                .then(function (response) {
                    var security = authenticate(response.data.users, user);
                    dfd.resolve(security);
                }).catch(function (response) {

                })
            return dfd.promise;
        };

        this.logOut = function () {
            security.isAuthenticated = false;
            security.userDetails.firstName = "";
            security.userDetails.lastName = "";
        };

        this.authenciateDetails = function () {
            return security;
        };
}]);

angular.module("products", []);

angular.module("products")
    .service("productSvc", ["$http", "$q", function ($http, $q) {
        var cartItems = [];
        this.getProducts = function () {
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
            return data;
        };
        this.getCart = function () {
            return cartItems;
        };
        this.addToCart = function (item) {
            cartItems.push(item);
        };

        this.getProductsFromApi = function () {
            //Step 1.
            var dfd = $q.defer();

            $http.get("app/data/products.json")
                .then(function (response) {
                    dfd.resolve(response.data.products);
                })
                .catch(function (response) {
                    dfd.reject("Error Occurred");
                });
            //step 2.
            return dfd.promise;
        }
}]);

angular.module("register", []);

angular.module("register")
    .config(function () {
        console.log("I am the register Module");
    });

angular.module("register")
    .controller("registerCtrl", ["$scope", function ($scope) {
        $scope.user = {};
        $scope.registerUser = function () {
            console.log($scope.user);
        };
        $scope.loadStates = function () {
            $scope.stateList = [];
            angular.forEach(states, function (item) {
                if (item.countrycode == $scope.selectedCountry.code) {
                    $scope.stateList.push(item);
                }
            });

        };
        $scope.countries = [{
            name: "India",
            code: "IN"
        }, {
            name: "United States",
            code: "US"
        }];
        var states = [{
                "countrycode": "IN",
                "statename": "Telangana",
                "statecode": "TG"
            },
            {
                "countrycode": "IN",
                "statename": "Andhra Pradesh",
                "statecode": "AP"
            },
            {
                "countrycode": "US",
                "statename": "New York",
                "statecode": "NY"
            },
            {
                "countrycode": "US",
                "statename": "Arizona",
                "statecode": "AZ"
            },
            {
                "countrycode": "US",
                "statename": "Texas",
                "statecode": "TX"
            }];

        $scope.userinfo = "kiran";

        setTimeout(function () {
            $scope.userinfo = "PVS";
            $scope.$apply();
        }, 5000)

        $scope.$watch("userinfo", function (newVal, oldVal) {
            console.log("New Value is : " + newVal);
            console.log("Old Value is : " + oldVal);
        });
}]);

angular.module("reports", []);

angular.module("sales", []);

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
