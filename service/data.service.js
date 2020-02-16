const entityUtil = require('../util/entity.util');
const filterUtil = require('../util/filter.util');

// let DATA = {
//     ipData: {},
//     userData: {},
//     organData: {},
//     origin: {}
// };

let db = [];

// function setIpCount(ip) {
//
//     if (!ip) {
//         ip = "-";
//     }
//     if (DATA.ipData[ip]) {
//         var v = DATA.ipData[ip];
//         v++;
//         DATA.ipData[ip] = v;
//     }
//     else {
//         DATA.ipData[ip] = 1;
//     }
// }
//
// function setUserCount(user) {
//     if (!user) {
//         user = '-';
//     }
//     if (DATA.userData[user]) {
//         var v = DATA.userData[user];
//         v++;
//         DATA.userData[user] = v;
//     }
//     else {
//         DATA.userData[user] = 1;
//     }
// }
//
// function setOrgancount(oid) {
//     if (!oid) {
//         oid = '-';
//     }
//     if (DATA.organData[oid]) {
//         var v = DATA.organData[oid];
//         v++;
//         DATA.organData[oid] = v;
//     }
//     else {
//         DATA.organData[oid] = 1;
//     }
// }

const DataService = {
    // push: (host, nginxAccessLog) => {
    //     var doc = entityUtil.transform(nginxAccessLog);
    //     setIpCount(doc.ip);
    //     setUserCount(doc.user_id);
    //     setOrgancount(doc.oid);
    //     let ipSegment = {};
    //     if (DATA.origin[doc.ip]) {
    //         ipSegment = DATA.origin[doc.ip];
    //     }
    //     else {
    //         ipSegment = {};
    //         ipSegment.location = doc.location;
    //         DATA.origin[doc.ip] = ipSegment;
    //     }
    //
    //     let userSegment = ipSegment[doc.user_id];
    //     if (!userSegment) {
    //         userSegment = {};
    //         ipSegment[doc.user_id] = userSegment;
    //     }
    //
    //     userSegment.oid = doc.oid;
    //     userSegment.role = Math.max(userSegment.role, doc.role);
    //     let playTime = 0;
    //     if (userSegment.play) {
    //         playTime++;
    //     }
    //     userSegment.play = playTime;
    //     if (doc.rno) {
    //         if (!userSegment.courses) {
    //             userSegment["courses"] = {};
    //         }
    //         userSegment["courses"][doc.rno] = new Date().getTime();
    //     }
    //
    //     if (doc.mp4) {
    //         if (!userSegment.mp4) {
    //             userSegment["mp4"] = {};
    //         }
    //         userSegment["mp4"][doc.filename] = new Date().getTime();
    //     }
    //
    //     if (doc.mp3) {
    //         if (!userSegment.mp3) {
    //             userSegment["mp3"] = {};
    //         }
    //         userSegment["mp3"][doc.filename] = new Date().getTime();
    //     }
    //
    //     if (doc.pdf) {
    //         if (!userSegment.pdf) {
    //             userSegment["pdf"] = {};
    //         }
    //         userSegment["pdf"][doc.filename] = new Date().getTime();
    //     }
    //     if (doc.doc) {
    //         if (!userSegment.doc) {
    //             userSegment["doc"] = {};
    //         }
    //         userSegment["doc"][doc.filename] = new Date().getTime();
    //     }
    //     if (doc.ppt) {
    //         if (!userSegment.ppt) {
    //             userSegment["ppt"] = {};
    //         }
    //         userSegment["ppt"][doc.filename] = new Date().getTime();
    //     }
    //     if (doc.xls) {
    //         if (!userSegment.xls) {
    //             userSegment["xls"] = {};
    //         }
    //         userSegment["xls"][doc.filename] = new Date().getTime();
    //     }
    //     if (doc.other) {
    //         if (!userSegment.other) {
    //             userSegment["other"] = {};
    //         }
    //         userSegment["other"][doc.filename] = new Date().getTime();
    //     }
    //     if (doc.referer && doc.referer.md5) {
    //         if (!userSegment.referer) {
    //             userSegment["referer"] = {};
    //         }
    //         if (!userSegment.referer[doc.referer.md5]) {
    //             userSegment.referer[doc.referer.md5] = {};
    //         }
    //         userSegment.referer[doc.referer.md5] = {source: doc.referer.source, time: doc.referer.time};
    //     }
    //     if (doc.resource_id) {
    //         if (!userSegment.resources) {
    //             userSegment["resources"] = {};
    //         }
    //         userSegment["resources"][doc.resource_id] = new Date().getTime();
    //     }
    //
    // },
    // get: () => {
    //     return DATA;
    // },
    // set: (values) => {
    //     DATA = values;
    // },
    pushDB: (host, nginxAccessLog) => {
        // console.log('start transform');
        let doc = entityUtil.transform2(nginxAccessLog);
        if (filterUtil.pathFilter(doc)) {
            db.push(doc);
            console.log(db.length);
        }
    },
    get: () => {
        return db;
    },
    set: (data) => {
        db = data;
    },
    getByIp: () => {
        // 最终返回的数据
        let ips = [];

        // 所有ip的集合
        let s = new Set();
        db.forEach(d => s.add(d.ip));
        // 收集每个ip的数据
        for (let i of s) {

            // 这个ip下的所有用户数据
            let users = [];

            // 有多少个user_id
            let userSet = new Set();
            db.filter(d => d.ip === i).forEach(d => userSet.add(d.user_id));

            let count = 0;
            // 收集每个user_id数据
            for (let u of userSet) {
                let user = {};
                // 每个 userId有多少条数据
                let events = db.filter(d => d.ip == i && d.user_id == u);
                events.sort((a, b) => b.time - a.time);
                user.user_id = events[0].user_id;
                user.oid = events[0].oid;
                user.role = events[0].role;
                user.play = 0;
                user.count = events.length;
                events.forEach(v => user.play + (v.play ? v.play : 0));
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
                count += events.length;
                users.push(user);
            }

            ips.push({ip: i, count: count, users: users});
        }

        return ips;
    }
};
module.exports = DataService;
