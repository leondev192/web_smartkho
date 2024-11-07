import apiClient from "../apiClient";

export const login = (email, password) => {
  return apiClient("auth/login", "POST", { email, password });
};

export const getUserProfile = (token) => {
  return apiClient("auth/profile", "GET", null, token);
};
