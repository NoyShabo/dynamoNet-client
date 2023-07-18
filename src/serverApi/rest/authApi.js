import * as serverApi from "../serverApi";

// user authentication
export const login = async (email, password) => {
  const res = await serverApi.post(`api/auth/login`, { email, password });
  return serverApi.handleResult(res, "Login error");
};

export const logout = async (user) => {
  const res = await serverApi.post(`api/auth/logout`, { user });
  return serverApi.handleResult(res, "Logout error");
};

export const register = async (name, email, password) => {
  const res = await serverApi.post(`api/auth/register`, {
    name,
    email,
    password,
  });
  return serverApi.handleResult(res, "Register error");
};
