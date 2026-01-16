"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Rose petal emoji or svg path could be used. 
// Using a simple SVG shape for better control over color and style.
const RosePetal = ({ delay, duration, startX }: { delay: number; duration: number; startX: number }) => {
  return (
    <motion.div
      initial={{ y: -20, x: 0, opacity: 0, rotate: 0 }}
      animate={{
        y: "110vh",
        opacity: [0, 1, 1, 0],
        rotate: [0, 360],
        x: [0, Math.random() * 40 - 20] // Drift left/right in pixels
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
      className="absolute top-0 text-xl pointer-events-none select-none"
      style={{ zIndex: 0, left: `${startX}vw` }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
          fill="#800020" // Deep Burgundy
          fillOpacity="0.6"
        />
      </svg>
    </motion.div>
  );
};

export default function RosePetals() {
  const [petals, setPetals] = useState<Array<{ id: number; delay: number; duration: number; startX: number }>>([]);

  useEffect(() => {
    // Generate static petals on client side to avoid hydration mismatch
    const count = 30; // Increased count for better coverage across full width
    const newPetals = Array.from({ length: count }).map((_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 10, // Slow fall between 10-20s
      startX: Math.random() * 100,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <RosePetal 
          key={petal.id} 
          delay={petal.delay} 
          duration={petal.duration} 
          startX={petal.startX} 
        />
      ))}
    </div>
  );
}
