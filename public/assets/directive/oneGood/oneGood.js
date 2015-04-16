angular.module('axws')
    .directive('oneGood', [ function () {
        return {
            restrict: 'E',
            templateUrl: 'oneGood.html',
            replace: false,
            transclude: true,
            scope: {
                good: '=good'
            },
            link: function (scope, iElement, iAttrs) {
                scope.redirectDetail = function (id) {
                    window.open('/goods/detail/' + id);
                };
            }
        };
    }])