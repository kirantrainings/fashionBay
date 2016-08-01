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
