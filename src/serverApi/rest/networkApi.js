import * as serverApi from "../serverApi";

export const getNetwork = async (network) => {
  let response = null;
  response = await serverApi.get(`api/networks/${network}`);
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let data = "";

  function processChunk({ done, value }) {
    if (done) {
      const json = JSON.parse(data);

      return json;
    }

    data += decoder.decode(value);
    return reader.read().then(processChunk);
  }

  return reader.read().then(processChunk);
};
