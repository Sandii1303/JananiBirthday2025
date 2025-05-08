import { Gift } from '../types';

/**
 * Check if a date has passed
 */
export const hasDatePassed = (date: string | Date): boolean => {
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  return now >= targetDate;
};

/**
 * Check which gifts should be unlocked based on current time
 */
export const checkForUnlockedGifts = (gifts: Gift[]): string[] => {
  return gifts
    .filter(gift => hasDatePassed(gift.unlockTime))
    .map(gift => gift.id);
};

/**
 * Get the next gift unlock time
 */
export const getNextGiftTime = (gifts: Gift[]): Date | null => {
  const now = new Date();
  
  // Filter gifts that haven't unlocked yet and sort by unlock time
  const upcomingGifts = gifts
    .filter(gift => new Date(gift.unlockTime) > now)
    .sort((a, b) => new Date(a.unlockTime).getTime() - new Date(b.unlockTime).getTime());
  
  // Return the next unlock time, or null if no upcoming gifts
  return upcomingGifts.length > 0 ? new Date(upcomingGifts[0].unlockTime) : null;
};

/**
 * Format a countdown display
 */
export const formatCountdown = (targetDate: Date): { hours: number, minutes: number, seconds: number } => {
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