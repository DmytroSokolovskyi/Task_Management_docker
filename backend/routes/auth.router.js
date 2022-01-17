const {mainMiddleware, authMiddleware} = require('../middlewares');
const {authValidator} = require('../validators');
const {O_Auth, ActionToken} = require('../dataBase');
const {tokenEnum, actionTokenTypeEnum} = require('../configs');
const {authController} = require('../controllers');
const authRouter = require('express').Router();

authRouter.get(
    '/',
    authMiddleware.checkToken(O_Auth, tokenEnum.ACCESS),
    authController.checkAuth
);
authRouter.post(
    '/login',
    mainMiddleware.validateBody(authValidator.loginValidator),
    authMiddleware.userAuth,
    authController.login
);
authRouter.get(
    '/logout',
    authMiddleware.checkToken(O_Auth, tokenEnum.ACCESS),
    authController.logout
);

authRouter.get(
    '/refresh',
    authMiddleware.checkToken(O_Auth, tokenEnum.REFRESH),
    authController.changeRefresh
);

authRouter.get(
    '/activate/:token',
    authMiddleware.checkToken(ActionToken, actionTokenTypeEnum.ACTIVATE_ACCOUNT),
    authController.activateAccount
);

module.exports = authRouter;
