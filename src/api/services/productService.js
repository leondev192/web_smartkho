// src/api/productService.js
import apiClient from "../apiClient";

export const getAllProducts = async () => {
  return await apiClient("products", "GET");
};

export const getProductById = async (id) => {
  return await apiClient(`products/${id}`, "GET");
};

export const createProduct = async (productData) => {
  return await apiClient("products", "POST", productData);
};

export const updateProduct = async (id, updatedData) => {
  return await apiClient(`products/${id}`, "PUT", updatedData);
};

export const deleteProduct = async (id) => {
  return await apiClient(`products/${id}`, "DELETE");
};
