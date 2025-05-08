import axios from 'axios';

// Use import.meta.env for Vite compatibility
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
console.log("API Base URL:", API_BASE_URL); // Check if URL is properly loaded

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page or refresh token
      localStorage.removeItem('token');
      window.location.href = '/users/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
