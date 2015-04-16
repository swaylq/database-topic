var express = require('express');
var router = express.Router();
var mongoose = require('../db.js');
var book = require('../models/books.js')(mongoose);
var bookModel = book.model;
var orderModel = require('../models/orders.js')(mongoose);
var userModel = require('../models/user.js')(mongoose);
var path = require('path');
var localStorage = require('localStorage');

router.post('/service/user/login', function (req, res, next) {
    var name = req.body.name;
    var pwd = req.body.pwd;
    userModel.count({name: name, password: pwd}).exec(function (error, number){
        if (number > 0) {
            localStorage.setItem('user', {name: name});
            res.send({msg: '登录成功', db: 'mongodb'});
        } else {
            res.status(400);
            res.send({msg: '用户名或密码错误', db: 'mongodb'});
        }
    });
});

router.get('/service/user/logout', function (req, res, next) {
    localStorage.removeItem('user');
    res.send({msg: '登出成功', db: 'mongodb'});
});

router.get('/create/example', function (req, res, next) {
    var book = new bookModel({
        name: 'Harry Potter',
        author: 'JK',
        cover: null,
        intro: 'hello!',
        price: 100,
        stock: 3
    });
    book.save();
    var user = new userModel({
        name: 'xsf',
        password: '123456'
    })
    user.save();
    res.send('ok');
});

router.get('/service/book/detail/:id', function (req, res, next) {
    bookModel.findById(req.params.id).exec(function (err, book){
        res.send(book);
    });
});

router.get('/service/book/list/:page', function (req, res, next) {
    var page = req.params.page ? req.params.page : 1;
    var filter = {page: page};
    var json = {
        filter: filter,
        db: 'mongodb',
        result: {
            count: 0,
            books: []
        }
    };
    bookModel.count(function (err, total){
        json.result.count = total;
        bookModel.find().skip((page - 1) * 10).limit(10).exec(function (err, books){
            json.result.books = books;
            res.send(json);
        });
    });
});

router.get('/service/order/all/:page', function (req, res, next) {
    var page = req.params.page ? req.params.page : 1;
    var filter = {page: page};
    var json = {
        filter: filter,
        db: 'mongodb',
        result: {
            count: 0,
            order: []
        }
    };
    orderModel.count(function (err, total){
        json.result.count = total;
        orderModel.find().skip((page - 1) * 10).limit(10).exec(function (err, orders){
            json.result.orders = orders;
            res.send(json);
        });
    });
});

router.post('/service/order/create', function (req, res, next){
    var currentDate = new Date();
    var totalPrice = 0;
    req.body.books.forEach(function (book){
        totalPrice += book.price * book.number;
    });
    var order = new orderModel({
        consignee_name: req.body.consignee_name,
        consignee_address: req.body.consignee_address,
        price: totalPrice,
        created_at: currentDate,
        books: req.body.books
    });
    res.send(order.save());
    res.send({'msg': '下单成功', 'db': 'mongodb'});
});


router.get('/', function(req, res, next) {
    if (localStorage.getItem('user') == null) {
        res.redirect('/login');
    };
    res.sendFile(path.join(__dirname + '/views/home.html'));
});

router.get('/login', function (req, res, next){
    res.sendFile(path.join(__dirname + '/views/login.html'));
});

router.get('/book/list', function (req, res, next){
    if (localStorage.getItem('user') == null) {
        res.redirect('/login');
    };
    res.sendFile(path.join(__dirname + '/views/book_list.html'));
});

router.get('/order/list', function (req, res, next){
    if (localStorage.getItem('user') == null) {
        res.redirect('/login');
    };
    res.sendFile(path.join(__dirname + '/views/order_list.html'));
});

module.exports = router;
