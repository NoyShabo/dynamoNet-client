import * as serverApi from "../serverApi";

export const getNetwork = async (network) => {
  let response = null;
  console.log(network);
  response = await serverApi.get(`api/networks/${network}`);
  console.log(response);
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let data = "";

  function processChunk({ done, value }) {
    if (done) {
      const json = JSON.parse(data);
      console.log(json);

      // Do something with the JSON data
      return json;
    }

    data += decoder.decode(value);
    return reader.read().then(processChunk);
  }

  return reader.read().then(processChunk);

  //return serverApi.handleResult(res, "Get network error");
};
