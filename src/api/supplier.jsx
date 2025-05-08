import axiosInstance from './axios';

export const getSuppliers = async () => {
  return await axiosInstance.get('/suppliers');
};

export const approveSupplier = async (id) => {
  return await axiosInstance.post(`/suppliers/${id}/approve`);
};

export const rejectSupplier = async (id) => {
  return await axiosInstance.post(`/suppliers/${id}/reject`);
};