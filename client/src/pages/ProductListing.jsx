import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartSummary from '../components/CartSummary';

// MarketplaceBanner component remains the same
const MarketplaceBanner = () => (
  <motion.div
    className="relative overflow-hidden bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-8"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <motion.div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.2) 2px, transparent 2px)",
        backgroundSize: "30px 30px",
      }}
      animate={{ backgroundPosition: ["0 0", "30px 30px"] }}
      transition={{ duration: 8, repeat: Infinity }}
    />
    <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-3xl font-extrabold">Epic Game Marketplace</h2>
        <p className="text-sm opacity-90">Your one-stop shop for digital treasures</p>
      </motion.div>
      <motion.button
        className="px-6 py-2 bg-white text-[#6366f1] rounded-full font-bold shadow-lg"
        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(99,102,241,0.5)" }}
        whileTap={{ scale: 0.95 }}
      >
        Browse All
      </motion.button>
    </div>
  </motion.div>
);

// New GameCard component
const GameCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-gray-800/80 rounded-xl overflow-hidden border border-[#6366f1]/30 shadow-lg"
      whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(99,102,241,0.2)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48">
        {console.log(product.image)}
        <img
          src={`http://localhost:3000${product.image}`}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-[#6366f1]/80 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {product.platform}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-white truncate">{product.title}</h3>
        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{product.description}</p>
        
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xl font-bold text-[#a855f7]">${product.price}</span>
          <span className="text-sm text-gray-500">{product.genre}</span>
        </div>

        {product.gameId && (
          <p className="text-xs text-gray-500 mt-2">ID: {product.gameId}</p>
        )}
        
        <motion.button
          className="w-full mt-4 py-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-lg font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/product/${product._id}`)} // Assuming your product has an _id field
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/product');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.genre && product.genre.toLowerCase().includes(searchTerm.toLowerCase())) // Changed category to genre
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a] text-white">
        <motion.div
          className="text-xl font-semibold text-indigo-400"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Loading Marketplace...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(99,102,241,0.3), transparent 70%)",
          opacity: 0.4,
        }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <Navbar />
      <MarketplaceBanner />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.input
              type="search"
              placeholder="Search games, genres, or game IDs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 px-6 py-3 bg-gray-800/80 rounded-full border border-[#6366f1]/50 focus:outline-none focus:ring-2 focus:ring-[#a855f7] text-white"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.button
              onClick={() => navigate('/product-selling')}
              className="px-8 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full font-bold shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99,102,241,0.7)" }}
              whileTap={{ scale: 0.95 }}
            >
              Sell Your Product
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="bg-gray-900/90 rounded-2xl p-8 border border-[#6366f1]/30 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
            {filteredProducts.length} Products Available
          </h2>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <GameCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <motion.p
              className="text-center text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No products found. Try a different search!
            </motion.p>
          )}
        </motion.div>

        {user && (
          <motion.div
            className="lg:w-80 mt-8 lg:mt-0 sticky top-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CartSummary />
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductListing;