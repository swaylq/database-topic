angular.module('axws')
    .controller('SiteNavController', ['$scope', 'User', '$http', 'Dialog', 'Cart', 'Order',
        function ($scope, User, $http, Dialog, Cart, Order){
            'use strict';
            $scope.userService = User;
            $scope.cartService = Cart;
            if (typeof g_filter !== 'undefined' && typeof g_filter.wds !== 'undefined') {
                $scope.searchContent = g_filter.wds;
            } else {
                $scope.searchContent = '';
            }
            $scope.searchPH = '搜索商品、服务'
            $scope.$watch('searchContent', function (oldValue, newValue){
                if (newValue !== '') {
                    $scope.showClear = true;
                } else {
                    $scope.showClear = false;
                }
            });

            $scope.$watch('cartService.goods', function (newV, oldV){
                if (newV !== oldV) {
                    //当没有删除商品,则要发送请求去改变商品的数量
                    if (newV.length == oldV.length) {
                        for (var i = 0; i < newV.length; i ++) {
                            if (newV[i].count != oldV[i].count) {
                                $http.post('/service/carts/count/' + newV[i].id + '/' + (newV[i].count - oldV[i].count))
                                    .error(function (data){
                                        Dialog.alert({msg: data.msg, status: 'error'});                         
                                    })
                            }
                        }
                    }
                    $scope.cartService.calculate();
                }
            }, true);
            
            if (typeof g_config !== 'undefined') {
                $scope.active = g_config.global_nav;
            }

            $scope.login = function () {
                User.login();
            };

            $scope.logOut = function () {
                $http.get('/service/users/logout')
                    .success(function (data) {
                        Dialog.alert({msg: data.msg, status: 'success'});
                    })
                    .error(function (data){
                        Dialog.alert({msg: data.msg, status: 'error'});                        
                    });
            };

            $scope.search = function () {
                if ($scope.searchContent == '') {
                    $scope.searchPH = '搜索内容不能为空';
                    return;
                } 
                window.location.href = '/search?wds=' + $scope.searchContent;
            };

            $scope.clearSearch = function () {
                $scope.searchContent = '';
            };

            $scope.redirectDetail = function (id) {
                window.open('/goods/detail/' + id);
            };

            $scope.delGoods = function (id, index) {
                $http.get('/service/carts/del/' + id)
                    .success(function (data) {
                        $scope.cartService.goods.splice(index, 1);
                    })
                    .error(function (data){
                        Dialog.alert({msg: data.msg, status: 'error'});                        
                    });
            };

            $scope.order = function () {
                Order.open(Cart);
            };
    }]);