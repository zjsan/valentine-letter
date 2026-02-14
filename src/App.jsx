import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Add this helper to your App component
const handleLetterClick = (e) => {
  e.stopPropagation(); // Prevents the envelope from closing when clicking the letter
  if (isOpen) setIsFocused(true);
};
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center">

      <AnimatePresence>
      {isFocused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsFocused(false)}
        />
      )}
    </AnimatePresence>


      {/* 1. Envelope Wrapper (The Container) */}
     <div 
      className="relative w-80 h-52 bg-pink-200 cursor-pointer shadow-2xl"
      onClick={() => {
        if (!isFocused) setIsOpen(!isOpen);
      }}
      style={{ perspective: "1000px" }}
    >

        
        {/* 2. The Letter (Inside the pocket) */}
        <motion.div
          layoutId="letter"
          onClick={(e) => {
            e.stopPropagation();
            if (isOpen) setIsFocused(true);
          }}
          // ADD THIS ANIMATE OBJECT
          animate={isFocused ? {
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 20 }
          } : {
            y: isOpen ? -110 : 0, // Moves it out of the pocket when open
            scale: 1,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className={`
            bg-white shadow-2xl cursor-pointer overflow-hidden
            ${isFocused 
              ? 'fixed inset-8 md:inset-20 rounded-2xl z-50 p-10 flex flex-col justify-start' 
              : 'absolute left-4 right-4 top-4 bottom-4 p-4 z-10 rounded-md'}
          `}
        >
      
        <div className="flex flex-col items-center justify-center h-full w-full text-center">
          <h2 className={`font-serif text-pink-600 transition-all duration-300 ${isFocused ? 'text-4xl' : 'text-xl'}`}>
            Give me the chance na kase
          </h2>
          <p className={`text-gray-600 mt-6 leading-relaxed transition-all duration-300 ${isFocused ? 'text-lg' : 'text-xs'}`}>
            pleaseeeeeeeeeee, loloves naman kita mwaaaa
          </p>
          {isFocused && (
            <button 
              onClick={() => setIsFocused(false)}
              className="mt-8 text-pink-400 text-sm underline"
            >
              Close Letter
            </button>
          )}
        </div>
      </motion.div>


        {/* 3. The Front Pocket (The 'V' shape covering the letter) */}
        <div 
          className="absolute inset-0 bg-pink-200 z-20"
          style={{ clipPath: "polygon(0 0, 0% 100%, 100% 100%, 100% 0, 50% 50%)" }}
        />

        {/* 4. The Top Flap (The Hinge) */}
        <motion.div
           animate={{
          rotateX: isOpen ? 170 : 0,
          filter: isOpen ? "brightness(0.8)" : "brightness(1)",
          zIndex: isOpen ? 0 : 30
        }}
          transition={{ duration: 0.4 }}
          style={{
            transformOrigin: "top",
            clipPath: "polygon(0 0, 100% 0, 50% 50%)",
            backfaceVisibility: "hidden"
          }}
          className="absolute inset-0 bg-pink-400 shadow-sm"
        />

        {/* 5. A Little Heart Sticker (Optional Adorability) */}
        {!isOpen && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-red-500 text-2xl animate-pulse">
            ❤️
          </div>
        )}
      </div>
    </div>
  );
}