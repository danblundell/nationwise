var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');

var routes = require('./routes.js');
var app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet()); // security stuffs
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use((req,res,next) => {
	var log = {
		body: req.body,
		params: req.params,
		queryStr: req.query
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