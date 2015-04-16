angular.module('database')
    .controller('ListController', ['$http', '$scope', '$modal',
        function ($http, $scope, $modal) {
            var urlPrefix = (g_config.database == 'mysql'? 'http://localhost:8900' : 'http://localhost:3000');

            getData(urlPrefix + '/service/book/list');
            $scope.changePage = function (page) {
                var url = urlPrefix + '/service/book/list?page=' + page;
                getData();
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
                        console.log($scope.order);
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
                        $scope.books.forEach(function (book){
                            book.number = 1;
                        });
                    });
            };
        }]);
