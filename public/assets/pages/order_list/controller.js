angular.module('database')
    .controller('OrderListController', ['$http', '$scope', '$modal',
        function ($http, $scope, $modal) {
            var urlPrefix = (g_config.database == 'mysql'? 'http://localhost:8900' : 'http://localhost:3000');

            getData(urlPrefix + '/service/order/all');
            $scope.$watch('filter', function (newV, oldV) {
                if (newV != oldV) {
                    var url = urlPrefix + '/service/order/all?page=' + $scope.filter.page;
                    getData();
                }
            }, true);



            function getData(url) {
                $http.get(url)
                    .success(function (data){
                        $scope.id = data.result.id;
                        $scope.consignee_name = data.result.consignee_name;
                        $scope.consignee_address = data.result.consignee_address;
                        $scope.price = data.result.price;
                        $scope.filter = data.filter;
                        $scope.books.forEach(function (book){
                            book.number = 1;
                        });
                    });
            }
        }]);
