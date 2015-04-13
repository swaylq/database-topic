var mongoose = require('../db.js');

var bookSchema = mongoose.Schema({
    'name': String,
    'author': String,
    'cover': String,
    'intro': String,
    'price': Number,
    'stock': Number
});

bookSchema.methods.speak = function () {
  console.log(this);
};

module.export = bookSchema;
