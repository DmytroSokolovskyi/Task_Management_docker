const { emailActionEnum } = require('../configs');

module.exports = {
    [emailActionEnum.WELCOME]: {
        templateName: emailActionEnum.WELCOME,
        subject: 'Welcome !!!'
    },
    [emailActionEnum.NEW_TASK]: {
        templateName: emailActionEnum.NEW_TASK,
        subject: '–°ongratulations'
    },
    [emailActionEnum.INACTIVE]: {
        templateName: emailActionEnum.INACTIVE,
        subject: 'Very sorry'
    },
};
