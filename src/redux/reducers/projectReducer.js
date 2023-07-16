import { ProjectActionTypes } from "../constants/action-types";

const initialState = {
  project: null,
};

//The reducer get type and payload from the Action
export const projectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ProjectActionTypes.SET_PROJECTS:
      return { ...state, projects: payload };

    case ProjectActionTypes.SET_PROJECT:
      return { ...state, project: payload };

    case ProjectActionTypes.REMOVE_SET_PROJECT:
      return { ...state, project: null };

    default:
      return state;
  }
};
