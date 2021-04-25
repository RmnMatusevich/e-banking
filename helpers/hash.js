const bcrypt = require('bcryptjs');

module.exports = {
    get: plain => {
        return bcrypt.hashSync(plain);
    },

    isValid: (plain, hash) => {
        return bcrypt.compareSync(plain, hash)
    },
};