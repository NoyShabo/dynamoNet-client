import { ProjectActionTypes } from "../constants/action-types";

export const setProject = (project) => {
  return {
    type: ProjectActionTypes.SET_PROJECT,
    payload: project.project,
  };
};

export const removeSelectedProject = () => {
  return {
    type: ProjectActionTypes.REMOVE_SET_PROJECT,
  };
};

export const setProjects = (projects) => {
  return {
    type: ProjectActionTypes.SET_PROJECTS,
    payload: projects.projects,
  };
};

export const addProject = (newProject) => {
  return {
    type: ProjectActionTypes.ADD_PROJECT,
    payload: newProject.project,
  };
};

export const updateProject = (updatedProject) => {
  return {
    type: ProjectActionTypes.UPDATE_PROJECT,
    payload: updatedProject.project,
  };
};

export const deleteProject = (deletedProject) => {
  return {
    type: ProjectActionTypes.DELETE_PROJECT,
    payload: deletedProject.project,
  };
};
