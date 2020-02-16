var express = require('express');
var router = express.Router();
const dataServer = require('../service/data.service');
const fetch = require('../util/http.fetch');

router.get('/pull/data', function (req, res, next) {
    fetch.get({url: `http://221.122.57.34:39999/data`, data: null, traceId: 'tid'})
        .then((data) => {
            dataServer.set(data);
            res.json({message: 'ok'});
        })
        .catch((err) => {
            res.status(500);
            res.json(err);
        });
});

module.exports = router;
