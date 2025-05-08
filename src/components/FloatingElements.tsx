import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

// Custom heart component with animation
const FloatingHeart: React.FC<{ 
  size: number; 
  x: number; 
  y: number; 
  delay: number;
  duration: number;
}> = ({ size, x, y, delay, duration }) => {
  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ 
        y: [0, -100],
        opacity: [0, 0.8, 0] 
      }}
      transition={{ 
        repeat: Infinity, 
        duration: duration,
        delay: delay,
        ease: "easeInOut"
      }}
    >
      <Heart size={size} className="text-pink-400 fill-pink-300" />
    </motion.div>
  );
};

// Custom cloud component
const Cloud: React.FC<{ 
  right: string; 
  top: string;
  width: string;
  delay: number;
}> = ({ right, top, width, delay }) => {
  return (
    <motion.div 
      className="absolute bg-white rounded-full opacity-30"
      style={{ 
        right, 
        top, 
        width, 
        height: `calc(${width} * 0.6)` 
      }}
      animate={{ x: [0, -40, 0] }}
      transition={{ 
        repeat: Infinity, 
        duration: 20,
        delay,
        ease: "linear" 
      }}
    />
  );
};

// Sparkle component
const Sparkle: React.FC<{
  size: number;
  x: string;
  y: string;
  delay: number;
}> = ({ size, x, y, delay }) => {
  return (
    <motion.div
      className="absolute bg-yellow-300 rounded-full"
      style={{ 
        left: x, 
        top: y, 
        width: size, 
        height: size
      }}
      animate={{ 
        scale: [0, 1, 0],
        opacity: [0, 1, 0]
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 2,
        delay,
        ease: "easeInOut"
      }}
    />
  );
};

const FloatingElements: React.FC = () => {
  // Generate random hearts
  const hearts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 20) + 10, // 10-30px
    x: Math.floor(Math.random() * 100), // 0-100%
    y: Math.floor(Math.random() * 100), // 0-100%
    delay: Math.random() * 10,
    duration: Math.random() * 5 + 5 // 5-10s
  }));
  
  // Generate random sparkles
  const sparkles = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 4) + 2, // 2-6px
    x: `${Math.floor(Math.random() * 100)}%`,
    y: `${Math.floor(Math.random() * 100)}%`,
    delay: Math.random() * 5
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating hearts */}
      {hearts.map(heart => (
        <FloatingHeart 
          key={heart.id}
          size={heart.size}
          x={heart.x}
          y={heart.y}
          delay={heart.delay}
          duration={heart.duration}
        />
      ))}
      
      {/* Background clouds */}
      <Cloud right="5%" top="15%" width="100px" delay={0} />
      <Cloud right="20%" top="40%" width="150px" delay={5} />
      <Cloud right="70%" top="65%" width="120px" delay={10} />
      
      {/* Sparkles */}
      {sparkles.map(sparkle => (
        <Sparkle
          key={sparkle.id}
          size={sparkle.size}
          x={sparkle.x}
          y={sparkle.y}
          delay={sparkle.delay}
        />
      ))}
    </div>
  );
};

export default FloatingElements;