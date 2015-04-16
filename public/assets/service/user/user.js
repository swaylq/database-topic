angular.module('axws')
    .service('User', ['$modal', '$http', function ($modal, $http){
        'use strict';
        var ModalInstanceCtrl = function ($scope, $http, $modalInstance, Dialog) {
            $scope.user = {};
            $scope.cancel = function () {
                $modalInstance.dismiss();
            };
            $scope.login = function () {
                $scope.errorMsg = '';
                $http.post('/service/users/login', $scope.user)
                    .success(function (data) {
                        $modalInstance.dismiss();
                        Dialog.alert({msg: data.msg, status:'success'});
                    })
                    .error(function (data) {
                        $scope.errorMsg = data.msg;
                    });
            };
        };

        ModalInstanceCtrl.$inject = ['$scope', '$http', '$modalInstance', 'Dialog'];


        var service = {};

        service.isLogin = false;
        service.info = {};

        service.login = function () {
           $modal.open({
                templateUrl: '/assets/service/user/login.html',
                controller: ModalInstanceCtrl
            });
        };


        service.firstPull = function () {
            if (typeof g_user !== 'undefined') {
                service.isLogin = g_user.isLogin
                service.info = g_user.info
            }
        };

        return service;
    }])