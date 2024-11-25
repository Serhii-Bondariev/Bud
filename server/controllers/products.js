const Product = require('../models/Product');

// Отримати всі продукти
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Помилка сервера', error: err.message });
  }
};

// Додати новий продукт
const addProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      image: req.file ? req.file.path.replace(/\\/g, '/') : null, // Якщо зображення не передано, залишаємо null
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Помилка при створенні продукту', error: err.message });
  }
};

// Оновити продукт
const updateProduct = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path.replace(/\\/g, '/'); // Оновлення зображення
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Помилка при оновленні продукту', error: err.message });
  }
};

// Видалити продукт
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Продукт видалено' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Помилка при видаленні продукту', error: err.message });
  }
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };
