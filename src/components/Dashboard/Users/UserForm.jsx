import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../../utils/authUtils.js';
import { TextField, Button, Box, Typography } from '@mui/material';

const UserForm = ({ editMode }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (editMode) {
      const fetchUser = async () => {
        try {
          const response = await api.get(`/users/${id}`);
          setUser(response.data);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchUser();
    }
  }, [editMode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editMode) {
        await api.put(`/users/${id}`, user);
      } else {
        await api.post('/users', user);
      }
      navigate('/admin/users');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      // Now using the error state by displaying it to the user
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    setUser(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {editMode ? 'Edit' : 'Create'} User
      </Typography>
      
      {error && (
        <Typography color="error" paragraph>
          {error}
        </Typography>
      )}
      
      <TextField
        label="Name"
        value={user.name}
        onChange={handleChange('name')}
        fullWidth
        margin="normal"
        required
      />
      
      <TextField
        label="Email"
        type="email"
        value={user.email}
        onChange={handleChange('email')}
        fullWidth
        margin="normal"
        required
      />
      
      <TextField
        select
        label="Role"
        value={user.role}
        onChange={handleChange('role')}
        fullWidth
        margin="normal"
        SelectProps={{
          native: true,
        }}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="supplier">Supplier</option>
      </TextField>
      
      <Box sx={{ mt: 2 }}>
        <Button 
          type="submit" 
          variant="contained" 
          disabled={loading}
          sx={{ mr: 2 }}
        >
          {loading ? 'Processing...' : 'Save'}
        </Button>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/admin/users')}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

UserForm.propTypes = {
  /** Whether the form is in edit mode (true) or create mode (false) */
  editMode: PropTypes.bool.isRequired,
};

export default UserForm;