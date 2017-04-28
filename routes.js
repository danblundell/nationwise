var express = require('express');
var router = express.Router();

// respond to GET requests
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router; 