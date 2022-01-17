const Joi = require("joi");

const createTaskValidate = Joi.object({
    title: Joi
        .string()
        .min(3)
        .max(60)
        .required()
        .trim(),
    description: Joi
        .string()
        .min(30)
        .max(1000)
        .required()
        .trim(),
    priority: Joi
        .number()
        .min(1)
        .max(5)
        .required(),
    dueDate: Joi
        .date()
        .greater('now')
});

const editTaskValidate = Joi.object({
    title: Joi
        .string()
        .min(3)
        .max(60)
        .trim(),
    description: Joi
        .string()
        .min(30)
        .max(1000)
        .trim(),
    priority: Joi
        .number()
        .min(1)
        .max(5),
    dueDate: Joi
        .date()
        .greater('now'),
    isDone: Joi
        .boolean(),
    isArchived: Joi
        .boolean()
});

module.exports = {
    createTaskValidate,
    editTaskValidate
};
