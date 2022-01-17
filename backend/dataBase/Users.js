const { Schema, model } = require('mongoose');

const { tableNamesEnum } = require('../configs');
const { passwordService } = require('../service');
const {UserNormalize} = require("../util/user.util");

const usersSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    confirmedAt: {
        type: Date,
        trim: true,
        default: null
    }
}, { timestamps: true, toObject: { virtuals: true}, toJSON: { virtuals: true } });

usersSchema.methods = {
    comparePassword(password) {
        return passwordService.compare(password, this.password);
    },

    normalize() {
        return new UserNormalize(this);
    }
};

usersSchema.statics = {
    async createUserWithPassword(item) {
        const hashedPassword = await passwordService.hash(item.password);

        return this.create({ ...item, password: hashedPassword });
    }
};


module.exports = model(tableNamesEnum.USERS, usersSchema);
