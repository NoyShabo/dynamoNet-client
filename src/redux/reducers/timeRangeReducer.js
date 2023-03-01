import {TimeRangeActionTypes} from '../constants/timeRangeActions';

const initialState = {
    timeRange: undefined
};

export function timeRangeReducer(state = initialState, action) {
    switch (action.type) {
        case TimeRangeActionTypes.SET_TIME_RANGE:
            return {
                ...state,
                timeRange: action.timeRange
            };
        default:
            return state;
    }
}