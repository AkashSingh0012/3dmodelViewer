"use client";

// components/scene/PlaceholderBox.tsx
// A simple wireframe cube shown while no valid model URL is provided,
// or after the user dismisses a load error.

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlaceholderBoxProps {
  autoRotate?: boolean;
}

export default function PlaceholderBox({ autoRotate = true }: PlaceholderBoxProps) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#333" wireframe />
      </mesh>
    </group>
  );
}