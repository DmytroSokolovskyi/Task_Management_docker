const Joi = require('joi');

const queryValidate = Joi.object({
    perPage: Joi
        .number()
        .min(1)
        .max(60),
    page: Joi
        .number()
        .min(1)
        .max(60),
    sortBy: Joi
        .string()
        .valid('isDone', 'duration', 'priority')
        .trim(),
    order: Joi
        .string()
        .valid('desc', 'asc')
        .trim(),
    name: Joi
        .string()
        .min(1)
        .max(30),
});

module.exports ={
    queryValidate
};
