import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authUtils from '../../utils/authUtils.js';
import { TextField, Button } from '@mui/material';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get(`/users/get/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await api.put(`/users/update/${id}`, user);
      navigate('/admin');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <div className="space-y-4">
        <TextField
          label="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          fullWidth
        />
        <TextField
          label="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          fullWidth
        />
        <TextField
          label="Role"
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
          fullWidth
        />
        <Button variant="contained" onClick={handleUpdateUser}>
          Update User
        </Button>
      </div>
    </div>
  );
};

export default EditUser;