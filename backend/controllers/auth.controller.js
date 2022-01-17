const { jwtService } = require('../service');
const { O_Auth, ActionToken, Users } = require('../dataBase');
const { statusEnum, tokenEnum} = require('../configs');

module.exports = {
    login: async (req, res, next) => {
        try {
            const userWithPassword = req.user;
            const { password } = req.body;

            const user = userWithPassword.normalize();
            await userWithPassword.comparePassword(password);

            const tokenPair = await O_Auth.createWithUserId(user._id);

            res.json({ user, ...tokenPair });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const { token } = req;

            await O_Auth.deleteOne({ [tokenEnum.ACCESS]: token} );

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    checkAuth: (req, res, next) => {
        try {
            const user = req.user;

            res.status(statusEnum.OK).json(user);
        } catch (e) {
            next(e);
        }
    },

    changeRefresh: async (req, res, next) => {
        try {
            const { token } = req;
            const tokenPair = jwtService.generateTokenPair();
            const newPair = await O_Auth.findOneAndUpdate(
                { [tokenEnum.REFRESH]: token },
                { ...tokenPair },
                { new: true }
            );

            res.json(newPair);
        } catch (e) {
            next(e);
        }
    },

    activateAccount: async (req, res, next) => {
        try {
            const {user, token} = req;

            await ActionToken.deleteOne({action_token: token});
            const userActive = await Users.findByIdAndUpdate(user._id, {confirmedAt: new Date()}, {new: true});

            res.status(statusEnum.OK).json(userActive);
        } catch (e) {
            next(e);
        }
    },
};
