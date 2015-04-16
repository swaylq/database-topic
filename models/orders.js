module.exports = function (mongoose) {
    var bookSchema = mongoose.Schema({
        name: String,
        author: String,
        cover: String,
        intro: String,
        price: Number,
        stock: Number,
        number: Number
    });

    var orderSchema = new mongoose.Schema({
        consignee_name: String,
        consignee_address: String,
        price: Number,
        created_at: Date,
        books: [bookSchema]
    });

    orderSchema.methods.speak = function () {
        console.log(this);
    };

    orderModel = mongoose.model('order', orderSchema);
    return orderModel;
}
