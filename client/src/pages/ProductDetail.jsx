import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  console.log("this is product id "+ id);
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();




  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/product/${id}`);
        console.log("this is product response "+ response);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);

        const sellerResponse = await axios.get(`http://localhost:3000/api/auth/user/${data.user}`);
        if (!sellerResponse.ok) {
          throw new Error('Failed to fetch seller');
        }
        const sellerData = await sellerResponse.json();
        setSeller(sellerData);

        setReviews([
          { id: 1, rating: 5, comment: 'Kena hb dgn Di beli', date: '9 Februari 2025', user: 'G***E' },
          { id: 2, rating: 4, comment: 'Pengiriman sangat cepat', date: '5 Februari 2025', user: 'F***A' },
        ]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
        setProduct(null);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart({ ...product, quantity, notes });
    navigate('/cart');
  };

  const handleChatWithSeller = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!seller) {
      alert('Seller information is not yet loaded. Please wait.');
      return;
    }
    navigate(`/chat/${seller._id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a] text-white">
        <motion.div
          className="text-xl font-semibold text-indigo-400"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Loading Product...
        </motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a] text-white">
        <p className="text-xl">Product not found.</p>
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
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Left Section: Product Info */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-gray-900/90 rounded-2xl p-8 border border-[#6366f1]/30 shadow-xl"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent mb-4">
                {product.title}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-green-500 font-semibold">INSTANT DELIVERY</span>
                <span className="text-blue-400 font-semibold">ANTI HACKBACK</span>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <p className="text-sm text-gray-400">Minimal Beli: 1</p>
                <p className="text-sm text-gray-400">Transaksi Sukses: 53 (100%)</p>
                <p className="text-sm text-gray-400">Rata-Rata Kirim: -</p>
              </div>
              <motion.img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <h2 className="text-xl font-bold mb-4">How to Trade</h2>
              <ol className="list-decimal list-inside text-gray-300 space-y-2">
                <li>Select an account from the available listings and make a purchase.</li>
                <li>Complete the payment for your order.</li>
                <li>Wait for the seller to provide the username/email and account password or check the...</li>
              </ol>
              <motion.button
                className="mt-6 text-blue-400 font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                Tampilkan lebih banyak
              </motion.button>
            </motion.div>

            {/* Reviews Section */}
            <motion.div
              className="bg-gray-900/90 rounded-2xl p-8 border border-[#6366f1]/30 shadow-xl mt-8"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-4">
                Ulasan Produk <span className="text-yellow-400">★ 4.1 / 5.0</span>
              </h2>
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  className="border-b border-gray-700/50 py-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
                    <span className="text-gray-400 text-sm">{review.user}</span>
                  </div>
                  <p className="text-gray-300">{review.comment}</p>
                  <p className="text-gray-500 text-sm mt-1">{review.date}</p>
                </motion.div>
              ))}
              <motion.button
                className="mt-6 text-blue-400 font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                Lihat Semua
              </motion.button>
            </motion.div>
          </div>

          {/* Right Section: Seller Info and Order Form */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-900/90 rounded-2xl p-6 border border-[#6366f1]/30 shadow-xl sticky top-6">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] flex items-center justify-center text-white font-bold"
                  whileHover={{ scale: 1.1 }}
                >
                  {(seller?.name || 'Unknown').charAt(0)}
                </motion.div>
                <div>
                  <h3 className="font-bold">{seller?.name || 'PapaBEAR Shop'}</h3>
                  <p className="text-sm text-gray-400">Terakhir online 10 Menit lalu</p>
                  <p className="text-sm text-yellow-400">★ 4.5 / 5.0</p>
                </div>
              </div>
              <motion.button
                onClick={() => navigate(`/seller/${seller?._id || ''}/products`)}
                className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold mb-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!seller}
              >
                Kunjungi Toko
              </motion.button>
              <h3 className="text-lg font-bold mb-4">Informasi Pesanan</h3>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Catatan untuk Penjual (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-gray-800/50 py-2 px-3 rounded-lg border border-[#6366f1]/30 focus:outline-none focus:ring-2 focus:ring-[#a855f7]"
                  rows="3"
                  placeholder="e.g., Please deliver quickly"
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-300">Stok: Terakhir</p>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <span>{quantity}</span>
                  <motion.button
                    onClick={() => handleQuantityChange(1)}
                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-bold">Subtotal</p>
                <p className="text-lg font-bold text-orange-500">
                  {typeof product.price === 'number'
                    ? (product.price * quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                    : 'N/A'}
                </p>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <motion.button
                  onClick={handleChatWithSeller}
                  className="flex-1 py-3 bg-blue-500 text-white rounded-lg font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Chat Seller
                </motion.button>
                <motion.button
                  onClick={() => addToCart({ ...product, quantity, notes })}
                  className="flex-1 py-3 bg-yellow-500 text-black rounded-lg font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  + Troli
                </motion.button>
              </div>
              <motion.button
                onClick={handleAddToCart}
                className="w-full py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-lg font-bold"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99,102,241,0.7)" }}
                whileTap={{ scale: 0.95 }}
              >
                Beli Langsung
              </motion.button>
              <p className="text-sm text-blue-400 mt-4 text-center">
                Pembayaran Aman 100% Dijamin oleh Trade Guard
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Related Products Section */}
        <motion.div
          className="bg-gray-900/90 rounded-2xl p-8 border border-[#6366f1]/30 shadow-xl mt-8"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-bold mb-6">
            Produk Lain dari {seller?.name || 'PapaBEAR Shop'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { title: 'Mink Full Gear V4 (Awakening)', price: 129000, image: 'https://via.placeholder.com/150' },
              { title: 'Human Full Gear V4 (Awakening)', price: 119000, image: 'https://via.placeholder.com/150' },
              { title: 'Shark Full Gear V4 (Awakening)', price: 127000, image: 'https://via.placeholder.com/150' },
              { title: 'Sky Full Gear V4 (Awakening)', price: 139000, image: 'https://via.placeholder.com/150' },
              { title: '100% Shark Anchor MaxSkills', price: 79000, image: 'https://via.placeholder.com/150' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/80 rounded-xl overflow-hidden border border-[#6366f1]/30"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(99,102,241,0.5)" }}
                transition={{ duration: 0.3 }}
              >
                <img src={item.image} alt={item.title} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-orange-500 font-medium">
                    {item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;