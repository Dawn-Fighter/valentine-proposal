"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SarcasticNoteProps {
  message: string | null;
  onComplete: () => void;
}

export default function SarcasticNote({ message, onComplete }: SarcasticNoteProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, onComplete]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ y: -50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -20, opacity: 0, scale: 0.95, filter: "blur(8px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }} // Slower, smoother entry
          className={cn(
            "fixed top-[15%] left-1/2 -translate-x-1/2 z-50",
            "min-w-[280px] max-w-[90vw] px-8 py-4",
            "bg-white/90 backdrop-blur-md", // Glass effect
            "border border-champagne-gold/40 rounded-2xl", // Elegant border & radius
            "shadow-[0_20px_40px_-10px_rgba(128,0,32,0.15)]", // Soft burgundy shadow
            "font-pacifico text-deep-burgundy text-xl md:text-2xl text-center",
            "flex items-center justify-center gap-3",
            "transform-gpu"
          )}
        >
          {/* Subtle Shimmer Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/50 to-white/0 opacity-50 rounded-2xl pointer-events-none" />
          
          <span className="relative z-10 drop-shadow-sm">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
