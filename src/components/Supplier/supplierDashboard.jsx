import React, { useState } from 'react';
import api from '../utils/api';

const SupplierDashboard = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: '',
    categoryId: '',
    supplierId: '',
  });

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products/create', product);
      alert('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div>
      <h1>Supplier Dashboard</h1>
      <form onSubmit={handleCreateProduct}>
        <input
          type="text"
          placeholder="Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          value={product.stock}
          onChange={(e) => setProduct({ ...product, stock: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category ID"
          value={product.categoryId}
          onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Supplier ID"
          value={product.supplierId}
          onChange={(e) => setProduct({ ...product, supplierId: e.target.value })}
        />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default SupplierDashboard;