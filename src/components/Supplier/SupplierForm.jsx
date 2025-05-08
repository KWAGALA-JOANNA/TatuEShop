import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

const SupplierForm = () => {
  const [formData, setFormData] = useState({
    name: "", // Combined name field
    email: "", // Added email field
    businessName: "",
    address: "",
    phone_number: "",
    password: "",
    role: "supplier",
    status: "pending",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Validate phone number format (10 digits)
  const validatePhoneNumber = (phone) => {
    const re = /^\d{10}$/;
    return re.test(String(phone));
  };

  // Function to send email
  const sendEmail = async (to, subject, text) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/email/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, subject, text }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.businessName ||
      !formData.address ||
      !formData.phone_number ||
      !formData.password
    ) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePhoneNumber(formData.phone_number)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Register the supplier by sending a POST request to the backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/suppliers/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed. Please try again.");
      }

      const data = await response.json();

      // Set success message
      setSuccess("Registration successful! Awaiting admin approval.");

      // Send an email to the supplier
      const emailSubject = "Supplier Registration Pending Approval";
      const emailText = `Dear ${formData.name},\n\nThank you for registering as a supplier. Your account is currently pending approval from the admin. You will be notified once your account is approved.\n\nBest regards,\nAdmin Team`;

      // Use your email service to send the email
      await sendEmail(formData.email, emailSubject, emailText);

      // Redirect to the pending approval page
      navigate("/pending-approval");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Supplier Registration
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

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
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
          />
          <TextField
            label="Business Name"
            name="businessName"
            fullWidth
            value={formData.businessName}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <TextField
            label="Address"
            name="address"
            fullWidth
            value={formData.address}
            onChange={handleChange}
            required
            disabled={loading}
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
            inputProps={{ maxLength: 10 }}
            helperText="Please enter a 10-digit phone number"
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
              "Register as Supplier"
            )}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SupplierForm;