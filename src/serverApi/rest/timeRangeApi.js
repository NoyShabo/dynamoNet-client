import * as serverApi from "../serverApi";

export const getTimeRange = async (timeRangeId, withNetwork = true) => {
  console.log(`GET get time range ${timeRangeId}`);
  let res = null;
  if (withNetwork) {
    res = await serverApi.get(`api/timeRanges/${timeRangeId}/network`);
  } else {
    res = await serverApi.get(`api/timeRanges/${timeRangeId}`);
  }
  console.log(res);
  return serverApi.handleResult(res, "Get time range error");
};

export const getTimeRanges = async () => {
  console.log(`GET get time ranges`);
  const res = await serverApi.get(`api/timeRanges`);
  return serverApi.handleResult(res, "Get time ranges error");
};

export const createTimeRanges = async (body) => {
  console.log(`POST add new time ranges`);
  const res = await serverApi.post(`api/timeRanges`, body);
  return serverApi.handleResult(res, "Add time range error");
};

export const updateTimeRange = async (timeRangeId, projectId, body) => {
  console.log(`UPDATE a time range`);
  const res = await serverApi.update(
    `api/timeRanges/${timeRangeId}/project/${projectId}`,
    body
  );
  return serverApi.handleResult(res, "Update a time range error");
};

export const deleteTimeRange = async (timeRangeId) => {
  console.log(`Delete a time range`);
  const res = await serverApi.del(`api/timeRanges/${timeRangeId}`);
  return serverApi.handleResult(res, "Delete time range error");
};
