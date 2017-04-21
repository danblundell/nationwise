var express = require('express');
var router = express.Router();

// respond to GET requests
router.get('/', function (req, res) {
	res.send("Hello.");
});

module.exports = router;