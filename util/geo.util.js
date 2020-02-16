const geoip = require('geoip-lite');

const GeoUtil = {
    getGeo: (ip) => {
        let geo = geoip.lookup(ip);
        if (!geo) {
            return "";
        }
        let location = geo.country;
        if (geo.region) {
            location += '.' + geo.region;
        }
        if (geo.city) {
            location += ", " + geo.city;
        }
        return location;
    }
};
module.exports = GeoUtil;
