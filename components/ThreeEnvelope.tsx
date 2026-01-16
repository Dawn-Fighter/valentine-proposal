"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";

// The Envelope Model
function Envelope({ open, onOpenComplete }: { open: boolean; onOpenComplete: () => void }) {
  const group = useRef<THREE.Group>(null);
  
  // Create custom triangle shape for the flap
  const flapShape = new THREE.Shape();
  // Draw a triangle: starts at bottom-left, goes to bottom-right, then top-center
  const width = 3.2;
  const height = 1.6; // Slightly taller flap
  flapShape.moveTo(-width / 2, 0);
  flapShape.lineTo(width / 2, 0);
  flapShape.lineTo(0, height);
  flapShape.lineTo(-width / 2, 0);

  // Animation for the flap opening
  const { flapRotation } = useSpring({
    flapRotation: open ? -Math.PI * 0.8 : 0,
    config: config.molasses,
    onRest: () => {
      if (open) onOpenComplete();
    }
  });

  // Animation for the envelope flying in
  const { position, rotation } = useSpring({
    from: { position: [0, -10, 0], rotation: [0.5, 0, 0] }, // Start tilted up slightly
    to: { 
      position: [0, -1, 0], // Center it better
      rotation: [0, 0, 0] // Face camera directly
    },
    config: { tension: 120, friction: 14 },
    delay: 200
  });

  return (
    // @ts-ignore - animated.group types can be finicky
    <animated.group ref={group} position={position as any} rotation={rotation as any}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Envelope Body (Back Panel - inside) */}
        <mesh position={[0, 0, -0.02]} receiveShadow castShadow>
          <planeGeometry args={[3.2, 2.2]} />
          <meshStandardMaterial color="#faf7f5" roughness={0.6} metalness={0.1} />
        </mesh>

        {/* Envelope Body (Front Panel - Bottom) */}
        <mesh position={[0, -0.55, 0.02]} receiveShadow castShadow>
          <planeGeometry args={[3.2, 1.1]} />
          <meshStandardMaterial color="#f0ece6" roughness={0.6} metalness={0.1} />
        </mesh>

        {/* Envelope Flap (The part that moves) */}
        {/* Pivot point magic: we nest the mesh inside a group shifted to the hinge */}
        {/* @ts-ignore */}
        <animated.group position={[0, 0.55, 0.02]} rotation-x={flapRotation}>
          {/* Flap Triangle pointing DOWN when closed */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI]} castShadow> 
             <shapeGeometry args={[flapShape]} />
             <meshStandardMaterial color="#e8e2d9" roughness={0.5} metalness={0.1} side={THREE.DoubleSide} />
          </mesh>
          
          {/* Wax Seal (Gold Button) - Attached to tip of flap */}
          <mesh position={[0, 1.3, 0.03]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.05, 32]} />
            <meshStandardMaterial 
              color="#D4AF37" 
              metalness={1} 
              roughness={0.2} 
              emissive="#D4AF37"
              emissiveIntensity={0.2}
            />
          </mesh>
        </animated.group>

      </Float>
    </animated.group>
  );
}

export default function ThreeEnvelope({ onOpen }: { onOpen: () => void }) {
  const [open, setOpen] = useState(false);

  // Trigger open after fly-in
  useEffect(() => {
    // Reduced delay to 1s (was 1.5s) so it opens faster
    const timer = setTimeout(() => setOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 40 }}>
        <ambientLight intensity={0.7} />
        {/* Main Key Light */}
        <spotLight 
          position={[5, 5, 5]} 
          angle={0.25} 
          penumbra={1} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[1024, 1024]} 
        />
        {/* Fill Light (Warm) */}
        <pointLight position={[-5, 0, 5]} intensity={0.5} color="#ffd1dc" />
        
        {/* Rim Light (Cool) */}
        <pointLight position={[0, 5, -5]} intensity={0.8} color="#e0f7fa" />

        <Environment preset="city" />

        <Envelope open={open} onOpenComplete={onOpen} />
        
        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.5} 
          scale={12} 
          blur={2.5} 
          far={5} 
          color="#800020" // Burgundy tinted shadow
        />
      </Canvas>
    </div>
  );
}
