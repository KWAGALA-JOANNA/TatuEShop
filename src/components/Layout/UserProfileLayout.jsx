import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, CircularProgress, Avatar, Typography, Box } from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
  });
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login"); // Redirect to login if not logged in
    } else {
      setUser(user);
      setFormData(user);
      fetchCartItems(user.id); // Fetch cart items for the logged-in user
    }
  }, [navigate]);

  // Fetch cart items
  const fetchCartItems = async (userId) => {
    try {
      const response = await axios.get(`/api/cartitem?userId=${userId}`);
      // Ensure cartItems is always an array
      setCartItems(Array.isArray(response.data.cartItems) ? response.data.cartItems : []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]); // Fallback to an empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update user profile
  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put("/api/user", formData);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Update localStorage
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  // Delete user account
  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete("/api/user");
        localStorage.removeItem("user"); // Remove user from localStorage
        alert("Account deleted successfully!");
        navigate("/login");
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete account.");
      }
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="p-8 bg-base-200 min-h-screen">
      <Box className="bg-base-100 p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar alt={user?.firstName} src="/default-avatar.png" sx={{ width: 80, height: 80 }} />
          <Typography variant="h4" className="font-bold">
            {user?.firstName} {user?.lastName}
          </Typography>
        </div>

        {editMode ? (
          <div className="space-y-4">
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              fullWidth
            />
            <Button variant="contained" onClick={handleUpdateProfile}>
              Save Changes
            </Button>
            <Button variant="outlined" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Typography variant="body1">
              <strong>Email:</strong> {user?.email}
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> {user?.phone_number}
            </Typography>
            <Button variant="contained" onClick={() => setEditMode(true)}>
              Edit Profile
            </Button>
          </div>
        )}

        <div className="mt-8">
          <Typography variant="h5" className="font-bold mb-4">
            Cart Items
          </Typography>
          {cartItems.length > 0 ? (
            <ul className="space-y-2">
              {cartItems.map((item) => (
                <li key={item.id} className="bg-base-300 p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div>
                      <Typography variant="body1" className="font-semibold">
                        {item.name}
                      </Typography>
                      <Typography variant="body2">
                        ${item.price} x {item.quantity}
                      </Typography>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <Typography variant="body1">Your cart is empty.</Typography>
          )}
        </div>

        <div className="mt-8 flex space-x-4">
          <Button variant="contained" color="error" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Profile;