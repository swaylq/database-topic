angular.module('axws')
    .filter('to_trusted', ['$sce', function ($sce) {
        'use strict';
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    }]);
angular.module('axws')
    .service('http', [
        '$http', 'Dialog',
        function ($http, Dialog) {
            var http = {};
            http.post = post;
            http.get = get;
            return http;
            function get(url, getData, success, error) {
                $http.get(url, getData)
                    .success(function (data) {
                        callAction(data, success, '访问成功');
                    })
                    .error(function (data) {
                        callAction(data, error, '服务器无法连接');
                    });
            }

            function post(url, postData, success, error) {
                console.log('post url ', url, ' with ', postData);
                $http.post(url, postData)
                    .success(function (data) {
                        callAction(data, success, '访问成功');
                    })
                    .error(function (data) {
                        callAction(data, error, '服务器无法连接');
                    });
            }

            function callAction(data, action, defaultMsg) {
                console.log('response data is ', data);
                if (action === null) {
                    return;
                }
                switch (typeof action) {
                    case 'string':
                    case 'undefined':
                        Dialog.alert({
                            msg: data.msg || action || defaultMsg,
                            status: 'info'
                        });
                        break;
                    case 'object':
                        Dialog.alert(action);
                        break;
                    case 'function':
                        action(data);
                        break;
                }
            }
        }
    ]);



angular.module('axws')
    .service('WebkitNotifyService', [
        function () {
            'use strict';
            return {init: init, notify: notify};

            function init(callBack) {
                if (!('Notification' in window)) {
                    console.log('Webkit notification not supported.')
                } else if (Notification.permission === 'granted') {
                    callBack && callBack();
                } else if (Notification.permission !== 'denied') {
                    console.log('Webkit notification requring permission.');
                    Notification.requestPermission(function (permission) {
                        if (permission === 'granted') {
                            console.log('Webkit notification permission confirmed.');
                            callBack && callBack();
                        } else {
                            console.log('Webkit notification permission refused.');
                        }
                    });
                }
            }

            function notify(title, body, icon) {
                if (window.localStorage.getItem('notify-enabled') == 0) { return; }
                init(function () {
                    _notify(title, body, icon);
                });
            }

            function _notify(title, body, icon) {
                return new Notification(title, {
                    icon: icon || '/images/notify.png',
                    body: body
                });
            }
        }
    ]);
