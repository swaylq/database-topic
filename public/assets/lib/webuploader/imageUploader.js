angular.module('axws')
    .directive('imageUploader', function () {
        'use strict';
        return {
            restrict: 'EA',
            template: '<div id="image-upload-btn">选择图片</div>',
            replace: true,
            scope: {
                event_name: '@eventName'
            },
            link: function (scope, element) {
                scope.uploading = false;
                scope.uploader = new WebUploader.Uploader({
                    swf: '/assets/lib/webuploader/Uploader.swf',
                    server: '/service/upload/file',
                    pick: element,
                    resize: false,
                    fileSizeLimit: 5*1024*1024,
                    fileSingleSizeLimit: 5*1024*1024,
                    fileNumLimit: 5
                });
                var uploader = scope.uploader;
                uploader.on('beforeFileQueued', function (file) {
                    console.log('inner beforeFileQueued', file);
                    scope.$emit(scope.event_name + 'beforeFileQueued', file);
                });
                uploader.on('error', function (type) {
                    console.log(type);
                    scope.$emit(scope.event_name + 'error', type);
                });
                uploader.on('fileQueued', function (file) {
                    console.log('inner fileQueued', file);
                    uploader.upload();
                });
                uploader.on('uploadStart', function (file) {
                    console.log('inner uploadStart', file);
                    scope.$emit(scope.event_name + 'uploadStart', file);
                });
                uploader.on('uploadProgress', function (file, percentage) {
                    scope.$emit(scope.event_name +
                         'uploadProgress', file, percentage);
                });
                uploader.on('uploadError', function (file, reason) {
                    scope.$emit(scope.event_name + 'uploadError', file, reason);
                });
                uploader.on('uploadSuccess', function (file, response) {
                    var json = jQuery.parseJSON(response._raw);
                    scope.$emit(scope.event_name + 'uploadSuccess', json);
                });
            }
        };
    });
