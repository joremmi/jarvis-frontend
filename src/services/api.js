import axios from "axios";
import store from "@/store";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch("auth/logout");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
