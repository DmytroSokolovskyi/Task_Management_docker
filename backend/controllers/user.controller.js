const { Users, ActionToken } = require('../dataBase');
const { emailService, jwtService } = require('../service');
const { statusEnum, actionTokenTypeEnum, config } = require('../configs');
const { emailActionEnum } = require('../configs');

module.exports = {

    createUser: async (req, res, next) => {
        try {
            const { email, username } = req.body;

            let newUser = await Users.createUserWithPassword(req.body);
            newUser = newUser.normalize();
            const activate_token = jwtService.generateActionToken({ email }, actionTokenTypeEnum.ACTIVATE_ACCOUNT);

            await ActionToken.create({
                action_token: activate_token,
                type: actionTokenTypeEnum.ACTIVATE_ACCOUNT,
                user_id: newUser._id
            });
            await emailService.sendMail(
                email,
                emailActionEnum.WELCOME,
                { userName: username, URL: `${ config.ACTIVATE_URL }/${ activate_token }` },
            );

            res.status(statusEnum.CREATED).json(newUser);
        } catch (e) {
            next(e);
        }
    },
};
