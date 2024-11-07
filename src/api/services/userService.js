// src/api/userService.js
import apiClient from "../apiClient";

// Lấy danh sách tất cả người dùng
export const getAllUsers = async () => {
  return await apiClient("users", "GET");
};

// Lấy thông tin chi tiết của một người dùng bằng ID
export const getUserById = async (id) => {
  return await apiClient(`users/${id}`, "GET");
};

// Tạo mới một người dùng
export const createUser = async (userData) => {
  return await apiClient("users", "POST", userData);
};

// Cập nhật thông tin người dùng
export const updateUser = async (id, updatedData) => {
  return await apiClient(`users/${id}`, "PATCH", updatedData);
};

// Xóa người dùng
export const deleteUser = async (id) => {
  return await apiClient(`users/${id}`, "DELETE");
};
