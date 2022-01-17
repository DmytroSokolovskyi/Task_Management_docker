const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const { config, errorsEnum } = require('./configs');
const { ErrorHandler } = require('./errors');
const { authRouter, userRouter, taskRouter} = require('./routes');
const {errorMiddleware} = require("./middlewares");

const app = express();

mongoose.connect(config.MONGO_URL);

app.use(helmet());
app.use(cors({origin: _configureCors}));
app.use(rateLimit({
    windowMS: 15 * 60 * 1000,
    max: 100
}));

if (config.NODE_ENV === 'dev') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/task', taskRouter);
app.use('*', errorMiddleware);

app.listen(config.PORT,
    config.HOST,
    () => {
        console.log(`App work ${config.PORT}`);
    });

function _configureCors(origin, callback) {

    if (config.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whitelist = config.ALLOWED_ORIGIN.split(';');

    if (whitelist.includes(origin)) {
        return callback(new ErrorHandler(errorsEnum.CORS_ERROR), false);
    }

    return callback(null, true);
}
