import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Navbar = () => {
    const isLoggedIn = false; // Replace with actual authentication check
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();
    
    // Transform properties based on scroll
    const navbarBackground = useTransform(
        scrollY, 
        [0, 50], 
        ["rgba(17, 24, 39, 1)", "rgba(17, 24, 39, 0.95)"]
    );
    const navbarHeight = useTransform(scrollY, [0, 50], ["80px", "60px"]);
    const navbarPadding = useTransform(scrollY, [0, 50], ["1rem", "0.5rem"]);
    
    // Listen for scroll events
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <motion.nav 
                className="flex flex-wrap justify-between items-center p-4 bg-gray-900 shadow-lg border-b border-gray-800 sticky top-0 z-50"
                style={{ 
                    backgroundColor: navbarBackground,
                    height: navbarHeight,
                    padding: navbarPadding,
                }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex items-center w-full md:w-auto justify-between">
                    <motion.h1 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className={`text-2xl font-bold text-white ${scrolled ? 'text-xl' : ''}`}
                    >
                        Aknuff
                    </motion.h1>
                    {/* Hamburger menu for mobile */}
                    <button 
                        className="md:hidden block text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Search bar */}
                <div className="w-full md:w-1/3 my-4 md:my-0 order-3 md:order-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute right-0 top-0 h-full px-4 rounded-r-full bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors duration-300"
                        >
                            Search
                        </motion.button>
                    </div>
                </div>

                {/* Cart and Login buttons */}
                <div className="flex items-center order-2 md:order-3">
                    <motion.a 
                        href="/cart" 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-full hover:bg-indigo-700 mr-4 flex items-center transition-colors duration-300"
                    >
                        <ShoppingCart />
                    </motion.a>
                    {isLoggedIn ? (
                        <img
                            src="profile-image-url.jpg"
                            alt="Profile"
                            className="rounded-full h-8 w-8 object-cover border-2 border-indigo-500"
                        />
                    ) : (
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-full hover:bg-indigo-700 transition-colors duration-300"
                        >
                            Login
                        </motion.button>
                    )}
                </div>
            </motion.nav>

            {/* Secondary Navbar */}
            <motion.nav 
                className={`bg-gray-800 text-white py-2 shadow-md sticky top-${scrolled ? '60px' : '80px'} z-40 transition-all duration-300`}
                style={{
                    opacity: scrolled ? 0.95 : 1
                }}
            >
                <div className="container mx-auto flex justify-center space-x-4 overflow-x-auto">
                    <motion.a whileHover={{ y: -2 }} href="#category" className="hover:text-indigo-400 transition-colors duration-300">Category</motion.a>
                    <motion.a whileHover={{ y: -2 }} href="#steam-gift-cards" className="hover:text-indigo-400 transition-colors duration-300">Steam Gift Cards</motion.a>
                    <motion.a whileHover={{ y: -2 }} href="#bigo-live" className="hover:text-indigo-400 transition-colors duration-300">BIGO Live</motion.a>
                    <motion.a whileHover={{ y: -2 }} href="#psn-card" className="hover:text-indigo-400 transition-colors duration-300">PSN Card</motion.a>
                    <motion.a whileHover={{ y: -2 }} href="#rbl-universe" className="hover:text-indigo-400 transition-colors duration-300">RBL Universe</motion.a>
                    <motion.a whileHover={{ y: -2 }} href="#top-up-mlbb" className="hover:text-indigo-400 transition-colors duration-300">Top Up MLBB</motion.a>
                </div>
            </motion.nav>
        </motion.div>
    );
};

export default Navbar;
