"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  y: number;
}

export default function CursorHeartTrail() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lastSpawn, setLastSpawn] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const now = Date.now();
      // Spawn a heart every 100ms (throttle)
      if (now - lastSpawn > 100) {
        const newHeart: Heart = {
          id: now,
          x: e.clientX,
          y: e.clientY,
        };
        
        setHearts(prev => [...prev, newHeart]);
        setLastSpawn(now);
        
        // Auto-remove after animation
        setTimeout(() => {
          setHearts(prev => prev.filter(h => h.id !== newHeart.id));
        }, 1500);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [lastSpawn]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ 
              opacity: 0.8, 
              scale: 0,
              x: heart.x - 12, // Center the heart (24px / 2)
              y: heart.y - 12,
            }}
            animate={{ 
              opacity: 0,
              scale: [0, 1.2, 1],
              y: heart.y - 80, // Float upward
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.5,
              ease: "easeOut",
            }}
            className="absolute will-change-transform"
            style={{
              left: 0,
              top: 0,
            }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-sm"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="url(#heart-gradient)"
              />
              <defs>
                <linearGradient id="heart-gradient" x1="2" y1="3" x2="22" y2="21">
                  <stop offset="0%" stopColor="#800020" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#E8B4B8" stopOpacity="0.4" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
