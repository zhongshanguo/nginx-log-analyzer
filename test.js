const util = require('./util/url.util');

const test = {
    testFilename: (log) => {
        let name = util.getRno(log);
        console.log(name);
    }
};

test.testFilename({path: '/course/98914959-b1a6-4f40-9c3a-6273a1f82278?from=Home'});