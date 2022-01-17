const Joi = require('joi');

const {constants} = require('../configs');

const createUserValidator = Joi.object({
    username: Joi
        .string()
        .min(3)
        .max(30)
        .trim()
        .required(),
    email: Joi
        .string()
        .regex(constants.EMAIL_REGEXP)
        .trim()
        .lowercase()
        .required(),
    password: Joi
        .string()
        .regex(constants.PASSWORD_REGEXP)
        .min(6)
        .max(128)
        .trim()
        .required(),
});

module.exports = {
    createUserValidator
};
