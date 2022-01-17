const router = require('express').Router();

const { userController } = require('../controllers');
const { mainMiddleware } = require('../middlewares');
const { userValidator } = require('../validators');
const {Users} = require("../dataBase");

router.post(
    '/',
    mainMiddleware.validateBody(userValidator.createUserValidator),
    mainMiddleware.checkOne(Users, [
        'email',
        'username'
    ]),
    userController.createUser
);

module.exports = router;
