angular.module('database')
    .directive('numberSelector', [ function () {
        return {
            restrict: 'EA',
            templateUrl: '/assets/directive/numberSelector/numberSelector.html',
            replace: true,
            transclude: true,
            require: 'ngModel',
            scope: {
                ngModel: '=',
                max: '=max',
                size: '@size'
            },
            link: function(scope, iElement, iAttrs) {
                scope.subtract = function () {
                    if (scope.ngModel > 1) {
                        scope.ngModel --;
                    }
                };
                scope.add = function () {
                    if (scope.ngModel < scope.max) {
                        scope.ngModel ++;
                    }
                }
            }
        };
    }])