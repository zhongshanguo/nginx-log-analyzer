var express = require('express');
var router = express.Router();
const dataServer = require('../service/data.service');
const formatUtil = require('../util/format.util');

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
        let usersObj = data.origin[p];
        let location = '';
        let users = [];
        Object.keys(usersObj).forEach(k => {
            if (k == 'location' && usersObj[k] && !location) {
                location = usersObj[k];
            }
            else {
                // k == user_id
                let u = formatUtil.formatUser(usersObj[k]);
                u.user_id = k;
                users.push(u);
            }
        });
        ips.push({ip: p, location: location, count: data.ipData[p], users: users});
    }
    ips.sort((a, b) => b.count - a.count);

    res.render('index', {data: ips});
});

router.get('/data', function (req, res, next) {
    let data = dataServer.get();
    res.json(data);
});

module.exports = router;
