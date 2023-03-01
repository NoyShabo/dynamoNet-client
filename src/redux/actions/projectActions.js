import {ProjectActionTypes} from '../contants/action-types'

export const getProjects = (projects) =>{
    return {
        type: ProjectActionTypes.GET_PROJECTS,
        payload: projects
    }
}

export const addProject = (newProject) =>{
    return {
        type: ProjectActionTypes.ADD_PROJECT,
        payload: newProject
    }
}