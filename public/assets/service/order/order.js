angular.module('axws')
    .service('Order', ['$http', '$modal', 'Dialog', function ($http, $modal, Dialog) {
        var service = {};

        var ModalInstanceCtrl = function ($scope, $modalInstance, cart) {

            $scope.step = 1;
            $scope.cart = cart;
            $scope.user = {};

            $scope.redirectDetail = function (id) {
                window.open('/goods/detail/' + id);
            };

            $scope.delGoods = function (id, index) {
                $http.get('/service/carts/del/' + id)
                    .success(function (data) {
                        $scope.cart.goods.splice(index, 1);
                    })
                    .error(function (data){
                        Dialog.alert({msg: data.msg, status: 'error'});                        
                    });
            };

            $scope.prevStep = function () {
                $scope.step --;
                console.log($scope.step);
            }

            $scope.nextStep = function () {
                if ($scope.cart.len == 0) {
                    $modalInstance.close(true);
                }
                $scope.step ++;
                console.log($scope.step);
            }

            $scope.ok = function () {
                $http.post('/service/orders/submit', $scope.user)
                    .success(function (data){
                        $modalInstance.close();
                        Dialog.alert({msg: data.msg, status: 'success'});
                    })
                    .error(function (data){
                        $modalInstance.close();
                        Dialog.alert({msg: data.msg, status: 'error'});
                    });
            };

            $scope.cancel = function () {
                $modalInstance.close();
            };
        };
        
        service.open = function (cart) {
            var modalInstance = $modal.open({
                templateUrl: '/assets/service/order/order.html',
                controller: ModalInstanceCtrl,
                size: 'lg',
                resolve: {
                    cart : function () {
                        return cart;
                    }
                }
            });
        };
        
        return service;
    }]);