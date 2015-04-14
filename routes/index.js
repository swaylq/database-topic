var express = require('express');
var router = express.Router();
var mongoose = require('../db.js');
var bookModel = require('../models/books.js')(mongoose);

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

router.get('/', function(req, res, next) {
    res.send('hello');
});

module.exports = router;
