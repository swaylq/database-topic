angular.module('database')
    .controller('OrderListController', ['$http', '$scope', '$modal','Dialog',
        function ($http, $scope, $modal, Dialog) {
            var urlPrefix = g_url.base_url('');
            $scope.filter = {page: 1, number: 10};
            var url = '';
            if (g_config.database =='mongodb') {
                url = g_url.base_url('/service/order/all/1');
            } else {
                url = g_url.base_url('/service/order/all');
            }

            getData(url);

            $scope.showBooks = function (books) {
                var ModalInstanceCtrl = function ($scope, $modalInstance) {
                    $scope.books = books;
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                };
                ModalInstanceCtrl.$inject = ['$scope', '$modalInstance'];
                $modal.open({
                    templateUrl: 'books.html',
                    controller: ModalInstanceCtrl
                });
            };

            $scope.changePage = function (){
                if (g_config.database =='mongodb') {
                    url = g_url.base_url('/service/order/all/' + $scope.filter.page);
                } else {
                    url = g_url.base_url('/service/order/all?page=' + $scope.filter.page);
                }
                getData(url);
            };
            function getData(url) {
                $http.get(url)
                    .success(function (data){
                        $scope.orders = data.result.orders;
                        $scope.count = data.result.count;
                        $scope.filter = data.filter;
                        $scope.filter.page = Number($scope.filter.page);

                    });
            }

        }]);
