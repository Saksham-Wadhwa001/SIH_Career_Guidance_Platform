/**
 * Centralized API utility for making authenticated requests to the backend.
 * - Automatically attaches Authorization header from localStorage
 * - Includes credentials for cookie-based auth
 * - Parses JSON responses and extracts error messages
 */

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

/**
 * Make an API request with automatic auth handling.
 * @param {string} endpoint - API endpoint path (e.g., "/users/login")
 * @param {object} options - Fetch options (method, body, etc.)
 * @returns {Promise<object>} Parsed JSON response data
 * @throws {Error} With the server's error message
 */
export async function apiRequest(endpoint, options = {}) {
  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options.headers,
    },
    credentials: "include", // send cookies for refresh token
    ...options,
  };

  // If body is an object, stringify it
  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

/**
 * Convenience methods
 */
export const api = {
  get: (endpoint) => apiRequest(endpoint, { method: "GET" }),

  post: (endpoint, body) =>
    apiRequest(endpoint, { method: "POST", body }),

  patch: (endpoint, body) =>
    apiRequest(endpoint, { method: "PATCH", body }),

  delete: (endpoint) => apiRequest(endpoint, { method: "DELETE" }),
};
