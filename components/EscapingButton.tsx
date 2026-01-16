"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface EscapingButtonProps {
  onEscape: () => void;
  attempts: number;
}

export default function EscapingButton({ onEscape, attempts }: EscapingButtonProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isShaking, setIsShaking] = useState(false);

  // Trigger shake and callback
  const handleInteraction = () => {
    if (attempts >= 6) return; // Stop if about to disappear
    
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
    
    onEscape();
  };

  useEffect(() => {
    if (attempts >= 6) {
      setIsVisible(false);
    }
  }, [attempts]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="relative inline-block"
          animate={isShaking ? { x: [0, -5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.4 }}
          style={{ zIndex: 40 }}
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onHoverStart={handleInteraction}
            onClick={handleInteraction}
            className="px-6 py-2 text-sm font-medium text-warm-gray/60 hover:text-warm-gray transition-colors font-playfair uppercase tracking-widest"
            style={{
              cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23800020' stroke-width='2'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>") 12 12, pointer`
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1, 
              scale: Math.max(0.5, 1 - attempts * 0.1) // Shrink with attempts
            }}
            exit={{ opacity: 0, scale: 0, filter: "blur(10px)" }}
          >
            No
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
