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

// export const getProfile = async () => {
//   const res = await serverApi.get(`api/auth/profile`);
//   return serverApi.handleResult(res, "Get profile error");
// };

// export const updateProfile = async (body) => {
//   const res = await serverApi.update(`api/auth/profile`, body);
//   return serverApi.handleResult(res, "Update profile error");
// };

// export const deleteProfile = async () => {
//   const res = await serverApi.delete(`api/auth/profile`);
//   return serverApi.handleResult(res, "Delete profile error");
// };

// export const changePassword = async (body) => {
//   const res = await serverApi.update(`api/auth/password`, body);
//   return serverApi.handleResult(res, "Update password error");
// };

// export const resetPassword = async (body) => {
//   const res = await serverApi.update(`api/auth/resetPassword`, body);
//   return serverApi.handleResult(res, "Reset password error");
// };
