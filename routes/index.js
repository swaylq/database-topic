var express = require('express');
var router = express.Router();
var moogoose = require('../db.js');
var bookSchema = require('../models/books.js');
var bookModel = moogoose.model('bookModel', bookSchema);

/* GET home page. */
router.get('/book/create/exmple', function (req, res, next) {
    var book = new bookModel({
        name: 'Harry Potter',
        author: 'JK',
        cover: null,
        intro: 'hello!',
        price: 100,
        stock: 3
    });
    book.save(function (err, book) {
      if (err) return console.error(err);
      book.speak();
    });
    res.send({book: book});
});

router.get('/', function(req, res, next) {
  res.send('hello');
});

module.exports = router;
