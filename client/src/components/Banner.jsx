import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock game data with placeholder images (replace with actual game images)
const games = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    price: "$49.99",
    discount: "25% OFF",
    image: "https://wallpapercat.com/w/full/5/d/f/2614-3840x2160-desktop-4k-cyberpunk-2077-wallpaper-photo.jpg",
    label: "Popular",
    buttonText: "Buy Now",
    description: "Night City awaits with limitless possibilities",
    category: "RPG",
  },
  {
    id: 2,
    title: "Red Dead Redemption 2",
    price: "$39.99",
    discount: "33% OFF",
    image: "https://images8.alphacoders.com/958/958091.jpg",
    label: "Best Seller",
    buttonText: "Purchase",
    description: "Become an outlaw in the untamed American wilderness",
    category: "Action Adventure",
  },
  {
    id: 3,
    title: "The Last of Us Part II",
    price: "$44.99",
    discount: "10% OFF",
    image: "https://pixelz.cc/wp-content/uploads/2024/02/the-last-of-us-part-2-remastered-ellie-uhd-4k-wallpaper.jpg",
    label: "Featured",
    buttonText: "Get Now",
    description: "A brutal journey of revenge in a post-apocalyptic world",
    category: "Action Adventure",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [direction, setDirection] = useState(1);

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % games.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  // Handle manual slide change and pause autoplay
  const handleManualChange = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000); // Resume after 10s
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    }),
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % games.length);
    setIsAutoplay(false);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + games.length) % games.length);
    setIsAutoplay(false);
  };

  return (
    <div className="relative min-h-[600px] bg-[#0f172a] overflow-hidden">
      {/* Fancy Gaming Background */}
      {/* Dynamic Gradient Base */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #111827 50%, #0f172a 100%)",
          zIndex: 1,
        }}
      />

      {/* Glowing Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 5 + 2}px`,
            height: `${Math.random() * 5 + 2}px`,
            backgroundColor: i % 3 === 0 ? "#6366f1" : i % 3 === 1 ? "#8b5cf6" : "#ec4899",
            boxShadow: `0 0 ${Math.random() * 10 + 5}px ${i % 3 === 0 ? "#6366f1" : i % 3 === 1 ? "#8b5cf6" : "#ec4899"}`,
            zIndex: 2,
          }}
          animate={{
            y: [0, Math.random() * -50 - 20],
            opacity: [0.8, 0],
            scale: [1, Math.random() * 0.5 + 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Circuit Lines */}
      {[...Array(10)].map((_, i) => {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const length = 40 + Math.random() * 60;
        const isHorizontal = Math.random() > 0.5;
        return (
          <motion.div
            key={`circuit-${i}`}
            className="absolute"
            style={{
              left: `${startX}%`,
              top: `${startY}%`,
              width: isHorizontal ? `${length}px` : "1px",
              height: isHorizontal ? "1px" : `${length}px`,
              backgroundColor: "rgba(99, 102, 241, 0.3)",
              boxShadow: "0 0 5px rgba(99, 102, 241, 0.5)",
              transform: `rotate(${Math.random() * 360}deg)`,
              transformOrigin: "0 0",
              zIndex: 2,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Neon Grid Pattern */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          zIndex: 2,
        }}
      />

      {/* Glowing Orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 80 + 40}px`,
            height: `${Math.random() * 80 + 40}px`,
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(17, 24, 39, 0) 70%)",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient Overlay for Readability */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(17, 24, 39, 0) 0%, rgba(17, 24, 39, 0.9) 100%)",
          zIndex: 3,
        }}
      />

      {/* Main Content */}
      <div className="relative max-w-[1200px] mx-auto px-4 pt-12 pb-16 z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-[2.5rem] sm:text-[3rem] font-extrabold text-white tracking-tight"
            style={{ textShadow: "0 0 10px rgba(99, 102, 241, 0.5)" }}
          >
            Featured Games
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-[#6366f1] mx-auto rounded-full"
            style={{ boxShadow: "0 0 10px #6366f1" }}
          />
        </div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col lg:flex-row gap-8 items-center"
            >
              {/* Game Image */}
              <motion.div
                className="lg:w-1/2 relative rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                style={{
                  boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
                  border: "1px solid rgba(99, 102, 241, 0.2)",
                }}
              >
                <img
                  src={games[currentSlide].image}
                  alt={games[currentSlide].title}
                  className="w-full h-[300px] lg:h-[400px] object-cover"
                />
                {/* Price Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute top-4 right-4 bg-[#111827] bg-opacity-80 px-4 py-2 rounded-lg"
                  style={{ border: "1px solid #6366f1", boxShadow: "0 0 10px rgba(99, 102, 241, 0.3)" }}
                >
                  <div className="text-gray-400 text-sm line-through">{games[currentSlide].price}</div>
                  <div className="text-white font-bold">Save {games[currentSlide].discount}</div>
                </motion.div>
                {/* Category */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute bottom-4 left-4 bg-[#6366f1] text-white text-sm font-medium px-3 py-1 rounded-full"
                  style={{ boxShadow: "0 0 10px #6366f1" }}
                >
                  {games[currentSlide].category}
                </motion.div>
              </motion.div>

              {/* Game Details */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="lg:w-1/2 text-center lg:text-left"
              >
                <motion.div
                  variants={itemVariants}
                  className="inline-block px-3 py-1 rounded-full bg-[#6366f1] bg-opacity-20 text-[#6366f1] text-sm font-semibold mb-4"
                >
                  {games[currentSlide].label}
                </motion.div>
                <motion.h3
                  variants={itemVariants}
                  className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold text-white mb-4 tracking-tight"
                  style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.3)" }}
                >
                  {games[currentSlide].title}
                </motion.h3>
                <motion.p
                  variants={itemVariants}
                  className="text-gray-300 text-lg mb-6 max-w-[400px] mx-auto lg:mx-0"
                >
                  {games[currentSlide].description}
                </motion.p>
                <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-[#6366f1] text-white font-semibold rounded-lg"
                    style={{ boxShadow: "0 0 10px rgba(99, 102, 241, 0.3)" }}
                  >
                    {games[currentSlide].buttonText}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, borderColor: "#6366f1" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-[#111827] text-white font-semibold rounded-lg"
                    style={{ border: "1px solid #374151", boxShadow: "0 0 10px rgba(55, 65, 81, 0.3)" }}
                  >
                    View Details
                  </motion.button>
                </motion.div>
                {/* Indicator Dots */}
                <motion.div
                  variants={itemVariants}
                  className="flex justify-center lg:justify-start mt-8 space-x-2"
                >
                  {games.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleManualChange(index)}
                      className={`h-3 rounded-full ${
                        currentSlide === index ? "bg-[#6366f1] w-6" : "bg-gray-600 w-3"
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        boxShadow: currentSlide === index ? "0 0 10px #6366f1" : "none",
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#111827] bg-opacity-80 p-3 rounded-full"
            whileHover={{ scale: 1.1, x: -5, boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)" }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            style={{ border: "1px solid #6366f1" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#111827] bg-opacity-80 p-3 rounded-full"
            whileHover={{ scale: 1.1, x: 5, boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)" }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            style={{ border: "1px solid #6366f1" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Bottom Curve */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{ zIndex: 3 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full h-full"
          >
            <path
              fill="#111827"
              fillOpacity="0.9"
              d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,69.3C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;