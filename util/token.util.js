const jwt = require('jsonwebtoken');

const TokenUtil = {
    parse: (token) => {
        try {
            if (!token || token === '-' || token === ' ') {
                return {sub: "-"};
            }
            return jwt.decode(token);
        }
        catch (e) {
            return {sub: "-"};
        }
    }
};
module.exports = TokenUtil;