import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import CountdownTimer from './components/CountdownTimer';
import Timeline from './components/Timeline';
import Modal from './components/Modal';
import FloatingElements from './components/FloatingElements';
import { checkForUnlockedGifts, getNextGiftTime } from './utils/dateUtils';
import { gifts } from './data/gifts';

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
    const checkInterval = setInterval(() => {
      const newUnlocked = checkForUnlockedGifts(gifts);
      
      // If we have new unlocked gifts
      if (newUnlocked.length > unlockedGifts.length) {
        setUnlockedGifts(newUnlocked);
        setNextGiftTime(getNextGiftTime(gifts));
        setShowReloadNotice(true);
      }
    }, 60000);

    return () => clearInterval(checkInterval);
  }, [unlockedGifts]);

  // Show birthday popup on the special day
  useEffect(() => {
    const checkBirthday = () => {
      const now = new Date();
      // Check if it's her birthday
      if (now.getFullYear() === 2025 && now.getMonth() === 4 && now.getDate() === 9) {
        // Show birthday message at midnight
        if (now.getHours() === 0 && now.getMinutes() === 0) {
          setModalContent({
            title: "🎂 Happy Birthday, My Love!",
            message: "Today is all about you. I've prepared some special surprises throughout the day. I love you!",
            image: "https://images.pexels.com/photos/796606/pexels-photo-796606.jpeg",
          });
          setShowModal(true);
        }
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