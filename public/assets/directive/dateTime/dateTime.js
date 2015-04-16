function dateTimeDirective() {
    'use strict';
    return {
        restrict: 'EA',
        templateUrl: '/assets/directive/dateTime/dateTime.html',
        replace: true,
        scope: {
            obj: '=dateObj'
        },
        link: function (scope) {
            init();
            scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                scope.opened = true;
            };

            scope.dateOptions = {
            };

            scope.format = function () {
                var date = moment(scope.obj.date).format('YYYY-MM-DD');
                var time = moment(scope.obj.time).format('HH:mm:ss');
                scope.obj.value = date + ' ' + time;
                scope.$emit('time-change', scope.obj);
            };

            scope.$emit('time-change', scope.obj);
            
            scope.$on('time-init', function (event, data){
                scope.obj = data;
                init();
            });

            function init() {
                if (typeof(scope.obj.value) == 'undefined') {
                    scope.obj = {};
                    scope.obj.date = moment(new Date()).format('YYYY-MM-DD');
                    scope.obj.time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                    scope.obj.value = scope.obj.time;
                } else {
                    scope.obj.date = moment(scope.obj.value).format('YYYY-MM-DD');
                    scope.obj.time = moment(scope.obj.value).format('YYYY-MM-DD HH:mm:ss');
                    scope.obj.value = scope.obj.time;
                }
            }
        }
    };
}

angular.module('axws')
    .directive('dateTimePicker', dateTimeDirective);