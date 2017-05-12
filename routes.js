var express = require('express');
var User = require('./Models/user');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nationwise_db');

var passport = require('passport');


// respond to GET requests
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign up'});
});

router.get('/signup/confirmation', (req, res) => {
    res.render('success', { title: 'Success'});
});

router.post('/signup', function(req, res) {
	User.register(new User({ username : req.body.username, forename: req.body.forename, surname: req.body.surname, email: req.body.email}), req.body.password, function(err, user){
		if (err) {
			return res.render('failure'); //TODO go to signup refresh and repopulate user.
		}
		passport.authenticate('local')(req, res, function(){
			res.redirect('/signup/confirmation');
		})
	});
});

router.get('/products', (req, res) => {
    res.render('products', { title: 'Products'});
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Log in'});
});

module.exports = router; 