import * as serverApi from "../serverApi";

export const getTimeRange = async (timeRangeId, withNetwork = true) => {
  let res = null;
  if (withNetwork) {
    res = await serverApi.get(`api/timeRanges/${timeRangeId}/network`);
  } else {
    res = await serverApi.get(`api/timeRanges/${timeRangeId}`);
  }
  return serverApi.handleResult(res, "Get time range error");
};

export const getTimeRanges = async () => {
  const res = await serverApi.get(`api/timeRanges`);
  return serverApi.handleResult(res, "Get time ranges error");
};

export const createTimeRanges = async (body) => {
  const res = await serverApi.post(`api/timeRanges`, body);
  return serverApi.handleResult(res, "Add time range error");
};

export const updateTimeRange = async (timeRangeId, projectId, body) => {
  const res = await serverApi.update(
    `api/timeRanges/${timeRangeId}/project/${projectId}`,
    body
  );
  return serverApi.handleResult(res, "Update a time range error");
};

export const deleteTimeRange = async (timeRangeId) => {
  const res = await serverApi.del(`api/timeRanges/${timeRangeId}`);
  return serverApi.handleResult(res, "Delete time range error");
};
