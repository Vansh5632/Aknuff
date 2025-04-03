import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Star } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ text: "", rating: 0 });
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/product/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/reviews/${id}`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  const handleAddReview = async () => {
    try {
      await fetch(`http://localhost:3000/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          text: newReview.text,
          rating: newReview.rating,
        }),
      });
      setNewReview({ text: "", rating: 0 });
      const response = await fetch(`http://localhost:3000/api/reviews/${id}`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleChatWithSeller = () => {
    navigate(`/chat/${product.user._id}?productId=${product._id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a] text-white">
        <motion.div
          className="text-xl font-semibold text-indigo-400"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Loading Product Details...
        </motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a] text-white">
        <p className="text-lg font-semibold text-red-400">Product not found!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex justify-center">
            <img
              src={`http://localhost:3000${product.image}`}
              alt={product.title}
              className="w-full max-w-md rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-100">{product.title}</h1>
            <p className="text-2xl font-bold text-blue-400">${product.price}</p>
            <p className="text-gray-300 mt-4 leading-relaxed">{product.description}</p>

            <div className="mt-6 flex items-center">
              <span className="text-gray-300 mr-4">Quantity:</span>
              <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                <input type="number" value={quantity} className="w-16 text-center bg-gray-900 text-white border-0 focus:ring-0" readOnly />
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="mt-8 flex gap-6">
              <motion.button
                className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add to Cart
              </motion.button>
              <motion.button
                className="bg-green-500 text-white py-3 px-8 rounded-lg hover:bg-green-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleChatWithSeller}
              >
                Chat with Seller
              </motion.button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-100 mb-6">Product Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review._id} className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-100 font-semibold">{review.user?.name || "Anonymous"}</p>
                    <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className={`h-4 w-4 ${index < review.rating ? "text-yellow-500" : "text-gray-600"}`} />
                    ))}
                  </div>
                  <p className="text-gray-300 mt-2">{review.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Add Review Form */}
          <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Leave a Review</h3>
            <textarea
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-900 text-white"
              placeholder="Write your review here..."
              value={newReview.text}
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
            />
            <div className="flex items-center mb-4">
              <span className="text-gray-300 mr-2">Rating:</span>
              {[...Array(5)].map((_, index) => (
                <button key={index} onClick={() => setNewReview({ ...newReview, rating: index + 1 })}>
                  <Star className={`h-6 w-6 ${index < newReview.rating ? "text-yellow-500" : "text-gray-600"}`} />
                </button>
              ))}
            </div>
            <motion.button
              className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddReview}
            >
              Submit Review
            </motion.button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;