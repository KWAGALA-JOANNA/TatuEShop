import { useState, useEffect } from 'react';
import { api } from '../../../utils/authUtils.js';
import CrudTable from '../Shared/CrudTable.jsx';
import StatusBadge from '../Shared/StatusBadge.jsx';

const SuppliersList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSuppliers = async () => {
    try {
      const response = await api.get('/suppliers');
      setSuppliers(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.put(`/suppliers/${id}/approve`);
      fetchSuppliers();
    } catch (err) {
      setError(err.message);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { 
      field: 'status', 
      headerName: 'Status',
      renderCell: (params) => <StatusBadge status={params.value} />
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        params.row.status === 'pending' && (
          <button 
            onClick={() => handleApprove(params.row.id)}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Approve
          </button>
        )
      )
    }
  ];

  return (
    <CrudTable
      title="Suppliers"
      data={suppliers}
      columns={columns}
      loading={loading}
      error={error}
      onRefresh={fetchSuppliers}
      basePath="/admin/suppliers"
    />
  );
};

export default SuppliersList;