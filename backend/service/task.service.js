const Tasks = require('../dataBase/Tasks');

module.exports = {
    getAllTasks: (query = {}, id) => {
        const {
            perPage = 20,
            page = 1,
            sortBy = 'priority',
            order = 'desc',
        } = query;

        const findObject = {};

        if (id) {
            findObject.user_id = id;
        }

        const orderBy = order === 'asc' ? -1 : 1;

        return Tasks
            .find(findObject)
            .sort({ [sortBy]: orderBy })
            .limit(+perPage)
            .skip((page - 1) * perPage);
    }
};
