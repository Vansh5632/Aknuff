import React, { useState } from "react";
import { motion } from "framer-motion";

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
        // Add logic to send data to the backend
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f172a] to-[#050417] text-white">
            <motion.div
                className="bg-gray-900/80 p-8 rounded-xl shadow-lg border border-[#6366f1]/30 w-full max-w-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent text-center">
                    List Your Game
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Game Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg border border-[#6366f1]/30 focus:outline-none focus:ring-2 focus:ring-[#a855f7]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg border border-[#6366f1]/30 focus:outline-none focus:ring-2 focus:ring-[#a855f7]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Price (in USD):</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg border border-[#6366f1]/30 focus:outline-none focus:ring-2 focus:ring-[#a855f7]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Game Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                            className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg border border-[#6366f1]/30 focus:outline-none focus:ring-2 focus:ring-[#a855f7]"
                        />
                    </div>
                    <motion.button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold rounded-lg shadow-lg"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        List Game
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default ProductSelling;