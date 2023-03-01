import { combineReducers }  from "redux";
import { projectReducer } from './projectReducer';


const reducers = combineReducers({
    allProjects: projectReducer
})

export default reducers;