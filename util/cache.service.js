let data = new Map();

function checkOutOfTimeKey() {
    for (var k in data) {
        var time = data[k];
        if (new Date().getTime() - time > 1000 * 3600 * 2) {
            delete data[k];
        }
    }
}

const cacheService = {
    get: (key) => {
        checkOutOfTimeKey();
        if (data[key]) {
            data[key].time = new Date().getTime();
            return data[key].content;
        }
        else {
            return null;
        }
    },
    set: (key, value) => {
        checkOutOfTimeKey();
        let doc = {
            time: new Date().getTime(),
            content: value
        };
        data[key] = doc;
    },
    all: () => {
        return data;
    },
    clean: () => {
        data = new Map();
    }
};
module.exports = cacheService;
