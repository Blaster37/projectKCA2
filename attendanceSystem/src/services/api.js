import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // your backend
});

// attach token if you add auth later
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;