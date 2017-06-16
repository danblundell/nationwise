var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
const expressNunjucks = require('express-nunjucks');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var cookieParser = require('cookie-parser');

var jQuery = require('jquery');
//var bootstrap = require('bootstrap');

const PORT = process.env.PORT || 3000;
const GOOGLE_CLIENT_ID = "405896018120-n8mmjoal7d3njearpd629lkd2maurvpm.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "31_6lFXplAVbrrx9AsaIy4e2";
const FACEBOOK_APP_ID = "1528297420585027";
const FACEBOOK_APP_SECRET = "43c854dd5f3d582a3237abfb83bbf7fd";

var routes = require('./routes.js');
var app = express();
const isDev = app.get('env') === 'development';
app.set('views', __dirname + '/views');

const njk = expressNunjucks(app, {
    watch: isDev,
    noCache: isDev,
    autoescape: true,
    throwOnUndefined: isDev 
});

app.use(express.static('public'))
app.use(helmet()); // security stuffs
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use((req,res,next) => {
	var log = {
		body: req.body,
		params: req.params,
		queryStr: req.query,
	};
	
	console.log(JSON.stringify(log, null, 2));
	next();
}); // log specific request objects for clarity when testing

//http://mherman.org/blog/2015/01/31/local-authentication-with-passport-and-express-4/#.WRWQAdrytPY

app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport config
var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));

//    Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        User.findOne({ oauthID: profile.id }, function (err, user) {
         if(err) {
            console.log(err);  // handle errors!
          }
          if (!err && user !== null) {
            done(null, user);
          } else {
            user = new User({
              oauthID: profile.id,
              forename: profile.name.givenName,
              surname: profile.name.familyName,
              username: profile.displayName
            });
            user.save(function(err) {
              if(err) {
                console.log(err);  // handle errors!
              } else {
                console.log("saving user ...");
                done(null, user);
              }
            });
          }
       });
  }
));

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
        User.findOne({ oauthID: profile.id }, function (err, user) {
         if(err) {
            console.log(err);  // handle errors!
          }
          if (!err && user !== null) {
            done(null, user);
          } else {
            user = new User({
              oauthID: profile.id,
              forename: profile.name.givenName,
              surname: profile.name.familyName,
              username: profile.displayName
            });
            user.save(function(err) {
              if(err) {
                console.log(err);  // handle errors!
              } else {
                console.log("saving user ...");
                done(null, user);
              }
            });
          }
       });
  }
));

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// routes (found in routes.js)
if (typeof (routes) !== 'function') {
  console.log(routes.bind)
  console.log('Warning: the use of bind in routes is deprecated.')
  routes.bind(app)
} else {
  app.use('/', routes)
}


app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});