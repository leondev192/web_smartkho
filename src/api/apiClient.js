// src/api/apiClient.js

const BASE_URL = "http://localhost:3000/api/v1";

const apiClient = async (
  endpoint,
  method = "GET",
  body = null,
  token = null
) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "*/*",
  };

  // Retrieve the token from localStorage if not explicitly provided
  if (!token) {
    token = localStorage.getItem("token");
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Something went wrong");

    return result;
  } catch (error) {
    return {
      status: "error",
      message: error.message || "Có lỗi xảy ra",
      data: null,
    };
  }
};

export default apiClient;
