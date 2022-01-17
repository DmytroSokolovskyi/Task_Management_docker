const {errorsEnum, statusEnum} = require('../configs');
const {Promise} = require("mongoose");

module.exports ={
    checkOne: (tableName, keys) => async (req, res, next) => {
        try {
            const isExist = await Promise.all(
                keys.map(key => tableName.findOne({ [key]: req.body[key] }))
            );

            isExist.map(item => {
                if (item !== null) {
                    return next(errorsEnum.CONFLICT);
                }
            });

            next();
        } catch (e) {
            next(e);
        }
    },

    validateBody: (validator) => async (req, res, next) => {
        try {
            const {error, value} = await validator.validate(req.body);

            if (error) {
                return next({message: error.details[0].message, status: statusEnum.BAD_REQUEST});
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    findAndCheckOne: (tableName, key, checkToExist) => async (req, res, next) => {
        try {
            const oneItem = await tableName.findOne({ [key]: req.body[key] });

            if (!oneItem && !checkToExist) {
                return next(errorsEnum.NOT_FOUND);
            }

            if (oneItem && checkToExist) {
                return next(errorsEnum.CONFLICT);
            }

            if (oneItem && !checkToExist) {
                req.one = oneItem;
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateQuery: (validator) => async (req, res, next) => {
        try {
            console.log(req.query);
            const {error, value} = await validator.validate(req.query);

            if (error) {
                return next({message: error.details[0].message, code: statusEnum.BAD_REQUEST});
            }

            req.query = value;

            next();
        } catch (e) {
            next(e);
        }
    },
};
