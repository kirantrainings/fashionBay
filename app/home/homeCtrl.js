angular.module('home')
    .controller('homeCtrl', ["$scope", function ($scope) {
        $scope.products = [
            {
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJLr9uWKGkyjpZlV0buePwoxD7CvYcV8nL0Bc2hwFwYsxeK3UuFw",
                description: "Men's Tshirt",
                price: "200",
                model: "Polo Neck T"
            },
            {
                imageUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSkxUxxgNhuaATrMH2iuXEbxa3qmKmwhQScmRTk8b0OLMktcOxsZA",
                description: "Men's Tshirt",
                price: "2000",
                model: "V Neck T"
            },
            {
                imageUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTuJt-fGuNTYRhvj4EcjJb3YErTrPWTG8Fwi_TouwVO3twvEaFN2g",
                description: "Men's Tshirt",
                price: "200",
                model: "fullSeeve Neck T"
            }
        ]
}]);
