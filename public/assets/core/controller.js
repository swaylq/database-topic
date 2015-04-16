angular.module('database')
    .controller('SiteNavController', ['$scope', 'User', '$http', 'Dialog',
        function ($scope, User, $http, Dialog){
            $scope.exit = function () {
                $http.get('/service/user/logout')
                    .success(function (data){
                        Dialog.alert({msg: data.msg, status:'success'});
                    })
                    .error(function (data){
                        Dialog.alert({msg: data.msg, status:'error'});
                    });
            };
    }]);
