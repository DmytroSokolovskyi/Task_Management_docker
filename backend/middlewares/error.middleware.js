const {statusEnum} = require('../configs');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
    res
        .status(err.status || statusEnum.SERVER_ERROR)
        .json({
            msg: err.message
        });
};
