const baseUrl = "http://localhost:3500/";

// get post patch delete with auth
export const get = async (url, token) => {
  return await fetch(`${baseUrl}${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

export const post = async (url, data, token) => {
  return await fetch(`${baseUrl}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
};

export const update = async (url, data, token) => {
  return await fetch(`${baseUrl}${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
};

export const del = async (url, data, token) => {
  return await fetch(`${baseUrl}${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
};

export const handleError = (res) => {
  if (res.data && res.data[0].msg) return res.data[0].msg;
  if (res.message) return res.message;
  if (res.error) {
    return res.error;
  }
  return res;
};

export const handleResult = async (
  res,
  errSrc = "  Internal error",
  customMessage = null
) => {
  const resData = await res.json();
  // console.log("serverApi", resData);
  if (res && resData && res.status < 400) {
    return resData;
  }
  if (customMessage) throw new Error(customMessage);
  else if (!res) throw new Error(`${errSrc}: Server not responding`);
  else if (!resData) throw new Error(`${errSrc}: Server response was empty`);
  else throw new Error(handleError(resData));
};
