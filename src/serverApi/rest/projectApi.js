import * as serverApi from "../serverApi";

export const getProject = async (projectId, extended = true) => {
  console.log(`GET get project ${projectId}`);
  let res = null;
  if (extended) {
    res = await serverApi.get(`api/projects/${projectId}/timeRanges`);
  } else {
    res = await serverApi.get(`api/projects/${projectId}`);
  }
  return serverApi.handleResult(res, "Get project error");
};

export const getProjects = async () => {
  console.log(`GET get projects`);
  const res = await serverApi.get(`api/projects`);
  return serverApi.handleResult(res, "Get project error");
};

export const createProject = async (body) => {
  console.log(`POST add new project`);
  const res = await serverApi.post(`api/projects`, body);
  return serverApi.handleResult(res, "Add project error");
};

export const updateProject = async (projectId, body) => {
  console.log(`UPDATE a project`);
  const res = await serverApi.update(`api/projects/${projectId}`, body);
  return serverApi.handleResult(res, "Update a project error");
};

export const deleteProject = async (projectId) => {
  console.log(`Delete a project`);
  const res = await serverApi.del(`api/projects/${projectId}`);
  return serverApi.handleResult(res, "Delete project error");
};
