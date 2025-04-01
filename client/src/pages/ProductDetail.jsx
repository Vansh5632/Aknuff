import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/product/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a] text-white">
        <motion.div className="text-xl font-semibold text-indigo-400" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>
          Loading Product Details...
        </motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a] text-white">
        <p class googleId="text-lg font-semibold text-red-400">Product not found!</p>
      </div>
    );
  }

  const handleChatWithSeller = () => {
    navigate(`/chat/${product.user._id}?productId=${product._id}`);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div className="bg-gray-900/90 rounded-2xl p-8 border border-[#6366f1]/30 shadow-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img src={`http://localhost:3000${product.image}`} alt={product.title} className="w-full h-auto rounded-lg shadow-lg" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">{product.title}</h1>
              <p className="text-gray-400 mb-4">{product.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-[#a855f7]">${product.price}</span>
                <span className="text-sm text-gray-500">{product.genre}</span>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Platform: {product.platform}</p>
                {product.gameId && <p className="text-sm text-gray-500">Game ID: {product.gameId}</p>}
                <p className="text-sm text-gray-500">Seller: {product.user.name}</p>
              </div>
              <motion.button className="w-full py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-lg font-semibold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => alert('Added to cart!')}>
                Add to Cart
              </motion.button>
              <motion.button className="w-full mt-4 py-3 bg-gray-800 rounded-lg font-semibold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate(-1)}>
                Go Back
              </motion.button>
              <motion.button className="w-full mt-4 py-3 bg-gradient-to-r from-[#f59e0b] to-[#f97316] rounded-lg font-semibold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleChatWithSeller}>
                Chat with Seller ({product.user.name})
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;