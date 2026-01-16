"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Floating heart component
function FloatingHeart({ 
  delay, 
  duration, 
  startX, 
  size,
  opacity 
}: { 
  delay: number; 
  duration: number; 
  startX: number;
  size: number;
  opacity: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${startX}%`,
        bottom: -50,
        width: size,
        height: size,
      }}
      initial={{ y: 0, opacity: 0, rotate: -15 }}
      animate={{
        y: [0, -window.innerHeight - 100],
        opacity: [0, opacity, opacity, 0],
        rotate: [-15, 15, -15],
        x: [0, 20, -20, 10, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.1, 0.9, 1],
      }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-deep-burgundy/30">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </motion.div>
  );
}

export default function AnimatedBackground() {
  const [hearts, setHearts] = useState<Array<{
    id: number;
    delay: number;
    duration: number;
    startX: number;
    size: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    // Generate hearts on client side only
    const newHearts = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 10, // 15-25 seconds
      startX: Math.random() * 100,
      size: 16 + Math.random() * 20, // 16-36px
      opacity: 0.15 + Math.random() * 0.15, // Very subtle: 0.15-0.3
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-ivory via-warm-blush to-cream-ivory" />
      
      {/* Animated gradient mesh blobs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blob 1 - Top right, burgundy */}
        <motion.div
          className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full opacity-[0.15]"
          style={{
            background: "radial-gradient(circle, #800020 0%, transparent 70%)",
            filter: "blur(60px)",
            top: "-20%",
            right: "-10%",
          }}
          animate={{
            x: [0, 50, 0, -30, 0],
            y: [0, 30, -20, 10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Blob 2 - Bottom left, pink */}
        <motion.div
          className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full opacity-[0.12]"
          style={{
            background: "radial-gradient(circle, #E8B4B8 0%, transparent 70%)",
            filter: "blur(50px)",
            bottom: "-15%",
            left: "-10%",
          }}
          animate={{
            x: [0, -40, 20, -10, 0],
            y: [0, -30, 40, -20, 0],
            scale: [1, 0.95, 1.1, 1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        
        {/* Blob 3 - Center, gold */}
        <motion.div
          className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)",
            filter: "blur(70px)",
            top: "30%",
            left: "30%",
          }}
          animate={{
            x: [0, 60, -40, 30, 0],
            y: [0, -40, 30, -20, 0],
            scale: [1, 1.15, 0.9, 1.05, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />

        {/* Blob 4 - Top left, soft rose */}
        <motion.div
          className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full opacity-[0.1]"
          style={{
            background: "radial-gradient(circle, #C41E3A 0%, transparent 70%)",
            filter: "blur(55px)",
            top: "10%",
            left: "-5%",
          }}
          animate={{
            x: [0, 30, -20, 40, 0],
            y: [0, 50, -30, 20, 0],
            scale: [1, 1.05, 0.95, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        {/* Blob 5 - Bottom right, warm */}
        <motion.div
          className="absolute w-[450px] h-[450px] md:w-[650px] md:h-[650px] rounded-full opacity-[0.1]"
          style={{
            background: "radial-gradient(circle, #722F37 0%, transparent 70%)",
            filter: "blur(65px)",
            bottom: "5%",
            right: "-5%",
          }}
          animate={{
            x: [0, -50, 30, -20, 0],
            y: [0, 20, -40, 30, 0],
            scale: [1, 0.9, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7,
          }}
        />
      </div>

      {/* Subtle floating hearts */}
      <div className="absolute inset-0 overflow-hidden">
        {hearts.map((heart) => (
          <FloatingHeart
            key={heart.id}
            delay={heart.delay}
            duration={heart.duration}
            startX={heart.startX}
            size={heart.size}
            opacity={heart.opacity}
          />
        ))}
      </div>

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(128,0,32,0.08)_100%)] pointer-events-none" />
    </div>
  );
}
