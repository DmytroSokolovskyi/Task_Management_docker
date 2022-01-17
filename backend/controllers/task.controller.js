const {Tasks} = require("../dataBase");
const {taskService} = require("../service");
const {statusEnum} = require("../configs");
module.exports = {

    getTasks: async (req, res, next) => {
        try {
            // todo dorobu filtra
            const tasks = await taskService.getAllTasks(req.query, req.user.id);

            res.status(statusEnum.OK).json(tasks);
        } catch (e) {
            next(e);
        }
    },
    createTask: async (req, res, next) => {
        try {
            const {id} = req.user;

            const task = await Tasks.create({...req.body, user_id: id});

            res.status(statusEnum.CREATED).json(task);
        } catch (e) {
            next(e);
        }
    },
    updateTask: async (req, res, next) => {
        try {
            const {_id} = req.params;
            const task = await Tasks.findByIdAndUpdate(_id,{...req.body}, {new: true} );

            res.status(statusEnum.CREATED).json(task);
        } catch (e) {
            next(e);
        }
    },

    updateManyTask: async (req, res, next) => {
        try {
            const item = req.body;
            const {id} = req.user;
            const key = Object.keys(item)[0];

            await Tasks.updateMany(
                { $and: [
                    {user_id:id},
                    {[key]: !item[key]}
                ] },
                { $set: { [key] : item[key] } }
            );

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    deleteTaskById:async (req, res, next) => {
        try {
            const {_id} = req.params;
            await Tasks.findByIdAndDelete(_id);

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },
};

