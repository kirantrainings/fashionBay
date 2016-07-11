angular.module('home')
    .controller('homeCtrl', ["$scope", function ($scope) {
        $scope.products = [
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
            }
        ]
}]);
