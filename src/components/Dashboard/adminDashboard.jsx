import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom'; // Added Link import
import { Box, Typography } from '@mui/material';
import { api } from '../../utils/authUtils.js';
import LoadingSpinner from './Shared/LoadingSpinner';
import ErrorMessage from './Shared/ErrorMessage';
import UsersList from './Users/UserList';
import UserForm from './Users/UserForm';
import ProductsList from './Products/ProductList';
import ProductForm from './Products/ProductForm';
import SuppliersList from './Suppliers/SupplierList';
import SupplierForm from './Suppliers/SupplierForm';
import CategoriesList from './Categories/CategoryList';
import CategoryForm from './Categories/CategoryForm';
import OrdersList from './Orders/OrderList';
import OrderDetails from './Orders/OrderDetails';
import DashboardAnalytics from './Analytics/DashboardAnalytics';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check admin status on mount
  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await api.get('/users/verify-admin');
        if (!response.data.isAdmin) {
          throw new Error('Unauthorized access');
        }
      } catch (err) {
        setError(err.message || 'Failed to verify admin status');
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar would go here */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route index element={<DashboardOverview />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/new" element={<UserForm />} />
          <Route path="users/:id" element={<UserForm editMode />} />
          
          <Route path="products" element={<ProductsList />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id" element={<ProductForm editMode />} />
          
          <Route path="suppliers" element={<SuppliersList />} />
          <Route path="suppliers/new" element={<SupplierForm />} />
          <Route path="suppliers/:id" element={<SupplierForm editMode />} />
          
          <Route path="categories" element={<CategoriesList />} />
          <Route path="categories/new" element={<CategoryForm />} />
          <Route path="categories/:id" element={<CategoryForm editMode />} />
          
          <Route path="orders" element={<OrdersList />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          
          <Route path="analytics" element={<DashboardAnalytics />} />
          
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

// Dashboard Overview Component (replaces the old monolithic dashboard)
const DashboardOverview = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      {/* Can include summary widgets or quick links here */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <DashboardCard 
          title="Total Users" 
          value="1,234" 
          link="/admin/users" 
        />
        <DashboardCard 
          title="Total Products" 
          value="567" 
          link="/admin/products" 
        />
        <DashboardCard 
          title="Pending Orders" 
          value="89" 
          link="/admin/orders" 
        />
      </Box>
    </Box>
  );
};

// Reusable Dashboard Card Component
const DashboardCard = ({ title, value, link }) => (
  <Box 
    component={Link} 
    to={link}
    sx={{
      p: 3,
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 1,
      minWidth: 200,
      textAlign: 'center',
      textDecoration: 'none',
      '&:hover': {
        boxShadow: 3,
      }
    }}
  >
    <Typography variant="h6" color="text.secondary">
      {title}
    </Typography>
    <Typography variant="h3" sx={{ mt: 1 }}>
      {value}
    </Typography>
  </Box>
);

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default AdminDashboard;