// src/api/services/transactionService.js
import apiClient from "../apiClient";

// Add a new transaction
export const createTransaction = async (transactionData) => {
  return await apiClient("transactions", "POST", transactionData);
};

// Get all transactions
export const getAllTransactions = async () => {
  return await apiClient("transactions", "GET");
};

// Approve a transaction
export const approveTransaction = async (transactionId) => {
  return await apiClient("transactions/approve", "POST", { transactionId });
};

// Get transaction statistics
export const getTransactionStatistics = async () => {
  return await apiClient("transactions/statistics", "GET");
};

// Get all transaction history
export const getTransactionHistory = async () => {
  return await apiClient("transaction-history", "GET");
};

// Get transactions by product
export const getTransactionHistoryByProduct = async (productId) => {
  return await apiClient(
    `transactions/by-product?productId=${productId}`,
    "GET"
  );
};
