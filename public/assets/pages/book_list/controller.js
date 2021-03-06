angular.module('database')
    .controller('ListController', ['$http', '$scope', '$modal','Dialog',
        function ($http, $scope, $modal, Dialog) {
            var urlPrefix = g_url.base_url('');
            $scope.filter = {page: 1, number: 10};
            var url = '';
            if (g_config.database =='mongodb') {
                url = g_url.base_url('/service/book/list/1');
            } else {
                url = g_url.base_url('/service/book/list');
            }

            getData(url);

            $scope.changePage = function (){
                if (g_config.database =='mongodb') {
                    url = g_url.base_url('/service/book/list/' + $scope.filter.page);
                } else {
                    url = g_url.base_url('/service/book/list?page=' + $scope.filter.page);
                }
                getData(url);
            };

            $scope.postOrder = function () {
                var books = [];
                $scope.books.forEach(function (book){
                    if (book.check) {
                        books.push(book);
                    }
                });

                var ModalInstanceCtrl = function ($scope, $modalInstance) {
                    $scope.order = {books: books};
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    $scope.postOrder = function () {
                        $scope.errorMsg = '';
                        $http.post(g_url.base_url('/service/order/create'), $scope.order)
                            .success(function (data) {
                                $modalInstance.dismiss();
                                Dialog.alert({msg: data.msg, status:'success'});
                            })
                            .error(function (data) {
                                $scope.errorMsg = data.msg;
                            });
                    };
                };
                ModalInstanceCtrl.$inject = ['$scope', '$modalInstance'];
                $modal.open({
                    templateUrl: 'order.html',
                    controller: ModalInstanceCtrl
                });

            };


            function getData(url) {
                $http.get(url)
                    .success(function (data){
                        $scope.books = data.result.books;
                        $scope.count = data.result.count;
                        $scope.filter = data.filter;
                        $scope.filter.page = Number($scope.filter.page);
                        $scope.books.forEach(function (book){
                            book.number = 1;
                        });
                    });
            };
        }]);
