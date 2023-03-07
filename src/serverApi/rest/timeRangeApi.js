import * as serverApi from "../serverApi";

export const getTimeRange = async (timeRangeId, withNetwork = true) => {
  let res = null;
  if (withNetwork) {
    // res = await serverApi.get(`api/timeRanges/${timeRangeId}/network`);
    let response = null;
    response = await serverApi.get(`api/timeRanges/${timeRangeId}/network`);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let data = "";

    function processChunk({ done, value }) {
      if (done) {
        const json = JSON.parse(data);

        // Do something with the JSON data
        return json;
      }

      data += decoder.decode(value);
      return reader.read().then(processChunk);
    }

    return reader.read().then(processChunk);
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
    `api/timeRanges/${timeRangeId}/projects/${projectId}`,
    body
  );
  return serverApi.handleResult(res, "Update a time range error");
};

export const deleteTimeRange = async (timeRangeId, projectId) => {
  const res = await serverApi.del(
    `api/timeRanges/${timeRangeId}/projects/${projectId}`
  );
  return serverApi.handleResult(res, "Delete time range error");
};

export const deleteTimeRanges = async (timeRangeIds, projectId) => {
  const res = await serverApi.del(`api/timeRanges`, {
    timeRanges: timeRangeIds,
    projectId,
  });
  return serverApi.handleResult(res, "Delete time ranges error");
};
