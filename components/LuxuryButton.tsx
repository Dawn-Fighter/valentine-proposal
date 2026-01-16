"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface LuxuryButtonProps extends HTMLMotionProps<"button"> {
  scaleMultiplier?: number;
  children: React.ReactNode;
}

export default function LuxuryButton({ 
  children, 
  className, 
  onClick, 
  scaleMultiplier = 1,
  ...props 
}: LuxuryButtonProps) {
  
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 * scaleMultiplier }}
      whileTap={{ scale: 0.95 * scaleMultiplier }}
      animate={{ 
        scale: scaleMultiplier,
        boxShadow: [
          "0 4px 24px rgba(128, 0, 32, 0.3)",
          "0 8px 32px rgba(128, 0, 32, 0.5)",
          "0 4px 24px rgba(128, 0, 32, 0.3)"
        ]
      }}
      transition={{ 
        scale: { type: "spring", stiffness: 300, damping: 20 },
        boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }}
      className={cn(
        "relative overflow-hidden group px-12 py-5 rounded-full",
        "bg-gradient-to-br from-deep-burgundy to-rich-wine",
        "border border-champagne-gold/30",
        "text-white font-playfair text-xl tracking-widest uppercase font-semibold",
        "shadow-2xl transition-colors",
        className
      )}
      {...props}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
      
      {/* Inner Glow */}
      <div className="absolute inset-0 rounded-full opacity-50 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      
      <span className="relative z-20 flex items-center gap-3">
        {children}
      </span>
    </motion.button>
  );
}
