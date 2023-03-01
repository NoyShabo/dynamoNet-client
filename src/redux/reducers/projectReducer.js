import { ProjectActionTypes } from "../constants/action-types";

// import projects from "../../data/projects.json";

const initialState = {
  projects: [],
};

// const initialState = projects

//The reducer get type and payload from the Action
export const projectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ProjectActionTypes.SET_PROJECTS:
      console.log("set projects", payload);
      return { ...state, projects: payload };

    case ProjectActionTypes.SET_PROJECT:
      console.log("set project", payload);
      return { ...state, project: payload };

    case ProjectActionTypes.REMOVE_SET_PROJECT:
      console.log("remove set project", "");
      return {};

    default:
      return state;
  }
};
