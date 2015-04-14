module.exports = function (mongoose) {
    var orderBookSchema = new mongoose.Schema({
        order_id: String,
        book_id: String,
        number: Number
    });

    orderBookSchema.methods.speak = function () {
        console.log(this);
    };

    orderBookModel = mongoose.model('orderBook', orderBookSchema);
    return orderBookModel;
}
