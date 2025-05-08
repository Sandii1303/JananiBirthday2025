import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Heart, Mail, Music, Clock, Video } from 'lucide-react';
import { format } from 'date-fns';
import { Gift as GiftType } from '../types';

interface GiftCardProps {
  gift: GiftType;
  isUnlocked: boolean;
}

const GiftCard: React.FC<GiftCardProps> = ({ gift, isUnlocked }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Display formatted time
  const formattedTime = format(new Date(gift.unlockTime), 'hh:mm a');
  const formattedDate = format(new Date(gift.unlockTime), 'MMM d, yyyy');

  const handleAudioPlay = () => {
    if (gift.audio && isUnlocked) {
      const audio = new Audio(gift.audio);
      audio.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
    }
  };
  
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Gift wrapping overlay (shown when locked) */}
      {!isUnlocked && (
        <motion.div 
          className="absolute inset-0 z-10 bg-gradient-to-br from-pink-300 to-pink-500 flex flex-col items-center justify-center p-6 text-white"
          animate={isHovered ? { scale: 0.98 } : { scale: 1 }}
        >
          {/* Gift wrap pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 grid grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-white/30 flex items-center justify-center">
                  <Heart size={20} className="opacity-50" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-purple-500"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-3 bg-purple-500 -translate-x-1/2"></div>
          
          <Gift size={48} className="mb-3" />
          <p className="text-lg font-bold mb-1">Surprise Gift</p>
          <div className="flex items-center text-sm">
            <Clock size={16} className="mr-1" />
            <span>Unlocks at {formattedTime}</span>
          </div>
          <div className="text-xs mt-1 opacity-80">{formattedDate}</div>
        </motion.div>
      )}
      
      {/* Actual gift content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-purple-800">{gift.title}</h3>
          {gift.type === 'message' && <Mail size={20} className="text-pink-500" />}
          {gift.type === 'wish' && <Heart size={20} className="text-pink-500" />}
          {gift.type === 'audio' && <Music size={20} className="text-pink-500" />}
          {gift.type === 'video' && <Video size={20} className="text-pink-500" />}
        </div>
        
        {isUnlocked && (
          <div>
            {gift.content && <p className="text-gray-700 mb-4">{gift.content}</p>}
            
            {gift.image && (
              <div className="rounded-lg overflow-hidden mb-4 shadow-sm">
                <img src={gift.image} alt={gift.title} className="w-full h-auto" />
              </div>
            )}

            {gift.audio && (
              <button
                onClick={handleAudioPlay}
                className={`w-full py-3 px-4 rounded-lg transition-colors ${
                  isPlaying
                    ? 'bg-pink-100 text-pink-700'
                    : 'bg-pink-500 hover:bg-pink-600 text-white'
                }`}
              >
                <Music size={20} className="inline-block mr-2" />
                {isPlaying ? 'Playing...' : 'Play Message'}
              </button>
            )}

            {gift.video && (
              <div className="rounded-lg overflow-hidden mb-4 shadow-sm">
                <video src={gift.video} className="w-full h-auto" controls />
              </div>
            )}
            
            {gift.hasInput && (
              <div className="mt-4">
                <textarea 
                  className="w-full rounded-lg border-pink-200 focus:ring-pink-500 focus:border-pink-500 p-3 text-gray-700"
                  rows={3} 
                  placeholder={gift.inputLabel || "Write your message here..."}
                ></textarea>
                <button className="mt-2 bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  {gift.submitLabel || "Send"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GiftCard;