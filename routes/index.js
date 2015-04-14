var express = require('express');
var router = express.Router();
var mongoose = require('../db.js');
var bookModel = require('../models/books.js')(mongoose);
var orderModel = require('../models/orders.js')(mongoose);
var orderBookModel = require('../models/order_books.js')(mongoose);

router.get('/book/create/exmple', function (req, res, next) {
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

router.get('/book/detail/:id', function (req, res, next) {
    bookModel.findById(req.params.id).exec(function (err, book){
        res.send(book);
    });
});

router.get('/book/list', function (req, res, next) {
    bookModel.find().exec(function (err, books){
        res.send(books);
    })
});

router.post('/order/create', function (req, res, next){
    var currentDate = new Date();
    var totalPrice = 0;
    req.params.books.forEach(function (book){
        totalPrice += book.price * book.number;
    })
    var order = new orderModel({
        consignee_name: req.params.consignee_name,
        consignee_address: req.params.consignee_address,
        price: totalPrice,
        created_at: currentDate
    });
    order.save();
    req.params.books.forEach(function (book){
        var orderBook = new orderBookModel({
            order_id: order._id,
            book_id: book._id,
            number: book.number
        });
        orderBook.save();
    });
    res.send({'msg': '下单成功'});
});

router.get('/', function(req, res, next) {
    res.send('hello');
});

module.exports = router;
