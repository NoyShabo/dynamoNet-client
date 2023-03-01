import {TimeRangeActionTypes} from '../constants/actionTypes';

export const setTimeRange = (timeRange) => ({
    type: TimeRangeActionTypes.SET_TIME_RANGE,
    payload: timeRange.timeRange
});

export const updateTimeRange = (timeRange) => ({
    type: TimeRangeActionTypes.UPDATE_TIME_RANGE,
    payload: timeRange.timeRange
});

export const deleteTimeRange = (timeRange) => ({
    type: TimeRangeActionTypes.DELETE_TIME_RANGE,
    payload: timeRange
});

export const addTimeRanges = (timeRanges) => ({
    type: TimeRangeActionTypes.ADD_TIME_RANGES,
    payload: timeRanges
});