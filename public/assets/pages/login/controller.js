angular.module('database')
    .controller('LoginController', ['$http', '$scope', 'Dialog', function ($http, $scope, Dialog){
        $scope.user = {};
        var urlPrefix = (g_config.database == 'mysql'? g_url.base_url('') : 'http://localhost:3000');
        $scope.login = function () {
            $http.post(urlPrefix + '/service/user/login', $scope.user)
                .success(function (data){
                    Dialog.alert({msg: data.msg, status:'success', refresh: false}, function(){
                        window.location.href = '/';
                    });
                })
                .error(function (data){
                    $scope.errorMsg = data.msg;
                });
        }
    }]);
