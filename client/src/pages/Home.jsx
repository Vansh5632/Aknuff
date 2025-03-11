import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import Cards from '../components/Cards';

// Featured games data with added images
const featuredGames = [
  { id: 1, name: 'Mobile Legends', users: '25M+', image: '/games/ml.png' },
  { id: 2, name: 'PUBG Mobile', users: '18M+', image: '/games/pubg.png' },
  { id: 3, name: 'Genshin Impact', users: '12M+', image: '/games/genshin.png' },
  { id: 4, name: 'Free Fire', users: '20M+', image: '/games/freefire.png' },
  { id: 5, name: 'Valorant', users: '15M+', image: '/games/valorant.png' }
];

// Stats data
const stats = [
  { id: 1, label: 'Active Users', value: '2.5M+', icon: 'users' },
  { id: 2, label: 'Transactions', value: '10M+', icon: 'credit-card' },
  { id: 3, label: 'Games', value: '500+', icon: 'gamepad' },
  { id: 4, label: 'Satisfaction', value: '99%', icon: 'star' }
];

// How it works steps
const steps = [
  { id: 1, title: 'Choose a Game', description: 'Browse our wide selection of games and digital products', icon: 'game-controller' },
  { id: 2, title: 'Select Package', description: 'Pick the top-up amount or item you need', icon: 'package' },
  { id: 3, title: 'Make Payment', description: 'Choose from multiple payment methods', icon: 'credit-card' },
  { id: 4, title: 'Get Your Items', description: 'Receive your purchase instantly in your game', icon: 'gift' }
];

// Popular categories
const categories = [
  { id: 1, name: 'Game Credits', icon: 'coin' },
  { id: 2, name: 'Game Items', icon: 'sword' },
  { id: 3, name: 'Gift Cards', icon: 'gift-card' },
  { id: 4, name: 'Subscriptions', icon: 'calendar' },
  { id: 5, name: 'Game Accounts', icon: 'user' },
  { id: 6, name: 'Game Boosting', icon: 'trending-up' }
];

// Animation for sections that come into view
const SectionAnimation = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6, delay }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-white relative overflow-hidden">
      {/* Background Effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.2), transparent 70%)",
          opacity: 0.3,
        }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`hex-home-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              opacity: 0.1 + Math.random() * 0.2,
              background: i % 2 === 0 ? '#6366f1' : '#a855f7',
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
            animate={{
              opacity: [0.1 + Math.random() * 0.2, 0.3 + Math.random() * 0.2, 0.1 + Math.random() * 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      
      {/* Search Overlay */}
      {isSearchOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full max-w-4xl px-4">
            <div className="relative">
              <input 
                type="text" 
                className="w-full bg-gray-900/80 text-white py-4 px-6 rounded-lg text-lg border border-[#6366f1]/30 focus:outline-none focus:ring-2 focus:ring-[#a855f7] shadow-lg"
                placeholder="Search for games, top-ups, gift cards..."
                autoFocus
              />
              <button 
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
                onClick={() => setIsSearchOpen(false)}
              >
                <span className="text-xl">×</span>
              </button>
            </div>
            <div className="mt-4 bg-gray-900/80 rounded-lg p-4 border border-[#6366f1]/20 shadow-lg">
              <p className="text-gray-400 mb-2">Popular Searches:</p>
              <div className="flex flex-wrap gap-2">
                {featuredGames.map(game => (
                  <motion.span 
                    key={game.id} 
                    className="bg-gray-800 px-3 py-1 rounded-full text-sm hover:bg-indigo-600 cursor-pointer"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(99, 102, 241, 0.3)" }}
                  >
                    {game.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      <main className="flex-grow">
        {/* Banner Section */}
        <div className="relative pb-4">
          <Banner />
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#0f172a] to-transparent"></div>
        </div>
        
        {/* Quick Categories Section */}
        <SectionAnimation>
          <section className="container mx-auto px-4 -mt-8 relative z-10 mb-12">
            <div className="bg-gray-900/80 rounded-xl shadow-lg p-6 border border-[#6366f1]/20">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    className="flex flex-col items-center cursor-pointer"
                    whileHover={{ y: -5, scale: 1.05 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.05 * index, duration: 0.4 }
                    }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-[#6366f1] to-[#a855f7] rounded-full flex items-center justify-center mb-2 shadow-lg"
                      whileHover={{ boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)" }}
                    >
                      <span className="text-xl text-white">{category.icon.charAt(0)}</span>
                    </motion.div>
                    <span className="text-sm text-center text-gray-300 hover:text-[#a855f7]">{category.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </SectionAnimation>
        
        {/* Featured Games Section */}
        <SectionAnimation>
          <section className="py-8 bg-gradient-to-b from-[#0f172a] to-[#050417] relative">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-6">
                <motion.h2 
                  className="text-3xl font-extrabold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ textShadow: "0 0 15px rgba(99, 102, 241, 0.5)" }}
                >
                  Featured Games
                </motion.h2>
                <motion.button
                  className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                  whileHover={{ x: 5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All →
                </motion.button>
              </div>
              
              <div className="flex space-x-4 md:space-x-8 py-4 overflow-x-auto scrollbar-hide">
                {featuredGames.map((game, index) => (
                  <motion.div
                    key={game.id}
                    className="flex-shrink-0 w-24 md:w-32 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.1 * index, duration: 0.5 }
                    }}
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <motion.div 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-indigo-700 to-purple-700 flex items-center justify-center shadow-lg mb-2 mx-auto overflow-hidden border border-[#6366f1]/30"
                      whileHover={{ boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)" }}
                    >
                      {game.image ? (
                        <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url(${game.image})` }} />
                      ) : (
                        <span className="text-2xl font-bold text-white">{game.name.charAt(0)}</span>
                      )}
                    </motion.div>
                    <p className="font-medium text-center text-sm md:text-base text-white">{game.name}</p>
                    <p className="text-xs text-center text-indigo-400">{game.users}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </SectionAnimation>
        
        {/* Main Product Cards Section */}
        <SectionAnimation>
          <section className="container mx-auto px-4 py-12">
            <Cards />
          </section>
        </SectionAnimation>

        {/* How It Works Section */}
        <SectionAnimation>
          <section className="py-16 bg-[#050417] relative">
            <div className="container mx-auto px-4">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent" style={{ textShadow: "0 0 15px rgba(99, 102, 241, 0.5)" }}>
                  How It Works
                </h2>
                <motion.div 
                  className="w-24 h-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] mx-auto rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "6rem" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
                <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Get your game credits, items, and top-ups in just a few simple steps</p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className="bg-gray-900/80 p-6 rounded-xl text-center relative border border-[#6366f1]/20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.2 * index, duration: 0.6 }
                    }}
                    whileHover={{ 
                      y: -10, 
                      boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
                      borderColor: "rgba(99, 102, 241, 0.5)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{ 
                        boxShadow: [
                          "0 0 20px rgba(99, 102, 241, 0.2)",
                          "0 0 30px rgba(168, 85, 247, 0.3)",
                          "0 0 20px rgba(99, 102, 241, 0.2)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] flex items-center justify-center font-bold text-xl shadow-lg">
                        {step.id}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mt-4 mb-2 text-white">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </SectionAnimation>

        {/* User Testimonials Section */}
        <SectionAnimation>
          <section className="py-16 bg-[#0f172a] relative">
            <div className="container mx-auto px-4">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent" style={{ textShadow: "0 0 15px rgba(99, 102, 241, 0.5)" }}>
                  What Our Users Say
                </h2>
                <motion.div 
                  className="w-24 h-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] mx-auto rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "6rem" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((item, index) => (
                  <motion.div
                    key={item}
                    className="bg-gray-900/80 p-6 rounded-xl relative border border-[#6366f1]/20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.2 * index, duration: 0.6 }
                    }}
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.3)",
                      borderColor: "rgba(99, 102, 241, 0.5)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{ 
                        boxShadow: [
                          "0 0 20px rgba(99, 102, 241, 0.2)",
                          "0 0 30px rgba(168, 85, 247, 0.3)",
                          "0 0 20px rgba(99, 102, 241, 0.2)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <div className="text-indigo-400 text-4xl mb-4">"</div>
                    <p className="mb-4 text-gray-300">The process was super fast! I got my game credits within seconds after payment. Will definitely use again.</p>
                    <div className="flex items-center mt-6">
                      <motion.div 
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] mr-3"
                        whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)" }}
                      />
                      <div>
                        <p className="font-bold text-white">User {item}</p>
                        <div className="flex text-yellow-400 text-sm">
                          <motion.span whileHover={{ scale: 1.2, color: "#facc15" }}>★</motion.span>
                          <motion.span whileHover={{ scale: 1.2, color: "#facc15" }}>★</motion.span>
                          <motion.span whileHover={{ scale: 1.2, color: "#facc15" }}>★</motion.span>
                          <motion.span whileHover={{ scale: 1.2, color: "#facc15" }}>★</motion.span>
                          <motion.span whileHover={{ scale: 1.2, color: "#facc15" }}>★</motion.span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </SectionAnimation>

        {/* Stats Section */}
        <SectionAnimation>
          <section className="py-16 bg-gradient-to-r from-[#050417] to-[#0f172a] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-30"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    className="text-center relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: { delay: 0.1 * index, duration: 0.5 }
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{ 
                        boxShadow: [
                          "0 0 20px rgba(99, 102, 241, 0.2)",
                          "0 0 30px rgba(168, 85, 247, 0.3)",
                          "0 0 20px rgba(99, 102, 241, 0.2)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <motion.h3 
                      className="text-4xl lg:text-5xl font-bold text-white mb-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + (0.1 * index), duration: 0.6 }}
                      style={{ textShadow: "0 0 10px rgba(99, 102, 241, 0.5)" }}
                    >
                      {stat.value}
                    </motion.h3>
                    <p className="text-indigo-200">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </SectionAnimation>

        {/* CTA Section */}
        <SectionAnimation>
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <div className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl p-8 md:p-12 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2), transparent 70%)",
                    opacity: 0.3,
                  }}
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                />
                <div className="max-w-3xl mx-auto text-center relative z-10">
                  <motion.h2 
                    className="text-3xl md:text-4xl font-extrabold mb-4 text-white"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ textShadow: "0 0 15px rgba(255, 255, 255, 0.5)" }}
                  >
                    Ready to start your gaming journey?
                  </motion.h2>
                  <motion.p 
                    className="text-lg text-indigo-100 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Join thousands of gamers who trust Aknuff for their gaming needs
                  </motion.p>
                  <motion.button
                    className="bg-white text-indigo-800 font-bold text-lg py-3 px-8 rounded-full shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.7)",
                      background: "linear-gradient(to right, #ffffff, #e0e7ff)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started Now
                  </motion.button>
                </div>
              </div>
            </div>
          </section>
        </SectionAnimation>
        
        {/* Download App Section
        <SectionAnimation>
          <section className="py-12 bg-[#050417] relative">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <motion.h2 
                    className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ textShadow: "0 0 15px rgba(99, 102, 241, 0.5)" }}
                  >
                    Download Our App
                  </motion.h2>
                  <motion.p 
                    className="text-gray-300 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Get the best gaming deals on the go with our mobile app. Top up anytime, anywhere.
                  </motion.p>
                  <div className="flex space-x-4">
                    <motion.button
                      className="bg-gray-900 text-white px-4 py-3 rounded-lg flex items-center border border-[#6366f1]/30"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div 
                        className="mr-2 text-2xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent"
                        whileHover={{ scale: 1.1 }}
                      >
                        A
                      </motion.div>
                      <div className="text-left">
                        <div className="text-xs text-gray-400">Download on the</div>
                        <div className="font-bold">App Store</div>
                      </div>
                    </motion.button>
                    
                    <motion.button
                      className="bg-gray-900 text-white px-4 py-3 rounded-lg flex items-center border border-[#6366f1]/30"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div 
                        className="mr-2 text-2xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent"
                        whileHover={{ scale: 1.1 }}
                      >
                        P
                      </motion.div>
                      <div className="text-left">
                        <div className="text-xs text-gray-400">Get it on</div>
                        <div className="font-bold">Google Play</div>
                      </div>
                    </motion.button>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <motion.div
                    className="w-64 h-96 bg-gray-900 rounded-3xl relative overflow-hidden border border-[#6366f1]/30"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)" }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-[#6366f1] to-[#a855f7] opacity-70"
                      animate={{ opacity: [0.7, 0.9, 0.7] }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-xl font-bold text-center text-white" style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.5)" }}>
                        App Screenshot
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </SectionAnimation> */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;