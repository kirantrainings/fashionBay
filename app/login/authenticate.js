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
