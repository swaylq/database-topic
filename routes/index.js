var express = require('express');
var crypto = require('crypto')
var router = express.Router();
var mongoose = require('../db.js');
var bookModel = require('../models/books.js')(mongoose);
var orderModel = require('../models/orders.js')(mongoose);
var userModel = require('../models/user.js')(mongoose);
var path = require('path');

router.post('/service/user/login', function (req, res, next) {
    var name = req.params.name;
    var pwd = crypto.createHmac('sha1', req.params.pwd);
    userModel.find({name: name, password: pwd});
});

router.get('/service/book/create/example', function (req, res, next) {
    var book = new bookModel({
        name: 'Harry Potter',
        author: 'JK',
        cover: null,
        intro: 'hello!',
        price: 100,
        stock: 3
    });
    book.save();
    res.send({book: book});
});

router.get('/service/book/detail/:id', function (req, res, next) {
    bookModel.findById(req.params.id).exec(function (err, book){
        res.send(book);
    });
});

router.get('/service/book/list', function (req, res, next) {
    var page = req.params.page ? req.params.page : 1;
    var filter = {page: page, filter: filter};
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

router.post('/service/order/create', function (req, res, next){
    var currentDate = new Date();
    var totalPrice = 0;
    req.params.books.forEach(function (book){
        totalPrice += book.price * book.number;
    });
    var order = new orderModel({
        consignee_name: req.params.consignee_name,
        consignee_address: req.params.consignee_address,
        price: totalPrice,
        created_at: currentDate,
        books: req.params.books
    });
    order.save();
    res.send({'msg': '下单成功'});
});


router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/views/home.html'));
});

router.get('/login', function (req, res, next){
    res.sendFile(path.join(__dirname + '/views/login.html'));
});

router.get('/book/list', function (req, res, next){
    res.sendFile(path.join(__dirname + '/views/book_list.html'));
});

router.get('/order/list', function (req, res, next){
    res.sendFile(path.join(__dirname + '/views/order_list.html'));
});

module.exports = router;
