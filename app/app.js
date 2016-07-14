angular.module("fashionBay", ["register", "home", "components", "login", "products", "cart"]);

angular.module("fashionBay")
    .config(function () {
        console.log("I am the main Module");
    });
