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
    let ips = [];
    for (var p in data.ipData) {
        ips.push(p, {count: data.ipData[p], data: data.origin[p]});
    }
    ips.sort((a, b) => b.count - a.count);

    res.render('index', {data: ips});
});

router.get('/data', function (req, res, next) {
    let data = dataServer.get();
    res.json(data);
});

module.exports = router;
