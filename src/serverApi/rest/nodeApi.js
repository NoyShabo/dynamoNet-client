import * as serverApi from "../serverApi";

export const getNode = async (nodeId) => {
  const res = await serverApi.get(`api/nodes/${nodeId}`);
  return serverApi.handleResult(res, "Get node error");
};

export const getNodes = async (nodeIds) => {
  nodeIds = nodeIds.join(",");
  const res = await serverApi.get(`api/nodes?ids=${nodeIds}`);
  return serverApi.handleResult(res, "Get nodes error");
};

export const addFavoriteNodeToProject = async (projectId, nodeId) => {
  const res = await serverApi.post(
    `api/projects/${projectId}/favoriteNodes/${nodeId}`
  );
  return serverApi.handleResult(res, "Add favorite node to project error");
};

export const removeFavoriteNodeFromProject = async (projectId, nodeId) => {
  const res = await serverApi.del(
    `api/projects/${projectId}/favoriteNodes/${nodeId}`
  );
  return serverApi.handleResult(res, "Remove favorite node from project error");
};
