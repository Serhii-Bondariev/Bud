import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../utils/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    getProducts();
  }, []);

  const handleDelete = async id => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <div className="product-list">
      <h1>Products</h1>
      {products.map(product => (
        <div key={product._id} className="product-card">
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <button onClick={() => handleDelete(product._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
