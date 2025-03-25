// client/src/pages/ProductListing.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Cards from '../components/Cards';
import CartSummary from '../components/CartSummary';
import Navbar from '../components/Navbar';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const testProducts = [
          // Test product data here...
        ];
        setProducts(testProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a] text-white">
        <div className="animate-pulse text-xl font-semibold text-indigo-400">
          Loading products...
        </div>
      </div>
    );
  }

  return (
    <div className="product-listing-page min-h-screen bg-[#0f172a] text-white relative overflow-hidden">
      {/* Background effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.3), transparent 70%)",
          opacity: 0.4,
        }}
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(45deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))",
          opacity: 0.3,
        }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, #6366f1 2px, transparent 2px)",
            backgroundSize: "40px 40px",
          }}
          animate={{ opacity: [0.1, 0.3, 0.1], rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "loop" }}
        />
      </div>

      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.h1 
          className="text-3xl font-extrabold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textShadow: "0 0 15px rgba(99, 102, 241, 0.5)" }}
        >
          Gaming Marketplace
        </motion.h1>

        {/* Sell Your Product Button */}
        <div className="mb-6">
          <motion.button
            onClick={() => navigate('/product-selling')} // Navigate to ProductSelling page
            className="px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold rounded-lg shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Sell Your Product
          </motion.button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-900/80 rounded-xl shadow-lg p-6 mb-6 border border-[#6366f1]/20">
              <h2 className="text-xl font-bold text-white mb-4">Available Products</h2>
              <Cards gameCards={products} />
            </div>
          </motion.div>
          
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
    </div>
  );
};

export default ProductListing;
