const express = require('express');
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Route to create a new product
router.post('/', authMiddleware,ProductController.createProduct);

// Route to get all products
router.get('/', ProductController.getAllProducts);

// Route to get a single product by ID
router.get('/:id', ProductController.getProductById);

// Route to update a product by ID
router.put('/:id',authMiddleware, ProductController.updateProduct);

// Route to delete a product by ID
router.delete('/:id',authMiddleware, ProductController.deleteProduct);

module.exports = router;