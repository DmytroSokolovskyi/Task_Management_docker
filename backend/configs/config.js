module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    MONGO_URL: process.env.MONGO_URL || 'mongodb://user:password@db:27017/qwerty',
    PORT: process.env.PORT || 5000,
    HOST: process.env.HOST || '0.0.0.0',

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'app_tasks',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'app_tasks_refresh',
    JWT_ACTION_ACTIVATE_SECRET: process.env.JWT_ACTION_ACTIVATE_SECRET || 'app_tasks_action_activate',
    JWT_ACTION_FORGOT_SECRET: process.env.JWT_FORGOT_SECRET || 'app_tasks_action_forgot',

    EMAIL_LOGIN: process.env.EMAIL_LOGIN,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,

    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost/80',
    ACTIVATE_URL: process.env.ACTIVATE_URL || 'http://localhost/80/auth/activate',

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
};
