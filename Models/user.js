var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var User = mongoose.model('Users', {
	username: String,
	password: String,
	updated: { type: Date, default: Date.now }
	});

module.exports = User;