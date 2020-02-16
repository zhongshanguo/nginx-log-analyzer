const entityUtil = require('../util/entity.util');

let data = {
    ipData: {},
    userData: {},
    organData: {}

};

function setIpCount(ip) {

    if (!ip) {
        ip = "-";
    }
    if (data.ipData[ip]) {
        var v = data.ipData[ip];
        v++;
        data.ipData[ip] = v;
    }
    else {
        data.ipData[ip] = 1;
    }
}

function setUserCount(user) {
    if (!user) {
        user = '-';
    }
    if (data.userData[user]) {
        var v = data.userData[user];
        v++;
        data.userData[user] = v;
    }
    else {
        data.userData[user] = 1;
    }
}

function setOrgancount(oid) {
    if (!oid) {
        oid = '-';
    }
    if (data.organData[oid]) {
        var v = data.organData[oid];
        v++;
        data.organData[oid] = v;
    }
    else {
        data.organData[oid] = 1;
    }
}

const DataService = {
    push: (host, nginxAccessLog) => {
        var doc = entityUtil.transform(nginxAccessLog);
        setIpCount(doc.ip);
        setUserCount(doc.user_id);
        setOrgancount(doc.oid);

        let ipSegment = {};
        if (data[doc.ip]) {
            ipSegment = data[doc.ip];
        }
        else {
            ipSegment = {};
            ipSegment.location = doc.location;
            data[doc.ip] = ipSegment;
        }

        let userSegment = ipSegment[doc.user_id];
        if (!userSegment) {
            userSegment = {};
            ipSegment[doc.user_id] = userSegment;
        }

        userSegment.oid = doc.oid;
        userSegment.role = Math.max(userSegment.role, doc.role);
        let playTime = 0;
        if (userSegment.play) {
            playTime++;
        }
        userSegment.play = playTime;


        if (doc.rno) {
            if (!userSegment.courses) {
                userSegment["courses"] = {};
            }
            userSegment["courses"][doc.rno] = new Date().getTime();
        }

        if (doc.mp4) {
            if (!userSegment.mp4) {
                userSegment["mp4"] = {};
            }
            userSegment["mp4"][doc.filename] = new Date().getTime();
        }

        if (doc.mp3) {
            if (!userSegment.mp3) {
                userSegment["mp3"] = {};
            }
            userSegment["mp3"][doc.filename] = new Date().getTime();
        }

        if (doc.pdf) {
            if (!userSegment.pdf) {
                userSegment["pdf"] = {};
            }
            userSegment["pdf"][doc.filename] = new Date().getTime();
        }
        if (doc.doc) {
            if (!userSegment.doc) {
                userSegment["doc"] = {};
            }
            userSegment["doc"][doc.filename] = new Date().getTime();
        }
        if (doc.ppt) {
            if (!userSegment.ppt) {
                userSegment["ppt"] = {};
            }
            userSegment["ppt"][doc.filename] = new Date().getTime();
        }
        if (doc.xls) {
            if (!userSegment.xls) {
                userSegment["xls"] = {};
            }
            userSegment["xls"][doc.filename] = new Date().getTime();
        }
        if (doc.other) {
            if (!userSegment.other) {
                userSegment["other"] = {};
            }
            userSegment["other"][doc.filename] = new Date().getTime();
        }
        if (doc.referer && doc.referer.md5) {
            if (!userSegment.referer) {
                userSegment["referer"] = {};
            }
            if (!userSegment.referer[doc.referer.md5]) {
                userSegment.referer[doc.referer.md5] = {};
            }
            userSegment.referer[doc.referer.md5] = {source: doc.referer.source, time: doc.referer.time};
        }

    },
    get: () => {
        return data;
    },
    set: (values) => {
        data = values;
    }
};
module.exports = DataService;
