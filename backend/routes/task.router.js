const taskRouter = require('express').Router();
const { O_Auth, Tasks} = require('../dataBase');
const { taskController } = require('../controllers');
const { mainMiddleware, authMiddleware } = require('../middlewares');
const { taskValidator, queryValidator} = require('../validators');
const { tokenEnum } = require("../configs");

taskRouter.get('/',
    mainMiddleware.validateQuery(queryValidator.queryValidate),
    authMiddleware.checkToken(O_Auth, tokenEnum.ACCESS),
    taskController.getTasks);

taskRouter.post(
    '/',
    authMiddleware.checkToken(O_Auth, tokenEnum.ACCESS),
    mainMiddleware.validateBody(taskValidator.createTaskValidate),
    taskController.createTask
);
taskRouter.patch(
    '/',
    authMiddleware.checkToken(O_Auth, tokenEnum.ACCESS),
    mainMiddleware.validateBody(taskValidator.editTaskValidate),
    taskController.updateManyTask
);

taskRouter.delete(
    '/:_id',
    authMiddleware.checkToken(O_Auth, tokenEnum.ACCESS),
    mainMiddleware.findAndCheckOne(Tasks, 'id', false),
    taskController.deleteTaskById
);

taskRouter.put('/:_id',
    authMiddleware.checkToken(O_Auth, tokenEnum.ACCESS),
    mainMiddleware.validateBody(taskValidator.editTaskValidate),
    mainMiddleware.findAndCheckOne(Tasks, 'id', false),
    taskController.updateTask
);

module.exports = taskRouter;
