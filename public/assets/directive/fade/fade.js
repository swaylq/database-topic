//when element change the status(hide or show), they can choose whether fade in and whether fade out
angular.module('database')
    .directive('fade', ['$animate', function ($animate) {
        return {
            multiElement: true,
            restrict: 'A',
            scope: {
                step: '@step',
                speed: '@speed',
                exp: '=exp',
                fadeIn: '=isFadeIn',   //whether fade in 
                fadeOut: '=isFadeOut'  //whether fade out
            },
            link: function (scope, element, attr) {
                var step = scope.step || 5;
                var speed = scope.speed || 30; 
                if (scope.exp == false) {
                    $animate['addClass'](element, 'ng-hide');
                }

                if (angular.isUndefined(scope.fadeIn)) {
                    scope.fadeIn = true;
                }

                if (angular.isUndefined(scope.fadeOut)) {
                    scope.fadeOut = true;
                }

                scope.$watch('exp', function fade(newValue, oldValue){
                    scope.opacity = oldValue == true ? 1 : 0;
                    if (newValue != oldValue) {
                        element[0].style.opacity = scope.opacity;
                        if (oldValue == false) {
                            $animate['removeClass'](element, 'ng-hide');
                        }
                        var t_o = setInterval(function(){
                            //modern browsers
                            element[0].style.opacity = scope.opacity;
                            //older IE
                            element[0].style.filter = 'alpha(opacity=' + scope.opacity * 100 + ')';
                            
                            if (scope.opacity > 1 || scope.opacity < 0){
                                $animate[newValue ? 'removeClass' : 'addClass'](element, 'ng-hide');
                                clearInterval(t_o);
                                return; 
                            }

                            if (newValue == true) {
                                scope.opacity += step / 100;
                            }
                            
                            if (newValue == false) {
                                scope.opacity -= step / 100;
                            }

                        }, speed);
                        if (newValue == true && scope.fadeIn == false) {
                            $animate['removeClass'](element, 'ng-hide');
                        }
                        if (newValue == false && scope.fadeOut == false) {
                            $animate['addClass'](element, 'ng-hide');
                        }
                    }
                });
            }
        };
}]);