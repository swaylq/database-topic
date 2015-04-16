angular.module('axws')
    .service('Dialog', ['$modal', function ($modal) {
        'use strict';
        var ModalInstanceCtrl = function ($scope, $modalInstance, option) {
            $scope.msg = option.msg;
            $scope.type = option.type;
            $scope.status = option.status ? option.status : '';
            $scope.ok = function () {
                $modalInstance.close(true);
            };

            $scope.cancel = function () {
                $modalInstance.close(false);
            };

            if (option.type == 'alert' && option.status !== 'info') {
                setTimeout(function(){
                    $modalInstance.close(true);
                }, 2800);
            }
        };
        ModalInstanceCtrl.$inject = ['$scope', '$modalInstance', 'option'];
        var service = {};
        service.alert = function (option, handle) {
            option.type = 'alert';
            if (typeof(handle) === 'undefined') {
                handle = function () {};
            }
            //默认为success要刷新
            if (typeof(option.refresh) === 'undefined') {
                option.refresh = (option.status == 'success');
            }
            // size default sm
            if (typeof(option.size) === 'undefined') {
                option.size = 'sm';
            }
            var modalInstance = $modal.open({
                templateUrl: '/assets/service/dialog/dialog.html',
                controller: ModalInstanceCtrl,
                size: option.size,
                resolve: {
                    option : function () {
                        return option;
                    }
                }
            });

            modalInstance.result.finally(function(){
                handle();
                if (option.refresh) {
                    window.location.reload();
                }
            });
        };
        service.confirm = function (option, handle) {
            option.type = 'confirm';
            var modalInstance = $modal.open({
                templateUrl: '/assets/service/dialog/dialog.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    option : function () {
                        return option;
                    }
                }
            });
            modalInstance.result.then(function (select) {
                if (select) {
                    handle();
                }
            });
        };
        return service;
    }]);