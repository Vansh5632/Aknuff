// client/src/pages/ProductListing.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Cards from '../components/Cards';
import CartSummary from '../components/CartSummary';
import Navbar from '../components/Navbar';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { cart } = useCart(); // Modified to only use what's needed

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace this with your testing data
        const testProducts = [
          { 
            id: 1, 
            title: 'Gaming Headset Pro', 
            price: 'From $100', 
            description: 'Professional gaming headset with 7.1 surround sound',
            image: 'https://placehold.co/300x200/6366f1/FFFFFF?text=Gaming+Headset',
            category: 'Accessories'
          },
          { 
            id: 2, 
            title: 'RGB Mechanical Keyboard', 
            price: 'From $200',
            description: 'Mechanical gaming keyboard with customizable RGB lighting',
            image: 'https://placehold.co/300x200/a855f7/FFFFFF?text=RGB+Keyboard',
            category: 'Accessories'
          },
          { 
            id: 3, 
            title: 'Ultra Gaming Mouse', 
            price: 'From $300',
            description: 'High-precision gaming mouse with adjustable DPI',
            image: 'https://placehold.co/300x200/6366f1/FFFFFF?text=Gaming+Mouse',
            category: 'Accessories'
          },
          { 
            id: 4, 
            title: 'Gaming Chair', 
            price: 'From $400',
            description: 'Ergonomic gaming chair with lumbar support',
            image: 'https://placehold.co/300x200/a855f7/FFFFFF?text=Gaming+Chair',
            category: 'Furniture'
          },
          { 
            id: 5, 
            title: '4K Gaming Monitor', 
            price: 'From $500',
            description: '27-inch 4K gaming monitor with 144Hz refresh rate',
            image: 'https://placehold.co/300x200/6366f1/FFFFFF?text=Gaming+Monitor',
            category: 'Monitors'
          },
          { 
            id: 6, 
            title: 'Gaming Desk', 
            price: 'From $600',
            description: 'Spacious gaming desk with cable management',
            image: 'https://placehold.co/300x200/a855f7/FFFFFF?text=Gaming+Desk',
            category: 'Furniture'
          },
          { 
            id: 7, 
            title: 'VR Headset', 
            price: 'From $700',
            description: 'Immersive VR headset with motion tracking',
            image: 'https://placehold.co/300x200/6366f1/FFFFFF?text=VR+Headset',
            category: 'Accessories'
          },
          { 
            id: 8, 
            title: 'Gaming Laptop', 
            price: 'From $800',
            description: 'High-performance gaming laptop with RTX graphics',
            image: 'https://placehold.co/300x200/a855f7/FFFFFF?text=Gaming+Laptop',
            category: 'Laptops'
          },
          { 
            id: 9, 
            title: 'Gaming Console', 
            price: 'From $900',
            description: 'Next-gen gaming console with 4K support',
            image: 'https://placehold.co/300x200/6366f1/FFFFFF?text=Gaming+Console',
            category: 'Consoles'
          },
          { 
            id: 10, 
            title: 'Gaming Router', 
            price: 'From $1000',
            description: 'High-speed gaming router with low latency',
            image: 'https://placehold.co/300x200/a855f7/FFFFFF?text=Gaming+Router',
            category: 'Accessories'
          },
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
      {/* Enhanced Background Effects for Gaming Vibe */}
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
