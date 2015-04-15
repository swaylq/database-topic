module.exports = function (mongoose) {
    var orderSchema = new mongoose.Schema({
        consignee_name: String,
        consignee_address: String,
        price: Number,
        created_at: Date,
        books: Object
    });

    orderSchema.methods.speak = function () {
        console.log(this);
    };

    orderModel = mongoose.model('order', orderSchema);
    return orderModel;
}
