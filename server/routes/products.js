const express = require('express');
const multer = require('multer');
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');
const router = express.Router();

// Налаштування multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Маршрути
router.post('/', upload.single('image'), addProduct);
router.get('/', getProducts);
router.put('/:id', upload.single('image'), updateProduct); // Для оновлення продукту з можливим зображенням
router.delete('/:id', deleteProduct);

module.exports = router;
