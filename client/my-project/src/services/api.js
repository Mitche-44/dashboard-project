import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

// Automatically add JWT token to all requests if it exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ----------------------
// Auth
// ----------------------
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);

// ----------------------
// Tasks
// ----------------------
export const getTasks = () => API.get("/tasks");           // GET all tasks
export const addTask = (data) => API.post("/tasks", data); // POST new task
export const deleteTask = (id) => API.delete(`/tasks/${id}`); // DELETE a task
export const updateTask = (id, data) => API.patch(`/tasks/${id}`, data); // PATCH task (status)

// Default export in case you need raw API access
export default API;