import React, { useState } from 'react';
import {ShoppingCart} from 'lucide-react'

const Navbar = () => {
    const isLoggedIn = false; // Replace with actual authentication check
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <nav className="flex flex-wrap justify-between items-center p-4 bg-white shadow-md">
                <div className="flex items-center w-full md:w-auto justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">Aknuff</h1>
                    {/* Hamburger menu for mobile */}
                    <button 
                        className="md:hidden block text-gray-800"
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
                            className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="absolute right-0 top-0 h-full px-4 rounded-r-full bg-blue-500 text-white font-bold hover:bg-blue-700">
                            Search
                        </button>
                    </div>
                </div>

                {/* Cart and Login buttons */}
                <div className="flex items-center order-2 md:order-3">
                    <a href="/cart" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 mr-4 flex items-center">
                        
                    <ShoppingCart/>
                    </a>
                    {isLoggedIn ? (
                        <img
                            src="profile-image-url.jpg"
                            alt="Profile"
                            className="rounded-full h-8 w-8 object-cover"
                        />
                    ) : (
                        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700">
                            Login
                        </button>
                    )}
                </div>
                </nav>

                {/* Secondary Navbar */}
            <nav className="bg-blue-800 text-white py-2">
                <div className="container mx-auto flex justify-center space-x-4">
                    <a href="#category" className="hover:underline">Category</a>
                    <a href="#steam-gift-cards" className="hover:underline">Steam Gift Cards</a>
                    <a href="#bigo-live" className="hover:underline">BIGO Live</a>
                    <a href="#psn-card" className="hover:underline">PSN Card</a>
                    <a href="#rbl-universe" className="hover:underline">RBL Universe</a>
                    <a href="#top-up-mlbb" className="hover:underline">Top Up MLBB</a>
                </div>
            </nav>
        </>
    );
};

export default Navbar;

