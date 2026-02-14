import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [playOpen] = useSound('/sounds/Page turn sound effect.mp3', { volume: 0.5 });
  const [playPop] = useSound('/sounds/BUBBLE POP SOUND EFFECT - FREE.mp3', { volume: 0.4 });

  const toggleEnvelope = () => {
  if (!isFocused) {
    playOpen(); // Trigger paper sound
    setIsOpen(!isOpen);
  }
  };

  const handleFocusLetter = (e) => {
    e.stopPropagation();
    if (isOpen) {
      playPop(); // Trigger pop sound
      setIsFocused(true);
    }
};
return (
  <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
    {/* 1. Backdrop Overlay (Global) */}
    <AnimatePresence>
      {isFocused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsFocused(false)}
        />
      )}
    </AnimatePresence>

    {/* 2. THE ENVELOPE WRAPPER (Now just the housing) */}
    <div 
      className="relative w-80 h-52 bg-pink-200 cursor-pointer shadow-2xl overflow-hidden"
      onClick={toggleEnvelope}
      style={{ perspective: "1000px" }}
    >
      {/* Front Pocket */}
      <div 
        className="absolute inset-0 bg-pink-200 z-20"
        style={{ clipPath: "polygon(0 0, 0% 100%, 100% 100%, 100% 0, 50% 50%)" }}
      />

      {/* Top Flap */}
      <motion.div
        animate={{    
          rotateX: isOpen ? 170 : 0,
          filter: isOpen ? "brightness(0.8)" : "brightness(1)",
          zIndex: 50 // always above letter when closed
        }}
        transition={{ duration: 0.4 }}
        style={{ transformOrigin: "top", clipPath: "polygon(0 0, 100% 0, 50% 50%)", backfaceVisibility: "hidden" }}
        className="absolute inset-0 bg-pink-400 shadow-sm"
      />

      {!isOpen && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-red-500 text-2xl animate-pulse">❤️</div>
      )}

      {/* --- MOVED THE LETTER BELOW TO UNTRAP IT --- */}
    </div>

    {/* 3. THE LETTER (Siblings with the Envelope, not a child) */}
    <motion.div
      layoutId="letter"
      transition={{ 
        type: "spring", 
        stiffness: 120, 
        damping: 18,
        // Delay the letter appearing when opening, 
        // but hide it instantly when closing.
        opacity: { delay: isOpen ? 0.2 : 0 },
        y: { delay: isOpen ? 0.15 : 0 }
      }}
      animate={isFocused ? {
        y: 0,
        zIndex: 50,
      } : {
        // Increase the 'tuck' from 20 to 40 so it's fully hidden by the V-shape
        y: isOpen ?  -110 : 80,   // tuck under flap
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? 1 : 0.9, // Slight scale down when inside for depth
          x: "-50%",
        // Ensure it is lower than the Front Pocket (z-20) when not focused
        zIndex: isOpen ? 25 : 5, 
      }}
      onClick={handleFocusLetter}
      className={`
        bg-white shadow-2xl cursor-pointer overflow-hidden
        ${isFocused 
          ? 'fixed inset-6 md:inset-20 p-10 rounded-2xl' 
          : 'absolute left-1/2 -translate-x-1/2 w-72 h-44 p-4 rounded-md'}
      `}
          
    >
      <div className={`flex flex-col h-full w-full text-center ${isFocused ? 'justify-start pt-10' : 'justify-center'}`}>
        <h2 className={`font-serif text-pink-600 transition-all ${isFocused ? 'text-3xl md:text-4xl mb-6' : 'text-lg'}`}>
          Give me the chance na kase
        </h2>
        <p className={`text-gray-600 leading-relaxed transition-all ${isFocused ? 'text-lg md:text-xl' : 'text-[10px]'}`}>
          pleaseeeeeeeeeee, loloves naman kita mwaaaa
        </p>
        
        {isFocused && (
           <div className="mt-auto">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsFocused(false); }}
                className="bg-pink-400 text-white px-8 py-3 rounded-full shadow-lg hover:bg-pink-500 transition-transform active:scale-95"
              >
                Close Letter
              </button>
           </div>
        )}
      </div>
    </motion.div>
  </div>
);
}