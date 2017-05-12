var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var User = mongoose.model('Users', {
	username: String,
	forename: String,
	surname: String,
	email: String,
	password: String,
	updated: { type: Date, default: Date.now }
	});

module.exports = User;