const {Schema, model} = require('mongoose');

const {tableNamesEnum} = require('../configs');

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    isDone: {
        type: Boolean,
        default: false
    },
    priority: {
        type: Number,
        required: true,
        trim: true
    },
    dueDate: {
        type: Date,
        required: true,
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: tableNamesEnum.USERS,
        required:true
    },
    isArchived: {
        type: Boolean,
        default: false
    },
}, { timestamps: true, toObject: { virtuals: true}, toJSON: { virtuals: true }});

module.exports = model(tableNamesEnum.TASKS, taskSchema);
