const urlUtil = require('./url.util');
const tokenUtil = require('./token.util');
var nalParser = require('clf-parser');
var geoService = require('../util/geo.service');


const EntityUtil = {
    transform2: (host, nginxAccessLog) => {
        let doc = {};
        var link = geoService.getHostLink(host);
        doc.host = link;
        let log = nalParser(nginxAccessLog);
        if (log.remote_addr) doc.ip = log.remote_addr;
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
        doc.time = new Date().getTime();
        return doc;
    }
};
module.exports = EntityUtil;
