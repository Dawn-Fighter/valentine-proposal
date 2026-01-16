import confetti from "canvas-confetti";

export const triggerGoldCelebration = () => {
  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  // Initial Burst
  confetti({
    ...defaults,
    particleCount: 100,
    origin: { y: 0.6 },
    colors: ['#D4AF37', '#800020', '#FFD700', '#722F37'],
    scalar: 2,
    shapes: ['circle', 'square'], // Fallback if custom shapes not working well, but let's try emojis
  });
  
  // Custom Emoji Shapes
  const scalar = 2;
  const rose = confetti.shapeFromText({ text: '🌹', scalar });
  const heart = confetti.shapeFromText({ text: '💖', scalar });
  const sparkle = confetti.shapeFromText({ text: '✨', scalar });
  const ring = confetti.shapeFromText({ text: '💍', scalar });

  const shapes = [rose, heart, sparkle, ring];

  // Continuous Rain
  const interval: any = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    // Side Cannons
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#D4AF37', '#F5E6C8'],
      shapes: [sparkle],
      scalar: 1.5
    });
    
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#800020', '#722F37'],
      shapes: [heart, rose],
      scalar: 2
    });

  }, 250);
};
