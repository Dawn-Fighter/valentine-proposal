"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ElegantBackground from "@/components/ElegantBackground";
import ProgressiveText from "@/components/ProgressiveText";
import LuxuryButton from "@/components/LuxuryButton";
import EscapingButton from "@/components/EscapingButton";
import SarcasticNote from "@/components/SarcasticNote";
import GoldCelebration from "@/components/GoldCelebration";
import ThreeEnvelope from "@/components/ThreeEnvelope";
import CursorHeartTrail from "@/components/CursorHeartTrail";
import ValentineCountdown from "@/components/ValentineCountdown";
import { sarcasticMessages } from "@/lib/messages"; // Restored import

export default function Home() {
  const [step, setStep] = useState<"intro" | "question" | "interaction" | "success">("intro");
  const [noAttempts, setNoAttempts] = useState(0);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [showCard, setShowCard] = useState(false); // New state for card reveal
  
  // Orchestrate intro
  useEffect(() => {
    // Little Bunny finishes at 3.5s (1.5s delay + 2s duration)
    // We start the question at 4.0s to have a slight pause
    const timer1 = setTimeout(() => setStep("question"), 4000); 
    return () => clearTimeout(timer1);
  }, []);

  const handleQuestionComplete = () => {
    setTimeout(() => setStep("interaction"), 500); // Show buttons after question finishes
  };

  const handleNoInteraction = () => {
    const newAttempts = noAttempts + 1;
    setNoAttempts(newAttempts);
    
    // Cycle messages
    const msgIndex = (newAttempts - 1) % sarcasticMessages.length;
    setCurrentMessage(sarcasticMessages[msgIndex]);
  };

  const handleYes = () => {
    setStep("success");
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden">
      <ElegantBackground />
      <CursorHeartTrail />
      <ValentineCountdown hide={step === "success"} />
      <GoldCelebration active={step === "success"} />
      <SarcasticNote 
        message={currentMessage} 
        onComplete={() => setCurrentMessage(null)} 
      />

      <div className="z-10 w-full max-w-3xl flex flex-col items-center text-center space-y-8 md:space-y-12 pt-24 md:pt-32">
        
        {/* Intro Text */}
        <AnimatePresence>
          {step !== "success" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 1 } }}
              className="space-y-4 md:space-y-6"
            >
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="text-3xl md:text-5xl font-playfair italic text-deep-burgundy"
              >
                Hey,
              </motion.h2>
              
              <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 1.5, ease: "easeOut" }} // Much slower (1.2s -> 2s)
                className="text-5xl md:text-7xl font-playfair font-bold text-deep-burgundy drop-shadow-sm"
              >
                Little Bunny
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Question */}
        <div className="min-h-[120px] md:min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {step === "question" || step === "interaction" ? (
              <ProgressiveText
                text="Will you be my Valentine?"
                className="text-4xl md:text-6xl font-playfair leading-tight text-charcoal"
                delay={0}
                duration={1.0} // Even slower reveal (1.0s per word)
                onComplete={handleQuestionComplete}
              />
            ) : null}
            
            {step === "success" && (
              <>
                {/* 3D Envelope Animation - Always visible in background of success */}
                <ThreeEnvelope onOpen={() => setShowCard(true)} />

                {/* The Golden Card - Revealed after envelope opens */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 100 }}
                  animate={showCard ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 100 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} // Slow luxurious entry
                  className="relative z-20 w-full max-w-lg mx-auto px-6"
                >
                  {/* The Golden Card */}
                  <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl shadow-burgundy/20 border border-white/60 text-center space-y-8 transform-gpu">
                    
                    {/* Decorative Icon */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={showCard ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 1, type: "spring", stiffness: 200 }}
                      className="w-16 h-16 mx-auto bg-deep-burgundy/5 rounded-full flex items-center justify-center"
                    >
                      <span className="text-3xl">💖</span>
                    </motion.div>

                    {/* Text Content */}
                    <div className="space-y-4">
                      <h2 className="text-4xl md:text-5xl font-playfair font-bold text-deep-burgundy tracking-tight">
                        It's Official!
                      </h2>
                      <p className="text-xl md:text-2xl font-playfair italic text-rich-wine/80">
                        You are now my Valentine.
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="w-12 h-1 bg-champagne-gold/30 mx-auto rounded-full" />

                    {/* Footer Message */}
                    <p className="font-playfair text-charcoal/70 text-lg">
                      "I knew you'd make the right choice."
                      <br />
                      <span className="text-deep-burgundy font-medium mt-2 block">
                        See you on the 13th! 😘
                      </span>
                    </p>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Buttons - Fixed Height Container (Option 2) */}
        {/* Reserves space so text above never jumps */}
        <div className="min-h-[250px] w-full flex flex-col justify-start pt-8">
          <AnimatePresence>
            {step === "interaction" && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }} // Smooth slow reveal
                className="flex flex-col items-center gap-8 w-full px-4"
              >
                <LuxuryButton 
                  onClick={handleYes}
                  scaleMultiplier={1 + (noAttempts * 0.05)}
                >
                  Yes, Absolutely!
                </LuxuryButton>

                <div className="h-12 w-full flex justify-center items-center relative">
                  <EscapingButton 
                    onEscape={handleNoInteraction}
                    attempts={noAttempts}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </main>
  );
}
