angular.module('axws')
    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        }
    })
    .directive('money', [function () {
        return {
            restrict: 'E',
            template: "<span ng-class=\"{'custom-orange': number>=0,'custom-d-green': number<0}\">ღ{{realNumber}}</span>",
            scope: {
                number: '=number'
            },
            replace: true,
            link: function (scope, iElement, iAttrs) {
                scope.$watch('number', function (newValue, oldValue){
                    if (scope.number < 0) {
                        scope.realNumber = Math.round(- scope.number * 100) / 100;
                    } else {
                        scope.realNumber = Math.round(scope.number * 100) / 100;
                    }
                });
            }
        };
    }]);
