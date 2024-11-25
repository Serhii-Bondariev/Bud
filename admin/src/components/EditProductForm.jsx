import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts, updateProduct } from '../utils/api';
import { toast } from 'react-toastify';

const EditProductForm = ({ onProductUpdated }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    isPromotional: false, // Додаємо поле для акційного товару
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await fetchProducts();
        const productToEdit = products.find(prod => prod._id === id);
        setProduct(productToEdit);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = e => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('isPromotional', product.isPromotional); // Додаємо акційний статус
    if (product.image) formData.append('image', product.image);

    try {
      const updatedProduct = await updateProduct(id, formData);
      onProductUpdated(updatedProduct);
      toast.success('Product updated successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error updating product');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Edit Product</h2>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
        style={styles.input}
      />
      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Product Description"
        required
        style={styles.textarea}
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
        required
        style={styles.input}
      />
      <input
        type="text"
        name="category"
        value={product.category}
        onChange={handleChange}
        placeholder="Category"
        required
        style={styles.input}
      />
      <input
        type="file"
        name="image"
        onChange={handleImageChange}
        style={styles.fileInput}
      />
      <label style={styles.checkboxLabel}>
        <input
          type="checkbox"
          name="isPromotional"
          checked={product.isPromotional}
          onChange={handleChange}
          style={styles.checkbox}
        />
        Promotional Product
      </label>
      <button type="submit" style={styles.submitButton}>
        Save Changes
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '0 auto',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    resize: 'vertical',
  },
  fileInput: {
    padding: '5px',
    fontSize: '16px',
    marginBottom: '10px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '16px',
  },
  checkbox: {
    transform: 'scale(1.2)',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default EditProductForm;
