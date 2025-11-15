// API Configuration
// This file centralizes API URL configuration for the entire application

// Get API URL from environment variable, fallback to relative path for production
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Helper function to build API endpoints
export const getApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

export default {
  API_BASE_URL,
  getApiUrl,
};
