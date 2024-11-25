const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const path = require('path');

// Ініціалізація
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Middleware для обробки помилок
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Щось пішло не так!' });
});

// Підключення до MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(chalk.green.bold('MongoDB підключено успішно!')))
  .catch(err =>
    console.error(chalk.red.bold('Помилка підключення до MongoDB:'), err)
  );

// Роутери
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Старт сервера
app.listen(PORT, () =>
  console.log(chalk.blue.bold(`Server працює на http://localhost:${PORT}`))
);
