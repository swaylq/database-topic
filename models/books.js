module.exports = function (mongoose) {
    var bookSchema = new mongoose.Schema({
        name: String,
        author: String,
        cover: String,
        intro: String,
        price: Number,
        stock: Number
    });

    bookSchema.methods.speak = function () {
        console.log(this);
    };

    bookModel = mongoose.model('book', bookSchema);
    return bookModel;
}
