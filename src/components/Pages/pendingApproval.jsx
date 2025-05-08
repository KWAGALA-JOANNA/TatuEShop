// PendingApproval.js
import React from 'react';
import { Typography, Box, Container } from '@mui/material';

const PendingApproval = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(-45deg, #221064B1, #090866, #044F6B, #1F0558)",
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
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Pending Approval
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your account is pending approval from the admin. You will be notified once your account is approved.
        </Typography>
      </Container>
    </Box>
  );
};

export default PendingApproval;