import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://campus-green-infra-planner.onrender.com/api", // ✅ fixed
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;