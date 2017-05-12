var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
mongoose.Promise = global.Promise;

var User = new Schema({
	username: String,
	forename: String,
	surname: String,
	email: String,
	password: String,
	updated: { type: Date, default: Date.now }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);