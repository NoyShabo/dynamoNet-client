import { combineReducers }  from "redux";
import { projectReducer } from './projectReducer';
import { timeRangeReducer } from './timeRangeReducer';


const reducers = combineReducers({
    projectModule: projectReducer,
    timeRangeModule: timeRangeReducer,
})

export default reducers;