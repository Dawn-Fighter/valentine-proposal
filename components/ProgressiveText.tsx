"use client";

import { motion, Variants } from "framer-motion";

interface ProgressiveTextProps {
  text: string;
  className?: string;
  delay?: number; // Start delay in seconds
  duration?: number; // Duration per word
  onComplete?: () => void;
}

export default function ProgressiveText({
  text,
  className = "",
  delay = 0,
  duration = 0.5,
  onComplete,
}: ProgressiveTextProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
      onAnimationComplete={onComplete}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-[0.3em] inline-block last:mr-0">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
