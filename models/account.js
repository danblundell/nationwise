var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Account = new Schema({
	description: String,
	userid: ObjectId,
	accountnumber: String
});

module.exports = mongoose.model('Account', Account);