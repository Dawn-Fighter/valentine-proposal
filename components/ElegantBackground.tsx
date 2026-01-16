"use client";

import RosePetals from "./RosePetals";
import GoldSparkles from "./GoldSparkles";

export default function ElegantBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-cream-ivory via-warm-blush to-cream-ivory">
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(128,0,32,0.05)_100%)] pointer-events-none" />

      {/* Particles */}
      <RosePetals />
      <GoldSparkles />
    </div>
  );
}
