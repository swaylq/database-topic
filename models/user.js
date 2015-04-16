module.exports = function (mongoose) {
    var userSchema = new mongoose.Schema({
        name: String,
        password: String,
        secrets: String,
        avatar: String
    });

    userSchema.methods.speak = function () {
        console.log(this);
    };

    userModel = mongoose.model('user', userSchema);
    return userModel;
}
