// ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { gameCards } from '../components/Cards'; // Import shared gameCards data

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const foundProduct = gameCards.find(p => p.id === parseInt(productId));

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error('Product not found');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    if (product && user) {
      addToCart({
        ...product,
        quantity,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a] text-white">
        <div className="animate-pulse text-xl font-semibold text-indigo-400">
          Loading product details...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Product Not Found</h2>
          <p className="mb-8">The product you are looking for does not exist or has been removed.</p>
          <Link to="/" className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page min-h-screen bg-[#0f172a] text-white relative overflow-hidden">
      {/* Background Effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.3), transparent 70%)",
          opacity: 0.4,
        }}
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      />

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-6 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Products
          </Link>

          <div className="bg-gray-900/80 rounded-xl shadow-lg border border-[#6366f1]/20 overflow-hidden">
            <div className="md:flex">
              {/* Product Image */}
              <div className="md:w-1/2 p-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-lg overflow-hidden shadow-2xl border border-indigo-500/30"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              </div>

              {/* Product Details */}
              <div className="md:w-1/2 p-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent mb-2">
                  {product.title}
                </h1>

                <div className="mb-4">
                  <span className="text-2xl font-bold text-white">{product.price}</span>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description:</h3>
                  <p className="text-gray-300">{product.description}</p>
                </div>

                <div className="mb-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.stock > 0 ? 'bg-green-600/30 text-green-400' : 'bg-red-600/30 text-red-400'
                    }`}
                  >
                    {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                  </span>
                </div>

                {user && product.stock > 0 && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 bg-gray-800 rounded-l-lg border border-indigo-500/50 hover:bg-gray-700"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))
                        }
                        className="w-16 px-3 py-1 text-center bg-gray-800 border-y border-indigo-500/50 text-white focus:outline-none"
                      />
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="px-3 py-1 bg-gray-800 rounded-r-lg border border-indigo-500/50 hover:bg-gray-700"
                      >
                        +
                      </button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddToCart}
                      className="px-6 py-2 bg-indigo-600 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex-1"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                )}

                {!user && (
                  <div className="p-4 rounded-lg bg-indigo-900/30 border border-indigo-500/30">
                    <p className="text-center">Please log in to add items to your cart</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;