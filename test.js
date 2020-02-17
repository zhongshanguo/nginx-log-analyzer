const util = require('./util/url.util');

const test = {
    testFilename: (log) => {
        let name = util.getFileName(log);
        console.log(name);
    }
};

test.testFilename({path: '/3/34c7da6a-8bb7-405a-aa76-a567cf03f60e/190312112156595960617.pdf'});