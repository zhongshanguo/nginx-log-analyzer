const urlUtil = require('./url.util');
const tokenUtil = require('./token.util');
var nalParser = require('clf-parser');
var geoUtil = require('../util/geo.util');

//
// function getMd5(log) {
//     let md5 = require('crypto').createHash('md5');
//     let ret = md5.update(log.http_referer).digest('hex');
//     console.log('md5', ret);
//     return ret;
// }

const EntityUtil = {
    // transform: (nginxAccessLog) => {
    //     let log = nalParser(nginxAccessLog);
    //     log.location = geoUtil.getGeo(log.remote_addr);
    //     let doc = {
    //         ip: "",
    //         location: "",
    //         status: 0,
    //         method: "",
    //         path: "",
    //         referer: "",
    //         agent: "",
    //         token: "",
    //         user_id: "",
    //         oid: "",
    //         role: 0,
    //         vip: "",
    //         rno: "",
    //         resource_id: "",
    //         filename: "",
    //         mp4: false,
    //         mp3: false,
    //         pdf: false,
    //         doc: false,
    //         ppt: false,
    //         xls: false,
    //         other: false,
    //         play: false
    //     };
    //     doc.ip = log.remote_addr || '-';
    //     doc.location = log.location;
    //     doc.status = log.status;
    //     doc.method = log.method;
    //     doc.path = log.path;
    //     doc.referer = log.http_referer ? ({
    //         source: log.http_referer,
    //         md5: getMd5(log),
    //         time: new Date().getTime()
    //     }) : null;
    //     doc.agent = log.http_user_agent;
    //     //todo
    //     doc.browser = "";
    //     doc.token = log.remote_user;
    //     let user = tokenUtil.parse(log.remote_user);
    //     doc.user_id = user["sub"] || '-';
    //     doc.oid = user["oid"];
    //     doc.role = user["role"];
    //     //todo vip_card_no
    //     doc.vip = "";
    //     doc.rno = urlUtil.getRno(log);
    //     doc.resource_id = urlUtil.getResourceId(log);
    //     doc.filename = urlUtil.getFileName(log);
    //     let ext = urlUtil.getFileType(log);
    //     doc.mp4 = ext == "mp4";
    //     doc.mp3 = ext == "mp3";
    //     doc.pdf = ext == "pdf";
    //     doc.doc = ext == "doc";
    //     doc.ppt = ext == "ppt";
    //     doc.xls = ext == "xls";
    //     doc.other = ext == "other";
    //     doc.play = urlUtil.isTick(log);
    //     return doc;
    // },
    transform2: (nginxAccessLog) => {
        let log = nalParser(nginxAccessLog);
        log.location = geoUtil.getGeo(log.remote_addr);
        if (log.remote_addr) doc.ip = log.remote_addr;
        if (log.location) doc.location = log.location;
        if (log.status) doc.status = log.status;
        if (log.method) doc.method = log.method;
        if (log.path) doc.path = log.path;
        if (log.http_referer) doc.referer = log.http_referer;
        if (log.http_user_agent) doc.agent = log.http_user_agent;
        if (log.remote_user) doc.token = log.remote_user;
        let user = tokenUtil.parse(log.remote_user);
        if (user["sub"]) {
            doc.user_id = user["sub"]
        } else {
            doc.user_id = "-";
        }
        if (user["oid"]) doc.oid = user["oid"];
        if (user["role"]) doc.role = user["role"];
        let rno = urlUtil.getRno(log);
        if (rno) doc.rno = rno;
        let rid = urlUtil.getResourceId(log);
        if (rid) doc.resource_id = rid;
        let filename = urlUtil.getFileName(log);
        if (filename) doc.filename = filename;
        let ext = urlUtil.getFileType(log);
        if (ext == "mp4") doc.mp4 = ext;
        if (ext == "mp3") doc.mp3 = ext;
        if (ext == "pdf") doc.pdf = ext;
        if (ext == "doc") doc.doc = ext;
        if (ext == "ppt") doc.ppt = ext;
        if (ext == "xls") doc.xls = ext;
        if (ext == "other") doc.other = ext;
        let play = urlUtil.isTick(log);
        if (play) doc.play = play;
        doc.time = new Date();
        return doc;
    }
};
module.exports = EntityUtil;
