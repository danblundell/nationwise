var express = require('express');
var User = require('./models/user');
var router = express.Router();
var mongoose = require('mongoose');
var Account = require('./models/account');
var ObjectId = mongoose.Schema.Types.ObjectId;

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

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', scope: ['https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read']}), function(req, res) {
    res.redirect('/profile');
});

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
// /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/profile', failureRedirect: '/login' }));

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
	//get logged in user id
	User.findOne({'username':req.user.username},function(err, user) {
		if (err) return handleError(err);
		//look in account for that users account
		Account.findOne({'userid': user._id},function(err, account) {
		if (err) return handleError(err);

		//get back the account object
		//pass it to the template
	    res.render('profile', { title: 'Profile', user: req.user, account:account});
		});
	});
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