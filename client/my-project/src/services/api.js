import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Add token to requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`📤 ${config.method.toUpperCase()} ${config.url}`, config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
API.interceptors.response.use(
  (response) => {
    console.log(`📥 ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error(`❌ Error ${error.response?.status}:`, error.response?.data);
    return Promise.reject(error);
  }
);

// Auth endpoints
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);

// Task endpoints
export const getTasks = () => API.get("/tasks/");
export const addTask = (data) => API.post("/tasks/", data);
export const deleteTask = (id) => API.delete(`/tasks/${id}/`);
export const updateTask = (id, data) => API.patch(`/tasks/${id}/`, data);

export default API;