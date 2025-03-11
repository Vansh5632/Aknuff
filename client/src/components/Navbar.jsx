import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, Bell, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Navbar = () => {
    const isLoggedIn = false; // Replace with actual authentication check
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();
    const [cartCount, setCartCount] = useState(3); // Example cart count
    const navigate = useNavigate(); // Hook for navigation

    // Transform properties based on scroll
    const navbarBackground = useTransform(
        scrollY, 
        [0, 50], 
        ["rgba(17, 24, 39, 0.9)", "rgba(17, 24, 39, 0.98)"]
    );
    const navbarHeight = useTransform(scrollY, [0, 50], ["5rem", "3.5rem"]);
    const navbarPadding = useTransform(scrollY, [0, 50], ["1.25rem", "0.5rem"]);
    const logoScale = useTransform(scrollY, [0, 50], [1, 0.85]);
    
    // Listen for scroll events
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animation variants
    const navbarVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.6, 
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const searchVariants = {
        initial: { width: "100%" },
        focused: { 
            width: "110%", 
            boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
            transition: { duration: 0.3 }
        }
    };

    const buttonHoverVariants = {
        initial: { scale: 1 },
        hover: { 
            scale: 1.05,
            boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
            transition: { 
                type: "spring", 
                stiffness: 400, 
                damping: 10
            }
        },
        tap: { scale: 0.95 }
    };

    const logoTextVariants = {
        initial: { 
            backgroundPosition: "0% 50%"
        },
        hover: { 
            backgroundPosition: "100% 50%",
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    const mobileMenuVariants = {
        closed: { 
            opacity: 0,
            x: "100%",
            transition: { 
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        open: { 
            opacity: 1,
            x: 0,
            transition: { 
                duration: 0.4,
                ease: "easeOut",
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const menuItemVariants = {
        closed: { x: 20, opacity: 0 },
        open: { 
            x: 0, 
            opacity: 1,
            transition: { 
                duration: 0.4,
                ease: "easeOut" 
            }
        }
    };

    const categoryMenuVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.6, 
                ease: "easeOut",
                staggerChildren: 0.05
            }
        }
    };

    const categoryItemVariants = {
        hidden: { opacity: 0, y: -5 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.3 }
        },
        hover: { 
            y: -2, 
            color: "#818cf8",
            transition: { duration: 0.2 }
        }
    };

    const notificationBadgeVariants = {
        initial: { scale: 0 },
        animate: { 
            scale: 1,
            transition: { 
                type: "spring",
                stiffness: 500,
                damping: 15,
                delay: 0.5
            }
        }
    };

    const burgerVariants = {
        closed: { rotate: 0 },
        open: { rotate: 180, transition: { duration: 0.6 } }
    };

    // Handle login button click
    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={navbarVariants}
            className="sticky top-0 z-50 w-full"
        >
            <motion.nav 
                className="flex items-center p-4 bg-gray-900 shadow-lg border-b border-gray-800 backdrop-blur-sm"
                style={{ 
                    backgroundColor: navbarBackground,
                    height: navbarHeight,
                    padding: navbarPadding,
                }}
                transition={{ duration: 0.3 }}
            >
                <div className="container mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <motion.div 
                            className="flex items-center"
                            style={{ scale: logoScale }}
                        >
                            <motion.h1 
                                variants={logoTextVariants}
                                initial="initial"
                                whileHover="hover"
                                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-400 to-indigo-600 bg-size-200 cursor-pointer"
                                style={{
                                    backgroundSize: "200% auto"
                                }}
                            >
                                Aknuff
                            </motion.h1>
                        </motion.div>
                    </div>

                    {/* Search bar - Now properly centered */}
                    <motion.div 
                        className="hidden md:block md:w-2/5 lg:w-1/2 xl:w-1/3 mx-4"
                        variants={itemVariants}
                    >
                        <div className="relative">
                            <motion.div
                                className="relative"
                                variants={searchVariants}
                                animate={isSearchFocused ? "focused" : "initial"}
                            >
                                <div className="absolute inset-y-0 left-3 flex items-center">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search for games, gift cards..."
                                    className="w-full pl-10 pr-20 py-2 rounded-full bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                />
                                <motion.button 
                                    variants={buttonHoverVariants}
                                    initial="initial"
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="absolute right-0 top-0 h-full px-4 rounded-r-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-300 overflow-hidden"
                                >
                                    <span>Search</span>
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right side icons */}
                    <div className="flex items-center space-x-4">
                        {/* Cart, Notifications, and Login buttons */}
                        <motion.div 
                            className="flex items-center space-x-3"
                            variants={itemVariants}
                        >
                            <motion.a 
                                href="/notifications" 
                                variants={buttonHoverVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                                className="relative text-white p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
                            >
                                <Bell size={18} />
                                <motion.div
                                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                    variants={notificationBadgeVariants}
                                    initial="initial"
                                    animate="animate"
                                >
                                    2
                                </motion.div>
                            </motion.a>
                            
                            <motion.a 
                                href="/cart" 
                                variants={buttonHoverVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                                className="relative bg-indigo-600 text-white font-bold p-2 rounded-full hover:bg-indigo-700 transition-colors duration-300 flex items-center"
                            >
                                <ShoppingCart size={18} />
                                {cartCount > 0 && (
                                    <motion.div
                                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                        variants={notificationBadgeVariants}
                                        initial="initial"
                                        animate="animate"
                                    >
                                        {cartCount}
                                    </motion.div>
                                )}
                            </motion.a>
                            
                            {isLoggedIn ? (
                                <motion.div
                                    variants={buttonHoverVariants}
                                    initial="initial"
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="relative"
                                >
                                    <img
                                        src="/api/placeholder/32/32"
                                        alt="Profile"
                                        className="rounded-full h-9 w-9 object-cover border-2 border-indigo-500"
                                    />
                                    <motion.div
                                        className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-gray-900"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5 }}
                                    />
                                </motion.div>
                            ) : (
                                <motion.button 
                                    onClick={handleLoginClick} // Redirect to login page
                                    variants={buttonHoverVariants}
                                    initial="initial"
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-full hover:bg-indigo-700 transition-colors duration-300 flex items-center space-x-2"
                                >
                                    <User size={16} />
                                    <span>Login</span>
                                </motion.button>
                            )}
                        </motion.div>

                        {/* Hamburger menu for mobile */}
                        <motion.button 
                            className="md:hidden block text-white"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            variants={burgerVariants}
                            animate={isMenuOpen ? "open" : "closed"}
                        >
                            <AnimatePresence mode="wait">
                                {isMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <X className="w-6 h-6" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Menu className="w-6 h-6" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile search bar */}
            <motion.div 
                className="md:hidden bg-gray-900 px-4 pb-3 border-b border-gray-800"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for games, gift cards..."
                        className="w-full pl-10 pr-20 py-2 rounded-full bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                    <motion.button 
                        variants={buttonHoverVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        className="absolute right-0 top-0 h-full px-4 rounded-r-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-300"
                    >
                        <span>Search</span>
                    </motion.button>
                </div>
            </motion.div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed top-14 right-0 bottom-0 w-3/4 bg-gray-900 z-50 shadow-xl border-l border-gray-800 p-5"
                        variants={mobileMenuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <div className="flex flex-col h-full">
                            <motion.div variants={menuItemVariants} className="mb-6">
                                <h3 className="text-lg font-bold text-white mb-4">Categories</h3>
                                <div className="space-y-3">
                                    {['Mobile Games', 'PC Games', 'Console Games', 'Gift Cards', 'Game Points'].map((item) => (
                                        <motion.a
                                            key={item}
                                            href={`#${item.toLowerCase().replace(' ', '-')}`}
                                            className="block text-gray-300 hover:text-indigo-400 py-2 border-b border-gray-800"
                                            variants={menuItemVariants}
                                            whileHover={{ x: 5, color: "#818cf8" }}
                                        >
                                            {item}
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                            
                            <motion.div variants={menuItemVariants} className="mb-6">
                                <h3 className="text-lg font-bold text-white mb-4">Account</h3>
                                <div className="space-y-3">
                                    {['Login', 'Register', 'My Orders', 'Wishlist', 'Settings'].map((item) => (
                                        <motion.a
                                            key={item}
                                            href={`#${item.toLowerCase().replace(' ', '-')}`}
                                            className="block text-gray-300 hover:text-indigo-400 py-2 border-b border-gray-800"
                                            variants={menuItemVariants}
                                            whileHover={{ x: 5, color: "#818cf8" }}
                                        >
                                            {item}
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                            
                            <motion.div variants={menuItemVariants} className="mt-auto">
                                <motion.button
                                    className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Contact Support
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Enhanced Secondary Navbar */}
            <motion.nav 
                className="bg-gray-800 text-white py-3 shadow-md sticky z-40 transition-all duration-300 backdrop-blur-sm"
                style={{
                    top: scrolled ? '3.5rem' : '5rem',
                    opacity: scrolled ? 0.95 : 1
                }}
                variants={categoryMenuVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="container mx-auto flex justify-center space-x-6 overflow-x-auto px-4">
                    {[
                        'All Categories',
                        'Steam Gift Cards',
                        'BIGO Live',
                        'PSN Card',
                        'RBL Universe',
                        'Top Up MLBB',
                        'Game Points'
                    ].map((category, index) => (
                        <motion.a 
                            key={category}
                            variants={categoryItemVariants}
                            whileHover="hover"
                            className={`whitespace-nowrap transition-all duration-300 ${index === 0 ? 'font-bold text-indigo-400' : ''}`}
                            href={`#${category.toLowerCase().replace(/ /g, '-')}`}
                        >
                            <span className="relative">
                                {category}
                                <motion.span
                                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3 }}
                                ></motion.span>
                            </span>
                            {index === 0 && (
                                <motion.span 
                                    className="inline-block ml-1"
                                    animate={{ 
                                        rotate: [0, 0, 180, 180, 0],
                                        transition: { repeat: Infinity, duration: 1.5, repeatDelay: 5 }
                                    }}
                                >
                                    <ChevronDown size={14} />
                                </motion.span>
                            )}
                        </motion.a>
                    ))}
                </div>
            </motion.nav>
        </motion.div>
    );
};

export default Navbar;