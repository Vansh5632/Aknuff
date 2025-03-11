import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                <div className="footer-section">
                    <h4 className="text-lg font-bold mb-4">Support</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-300">Help Center</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4 className="text-lg font-bold mb-4">itemku</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-300">About itemku</a></li>
                        <li><a href="#" className="hover:text-gray-300">Brand Identity</a></li>
                        <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
                        <li><a href="#" className="hover:text-gray-300">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-gray-300">Refund Policy</a></li>
                        <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-gray-300">Manage Cookies</a></li>
                        <li><a href="#" className="hover:text-gray-300">Career</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4 className="text-lg font-bold mb-4">Buyer</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-300">How to Shop</a></li>
                        <li><a href="#" className="hover:text-gray-300">How to Trade</a></li>
                        <li><a href="#" className="hover:text-gray-300">Payment Method</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4 className="text-lg font-bold mb-4">Follow Us</h4>
                    <div className="flex space-x-4 mb-4">
                        <a href="#" className="hover:text-gray-300"><i className="fab fa-facebook"></i></a>
                        <a href="#" className="hover:text-gray-300"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="hover:text-gray-300"><i className="fab fa-youtube"></i></a>
                        <a href="#" className="hover:text-gray-300"><i className="fab fa-tiktok"></i></a>
                        <a href="#" className="hover:text-gray-300"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>
                <div className="footer-section">
                    <img src="footer-image.png" alt="Footer Illustration" className="max-w-full h-auto" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
