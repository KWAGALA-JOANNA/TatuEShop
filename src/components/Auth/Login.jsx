import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Typography, Divider, Alert } from "@mui/material";
import { Google as GoogleIcon, Lock, Email, ArrowForward } from "@mui/icons-material";
import { useAuth } from "../Hooks/UseAuth";
import { useSpring, animated } from "@react-spring/web";
import { loginUser, loginWithGoogle } from "../../utils/authUtils.js";
import tatuLogo from "./tatu-logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const redirectUserBasedOnRole = useCallback((user) => {
    if (!user) {
      setError("User authentication failed");
      return;
    }

    console.log("Auth user data:", {
      id: user.id,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      isApproved: user.isApproved
    });

    // Immediate redirect for admin users
    if (user.isAdmin) {
      navigate("/admin-dashboard", { replace: true });
      return;
    }

    // Handle supplier approval status
    if (user.role === 'supplier') {
      navigate(user.isApproved ? "/supplier-dashboard" : "/pending-approval", { replace: true });
      return;
    }

    // Default redirect for regular users
    navigate("/profile", { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (user) {
      // Immediate redirect for admin, slight delay for others
      const redirectDelay = user.isAdmin ? 0 : 100;
      const timer = setTimeout(() => {
        redirectUserBasedOnRole(user);
      }, redirectDelay);
      return () => clearTimeout(timer);
    }
  }, [user, redirectUserBasedOnRole]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser(email, password);
      
      if (response.error) {
        throw response;
      }

      await login(response.user);

    } catch (err) {
      console.error("Login error:", err);
      
      let errorMessage = "Login failed. Please try again.";
      if (err.code || err.error) {
        switch(err.code) {
          case 'CREDENTIALS_REQUIRED':
            errorMessage = "Email and password are required";
            break;
          case 'USER_NOT_FOUND':
            errorMessage = "No account found with this email";
            break;
          case 'INVALID_CREDENTIALS':
            errorMessage = "Invalid email or password";
            break;
          case 'ACCOUNT_NOT_APPROVED':
            errorMessage = "Your account is pending approval";
            break;
          case 'ACCOUNT_SUSPENDED':
            errorMessage = "This account has been suspended";
            break;
          default:
            errorMessage = err.error || err.message;
        }

        if (err.validationErrors) {
          errorMessage = Object.values(err.validationErrors).join(', ');
        }
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    
    try {
      const response = await loginWithGoogle();
      
      if (response.error) {
        throw response;
      }

      await login(response.user);

    } catch (err) {
      console.error("Google login error:", err);
      
      let errorMessage = "Google login failed";
      if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = "Login popup was closed - please try again";
      } else if (err.error) {
        errorMessage = err.error;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setGoogleLoading(false);
    }
  };

  const backgroundAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 50, friction: 10 },
  });

  return (
    <animated.div 
      style={backgroundAnimation}
      className="min-h-screen flex items-center justify-center bg-gray-50 p-4"
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <img 
              src={tatuLogo} 
              alt="Tatu Logo" 
              className="w-16 h-16 object-contain" 
            />
          </div>

          <Typography 
            variant="h5" 
            component="h1" 
            className="text-center font-bold text-gray-800 mb-2"
          >
            Welcome Back
          </Typography>
          
          <Typography 
            variant="body2" 
            className="text-center text-gray-500 mb-6"
          >
            Sign in to access your account
          </Typography>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="mb-4 py-2.5 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50"
          >
            {googleLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : "Continue with Google"}
          </Button>

          <Divider className="my-6 text-gray-400 text-xs">OR</Divider>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Email className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  disabled={loading}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link 
                  to="/forgot-password" 
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              className="py-2.5 mt-4 bg-primary-600 hover:bg-primary-700 focus:ring-primary-500"
              endIcon={!loading && <ArrowForward />}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Don&apos;t have an account? </span>
            <Link 
              to="/register" 
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default Login;