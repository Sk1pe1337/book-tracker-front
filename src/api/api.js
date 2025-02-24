import axios from "axios";

const API = axios.create({
  baseURL: "https://book-tracker-back.onrender.com/api",
  withCredentials: true // ✅ Передаем cookies / токены
});

// Добавляем заголовок Authorization автоматически
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
