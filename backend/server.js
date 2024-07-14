const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  }).then(() => {
    console.log('Conexión exitosa a MongoDB');
  
  
  }).catch(err => {
    console.error('Error de conexión a MongoDB:', err.message);
  });

const db = mongoose.connection;


db.on('error', err => {
  console.error('Error de conexión a MongoDB:', err);
});

db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');})
if (db.readyState !== 1) {
    console.error('No se pudo conectar a MongoDB');
  }

const Product = require('./models/Product');
const Client = require('./models/Client');
const Sale = require('./models/Sale');

let products = [];
let sales = [];
let balance = 0;


app.post('/products', async (req, res, next) => {
    try {
      const { name, description, value, stock } = req.body;
      const newProduct = new Product({
        name,
        description,
        value,
        stock
      });
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      next(error);
    }
  });

  app.put('/products/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedProduct = req.body;
      const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      next(error);
    }
  });


  app.get('/products', async (req, res, next) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      next(error);
    }
  });


  app.get('/products/available', async (req, res, next) => {
    try {
      const availableProducts = await Product.find({ stock: { $gt: 0 } });
      res.json(availableProducts);
    } catch (error) {
      next(error);
    }
  });


  app.use(bodyParser.json());

  
  app.post('/cart', async (req, res, next) => {
      try {
          const { items, clientID } = req.body;
          let total = 0;
          let outOfStockItems = [];
          let purchasedItems = [];
  
          for (const item of items) {
              try {
                  const product = await Product.findById(item.id);
                  if (!product || product.stock < item.quantity) {
                      outOfStockItems.push(item);
                  } else {
                      product.stock -= item.quantity;
                      await product.save();
                      total += product.value * item.quantity;
                      const sale = new Sale({
                          productId: product._id,
                          clientID,
                          quantity: item.quantity,
                          totalPrice: product.value * item.quantity
                      });
                      await sale.save();
                      purchasedItems.push(sale);
                  }
              } catch (error) {
                  console.error('Error procesando el producto:', error);
                  outOfStockItems.push(item);
              }
          }
  
          if (outOfStockItems.length > 0) {
              res.status(400).json({ message: 'Some items are out of stock or insufficient quantity', outOfStockItems });
          } else {
              res.json({ message: 'Purchase completed', total });
          }
      } catch (error) {
          next(error);
      }
  });
  
 
  app.get('/sales', async (req, res, next) => {
      try {
          const sales = await Sale.find().populate('productId');
          const balance = sales.reduce((acc, sale) => acc + sale.totalPrice, 0);
          res.json({ sales, balance });
      } catch (error) {
          next(error);
      }
  });

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
