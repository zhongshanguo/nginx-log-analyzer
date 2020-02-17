var express = require('express');
var router = express.Router();
const dataServer = require('../service/data.service');
const formatUtil = require('../util/format.util');
const geoService = require('../util/geo.service');

/* GET home page. */
router.post('/', function (req, res, next) {
    let body = req.body;
    dataServer.pushDB(req.ip, body.log);
    res.json({});
});

// 按ip排
router.get('/', async function (req, res, next) {
    let data = await dataServer.getByIp();
    data.sort((a, b) => b.count - a.count);
    res.render('index', {data: data});
});

router.get('/ip/:ip', async (req, res, next) => {
    let ip = req.params.ip;
    let data = await dataServer.getFilterIp(ip);
    let location = await geoService.getGeo(ip);
    res.render('ip', {
        data: {
            ip: ip,
            count: data.ipContent.count,
            users: data.ipContent.users,
            events: data.ipData,
            location: location
        }
    });

});

router.get('/data', function (req, res, next) {
    let data = dataServer.get();
    res.json(data);
});

module.exports = router;
