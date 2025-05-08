import React from 'react';
import { motion } from 'framer-motion';
import { Train } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative pt-10 pb-6 text-center">
      <div className="absolute top-0 left-0 w-full h-16 overflow-hidden pointer-events-none">
        {/* Cloud decorations */}
        <motion.div 
          className="absolute top-3 left-[5%] w-16 h-8 bg-white rounded-full opacity-70"
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-8 left-[15%] w-20 h-10 bg-white rounded-full opacity-70"
          animate={{ x: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-5 right-[20%] w-24 h-12 bg-white rounded-full opacity-70"
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Animated train */}
      <motion.div 
        className="flex items-center justify-center mb-2"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.div
          animate={{ x: [-8, 8, -8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Train size={48} className="text-pink-600" />
        </motion.div>
        <div className="ml-3 text-left">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
            Birthday Express
          </h1>
          <p className="text-sm text-gray-600 italic">Delivering love, one surprise at a time</p>
        </div>
      </motion.div>

      {/* Railroad tracks */}
      <div className="flex justify-center mt-4">
        <div className="w-32 h-2 bg-gray-400 rounded-full relative">
          <div className="absolute left-0 top-4 w-full flex justify-between">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-1.5 h-3 bg-gray-500"></div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;