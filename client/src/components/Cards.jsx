import React from 'react';
import { motion } from 'framer-motion';

const cardsData = {
    giftCards: [
        { name: 'Steam', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg' },
        { name: 'RBL', imgSrc: 'https://via.placeholder.com/150?text=RBL' },
        { name: 'Google Play Gift Card', imgSrc: 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' },
        { name: 'iTunes Gift Card', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ITunes_12.2_logo.png' },
        { name: 'Playstation Network', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/4/47/PlayStation_Network_logo.svg' },
        { name: 'Xbox Gift Card', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg' },
        { name: 'Fortnite', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.svg' },
        { name: 'Razer Gold', imgSrc: 'https://assets.razerzone.com/eeimages/support/razer-gold/razer-gold-logo.png' },
        { name: 'Amazon Gift Card', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
        { name: 'Nintendo', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Nintendo.svg' },
    ],
    items: [
        { name: 'RBL', imgSrc: 'https://via.placeholder.com/150?text=RBL' },
        { name: 'Blox Fruits', imgSrc: 'https://static.wikia.nocookie.net/roblox/images/8/8f/Blox_Fruits_Icon.png' },
        { name: 'Anime Adventures', imgSrc: 'https://static.wikia.nocookie.net/roblox/images/5/5e/Anime_Adventures_Icon.png' },
        { name: 'Toilet Tower', imgSrc: 'https://via.placeholder.com/150?text=Toilet+Tower' },
        { name: 'Survive The Killer', imgSrc: 'https://static.wikia.nocookie.net/roblox/images/4/4f/Survive_The_Killer_Icon.png' },
        { name: 'Blade Ball', imgSrc: 'https://static.wikia.nocookie.net/roblox/images/6/6d/Blade_Ball_Icon.png' },
        { name: 'Murder Mystery 2', imgSrc: 'https://static.wikia.nocookie.net/roblox/images/8/8e/Murder_Mystery_2_Icon.png' },
        { name: 'Adopt Me Trading', imgSrc: 'https://static.wikia.nocookie.net/roblox/images/2/2c/Adopt_Me_Icon.png' },
        { name: 'Anime Defenders', imgSrc: 'https://via.placeholder.com/150?text=Anime+Defenders' },
        { name: 'Fisch', imgSrc: 'https://via.placeholder.com/150?text=Fisch' },
    ],
};

const Card = ({ name, imgSrc, index }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ 
            y: -8,
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            border: "1px solid #6366f1"
        }}
        className="bg-gray-800 rounded-xl overflow-hidden shadow-lg p-4 border border-gray-700 hover:bg-gray-750 transition-all duration-300"
    >
        <div className="relative h-32 mb-3 overflow-hidden rounded-lg bg-gray-700/50 flex items-center justify-center p-2">
            <img 
                src={imgSrc} 
                alt={name} 
                className="w-auto h-auto max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-110" 
            />
        </div>
        <p className="text-center font-semibold text-gray-200 py-2">{name}</p>
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-2 py-2 bg-indigo-600 text-white text-sm rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-300"
        >
            Buy Now
        </motion.button>
    </motion.div>
);

const SectionTitle = ({ title }) => (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="flex items-center mb-6"
    >
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <div className="h-1 bg-indigo-600 flex-grow ml-4 rounded-full"></div>
    </motion.div>
);

const Cards = () => (
    <div className="container mx-auto px-4 py-12 bg-gray-900 text-white">
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
        >
            <SectionTitle title="Gift Cards" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {cardsData.giftCards.map((card, index) => (
                    <Card key={index} name={card.name} imgSrc={card.imgSrc} index={index} />
                ))}
            </div>
        </motion.div>
        
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
        >
            <SectionTitle title="Items" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {cardsData.items.map((card, index) => (
                    <Card key={index} name={card.name} imgSrc={card.imgSrc} index={index} />
                ))}
            </div>
        </motion.div>
    </div>
);

export default Cards;