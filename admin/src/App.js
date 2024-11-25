import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import { ToastContainer } from 'react-toastify'; // Імпортуємо ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Імпортуємо стилі для toast

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductAdded = newProduct => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const handleProductUpdated = updatedProduct => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  const handleProductDeleted = id => {
    setProducts(prevProducts =>
      prevProducts.filter(product => product._id !== id)
    );
  };

  return (
    <Router>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>
          Product List
        </Link>
        <Link to="/add-product">Add Product</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <ProductList
              products={products}
              onProductDeleted={handleProductDeleted}
              onProductUpdated={handleProductUpdated}
            />
          }
        />
        <Route
          path="/add-product"
          element={<AddProductForm onProductAdded={handleProductAdded} />}
        />
        <Route
          path="/edit-product/:id"
          element={<EditProductForm onProductUpdated={handleProductUpdated} />}
        />
      </Routes>
      <ToastContainer /> {/* Додаємо контейнер для toast */}
    </Router>
  );
};

export default App;
