import {DELETE_USER, SET_USER} from "../actions";

const initialState = {
    user: {},
};

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_USER: {
        return {...state, user: {...action.payload}};
    }
    case DELETE_USER: {
        return {...state, user: {}};
    }

    default:
        return state;
    }
};
