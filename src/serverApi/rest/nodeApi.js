import * as serverApi from "../serverApi";

export const getNode = async (nodeId) => {
  console.log(`GET get node ${nodeId}`);
  const res = await serverApi.get(`api/nodes/${nodeId}`);
  return serverApi.handleResult(res, "Get node error");
};

export const getNodes = async (nodeIds) => {
  console.log(`GET get nodes`);
  nodeIds = nodeIds.join(",");
  const res = await serverApi.get(`api/nodes?ids=${nodeIds}`);
  return serverApi.handleResult(res, "Get nodes error");
};

export const addFavoriteNodeToProject = async (projectId, nodeId) => {
  console.log(`POST add favorite node to project`);
  const res = await serverApi.post(
    `api/projects/${projectId}/favoriteNodes/${nodeId}`
  );
  return serverApi.handleResult(res, "Add favorite node to project error");
};

export const removeFavoriteNodeFromProject = async (projectId, nodeId) => {
  console.log(`DELETE remove favorite node from project`);
  const res = await serverApi.delete(
    `api/projects/${projectId}/favoriteNodes/${nodeId}`
  );
  return serverApi.handleResult(res, "Remove favorite node from project error");
};