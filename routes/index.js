var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
    let body = req.body;
    console.log(body);
    res.json({});
});

module.exports = router;
