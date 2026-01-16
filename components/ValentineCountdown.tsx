"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

interface ValentineCountdownProps {
  hide?: boolean;
}

export default function ValentineCountdown({ hide = false }: ValentineCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ 
    days: 0, 
    hours: 0, 
    minutes: 0, 
    seconds: 0,
    total: 0 
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Valentine's Day this year
      let valentinesDay = new Date(currentYear, 1, 14, 0, 0, 0); // Month is 0-indexed (1 = February)
      
      // If Valentine's Day has passed this year, target next year
      if (now > valentinesDay) {
        valentinesDay = new Date(currentYear + 1, 1, 14, 0, 0, 0);
      }
      
      const difference = valentinesDay.getTime() - now.getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          total: difference,
        };
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const { days, hours, minutes, seconds, total } = timeLeft;

  // If Valentine's Day is here!
  if (total === 0) {
    return (
      <AnimatePresence>
        {!hide && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, transition: { duration: 0.6, ease: "easeOut" } }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-gradient-to-br from-deep-burgundy via-[#9B1B30] to-rich-wine backdrop-blur-xl rounded-[20px] px-10 py-6 shadow-2xl border border-white/20">
              <p className="text-2xl font-playfair font-bold text-center text-white">
                🎉 Happy Valentine's Day! 💖
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30, transition: { duration: 0.6, ease: "easeOut" } }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]"
        >
          {/* Elegant Card Container */}
          <div className="relative bg-gradient-to-br from-deep-burgundy via-[#9B1B30] to-rich-wine backdrop-blur-xl rounded-[20px] px-6 md:px-10 py-5 md:py-6 shadow-2xl border border-white/10">
            
            {/* Sparkle Icon */}
            <div className="absolute -top-2 -left-2 text-2xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
              💝
            </div>
            
            {/* Header Text */}
            <div className="text-center mb-3">
              <p className="text-sm md:text-base font-pacifico text-champagne-gold/90 tracking-wide">
                Limited time offer
              </p>
            </div>

            {/* Time Display - Large Numbers */}
            <div className="flex items-center justify-center gap-3 md:gap-5 mb-3">
              <TimeBox value={days} label="DAYS" />
              <Separator />
              <TimeBox value={hours} label="HRS" />
              <Separator />
              <TimeBox value={minutes} label="MIN" />
              <Separator />
              <TimeBox value={seconds} label="SEC" />
            </div>

            {/* Footer Text */}
            <div className="text-center">
              <p className="text-xs md:text-sm font-playfair italic text-white/80 flex items-center justify-center gap-1">
                <span>Until Valentine&apos;s Day</span>
                <span className="text-base">💕</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Time box component
function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div 
        key={value}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative"
      >
        <div className="text-3xl md:text-5xl font-bold text-white tabular-nums tracking-tight">
          {String(value).padStart(2, '0')}
        </div>
      </motion.div>
      <div className="text-[9px] md:text-[11px] font-playfair uppercase text-white/60 tracking-widest mt-0.5">
        {label}
      </div>
    </div>
  );
}

// Separator dots
function Separator() {
  return (
    <div className="flex flex-col gap-2 text-white/40 text-xl md:text-2xl -mt-3">
      <span>:</span>
    </div>
  );
}
