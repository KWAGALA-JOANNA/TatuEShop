import { useState, useEffect } from 'react';
import { getSuppliers, approveSupplier, rejectSupplier } from '../api/supplier';

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await getSuppliers();
      setSuppliers(response.data); // Assuming response is in the format { data: [...] }
      setError(null);
    } catch (err) {
      console.error('Error fetching suppliers:', err);
      setError('Failed to fetch suppliers');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveSupplier(id);
      // Update the supplier's status locally
      setSuppliers((prevSuppliers) =>
        prevSuppliers.map(supplier =>
          supplier.id === id ? { ...supplier, status: 'approved' } : supplier
        )
      );
    } catch (err) {
      console.error('Error approving supplier:', err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectSupplier(id);
      // Update the supplier's status locally
      setSuppliers((prevSuppliers) =>
        prevSuppliers.map(supplier =>
          supplier.id === id ? { ...supplier, status: 'rejected' } : supplier
        )
      );
    } catch (err) {
      console.error('Error rejecting supplier:', err);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return {
    suppliers,
    loading,
    error,
    approve: handleApprove,
    reject: handleReject,
    refresh: fetchSuppliers
  };
};
