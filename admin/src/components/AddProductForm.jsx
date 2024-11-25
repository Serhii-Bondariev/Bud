import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Імпортуємо toast
import 'react-toastify/dist/ReactToastify.css'; // Імпортуємо стилі для toast

const AddProductForm = ({ onProductAdded }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: null,
    isPromotional: false, // Додаємо поле для акційного товару
  });

  const [descriptionTemplate, setDescriptionTemplate] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDescriptionTemplateChange = e => {
    const { value } = e.target;
    setDescriptionTemplate(value);
    setProduct(prev => ({
      ...prev,
      description: value,
    }));
  };

  const handleImageChange = e => {
    setProduct(prev => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handlePromotionalChange = e => {
    const { checked } = e.target;
    setProduct(prev => ({
      ...prev,
      isPromotional: checked,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('image', product.image); // Додаємо файл
    formData.append('isPromotional', product.isPromotional); // Додаємо поле для акційного товару

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newProduct = await response.json();
        onProductAdded(newProduct); // Оновлюємо стан у батьківському компоненті
        setProduct({
          name: '',
          price: '',
          category: '',
          description: '',
          image: null,
          isPromotional: false, // Скидаємо значення чекбокса
        }); // Очистка форми
        toast.success('Продукт успішно додано!'); // Показуємо успішне повідомлення
      } else {
        toast.error('Помилка при додаванні продукту!'); // Показуємо повідомлення про помилку
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Помилка при підключенні до сервера!'); // Показуємо повідомлення про помилку з підключенням
    }
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Add New Product
        </h3>
        <div>
          <label
            htmlFor="name"
            style={{ display: 'block', marginBottom: '5px' }}
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '3px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div>
          <label
            htmlFor="price"
            style={{ display: 'block', marginBottom: '5px' }}
          >
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '3px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div>
          <label
            htmlFor="category"
            style={{ display: 'block', marginBottom: '5px' }}
          >
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '3px',
              boxSizing: 'border-box',
            }}
          >
            <option value="">Select Category</option>
            <option value="Building Materials">Building Materials</option>
            <option value="Furniture">Furniture</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="description"
            style={{ display: 'block', marginBottom: '5px' }}
          >
            Description:
          </label>
          <select
            id="description"
            value={descriptionTemplate}
            onChange={handleDescriptionTemplateChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '3px',
              boxSizing: 'border-box',
            }}
          >
            <option value="">Select Description Template</option>
            <option value="This product is perfect for your home, easy to apply and has high quality.">
              Standard Home Product Description
            </option>
            <option value="This cement is designed for construction and repair, with high durability and strength.">
              Cement Description
            </option>
            <option value="This furniture is durable, elegant, and perfect for any modern living space.">
              Furniture Description
            </option>
          </select>
        </div>
        <div>
          <label
            htmlFor="image"
            style={{ display: 'block', marginBottom: '5px' }}
          >
            Image:
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '3px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div>
          <label
            htmlFor="isPromotional"
            style={{ display: 'block', marginBottom: '5px' }}
          >
            Акційний товар:
          </label>
          <input
            type="checkbox"
            id="isPromotional"
            name="isPromotional"
            checked={product.isPromotional}
            onChange={handlePromotionalChange}
            style={{
              marginRight: '10px',
            }}
          />
          <span>Позначити товар як акційний</span>
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
