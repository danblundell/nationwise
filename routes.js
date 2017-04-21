var express = require('express');
var router = express.Router();

// respond to GET requests
router.get('/', function (req, res) {
	res.send("Hello.");

	// if(req.query.name) {
	// 	var name = req.query.name;
	// 	res.send(JSON.stringify({
 //  		method: req.method,
 //  		message: `Hi ${name}, you just sent a ${req.method} request`
 //  	}));
	// } else {
	// 	throw new Error(`${req.method} expects a parameter called name`);
	// }
});


// respond to POST requests
router.post('/', function (req, res) {
	if(req.body.name) {
		var name = req.body.name;
		res.send(JSON.stringify({
  		method: req.method,
  		message: `Hi ${name}, you just sent a ${req.method} request`
  	}));
	} else {
		throw new Error(`${req.method} expects a parameter called name`);
	}
});

module.exports = router;