angular.module("myApp", [])
    .provider("game", function () {
        var type;
        return {
            setType: function (value) {
                type = value;
            },
            $get: function () {
                return {
                    title: type
                };
            }
        };
    });

/*app.config(function (gameProvider) {
    gameProvider.setType("War");
});*/
