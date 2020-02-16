var express = require('express');
var router = express.Router();
const dataServer = require('../service/data.service');

/* GET home page. */
router.post('/', function (req, res, next) {
    let body = req.body;
    dataServer.push(req.ip, body.log);
    res.json({});
});

router.get('/', function (req, res, next) {
    let data = dataServer.get();
    res.render('index', {data: data});
});

router.get('/data', function (req, res, next) {
    let data = dataServer.get();
    res.json(data);
});

module.exports = router;
