    angular.module("login")
        .controller("loginCtrl", ["$rootScope", "authenticateSvc", "$state", function ($rootScope, authenticateSvc, $state) {
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
