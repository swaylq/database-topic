angular.module('database')
    .service('Cart', function (){
        'use strict';
        var service = {};
        service.goods = [];
        service.len = 0;
        service.total = 0;

        service.calculate = function () {
            service.len = service.goods.length;
            service.total = 0;
            service.goods.forEach(function (e){
                // 保留两位小数
                e.totalPrice = Math.round(e.price * e.count * 100) / 100;
                service.total += e.price * e.count;
            });
            // 保留两位小数
            service.total = Math.round(service.total * 100) / 100;
        };

        service.firstPull = function () {
            if (g_cart.goods) {
                service.goods = g_cart.goods;
                service.calculate();
            }
        };
        
        return service;
    });