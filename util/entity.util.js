const urlUtil = require('./url.util');
const tokenUtil = require('./token.util');
var nalParser = require('clf-parser');
var geoUtil = require('../util/geo.util');


function getMd5(log) {
    let md5 = require('crypto').createHash('md5');
    let ret = md5.update(log.http_referer).digest('hex');
    console.log('md5', ret);
    return ret;
}

const EntityUtil = {
    transform: (nginxAccessLog) => {
        let log = nalParser(nginxAccessLog);
        log.location = geoUtil.getGeo(log.remote_addr);
        let doc = {
            ip: "",
            location: "",
            status: 0,
            method: "",
            path: "",
            referer: "",
            agent: "",
            token: "",
            user_id: "",
            oid: "",
            role: 0,
            vip: "",
            rno: "",
            resource_id: "",
            filename: "",
            mp4: false,
            mp3: false,
            pdf: false,
            doc: false,
            ppt: false,
            xls: false,
            other: false,
            play: false
        };
        doc.ip = log.remote_addr || '-';
        doc.location = log.location;
        doc.status = log.status;
        doc.method = log.method;
        doc.path = log.path;
        doc.referer = log.http_referer ? ({
            source: log.http_referer,
            md5: getMd5(log),
            time: new Date().getTime()
        }) : null;
        doc.agent = log.http_user_agent;
        //todo
        doc.browser = "";
        doc.token = log.remote_user;
        let user = tokenUtil.parse(log.remote_user);
        doc.user_id = user["sub"] || '-';
        doc.oid = user["oid"];
        doc.role = user["role"];
        //todo vip_card_no
        doc.vip = "";
        doc.rno = urlUtil.getRno(log);
        doc.resource_id = urlUtil.getResourceId(log);
        doc.filename = urlUtil.getFileName(log);
        let ext = urlUtil.getFileType(log);
        doc.mp4 = ext == "mp4";
        doc.mp3 = ext == "mp3";
        doc.pdf = ext == "pdf";
        doc.doc = ext == "doc";
        doc.ppt = ext == "ppt";
        doc.xls = ext == "xls";
        doc.other = ext == "other";
        doc.play = urlUtil.isTick(log);
        return doc;
    }
};
module.exports = EntityUtil;
