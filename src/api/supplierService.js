// src/api/services/supplierService.js
import apiClient from "./apiClient";

// Get all suppliers
export const getAllSuppliers = async () => {
  return await apiClient("suppliers", "GET");
};

// Get supplier by ID
export const getSupplierById = async (id) => {
  return await apiClient(`suppliers/${id}`, "GET");
};

// Create a new supplier
export const createSupplier = async (supplierData) => {
  return await apiClient("suppliers", "POST", supplierData);
};

// Update supplier
export const updateSupplier = async (id, updatedData) => {
  return await apiClient(`suppliers/${id}`, "PUT", updatedData);
};

// Delete supplier
export const deleteSupplier = async (id) => {
  return await apiClient(`suppliers/${id}`, "DELETE");
};
