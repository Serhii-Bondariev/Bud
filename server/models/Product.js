const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // Шлях до фото
  isPromotional: { type: Boolean, default: false }, // Акційний товар
});

module.exports = mongoose.model('Product', productSchema);
