angular.module('database')
    .controller('HomeController', ['$http', '$scope',
        function ($http, $scope){
            $scope.database = g_config.database;

            $scope.changeDatabase = function () {
                if (g_config.database == 'mysql') {
                    console.log(123);
                    window.location.href = "http://localhost:3000";
                } else {
                    window.location.href = "http://localhost:8900";
                }
            };
    }]);
