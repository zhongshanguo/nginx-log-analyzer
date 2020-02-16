const entityUtil = require('../util/entity.util');

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
        let doc = entityUtil.transform2(nginxAccessLog);
        console.log(doc);
        db.push(doc);
        console.log(db.length);
    },
    get: () => {
        return db;
    },
    set: (data) => {
        db = data;
    },
    getByIp: () => {
        let s = new Set();
        db.forEach(d => s.add(d.ip));
        let ips = [];

        for (let i of s) {
            let userSet = new Set();
            let lines = db.filter(d => d.ip === i);
            lines.forEach(d => userSet.add(d.user_id));

            let users = [];
            for (let u of userSet) {
                let x = db.filter(d => d.ip == i && d.user_id == u);
                users.push({user_id: u, list: x});
            }
            ips.push({ip: i, count: lines.count, users: users});
        }

        return ips;
    }
};
module.exports = DataService;
