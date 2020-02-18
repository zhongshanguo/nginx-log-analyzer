const entityUtil = require('../util/entity.util');
const filterUtil = require('../util/filter.util');
const cacheService = require('../util/cache.service');
const userService = require('../service/user.service');
const locationService = require('../service/location.service');

let db = [];

async function getIPUser(i, u) {
    let user = {};
    // 每个 userId有多少条数据
    let events = db.filter(d => d.ip == i && d.user_id == u);
    events.sort((a, b) => b.time - a.time);
    user.user_id = events[0].user_id;
    user.oid = events[0].oid;
    user.role = events[0].role;
    user.play = 0;
    user.count = events.length;
    user.courses = [];
    let cSet = new Set();
    events.filter(v => v.rno)
        .forEach(v => {
            if (!cSet.has(v.rno)) {
                cSet.add(v.rno);
                user.courses.push({rno: v.rno, time: v.time});
            }
        });
    user.filenames = [];
    cSet = new Set();
    events.filter(v => v.filename)
        .forEach(v => {
            if (!cSet.has(v.filename)) {
                cSet.add(v.filename);
                user.filenames.push({
                    filename: v.filename,
                    time: v.time,
                    mp4: v.mp4,
                    mp3: v.mp3,
                    pdf: v.pdf,
                    doc: v.doc,
                    ppt: v.ppt,
                    xls: v.xls,
                    other: v.other
                });
            }
        });
    user.resources = [];
    cSet = new Set();
    events.filter(v => v.resource_id)
        .forEach(v => {
            if (!cSet.has(v.resource_id)) {
                cSet.add(v.resource_id);
                user.resources.push({resource_id: v.resource_id, time: v.time});
            }
        });
    user.play = events.filter(v => v.play).length;
    user.mp4 = user.filenames.filter(f => f.mp4).length;
    user.mp3 = user.filenames.filter(f => f.mp3).length;
    user.pdf = user.filenames.filter(f => f.pdf).length;
    if (user.user_id && user.user_id != '-' && user.role && user.role > 2) {
        user.name = cacheService.get(`uid-user-${user.user_id}`);
        if (!user.name) {
            user.name = await userService.getUser(user.user_id);
        }
    }
    return user;
}

async function getIp(i) {
    // 这个ip下的所有用户数据
    let users = [];

    // 有多少个user_id
    let userSet = new Set();
    db.filter(d => d.ip === i).forEach(d => userSet.add(d.user_id));

    let count = 0;
    // 收集每个user_id数据
    for (let u of userSet) {
        let user = await getIPUser(i, u);
        count += user.count;
        users.push(user);
    }
    users.sort((a, b) => b.count - a.count);
    // let location = cacheService.get(`ip-loc-${i}`);
    let location = locationService.getLoc(i);
    let oid = cacheService.get(`ip-oid-${i}`);
    let organ = '';
    if (!oid) {
        oid = await userService.getOid(i);
    }
    // let organ = '';
    if (oid) {
        organ = cacheService.get(`oid-organ-${oid}`);
        if (!organ) {
            organ = await userService.getOrgan(oid);
        }
    }
    return {ip: i, location: location, oid: oid, organ: organ, count: count, users: users};
}

const DataService = {
    pushDB: (host, nginxAccessLog) => {
        let doc = entityUtil.transform2(host, nginxAccessLog);
        if (filterUtil.pathFilter(doc)) {
            db.push(doc);
        }
    },
    get: () => {
        return db;
    },
    set: (data) => {
        db = data;
    },
    getByIp: async () => {
        // 最终返回的数据
        let ips = [];
        // 所有ip的集合
        let s = new Set();
        db.forEach(d => s.add(d.ip));
        // 收集每个ip的数据
        for (let i of s) {
            let ipContent = await getIp(i);
            ips.push(ipContent);
        }
        return ips;
    },
    getFilterIp: async (ip) => {
        let ipContent = await getIp(ip);
        let ipData = db.filter(d => d.ip == ip && !d.play);
        ipData.sort((a, b) => b.time - a.time);
        return {ipContent, ipData};
    }
};
module.exports = DataService;
