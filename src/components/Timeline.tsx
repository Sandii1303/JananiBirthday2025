import React from 'react';
import GiftCard from './GiftCard';
import { Gift } from '../types';

interface TimelineProps {
  gifts: Gift[];
  unlockedGifts: string[];
}

const Timeline: React.FC<TimelineProps> = ({ gifts, unlockedGifts }) => {
  return (
    <div className="relative mt-12 pb-20">
      {/* Center track line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-pink-300 -translate-x-1/2"></div>
      
      {/* Gift train cars along the track */}
      <div className="relative">
        {gifts.map((gift, index) => {
          const isUnlocked = unlockedGifts.includes(gift.id);
          // Alternate sides on desktop, stack on mobile
          const isLeft = index % 2 === 0;
          
          return (
            <div 
              key={gift.id}
              className={`mb-12 flex flex-col items-center md:items-stretch md:flex-row ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline node and track */}
              <div className="hidden md:block md:flex-grow md:flex md:justify-center">
                <div className={`flex flex-col items-center ${isLeft ? 'md:items-end' : 'md:items-start'}`}>
                  <div className="w-16 h-px bg-pink-300"></div>
                </div>
              </div>
              
              {/* Node on track */}
              <div className="w-8 h-8 bg-pink-500 rounded-full z-10 flex items-center justify-center shadow-md mb-4 md:mb-0">
                <span className="text-white font-bold">
                  {index + 1}
                </span>
              </div>
              
              {/* Other side of track */}
              <div className="hidden md:block md:flex-grow md:flex md:justify-center">
                <div className={`flex flex-col items-center ${isLeft ? 'md:items-start' : 'md:items-end'}`}>
                  <div className="w-16 h-px bg-pink-300"></div>
                </div>
              </div>
              
              {/* Gift card */}
              <div className="w-full md:w-5/12 md:flex-shrink-0">
                <GiftCard gift={gift} isUnlocked={isUnlocked} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;