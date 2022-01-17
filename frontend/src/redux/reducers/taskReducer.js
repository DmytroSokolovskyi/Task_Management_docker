import {DELETE_TASK, SET_CHECKED_TASK, SET_TASK, SET_TASKS, UPDATE_TASK} from "../actions";

const initialState = {
    tasks: [],
};

export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_TASK: {
        return {...state, tasks: [...state.tasks, action.payload]};
    }

    case SET_TASKS: {
        return {...state, tasks: [...action.payload]};
    }

    case UPDATE_TASK: {
        const newTasks = state.tasks.map(item => item.id === action.payload.id ? action.payload : item);

        return {...state, tasks: [...newTasks]};
    }

    case DELETE_TASK: {
        const filterTasks = state.tasks.filter(item => item.id !== action.payload);

        return {...state, tasks: [...filterTasks]};
    }

    case SET_CHECKED_TASK: {
        const editedTasks = state.tasks.map(item => item.isDone === action.payload.isDone ? item : {...item, isDone: action.payload.isDone});

        return {...state, tasks: [...editedTasks]};
    }

    default:
        return state;
    }
};
