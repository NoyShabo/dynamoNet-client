import { TimeRangeActionTypes } from "../constants/action-types";

const initialState = {
  timeRange: null,
};

export function timeRangeReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TimeRangeActionTypes.SET_TIME_RANGE:
      return {
        ...state,
        timeRange: payload,
      };
    case TimeRangeActionTypes.UPDATE_TIME_RANGE:
      return {
        ...state,
        timeRange: payload,
      };
    case TimeRangeActionTypes.DELETE_TIME_RANGE:
      return {
        ...state,
        timeRange: undefined,
      };
    case TimeRangeActionTypes.ADD_TIME_RANGES:
      return {
        ...state,
        timeRanges: payload,
      };
    default:
      return state;
  }
}
