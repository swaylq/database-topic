var mongoose = require( 'mongoose' );
var db = mongoose.createConnection('localhost','databaseTopic');
db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
    console.log('connected');
});
module.exports = mongoose;
