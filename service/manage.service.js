const dataService = require('./data.service');

const ManageService = {
    deleteNoSessionUser: (sessionSeconds) => {
        let time = new Date().getTime();
        time = time - 1000 * sessionSeconds;
        let data = dataService.get();

        console.log('before count: ', data.length);

        let userIds = new Set();
        let n = 0;
        for (var i = data.length - 1; i >= 0; i--) {
            if (data[i].time < time) {

                break;
            }
            let userId = data[i].user_id;
            userIds.add(userId);
            n = i - 1;
        }
        let ids = [];
        for (let m = n; m >= 0; m--) {
            let userId = data[m].user_id;
            if (userId == '' || userId == '-' || !userIds.has(userId)) {
                ids.push(m);
            }
        }

        ids.forEach(f => {
            data.splice(f, 1);
        });
        console.log('after count: ', data.length);
    }
};
module.exports = ManageService;
