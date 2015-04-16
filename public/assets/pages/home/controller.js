angular.module('database')
    .controller('HomeController', ['$http', '$scope',
        function ($http, $scope){
            $scope.database = g_config.database;

            $scope.changeDatabase = function () {
                $http.get('/service/changeDatabase')
                    .success(function (){
                        window.location.reload();
                    });
            };
    }]);
