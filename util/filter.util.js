const FilterUtil = {
    pathFilter: (log) => {
        let startFilter = [
            '/stylesheets/',
            '/javascripts/',
            '/images/',
            '/api/translate',
            '/pdfweb/',
            '/private/'
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