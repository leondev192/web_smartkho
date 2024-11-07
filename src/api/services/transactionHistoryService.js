// src/api/services/transactionHistoryService.js
import apiClient from "../apiClient";

// Fetch all transaction history
export const getTransactionHistory = async () => {
  return await apiClient("transaction-history", "GET");
};

// Fetch transaction history by product
export const getTransactionHistoryByProduct = async (productId) => {
  return await apiClient(
    `transaction-history/by-product?productId=${productId}`,
    "GET"
  );
};
