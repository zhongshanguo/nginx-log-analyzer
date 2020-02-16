const FilterUtil = {
    pathFilter: (log) => {
        let startFilter = [
            '/stylesheets/',
            '/javascripts/',
            '/images/',
            '/api/translate',
            '/pdfweb/',
            '/private/',
            '/favicon.ico',
            '/static/',
            '/api/logger/'
        ];
        if (log.status == 304) {
            return false;
        }

        for (let i = 0; i < startFilter.length; i++) {
            if (log["path"].indexOf(startFilter[i]) === 0) {
                return false;
            }
        }
        return true;
    }

};
module.exports = FilterUtil;