var express = require('express');
var crypto = require('crypto')
var router = express.Router();
var mongoose = require('../db.js');
var bookModel = require('../models/books.js')(mongoose);
var orderModel = require('../models/orders.js')(mongoose);
var userModel = require('../models/user.js')(mongoose);

router.post('/service/user/login', function (req, res, next) {
    var name = req.params.name;
    var pwd = crypto.createHmac('sha1', req.params.pwd);
    userModel.find({name: name, password: pwd});
});

router.get('/service/book/create/exmple', function (req, res, next) {
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
    bookModel.find().exec(function (err, books){
        res.send(books);
    })
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
    res.send('hello');
});

module.exports = router;
