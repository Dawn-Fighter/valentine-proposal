"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Sparkle = ({ x, y, delay }: { x: number; y: number; delay: number }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
        repeatDelay: Math.random() * 3
      }}
      className="absolute w-1 h-1 bg-champagne-gold rounded-full shadow-[0_0_4px_2px_rgba(212,175,55,0.4)] pointer-events-none"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
      }}
    />
  );
};

export default function GoldSparkles() {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate sparkles on client side
    const count = 30; // Number of sparkles
    const newSparkles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {sparkles.map((sparkle) => (
        <Sparkle 
          key={sparkle.id} 
          x={sparkle.x} 
          y={sparkle.y} 
          delay={sparkle.delay} 
        />
      ))}
    </div>
  );
}
