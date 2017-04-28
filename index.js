var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
const expressNunjucks = require('express-nunjucks');

const PORT = process.env.PORT || 3000;

var routes = require('./routes.js');
var app = express();
const isDev = app.get('env') === 'development';
app.set('views', __dirname + '/templates');

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