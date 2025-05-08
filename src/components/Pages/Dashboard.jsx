import { useEffect, useState } from 'react';
import api from '../../utils/authUtils.js';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // Fetch all data on component mount
  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchOrders();
    fetchCategories();
    fetchCoupons();
    fetchSuppliers();
  }, []);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await api.get('/users/getall');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products/getall');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/getall');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories/getall');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch coupons
  const fetchCoupons = async () => {
    try {
      const response = await api.get('/coupons/getall');
      setCoupons(response.data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  // Fetch suppliers
  const fetchSuppliers = async () => {
    try {
      const response = await api.get('/suppliers/getall');
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  // Handle delete for any model
  const handleDelete = async (endpoint, id) => {
    try {
      await api.delete(`/${endpoint}/delete/${id}`);
      // Refetch data after deletion
      fetchUsers();
      fetchProducts();
      fetchOrders();
      fetchCategories();
      fetchCoupons();
      fetchSuppliers();
    } catch (error) {
      console.error(`Error deleting ${endpoint}:`, error);
    }
  };

  // Handle approve supplier
  const handleApproveSupplier = async (id) => {
    try {
      await api.put(`/suppliers/approve/${id}`);
      fetchSuppliers(); // Refresh the suppliers list
    } catch (error) {
      console.error('Error approving supplier:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Users Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button component={Link} to={`/admin/users/edit/${user.id}`}>Edit</Button>
                    <Button onClick={() => handleDelete('users', user.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Products Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Button component={Link} to={`/admin/products/edit/${product.id}`}>Edit</Button>
                    <Button onClick={() => handleDelete('products', product.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Orders Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Orders</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>{order.order_status}</TableCell>
                  <TableCell>
                    <Button component={Link} to={`/admin/orders/edit/${order.id}`}>Edit</Button>
                    <Button onClick={() => handleDelete('orders', order.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Categories Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Categories</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <Button component={Link} to={`/admin/categories/edit/${category.id}`}>Edit</Button>
                    <Button onClick={() => handleDelete('categories', category.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Coupons Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Coupons</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Expiration Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell>{coupon.code}</TableCell>
                  <TableCell>{coupon.discount}</TableCell>
                  <TableCell>{coupon.expirationDate}</TableCell>
                  <TableCell>
                    <Button component={Link} to={`/admin/coupons/edit/${coupon.id}`}>Edit</Button>
                    <Button onClick={() => handleDelete('coupons', coupon.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Suppliers Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Suppliers</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.status}</TableCell>
                  <TableCell>
                    {supplier.status === 'pending' && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApproveSupplier(supplier.id)}
                      >
                        Approve
                      </Button>
                    )}
                    <Button component={Link} to={`/admin/suppliers/edit/${supplier.id}`}>Edit</Button>
                    <Button onClick={() => handleDelete('suppliers', supplier.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;