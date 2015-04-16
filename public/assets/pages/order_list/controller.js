angular.module('database')
    .controller('OrderListController', ['$http', '$scope', '$modal','Dialog',
        function ($http, $scope, $modal, Dialog) {
            var urlPrefix = (g_config.database == 'mysql'? g_url.base_url('')  : 'http://localhost:3000');
            $scope.filter = {page: 1, number: 10};
            getData(urlPrefix + '/service/order/all');

            $scope.changePage = function (){
                var url = urlPrefix + '/service/order/all?page=' + $scope.filter.page;
                getData(url);
            };
            function getData(url) {
                $http.get(url)
                    .success(function (data){
                        console.log(data);
                        $scope.orders = data.result.orders;
                        $scope.count = data.result.count;
                        $scope.filter = data.filter;
                        $scope.filter.page = Number($scope.filter.page);

                    });
            }

        }]);
