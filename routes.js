var express = require('express');
var User = require('./models/user');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nationwise_db');

var passport = require('passport');


// home page
router.get('/', (req, res) => {
    res.render('index');
});

// show sign up page
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign up'});
});

// sign up and log in simultaniously
router.post('/signup', function(req, res) {
	User.register(new User({ username : req.body.username, forename: req.body.forename, surname: req.body.surname, email: req.body.email}), req.body.password, function(err, user){
		if (err) {
			return res.render('failure', { error : err.message }); //TODO go to signup refresh and repopulate user.
		}
		passport.authenticate('local')(req, res, function(){
			req.session.save(function (err){
				if(err) {
					return next(err);
				}
				res.redirect('/profile');
			});
		});
	});
});

// confirm the sign up (deprecated)
router.get('/signup/confirmation', (req, res) => {
    res.render('success', { title: 'Success'});
});

// show log in page
router.get('/login', (req, res) => {
    res.render('login', { title: 'Log in'});
});

// process log in
router.post('/login', passport.authenticate('local'), function(req, res){
	res.redirect('/profile');
});

// process log out
router.get('/logout', function(req, res){
	req.logout();
  	res.redirect('/');
});


// show profile page (needs refactor to users personalised url)
router.get('/profile', (req, res) => {
    res.render('profile', { title: 'Profile', user: req.user});
});

// route to products page
router.get('/products', (req, res) => {
    res.render('products', { title: 'Products'});
});




// testing about

router.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

module.exports = router; 