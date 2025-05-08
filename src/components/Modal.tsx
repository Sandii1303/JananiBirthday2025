import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  title: string;
  message: string;
  image?: string;
  hasInput?: boolean;
  inputLabel?: string;
  submitLabel?: string;
  onClose: () => void;
  onSubmit: (text: string) => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  message,
  image,
  hasInput = false,
  inputLabel = 'Your message',
  submitLabel = 'Send',
  onClose,
  onSubmit
}) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputText);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div 
          className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-auto overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 400 }}
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-10"
          >
            <X size={24} />
          </button>
          
          {/* Modal content */}
          <div>
            {/* Optional image */}
            {image && (
              <div className="w-full h-52 overflow-hidden">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-purple-800 mb-3">{title}</h3>
              <p className="text-gray-700 mb-6">{message}</p>
              
              {hasInput && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-1">
                      {inputLabel}
                    </label>
                    <textarea
                      id="input"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                      rows={4}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    >
                      {submitLabel}
                    </button>
                  </div>
                </form>
              )}
              
              {!hasInput && (
                <button
                  onClick={onClose}
                  className="mt-2 bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-lg transition-colors block w-full"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;