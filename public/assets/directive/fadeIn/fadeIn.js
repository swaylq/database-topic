//when the page loads, the element fades in the page instead of appearing immediately
angular.module('axws')
    .directive('fadeIn', ['$animate', function ($animate) {
        return {
            multiElement: true,
            restrict: 'A',
            scope: {
                step: '@step',
                speed: '@speed'
            },
            link: function (scope, element, attr) {
                scope.opacity = 0;
                element[0].style.opacity = scope.opacity;
                var step = scope.step || 5;
                var speed = scope.speed || 30; 
                var t_o = setInterval(function(){
                    //modern browsers
                    element[0].style.opacity = scope.opacity;
                    //older IE
                    element[0].style.filter = 'alpha(opacity=' + scope.opacity * 100 + ')';
                    
                    if (scope.opacity > 1 || scope.opacity < 0){
                        clearInterval(t_o);
                        return; 
                    }
                    
                    scope.opacity += step / 100;

                }, speed);
            }
        };
}]);