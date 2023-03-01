import {ProjectActionTypes} from '../contants/action-types'

import projects from "../../data/projects.json";

// const initialState = {
//     projects: []
// }

const initialState = projects

export const projectReducer = (state= initialState, {type, payload}) =>{
    switch(type){
        case ProjectActionTypes.GET_PROJECTS:
            return state;
        default:
            return state;
    }
}