angular.module("login")
    .controller("loginCtrl", [function () {
        this.loginData = {
            email: "pvskiran@gmail.com"
        };
        this.loginUser = function () {
            console.log(this.loginData);
        };
}]);
