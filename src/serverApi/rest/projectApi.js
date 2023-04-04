import * as serverApi from "../serverApi";

export const getProject = async (projectId, extended = true, token = "") => {
  let res = null;
  if (extended) {
    res = await serverApi.get(`api/projects/${projectId}/timeRanges`, token);
  } else {
    res = await serverApi.get(`api/projects/${projectId}`, token);
  }
  return serverApi.handleResult(res, "Get project error");
};

export const getProjects = async () => {
  const res = await serverApi.get(`api/projects`);
  return serverApi.handleResult(res, "Get project error");
};

export const createProject = async (body) => {
  const res = await serverApi.post(`api/projects`, body);
  return serverApi.handleResult(res, "Add project error");
};

export const createProjectFromFile = async (body) => {
  const res = await serverApi.post(`api/projects/csv`, body);
  return serverApi.handleResult(res, "Add project csv error");
};

export const updateProject = async (projectId, body) => {
  const res = await serverApi.update(`api/projects/${projectId}`, body);
  return serverApi.handleResult(res, "Update a project error");
};

export const deleteProject = async (projectId) => {
  const res = await serverApi.del(`api/projects/${projectId}`);
  return serverApi.handleResult(res, "Delete project error");
};
