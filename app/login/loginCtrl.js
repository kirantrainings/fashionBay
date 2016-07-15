angular.module("login")
    .controller("loginCtrl", ["authenticateSvc", "$rootScope", function (authenticateSvc, $rootScope) {
        this.loginData = {
            username: "",
            password: ""
        };
        this.loginUser = function () {
            var security = authenticateSvc.loginUser(this.loginData);
            if (security.isAuthenticated) {
                $rootScope.$broadcast("USER-LOGGEDIN");
            } else {
                this.showInvalidCredentials = true;
            }
        };
}]);
