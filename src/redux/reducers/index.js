import { combineReducers } from "redux";
import { projectReducer } from "./projectReducer";
import { timeRangeReducer } from "./timeRangeReducer";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
  projectModule: projectReducer,
  timeRangeModule: timeRangeReducer,
  userModule: userReducer,
});

export default reducers;
