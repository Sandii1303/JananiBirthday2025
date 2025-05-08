import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import CountdownTimer from './components/CountdownTimer';
import Timeline from './components/Timeline';
import Modal from './components/Modal';
import FloatingElements from './components/FloatingElements';
import { checkForUnlockedGifts, getNextGiftTime } from './utils/dateUtils';
import { gifts } from './data/gifts';
import welcomeImage from "./data/data/janu.jpg"

function App() {
  const [nextGiftTime, setNextGiftTime] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    message: string;
    image?: string;
    hasInput?: boolean;
    inputLabel?: string;
    submitLabel?: string;
  } | null>(null);
  const [unlockedGifts, setUnlockedGifts] = useState<string[]>([]);
  const [showReloadNotice, setShowReloadNotice] = useState(false);

  // Check if any gifts should be unlocked on initial load
  useEffect(() => {
    const unlocked = checkForUnlockedGifts(gifts);
    setUnlockedGifts(unlocked);
    setNextGiftTime(getNextGiftTime(gifts));
  }, []);

  // Check for newly unlocked gifts every minute
  useEffect(() => {
    const checkGifts = () => {
      const newUnlocked = checkForUnlockedGifts(gifts);
      
      // If we have new unlocked gifts
      if (newUnlocked.length > unlockedGifts.length) {
        setUnlockedGifts(newUnlocked);
        setNextGiftTime(getNextGiftTime(gifts));
        // setShowReloadNotice(true);
      }

      // Schedule next check based on time until next gift
      const nextTime = getNextGiftTime(gifts);
      if (nextTime) {
        const timeUntilNext = nextTime.getTime() - Date.now();
        // Check more frequently as we get closer to the next gift
        const checkInterval = Math.min(
          Math.max(timeUntilNext / 10, 1000), // At least 1 second, at most 1/10th of the wait time
          60000 // Cap at 1 minute
        );
        setTimeout(checkGifts, checkInterval);
      } else {
        // If no more gifts, check every minute
        setTimeout(checkGifts, 60000);
      }
    };

    checkGifts();
    return () => {
      // Cleanup will be handled by the timeout
    };
  }, [unlockedGifts]);

  // Show birthday popup on the special day
  useEffect(() => {
    const checkBirthday = () => {
      const now = new Date();
      // Check if it's her birthday
      if (now > new Date('2025-05-09T00:00:00')) {
          setModalContent({
            title: "🎂 Happy Birthday, My Love!",
            message: "Today is all about you. I've prepared some special surprises throughout the day. I love you!",
            image: welcomeImage,
          });
          setShowModal(true);
        }
      
    };

    checkBirthday();
    const birthdayInterval = setInterval(checkBirthday, 60000); // Check every minute

    return () => clearInterval(birthdayInterval);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleFormSubmit = (text: string) => {
    // Here you would integrate with EmailJS
    console.log('Sending email with text:', text);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 overflow-hidden relative">
      <FloatingElements />
      
      <div className="container mx-auto px-4 pt-6 pb-20">
        <Header />
        
        <div className="mt-8 text-center">
          {showReloadNotice ? (
            <div className="bg-pink-100 text-pink-800 p-4 rounded-lg shadow-md mb-8 animate-pulse">
              🎉 A gift has just arrived! Reload to open it!
            </div>
          ) : nextGiftTime && (
            <CountdownTimer targetDate={nextGiftTime} />
          )}
        </div>
        
        <Timeline gifts={gifts} unlockedGifts={unlockedGifts} />
      </div>
          {
            showModal && modalContent && 1
          }
      {showModal && modalContent && (
        <Modal 
          title={modalContent.title}
          message={modalContent.message}
          image={modalContent.image}
          hasInput={modalContent.hasInput}
          inputLabel={modalContent.inputLabel}
          submitLabel={modalContent.submitLabel}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}

export default App;