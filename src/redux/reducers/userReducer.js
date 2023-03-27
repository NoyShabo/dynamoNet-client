import { UserActionTypes } from "../constants/action-types";

const initialState = {
  user: null,
};

//The reducer get type and payload from the Action
export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UserActionTypes.SET_USER:
      return { ...state, user: payload };

    case UserActionTypes.REMOVE_SET_USER:
      return { ...state, user: null };

    default:
      return state;
  }
};
