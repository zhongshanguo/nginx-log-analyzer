const entityUtil = require('../util/entity.util');

let data = {};
const DataService = {
    push: (host, nginxAccessLog) => {

        var doc = entityUtil.transform(nginxAccessLog);
        console.log(doc);
        console.log('-');
    }
};
module.exports = DataService;
