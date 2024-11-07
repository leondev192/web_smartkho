// src/api/services/reportService.js
import apiClient from "../apiClient";

export const getInventoryReport = async (startDate, endDate) => {
  return await apiClient(
    `reports/inventory?startDate=${startDate}&endDate=${endDate}`,
    "GET"
  );
};

export const getTransactionStatistics = async () => {
  return await apiClient("transactions/statistics", "GET");
};
