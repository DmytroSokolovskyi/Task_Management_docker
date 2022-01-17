import {axiosInstance, taskUrl} from "./config";
import {deleteOneTask, setCheckedTasks, setTask, setTasks, updateOneTask} from "../redux/actions";

export const createTask = (newTask) => async (dispatch) => {
    const res = await axiosInstance.post(taskUrl, newTask);

    dispatch(setTask(res.data));

    return res;
};

export const getAllTasks = (params = "") => async (dispatch) => {
    const res = await axiosInstance.get(taskUrl + params);

    dispatch(setTasks(res.data));

    return res;
};

export const updateTask = (task, id) => async (dispatch) => {
    const res = await axiosInstance.put(`${taskUrl}/${id}`, task);

    dispatch(updateOneTask(res.data));

    return res;
};

export const deleteTask = (id) => async (dispatch) => {
    await axiosInstance.delete(`${taskUrl}/${id}`);

    dispatch(deleteOneTask(id));
};

export const updateManyTask = (item) => async (dispatch) => {
    await axiosInstance.patch(taskUrl, item);

    dispatch(setCheckedTasks(item));
};
