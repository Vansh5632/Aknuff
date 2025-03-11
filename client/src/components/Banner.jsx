import React from 'react';
import { motion } from 'framer-motion';
import BannerImage from '../assets/banner.jpg';

const games = [
    {
        title: "Cyberpunk 2077",
        image: "https://example.com/cyberpunk.jpg",
        label: "Popular",
        buttonText: "Buy Now"
    },
    {
        title: "Red Dead Redemption 2",
        image: "https://example.com/rdr2.jpg",
        label: "Best Seller",
        buttonText: "Purchase"
    },
    {
        title: "The Last of Us Part II",
        image: "https://example.com/tlou2.jpg",
        label: "Featured",
        buttonText: "Get Now"
    }
];

const Banner = () => {
    return (
        <div className="relative min-h-[600px] py-12">
            {/* Increased duration from 1 to 1.5 */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${BannerImage})`,
                    filter: 'brightness(0.4) blur(8px)',
                    zIndex: 2
                }}
            />
            
            <div className="relative max-w-7xl mx-auto px-4" style={{ zIndex: 3 }}>
                {/* Added duration to heading animation */}
                <motion.h2 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl font-bold text-white text-center mb-12"
                >
                    Featured Games
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {games.map((game, index) => (
                        <motion.div 
                            key={index}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ 
                                delay: index * 0.3, // Increased delay between cards
                                duration: 0.8 // Added duration for smoother animation
                            }}
                            whileHover={{ y: -5, transition: { duration: 0.4 } }}
                            className="bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-300"
                        >
                            {/* Rest of the card content remains the same */}
                            <div className="relative">
                                <img 
                                    src={game.image} 
                                    alt={game.title} 
                                    className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-500"
                                />
                                <span className="absolute top-4 right-4 px-3 py-1 text-sm font-semibold bg-indigo-600 text-white rounded-full">
                                    {game.label}
                                </span>
                            </div>
                            <div className="p-6 space-y-4">
                                <h3 className="text-2xl font-bold text-white">{game.title}</h3>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.3 }} // Added duration for button animation
                                    className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-lg hover:shadow-indigo-500/25"
                                >
                                    {game.buttonText}
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;
