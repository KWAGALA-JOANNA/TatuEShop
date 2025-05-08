import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Verify token with backend
  const verifyToken = useCallback(async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/verify-token",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.valid;
    } catch (err) {
      console.error("Token verification failed:", err);
      return false;
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        const isValid = await verifyToken(storedToken);
        if (isValid) {
          try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setIsLoggedIn(true);

            // Redirect admin to dashboard if not already there
            if (
              userData?.isAdmin &&
              !window.location.pathname.startsWith("/admin-dashboard")
            ) {
              navigate("/admin-dashboard");
            }
          } catch (parseError) {
            console.error("Failed to parse user data:", parseError);
            clearAuth();
          }
        } else {
          clearAuth();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [navigate, verifyToken]);

  // Clear auth state
  const clearAuth = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };

  // Login function
  const login = async (userData, token) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      setUser(userData);
      setIsLoggedIn(true);
      setError(null);

      // Redirect based on user role
      if (userData.isAdmin) {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Failed to save authentication data");
      console.error("Login error:", err);
    }
  };

  // Logout function
  const logout = useCallback(async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if logout API fails, we should clear local auth
    } finally {
      clearAuth();
      navigate("/login");
    }
  }, [navigate]);

  // Check if user is an admin
  const isAdmin = useCallback(() => {
    return user?.isAdmin;
  }, [user]);

  // Provide auth context
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoggedIn,
        isAdmin,
        loading,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
