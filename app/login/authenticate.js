angular.module("login")
    .service("authenticateSvc", [function () {

        var users = [{
                "username": "kiran",
                "password": "kiran@1234",
                "firstName": "Kiran",
                "lastName": "Paturi"
            },
            {
                "username": "ravi",
                "password": "ravi@1234",
                "firstName": "RaviChandra",
                "lastName": "P"
            }];

        var security = {
            isAuthenticated: false,
            userDetails: {
                firstName: "",
                lastName: ""
            }
        };

        this.loginUser = function (user) {
            angular.forEach(users, function (item) {
                if (item.username == user.username && item.password == user.password) {
                    security.isAuthenticated = true;
                    security.userDetails.firstName = item.firstName;
                    security.userDetails.lastName = item.lastName;
                }
            });
            return security;
        };
        
        this.logOut = function(){
            security.isAuthenticated=false;
            security.userDetails.firstName="";
            security.userDetails.lastName="";
        };
        
        this.authenciateDetails = function(){
            return security;
        };
}]);
