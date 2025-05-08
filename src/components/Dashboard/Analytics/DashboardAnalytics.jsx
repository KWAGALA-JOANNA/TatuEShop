import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  CircularProgress,
  useTheme
} from '@mui/material';
import { 
  BarChart, 
  LineChart, 
  PieChart,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { api } from '../../../utils/authUtils.js';
import ErrorMessage from '../Shared/ErrorMessage.jsx';
import StatCard from '../Analytics/StatCard.jsx';
import DateRangePicker from '../Analytics/DateRangePicker.jsx';

const DashboardAnalytics = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date()
  });
  const [data, setData] = useState({
    summary: {},
    salesData: [],
    revenueTrend: [],
    productPerformance: [],
    customerActivity: []
  });

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const params = {
        start: dateRange.start.toISOString(),
        end: dateRange.end.toISOString()
      };
      
      const response = await api.get('/analytics/dashboard', { params });
      setData(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const handleDateChange = (newRange) => {
    setDateRange(newRange);
  };

  if (loading && !data.summary.totalSales) {
    return <CircularProgress />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchAnalytics} />;
  }

  // Chart color schemes
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Dashboard Analytics
      </Typography>

      <Box sx={{ mb: 3 }}>
        <DateRangePicker 
          value={dateRange} 
          onChange={handleDateChange} 
        />
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Sales"
            value={`$${data.summary.totalSales?.toLocaleString() || 0}`}
            change={data.summary.salesChange}
            icon="💰"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value={data.summary.totalOrders?.toLocaleString() || 0}
            change={data.summary.ordersChange}
            icon="📦"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="New Customers"
            value={data.summary.newCustomers?.toLocaleString() || 0}
            change={data.summary.customersChange}
            icon="👥"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Conversion Rate"
            value={`${data.summary.conversionRate?.toFixed(1) || 0}%`}
            change={data.summary.conversionChange}
            icon="📊"
          />
        </Grid>
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Revenue Trend
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={data.revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke={theme.palette.primary.main} 
                  strokeWidth={2}
                  name="Revenue"
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke={theme.palette.secondary.main} 
                  name="Orders"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Sales by Category
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={data.productPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.productPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Weekly Sales
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={data.salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="sales" 
                  fill={theme.palette.primary.main} 
                  name="Sales"
                />
                <Bar 
                  dataKey="previous" 
                  fill={theme.palette.grey[500]} 
                  name="Previous Period"
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Customer Activity
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={data.customerActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="newCustomers" 
                  fill={theme.palette.success.main} 
                  name="New Customers"
                />
                <Bar 
                  dataKey="returningCustomers" 
                  fill={theme.palette.info.main} 
                  name="Returning Customers"
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardAnalytics;