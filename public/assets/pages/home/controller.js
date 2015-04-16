angular.module('axws')
    .controller('HomeController', ['$http', '$scope',
        function ($http, $scope){
            $scope.goods = g_goods;
            $scope.services = g_services;
            $scope.slides = g_slides;
            $scope.siteStat = g_site_stat;
            $scope.articles = g_articles;
            $scope.articleTab = 'notification';
            $scope.rankingsTab = 'service';
            $scope.redirectDetail = function (id) {
                window.open('/goods/detail/' + id);
            };

    }]);
