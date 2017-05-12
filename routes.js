var express = require('express');
var User = require('./Models/user');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nationwise_db');


// respond to GET requests
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign up'});
});

router.get('/signup/confirmation', (req, res) => {
	//Retrieve data from sign up form
	var username = req.query.username;
	var password = req.query.password;

	console.log('Username: ' + username);
	console.log('Password: ' + password);

	//Create user with user model
	var newUser = new User ({
		username: username,
		password: password
	});

	//Save user to DB
	newUser.save().then(
	function(r){
		console.log(r);
		// Redirect user to success page
		res.render('success', { title: 'Success'});
	},
	function(err) {
		console.log(err);
		// Redirect user to failure page
		res.render('failure', { title: 'Failure'});
	});

	console.log('Username: ' + newUser);
});

router.get('/products', (req, res) => {
    res.render('products', { title: 'Products'});
});

module.exports = router; 