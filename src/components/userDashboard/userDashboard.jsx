import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data for User Dashboard (Example API call)
    fetch('/api/user/dashboard', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="p-4">
      <Typography variant="h4" className="text-center mb-6">
        User Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="p-4">
            <Typography variant="h6">Account Settings</Typography>
            <Button
              component={Link}
              to="/user/settings"
              variant="contained"
              color="primary"
              fullWidth
            >
              Manage Account
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="p-4">
            <Typography variant="h6">Your Orders</Typography>
            <Button
              component={Link}
              to="/user/orders"
              variant="contained"
              color="primary"
              fullWidth
            >
              View Orders
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserDashboard;
