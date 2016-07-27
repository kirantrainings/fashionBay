angular.module("fashionBay", ["register", "home", "components", "login", "products", "cart", 'ui.router']);

angular.module("fashionBay")
    .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
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
            controller: "homeCtrl"
        };

        //state registration.
        $stateProvider.state("register", register);
        $stateProvider.state("login", login);
        $stateProvider.state("home", home);

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
