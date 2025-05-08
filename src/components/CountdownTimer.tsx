import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      
      if (now >= targetDate) {
        return { hours: 0, minutes: 0, seconds: 0 };
      }
      
      // Get the total difference in seconds
      const totalSeconds = Math.floor((targetDate.getTime() - now.getTime()) / 1000);
      
      // Calculate hours, minutes, seconds
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      
      return { hours, minutes, seconds };
    };

    // Set initial time
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate]);
  
  // Format with leading zeros
  const formatTime = (value: number): string => {
    return value.toString().padStart(2, '0');
  };
  
  return (
    <div className="inline-block">
      <motion.div 
        className="bg-white/80 backdrop-blur-sm py-4 px-8 rounded-2xl shadow-lg"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg text-pink-700 font-medium mb-2">
          ⏳ Your next surprise arrives in
        </h2>
        <div className="flex justify-center items-center space-x-2 text-2xl md:text-3xl font-bold text-purple-900">
          {/* Hours */}
          <div className="flex flex-col items-center">
            <motion.div 
              key={`hours-${timeLeft.hours}`}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-14 h-14 md:w-16 md:h-16 bg-pink-100 rounded-lg flex items-center justify-center"
            >
              {formatTime(timeLeft.hours)}
            </motion.div>
            <span className="text-xs text-gray-500 mt-1">Hours</span>
          </div>
          
          <div className="text-pink-500 -mt-4">:</div>
          
          {/* Minutes */}
          <div className="flex flex-col items-center">
            <motion.div 
              key={`minutes-${timeLeft.minutes}`}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-14 h-14 md:w-16 md:h-16 bg-pink-100 rounded-lg flex items-center justify-center"
            >
              {formatTime(timeLeft.minutes)}
            </motion.div>
            <span className="text-xs text-gray-500 mt-1">Minutes</span>
          </div>
          
          <div className="text-pink-500 -mt-4">:</div>
          
          {/* Seconds */}
          <div className="flex flex-col items-center">
            <motion.div 
              key={`seconds-${timeLeft.seconds}`}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-14 h-14 md:w-16 md:h-16 bg-pink-100 rounded-lg flex items-center justify-center"
            >
              {formatTime(timeLeft.seconds)}
            </motion.div>
            <span className="text-xs text-gray-500 mt-1">Seconds</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CountdownTimer;