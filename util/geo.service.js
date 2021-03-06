const fetch = require('../util/http.fetch');
const cacheService = require('../util/cache.service');

const GeoService = {
    getGeo: (ip) => {
        let c = cacheService.get(`ip-loc-${ip}`);
        if (c) {
            return Promise.resolve(c);
        }
        try {
            let url = `http://ip.taobao.com/service/getIpInfo2.php?ip=${ip}`;
            return fetch.get({url})
                .then((data) => {
                    if (data && !data.code) {
                        let geo = `${data.data.country}${data.data.region}${data.data.city} (${data.data.isp})`;
                        cacheService.set(`ip-loc-${ip}`, geo);
                        return Promise.resolve(geo);
                    }
                })
                .catch((err) => {
                    return Promise.reject(err);
                });
        }
        catch (e) {
            return Promise.reject(e);
        }
    },
    getHostLink: (host) => {
        if (host == '::ffff:192.168.1.34') {
            return "http://www.metel.cn";
        }
        if (host == '::ffff:192.168.1.180') {
            return 'http://files.metel.cn';
        }
        return "";
    }
};
module.exports = GeoService;