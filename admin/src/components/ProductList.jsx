import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../utils/api';
import { toast } from 'react-toastify';

const ProductList = ({ products, onProductDeleted, onProductUpdated }) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleDeleteConfirmation = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete);
      onProductDeleted(productToDelete);
      setIsConfirmingDelete(false); // Закриваємо модальне вікно
      setProductToDelete(null); // Скидаємо продукт для видалення
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete the product');
    }
  };

  const handleDelete = id => {
    setIsConfirmingDelete(true);
    setProductToDelete(id);
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false);
    setProductToDelete(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Products List</h2>
      <ul style={styles.productList}>
        {products.length > 0 ? (
          products.map(product => (
            <li key={product._id} style={styles.productItem}>
              {product.image ? (
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.name}
                  style={styles.productImage}
                />
              ) : (
                <div style={styles.noImage}>No Image</div>
              )}
              <strong style={styles.productName}>{product.name}</strong>
              {product.isPromotional && (
                <span style={styles.promotionalTag}>АКЦІЯ!!!</span>
              )}
              <p style={styles.productDescription}>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <div style={styles.buttonContainer}>
                <Link
                  to={`/edit-product/${product._id}`}
                  style={styles.editButton}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </ul>

      {/* Модальне вікно підтвердження видалення */}
      {isConfirmingDelete && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalHeading}>
              Are you sure you want to delete this product?
            </h3>
            <div>
              <button
                onClick={handleDeleteConfirmation}
                style={styles.confirmButton}
              >
                Yes, delete
              </button>
              <button onClick={cancelDelete} style={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    marginTop: '30px',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  productList: {
    listStyleType: 'none',
    padding: 0,
  },
  productItem: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  productImage: {
    maxWidth: '100px',
    maxHeight: '100px',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  noImage: {
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    color: '#fff',
    fontSize: '14px',
    borderRadius: '4px',
  },
  productName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  promotionalTag: {
    color: '#e63946',
    fontSize: '14px',
    marginLeft: '10px',
    fontWeight: 'bold',
  },
  productDescription: {
    color: '#555',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '4px',
    textDecoration: 'none',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ff4e4e',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    width: '300px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  modalHeading: {
    fontSize: '18px',
    marginBottom: '20px',
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '4px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    marginRight: '10px',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '4px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default ProductList;
