import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center">
      {/* 1. Envelope Wrapper (The Container) */}
      <div 
        className="relative w-80 h-52 bg-pink-200 cursor-pointer shadow-2xl"
        onClick={() => setIsOpen(!isOpen)}
        style={{ perspective: "1000px" }} // Necessary for 3D rotation
      >
        
        {/* 2. The Letter (Inside the pocket) */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: isOpen ? -100 : 0 }}
          transition={{ delay: isOpen ? 0.4 : 0, duration: 0.6, type: "spring" }}
          className="absolute left-4 right-4 top-4 bottom-4 bg-white shadow-md p-4 z-10"
        >
          <div className="border-2 border-pink-100 h-full w-full flex flex-col items-center justify-center text-center">
            <h2 className="font-serif text-xl text-pink-600">Give me the chance na kase</h2>
            <p className="text-xs text-gray-500 mt-2">pleaseeeeeeeeeee, loloves naman kita mwaaaa</p>
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