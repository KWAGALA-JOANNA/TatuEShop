import { useState, useEffect } from 'react';
import { api } from '../../../utils/authUtils.js';
import CrudTable from '../Shared/CrudTable.jsx';
import StatusBadge from '../Shared/StatusBadge.jsx';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { 
      field: 'role', 
      headerName: 'Role',
      renderCell: (params) => <StatusBadge status={params.value} />
    },
    { field: 'createdAt', headerName: 'Joined', type: 'date' }
  ];

  return (
    <CrudTable
      title="Users"
      data={users}
      columns={columns}
      loading={loading}
      error={error}
      onRefresh={fetchUsers}
      basePath="/admin/users"
    />
  );
};

export default UsersList;