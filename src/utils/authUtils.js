import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../components/Auth/Firebase.jsx";
import axios from "axios";

// Configure axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  timeout: 10000 // 10 second timeout
});

// Auth token management
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
    // Set token expiration (1 hour from now)
    const expirationTime = Date.now() + 3600000;
    localStorage.setItem("tokenExpiration", expirationTime.toString());
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("role");
    localStorage.removeItem("userData");
  }
};

// Initialize auth state
export const initializeAuth = () => {
  const token = localStorage.getItem("token");
  const expiration = localStorage.getItem("tokenExpiration");

  if (token && expiration && Date.now() < parseInt(expiration)) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return true;
  }
  
  // Token expired or invalid
  setAuthToken(null);
  return false;
};

// Enhanced login with error handling
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/users/login", { email, password });
    
    if (response.data.token) {
      setAuthToken(response.data.token);
      localStorage.setItem("role", response.data.user?.role || 'user');
      localStorage.setItem("userData", JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    const errorData = error.response?.data || { 
      error: "Login failed",
      details: error.message 
    };
    throw errorData;
  }
};

// Enhanced registration
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users/signup", userData);
    
    if (response.data.token) {
      setAuthToken(response.data.token);
      localStorage.setItem("role", response.data.user?.role || 'user');
      localStorage.setItem("userData", JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    const errorData = error.response?.data || { 
      error: "Registration failed",
      details: error.message 
    };
    
    if (error.response?.status === 400) {
      errorData.validationErrors = error.response.data.errors;
    }
    
    throw errorData;
  }
};

// Enhanced logout
export const logoutUser = async () => {
  try {
    // Optional: Call backend logout endpoint if needed
    await api.post("/users/logout");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    setAuthToken(null);
    window.location.href = "/login";
  }
};

// Token verification with refresh logic
export const verifyToken = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const response = await api.get("/users/verify-token");
    
    if (response.data.valid && response.data.newToken) {
      setAuthToken(response.data.newToken); // Refresh token if available
    }
    
    return response.data.valid;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
};

// Enhanced Google auth
export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    const result = await signInWithPopup(auth, provider);
    const googleToken = await result.user.getIdToken();

    const response = await api.post("/users/google-auth", { token: googleToken });

    if (response.data.token) {
      setAuthToken(response.data.token);
      localStorage.setItem("role", response.data.user?.role || 'user');
      localStorage.setItem("userData", JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    let errorData = { error: "Google authentication failed" };
    
    if (error.response) {
      errorData = {
        ...error.response.data,
        status: error.response.status
      };
    } else if (error.code) {
      errorData.details = error.message;
      errorData.code = error.code;
      
      // Handle specific Firebase errors
      if (error.code === 'auth/popup-closed-by-user') {
        errorData.error = "Login popup was closed";
      }
    }
    
    throw errorData;
  }
};

// Auth state checks
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const expiration = localStorage.getItem("tokenExpiration");
  return !!token && Date.now() < parseInt(expiration || "0");
};

export const isAdmin = () => {
  if (!isAuthenticated()) return false;
  const role = localStorage.getItem("role");
  return role === "admin";
};

export const isSupplier = () => {
  if (!isAuthenticated()) return false;
  const role = localStorage.getItem("role");
  return role === "supplier";
};

export const isApprovedSupplier = () => {
  if (!isSupplier()) return false;
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  return userData.isApproved === true;
};

// User data management
export const getCurrentUser = () => {
  if (!isAuthenticated()) return null;
  return JSON.parse(localStorage.getItem("userData") || null);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

// Request interceptor for token refresh
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // If 401 error and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh token
        const refreshResponse = await api.post("/users/refresh-token");
        
        if (refreshResponse.data.token) {
          setAuthToken(refreshResponse.data.token);
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.token}`;
          return api(originalRequest); // Retry original request
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        setAuthToken(null); // Force logout
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);