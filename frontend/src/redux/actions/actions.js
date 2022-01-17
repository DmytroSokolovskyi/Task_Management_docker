import {
    DELETE_TASK,
    DELETE_USER,
    SET_CHECKED_TASK,
    SET_TASK,
    SET_TASKS,
    SET_USER,
    UPDATE_TASK,
} from "./actionsType";

export const setUser = (user) => {
    return {type: SET_USER, payload: user};
};

export const deleteUser = () => {
    return {type: DELETE_USER};
};

export const setTask = (task) => {
    return {type: SET_TASK, payload: task};
};

export const setTasks = (tasks) => {
    return {type: SET_TASKS, payload: tasks};
};

export const updateOneTask = (task) => {
    return {type: UPDATE_TASK, payload: task};
};

export const deleteOneTask = (id) => {
    return {type: DELETE_TASK, payload: id};
};

export const setCheckedTasks = (item) => {
    return {type: SET_CHECKED_TASK, payload: item};
};
