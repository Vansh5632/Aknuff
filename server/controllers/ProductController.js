const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
    console.log('Request body:', req.body);
    console.log('Request user:', req.user);
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Unauthorized: User information is missing' });
        }
        const { title, description, price, platform, genre } = req.body;
        if (!title || !price) {
            return res.status(400).json({ error: 'Title and price are required' });
        }
        const product = new Product({
            title,
            description,
            price,
            platform,
            genre,
            user: req.user.id,
        });
        const savedProduct = await product.save();
        console.log('Product created successfully:', savedProduct);
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error creating product:', error.stack);
        res.status(400).json({ error: error.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => { // Fixed: Added req
    console.log('Fetching all products');
    try {
        const products = await Product.find().populate('user', 'username email');
        console.log('Products fetched successfully:', products);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error.stack);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    console.log('Fetching product with ID:', req.params.id);
    try {
        const product = await Product.findById(req.params.id).populate('user', 'username email');
        if (!product) {
            console.warn('Product not found with ID:', req.params.id);
            return res.status(404).json({ error: 'Product not found' });
        }
        console.log('Product fetched successfully:', product);
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error.stack);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    console.log('Updating product with ID:', req.params.id, 'with data:', req.body);
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Unauthorized: User information is missing' });
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product) {
            console.warn('Product not found with ID:', req.params.id);
            return res.status(404).json({ error: 'Product not found' });
        }
        console.log('Product updated successfully:', product);
        res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product:', error.stack);
        res.status(400).json({ error: error.message });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    console.log('Deleting product with ID:', req.params.id);
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Unauthorized: User information is missing' });
        }
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            console.warn('Product not found with ID:', req.params.id);
            return res.status(404).json({ error: 'Product not found' });
        }
        console.log('Product deleted successfully:', product);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error.stack);
        res.status(500).json({ error: 'Server error' });
    }
};