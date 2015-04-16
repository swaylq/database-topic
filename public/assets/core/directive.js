angular.module('database')
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
    }])
    .directive('tqPage', [
        function () {
            'use strict';
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/assets/core/tqPage.html',
                scope: {
                    itemsPerPage:       '=',
                    totalItems:         '=',
                    initialPage:        '=',
                    jumpLength:         '@',
                    neighbourLength:    '@',
                    previousText:       '@',
                    nextText:           '@',
                    callback:           '&'
                },
                link: function (scope) {
                    var s = scope.s = {
                        jumpLength:         parseInt(scope.jumpLength)      || 20,
                        neighbourLength:    parseInt(scope.neighbourLength) || 2,
                        previousText:       scope.previousText              || '< 上一页',
                        nextText:           scope.nextText                  || '下一页 >',
                        callback:           scope.callback                  || angular.noop
                    }, r = scope.r = {
                        current:            parseInt(scope.initialPage)     || 1
                    };
                    scope.move = move;

                    scope.$watch('numPages()', function () {
                        (r.current > s.numPages) ? move(s.numPages) : (r.pages = getPages(r.current));
                    });

                    scope.numPages = function () {
                        s.itemsPerPage =  parseInt(scope.itemsPerPage) || 10;
                        s.totalItems   =  parseInt(scope.totalItems);
                        return s.numPages = Math.ceil(s.totalItems / s.itemsPerPage);
                    };

                    function move (dest) {
                        if (r.current !== dest && 1 <= dest && dest <= s.numPages) {
                            r.pages = getPages(r.current = dest);
                            s.callback({$page: r.current});
                        }
                    }

                    function getPages(current) {
                        /**
                         * [1]  2   3  ... 100
                         *  1  [2]  3  ... 100
                         *  1   2   3  [4]  5   6  ... 100
                         *  1  ...  3   4  [5]  6   7  ... 100
                         *  1  ...  B   C  [D]  E   F  ... 100
                         */
                        var pages = [],
                            neighbourLeft = Math.max(1, current - s.neighbourLength),
                            neighbourRight = Math.min(s.numPages, current + s.neighbourLength),
                            dest;
                        if (1 < neighbourLeft) {
                            // 最左
                            pages.push(1);
                            // 左跳
                            (dest = Math.max(2, current - s.jumpLength)) < neighbourLeft && pages.push({num: dest, text: '...'});
                        }
                        // 左邻右舍
                        Array.prototype.push.apply(pages, range(neighbourLeft, 1 + neighbourRight));
                        if (s.numPages > neighbourRight) {
                            // 右跳
                            (dest = Math.min(s.numPages - 1, current + s.jumpLength)) > neighbourRight && pages.push({num: dest, text: '...'});
                            // 最右
                            pages.push(s.numPages);
                        }
                        return pages;
                    }

                    function range(start, stop, step) {
                        if (arguments.length <= 1) {
                            stop = start || 0;
                            start = 0;
                        }
                        step = step || 1;
                        var length = Math.max(0, Math.ceil((stop - start) / step))
                        if (!length) {
                            length = 0;
                        }
                        var range = new Array(length);
                        for (var i = 0; i < length; i++, start += step) {
                            range[i] = start;
                        }
                        return range;
                    }
                }
            };
        }
    ]);
