import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
  CircularProgress,
  Divider,
  Alert,
  
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { registerUser, loginWithGoogle } from "../../utils/authUtils.js";
import { useAuth } from "../Hooks/UseAuth";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    if (!termsAccepted) {
      setError("You must accept the Terms & Conditions to continue.");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    // Password validation (at least 8 characters)
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }

    // Phone number basic validation
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(formData.phone_number.replace(/[^0-9]/g, ''))) {
      setError("Please enter a valid phone number (10-15 digits).");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Clear any previous errors or success messages
    setError("");
    setSuccess("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Call the registerUser function from authUtils.js
      const data = await registerUser(formData);

      // Set success message
      setSuccess(data.message || "Registration successful!");
      
      // Check if user data was returned
      if (data.user && data.token) {
        // Log the user in
        login(data.user, data.token);
        
        // Redirect based on role if role exists, otherwise go to user profile
        if (data.user.role) {
          switch (data.user.role.toLowerCase()) {
            case "admin":
              navigate("/dashboard");
              break;
            case "supplier":
              navigate("/supplier-dashboard");
              break;
            default:
              navigate("/profile");
          }
        } else {
          navigate("/profile");
        }
      } else {
        // If no user data, redirect to login
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (!termsAccepted) {
      setError("You must accept the Terms & Conditions to continue.");
      return;
    }

    setGoogleLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await loginWithGoogle();

      if (data.user && data.token) {
        setSuccess("Google authentication successful!");
        login(data.user, data.token);

        // Redirect based on role if role exists, otherwise go to user profile
        if (data.user.role) {
          switch (data.user.role.toLowerCase()) {
            case "admin":
              navigate("/dashboard");
              break;
            case "supplier":
              navigate("/supplier-dashboard");
              break;
            default:
              navigate("/profile");
          }
        } else {
          navigate("/profile");
        }
      } else {
        setError("Google signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Google auth error:", err);
      setError(err.error || "Google signup failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(-45deg, #221064B1, #090866, #044F6B, #1F0558)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 10s ease infinite",
        px: 2,
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <img
            src="./tatu-logo.png"
            alt="Logo"
            width={80}
            height={80}
            style={{ objectFit: "contain" }}
          />
        </Box>

        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Sign Up
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {/* Google Sign Up Button */}
        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignup}
          disabled={googleLoading || loading}
          sx={{
            mt: 2,
            py: 1.5,
            color: "#4285F4",
            borderColor: "#4285F4",
            "&:hover": { backgroundColor: "#f1f3f4", borderColor: "#4285F4" },
            fontWeight: "bold",
          }}
        >
          {googleLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Continue with Google"
          )}
        </Button>

        <Divider sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <form
          onSubmit={handleRegister}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            value={formData.firstName}
            onChange={handleChange}
            required
            disabled={loading}
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            value={formData.lastName}
            onChange={handleChange}
            required
            disabled={loading}
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            inputProps={{ maxLength: 100 }}
          />
          <TextField
            label="Phone Number"
            type="tel"
            name="phone_number"
            fullWidth
            value={formData.phone_number}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="e.g. 0712345678"
            inputProps={{ pattern: "[0-9]*", maxLength: 15 }}
            helperText="Enter a valid phone number"
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
            inputProps={{ minLength: 8 }}
            helperText="Password must be at least 8 characters long"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                disabled={loading || googleLoading}
                color="primary"
              />
            }
            label={
              <span>
                I accept the{" "}
                <Link to="/terms" target="_blank" style={{ color: "#4285F4" }}>
                  Terms & Conditions
                </Link>
              </span>
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ fontWeight: "bold", py: 1.5, mt: 1 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <Typography variant="body2" mt={2}>
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none", color: "#4285F4" }}>
            Login
          </Link>
        </Typography>
      </Container>

      <style>
        {`
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </Box>
  );
};

export default Register;