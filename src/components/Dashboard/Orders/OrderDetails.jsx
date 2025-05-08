import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TextField,
  MenuItem,
  Grid
  
} from '@mui/material';
import { api } from '../../../utils/authUtils.js';
import StatusBadge from '../Shared/StatusBadge.jsx';
import LoadingSpinner from '../Shared/LoadingSpinner.jsx';
import ErrorMessage from '../Shared/ErrorMessage.jsx';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  const statusOptions = [
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
  ];

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/${id}`);
        setOrder(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch order');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdating(true);
      const response = await api.put(`/orders/${id}/status`, { status: newStatus });
      setOrder(response.data);
    } catch (err) {
      setError(err.message || 'Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!order) return <Typography>Order not found</Typography>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Order #{order.orderNumber}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.product?.name}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography>Status: <StatusBadge status={order.status} /></Typography>
              <Typography>Date: {new Date(order.createdAt).toLocaleString()}</Typography>
              <Typography>Customer: {order.user?.name || 'Guest'}</Typography>
              <Typography>Email: {order.user?.email || order.guestEmail}</Typography>
            </Box>

            <TextField
              select
              fullWidth
              label="Update Status"
              value={order.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={updating}
              sx={{ mb: 2 }}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">
                Subtotal: ${order.subtotal.toFixed(2)}
              </Typography>
              <Typography variant="subtitle1">
                Shipping: ${order.shippingCost.toFixed(2)}
              </Typography>
              <Typography variant="subtitle1">
                Tax: ${order.taxAmount.toFixed(2)}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>
                Total: ${order.totalAmount.toFixed(2)}
              </Typography>
            </Box>
          </Paper>

          <Button
            variant="contained"
            onClick={() => navigate('/admin/orders')}
            fullWidth
          >
            Back to Orders
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetails;