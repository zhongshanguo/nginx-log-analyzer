const UrlUtil = {
    getRno: (log) => {
        if (!log || !log.path) {
            return "";
        }
        let pos = log.path.indexOf('rno=');
        if (pos > 0) {
            return log.path.substring(pos + 4, pos + 40);
        }
        let m = log.path.match(/(?<rno>[\da-f]{8}\-[\da-f]{4}\-[\da-f]{4}\-[\da-f]{4}\-[\da-f]{12})/i);
        if (m) {
            if (log.path.indexOf('/note/') == -1) {
                return m["groups"]["rno"];
            }
        }
        return "";
    },
    getResourceId: (log) => {
        if (!log || !log.path) {
            return "";
        }
        let path = log.path;
        let m = path.match(/\/resource\/detail\/[\da-f\-]{36}\/(?<rid>\d+)/i);
        if (m) {
            return m["groups"]["rid"];
        }
        return "";
    },
    getFileName: (log) => {
        //    let log = {path: '/a/a944bbaf-b86b-4518-aa1c-7c413b26e793/18060114284859596011.mp4?ticket=d387070bd031090867f04ac56b4767c3'};
        if (!log || !log.path) {
            return "";
        }
        let path = log.path;
        let m = path.match(/\/[a-f]{1,2}\/[\da-f\-]{36}\/(?<name>[^\?]+)/i);
        if (m) {
            return m["groups"]["name"];
        }
        return "";
    },
    getFileType: (log) => {
        var name = UrlUtil.getFileName(log);
        if (!name) {
            return "";
        }
        name = name.toLowerCase();
        // console.log('name', name);
        let ext = "";
        if (name.indexOf(".") > 0) {
            ext = name.substring(name.lastIndexOf(".") + 1);
        }
        // console.log('ext', ext);
        if (ext == 'pdf' || ext == 'mp4' || ext == 'mp3') {
            return ext;
        }
        if (ext == 'doc' || ext == 'docx') {
            return 'doc;'
        }
        if (ext == 'xls' || ext == 'xlsx') {
            return 'xls;'
        }
        if (ext == 'ppt' || ext == 'pptx') {
            return 'ppt;'
        }
        return "other";
    },
    isTick: (log) => {
        if (log && log.path && log.path == '/api/logger/media-play-event') {
            return true;
        }
        return false;
    }
};

module.exports = UrlUtil;