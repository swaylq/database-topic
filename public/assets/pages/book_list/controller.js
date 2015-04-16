angular.module('database')
    .controller('ListController', ['$http', '$scope',
        function ($http, $scope) {
            var urlPrefix = (g_config.database == 'mysql'? 'http://localhost:8900' : 'http://localhost:3000');
            $http.get(urlPrefix + '/service/book/list')
                .success(function (data){
                    $scope.books = data.result;
                });
        }]);
