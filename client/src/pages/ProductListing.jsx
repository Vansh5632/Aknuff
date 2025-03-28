import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cards from '../components/Cards';
import CartSummary from '../components/CartSummary';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MarketplaceBanner = () => {
  return (
    <motion.div 
      className="relative overflow-hidden bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-6 relative z-10 flex items-center justify-between">
        <div className="flex-1 pr-8">
          <motion.h2 
            className="text-2xl font-extrabold mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Welcome to Epic Game Marketplace
          </motion.h2>
          <motion.p 
            className="text-sm opacity-80"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Discover, Buy, and Sell the Latest Digital Game Treasures
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
        >
          <motion.button
            className="bg-white text-[#6366f1] px-6 py-2 rounded-full font-bold shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Now
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/`);
        console.log("Fetched Products:", response.data); // Debugging
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a] text-white">
        <motion.div 
          className="animate-pulse text-xl font-semibold text-indigo-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
        >
          Loading marketplace...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="product-listing-page min-h-screen bg-[#0f172a] text-white relative overflow-hidden">
      {/* Top Banner */}
      <MarketplaceBanner />

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Page Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Search Input */}
            <motion.div 
              className="flex-grow w-full md:w-auto"
              whileFocus={{ scale: 1.02 }}
            >
              <input 
                type="search" 
                placeholder="Search games, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-[#6366f1]/30 focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
              />
            </motion.div>

            {/* Sell Product Button */}
            <motion.button
              onClick={() => navigate('/product-selling')}
              className="px-6 py-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold rounded-lg shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Sell Your Product
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Products Section */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-900/80 rounded-xl shadow-lg p-6 mb-6 border border-[#6366f1]/20">
              <h2 className="text-xl font-bold text-white mb-4">
                {filteredProducts.length} Available Products
              </h2>
              {filteredProducts.length > 0 ? (
                <Cards games={filteredProducts} />
              ) : (
                <motion.div 
                  className="text-center text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p>No products found matching your search</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Cart Summary (for logged-in users) */}
          {user && (
            <motion.div 
              className="lg:w-80"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="sticky top-6">
                <CartSummary />
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductListing;
