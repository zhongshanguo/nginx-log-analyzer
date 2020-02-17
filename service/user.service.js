const fetch = require('node-fetch');
const cacheService = require('../util/cache.service');

const GDService = {
    getOid: async (ip) => {
        let url = `http://passport.guodao.cn:57001/api/ip?ip=${ip}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data && data.count) {
            let oid = data.items[0].oid;
            if (!oid) {
                oid = '';
            }
            cacheService.set(`ip-oid-${ip}`, oid);
            return oid;
        }
        return "";

    },
    getUser: async (user_id) => {
        let url = `http://passport.guodao.cn:57001/api/users/${user_id}`;
        const res = await fetch(url);
        const result = await res.json();
        if (result && result.user_id) {
            let user = `${result.nickname},${result.short_name},${result.email},${result.phone}`;
            user = user.replace(/\,null/g, '');
            cacheService.set(`uid-user-${user_id}`, user);
            return user;
        }
        return "";
    },
    getOrgan: async (oid) => {
        let url = `http://passport.guodao.cn:57001/api/organs/${oid}`;
        const res = await fetch(url);
        const result = await res.json();
        if (result && result.oid) {
            let name = result.name;
            cacheService.set(`oid-organ-${oid}`, name);
            return name;
        }
        return '';
    }

};
module.exports = GDService;