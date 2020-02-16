var express = require('express');
var router = express.Router();
const dataServer = require('../service/data.service');
const formatUtil = require('../util/format.util');

/* GET home page. */
router.post('/', function (req, res, next) {
    let body = req.body;
    dataServer.pushDB(req.ip, body.log);
    res.json({});
});

// 按ip排
router.get('/', function (req, res, next) {
    let data = dataServer.getByIp();
    data.sort((a, b) => b.count - a.count);
    res.render('index', {data: data});
});

router.get('/data', function (req, res, next) {
    let data = dataServer.get();
    res.json(data);
});

module.exports = router;
