import { UserActionTypes } from "../constants/action-types";

export const setUser = (user) => {
  return {
    type: UserActionTypes.SET_USER,
    payload: user.user,
  };
};

export const removeSelectedUser = () => {
  return {
    type: UserActionTypes.REMOVE_SET_USER,
  };
};
