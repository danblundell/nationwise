var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/sandbox_db');

var User = mongoose.model('Users', {
	forename: String,
	surname: { type: String},
	age: {type: Number, min: 1, max: 100},
	email: String,
	updated: { type: Date, default: Date.now }
	});

var user = new User ({
	forename: 'George',
	surname: 'Foreman',
	age: 99,
	Email: 'George.Foreman@cambridgeshire.gov.uk'
});

user.save().then(
	function(r){
		console.log(r);
	},
	function(err) {
		console.log(err);
	}
);