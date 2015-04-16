angular.module('database')
    .controller('ListController', ['$http', '$scope', '$modal',
        function ($http, $scope, $modal) {
            var urlPrefix = g_url.base_url('');
            $scope.filter = {page: 1, number: 10};

            getData(urlPrefix + '/service/book/list');

            $scope.changePage = function (){
                var url = urlPrefix + '/service/book/list?page=' + $scope.filter.page;
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
                        $http.post(urlPrefix + '/service/order/create', $scope.order)
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
