"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const RisingHeart = ({ id, delay, x }: { id: number; delay: number; x: number }) => {
  const size = Math.random() * 30 + 15; // Smaller hearts: 15-45px
  const duration = Math.random() * 4 + 6; // Slower: 6-10s

  return (
    <motion.div
      initial={{ y: "110vh", opacity: 0, x: `${x}vw`, scale: 0.5 }}
      animate={{ 
        y: "20vh", // Stop way below the top to avoid text overlap
        opacity: [0, 0.4, 0], // Lower max opacity (0.6 -> 0.4)
        x: [`${x}vw`, `${x + (Math.random() * 20 - 10)}vw`], 
        scale: [0.5, 1, 0.8]
      }}
      transition={{ 
        duration: duration, 
        ease: "easeOut", 
        delay: delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 2
      }}
      className="absolute bottom-0 text-deep-burgundy/40"
      style={{ 
        width: size, 
        height: size,
        left: 0
      }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-sm">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </motion.div>
  );
};

export default function GoldCelebration({ active }: { active: boolean }) {
  const [hearts, setHearts] = useState<Array<{ id: number; delay: number; x: number }>>([]);

  useEffect(() => {
    if (active) {
      // Delay the hearts by 800ms to let the "Congratulations" text animate smoothly first
      const timer = setTimeout(() => {
        const newHearts = Array.from({ length: 25 }).map((_, i) => ({
          id: i,
          delay: Math.random() * 3, // Stagger start times
          x: Math.random() * 100 // Random horizontal position
        }));
        setHearts(newHearts);
      }, 800);
      
      return () => clearTimeout(timer);
    } else {
      setHearts([]);
    }
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div 
          className="fixed inset-0 pointer-events-none overflow-hidden z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Cinematic Bloom - Warm Golden/Red Glow */}
          <div 
            className="absolute inset-0" 
            style={{
              background: "radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, rgba(128, 0, 32, 0.05) 40%, transparent 70%)"
            }}
          />
          
          {/* Rising Hearts */}
          {hearts.map((heart) => (
            <RisingHeart key={heart.id} {...heart} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
