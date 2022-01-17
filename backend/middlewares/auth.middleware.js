const { jwtService } = require('../service');
const { errorsEnum, constants, actionTokenTypeEnum, tokenEnum} = require('../configs');
const Doctors = require('../dataBase/Users');

module.exports = {
    userAuth: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await Doctors
                .findOne({ email })
                .select('+password');

            if (!user) {
                return next(errorsEnum.NOT_FOUND);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkToken: (tableName ,tokenType) => async (req, res, next) => {
        try {
            let token = req.get(constants.AUTHORIZATION);

            if (tokenType === tokenEnum.REFRESH ) {
                token = req.get(tokenEnum.REFRESH);
            }

            if (tokenType === actionTokenTypeEnum.ACTIVATE_ACCOUNT) {
                token = req.params.token;
            }

            if (!token) {
                return next(errorsEnum.UNAUTHORIZED);
            }

            await jwtService.verifyToken(token, tokenType);

            const response = await tableName.findOne({ [tokenType]: token });

            if (!response) {
                return next(errorsEnum.UNAUTHORIZED);
            }

            req.user = response.user_id;
            req.token = token;

            next();
        } catch (e) {
            next(e);
        }
    }
};
