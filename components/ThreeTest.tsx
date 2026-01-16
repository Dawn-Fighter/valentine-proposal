"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";

export default function ThreeTest() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    console.log("ThreeTest mounted");
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="fixed inset-0 z-[100] bg-blue-500/50">
      <p className="text-white text-4xl">TEST OVERLAY</p>
      <Canvas>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
        <ambientLight />
      </Canvas>
    </div>
  );
}
