const cacheService = require('../util/cache.service');
const geoLite = require('geoip-lite');


const LocationService = {
    getLoc: (ip) => {
        var loc = cacheService.get(`ip-loc-${ip}`);
        if (loc) {
            return loc;
        }
        var oid = cacheService.get(`ip-oid-${ip}`);
        if (oid) {
            let organ = cacheService.get(`oid-organ-${oid}`);
            if (organ) {
                return organ;
            }
        }
        loc = geoLite.lookup(ip);
        if (loc && loc.country) {
            return `${loc.country},${loc.region},${loc.city}`;
        }
        return '';
    }
};
module.exports = LocationService;