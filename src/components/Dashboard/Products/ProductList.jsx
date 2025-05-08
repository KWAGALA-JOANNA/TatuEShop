import { useState, useEffect } from 'react';
import { api } from '../../../utils/authUtils.js';
import CrudTable from '../Shared/CrudTable.jsx';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'price', headerName: 'Price', type: 'number' },
    { field: 'stock', headerName: 'Stock', type: 'number' },
    { field: 'category', headerName: 'Category' }
  ];

  return (
    <CrudTable
      title="Products"
      data={products}
      columns={columns}
      loading={loading}
      error={error}
      onRefresh={fetchProducts}
      basePath="/admin/products"
    />
  );
};

export default ProductsList;