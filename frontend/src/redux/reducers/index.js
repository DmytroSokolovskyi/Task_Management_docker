import {combineReducers} from "redux";
import {mainReducer} from "./mainReducer";
import {taskReducer} from "./taskReducer";

export const reducer = combineReducers({mainReducer, taskReducer});
