const FormatUtil = {
    formatUser: (obj) => {
        var doc = {
            role: 0,
            oid: '',
            courses: [],
            resources: [],
            referer: [],
            pdf: [],
            mp4: [],
            mp3: [],
            doc: [],
            ppt: [],
            xls: [],
            other: [],
            play: 0
        };
        doc.oid = obj.oid ? obj.oid : '';
        doc.role = obj.role ? obj.role : 0;
        if (obj.courses) {
            Object.keys(obj.courses).forEach(k => {
                doc.courses.push({rno: k, time: obj.courses[k]});
            });
        }
        if (obj.mp4) {
            Object.keys(obj.mp4).forEach(k => {
                doc.mp4.push({filename: k, time: obj.mp4[k]});
            });
        }
        if (obj.mp3) {
            Object.keys(obj.mp3).forEach(k => {
                doc.mp3.push({filename: k, time: obj.mp3[k]});
            });
        }
        if (obj.pdf) {
            Object.keys(obj.pdf).forEach(k => {
                doc.pdf.push({filename: k, time: obj.pdf[k]});
            });
        }
        if (obj.doc) {
            Object.keys(obj.doc).forEach(k => {
                doc.doc.push({filename: k, time: obj.doc[k]});
            });
        }
        if (obj.ppt) {
            Object.keys(obj.ppt).forEach(k => {
                doc.ppt.push({filename: k, time: obj.ppt[k]});
            });
        }
        if (obj.xls) {
            Object.keys(obj.xls).forEach(k => {
                doc.xls.push({filename: k, time: obj.xls[k]});
            });
        }
        if (obj.other) {
            Object.keys(obj.other).forEach(k => {
                doc.other.push({filename: k, time: obj.other[k]});
            });
        }
        if (obj.referer) {
            Object.keys(obj.referer).forEach(k => {
                doc.referer.push({md5: k, source: obj.referer[k].source, time: obj.referer[k].time});
            });
        }

        return doc;
    }
};
module.exports = FormatUtil;