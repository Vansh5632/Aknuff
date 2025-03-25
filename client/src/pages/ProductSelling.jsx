import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductSelling = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Game listed:", formData);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#050417] text-white">
            <Navbar />
            <div className="flex-grow flex items-center justify-center py-12 px-4">
                <motion.div
                    className="bg-gray-900/90 p-10 rounded-2xl shadow-2xl border border-[#6366f1]/40 w-full max-w-xl backdrop-blur-sm"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent text-center">
                        List Your Game
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-300">Game Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-800/50 text-white py-3 px-4 rounded-xl border border-[#6366f1]/30 focus:outline-none focus:ring-2 focus:ring-[#a855f7] focus:border-transparent transition duration-200"
                                placeholder="Enter game title"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-300">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full bg-gray-800/50 text-white py-3 px-4 rounded-xl border border-[#6366f1]/30 focus:outline-none focus:ring-2 focus:ring-[#a855f7] focus:border-transparent transition duration-200 resize-none"
                                placeholder="Describe your game..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-300">Price (USD)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-800/50 text-white py-3 px-4 rounded-xl border border-[#6366f1]/30 focus:outline-none focus:ring-2 focus:ring-[#a855f7] focus:border-transparent transition duration-200"
                                placeholder="Enter price"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-300">Game Image</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    required
                                    className="w-full bg-gray-800/50 text-white py-3 px-4 rounded-xl border border-[#6366f1]/30 focus:outline-none focus:ring-2 focus:ring-[#a855f7] focus:border-transparent transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#6366f1] file:text-white hover:file:bg-[#4f46e5]"
                                />
                            </div>
                        </div>
                        <motion.button
                            type="submit"
                            className="w-full py-4 mt-6 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition duration-200"
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 0 20px rgba(99, 102, 241, 0.6)",
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            List Game
                        </motion.button>
                    </form>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductSelling;